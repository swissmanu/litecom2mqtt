import { MqttClient } from 'mqtt';
import {
    DeviceStateTopicInformation,
    LitecomStatePrefixedMqttTopicFactory,
} from '../../litecom/stateMqttTopicFactory.js';
import { Config } from '../../util/config.js';
import { Logger } from '../../util/logger.js';
import { DeviceStatePropagationStrategy } from './deviceStatePropagationStrategy.js';

type ZoneIdAndService = string;
type DeviceIdAndValue = string;

/**
 * When changing, i.e., the light intensity of a device, the Litecom CCD does not propagate that changed intensity to
 * the respective lighting service of the group the device is contained in.
 *
 * This {@link DeviceStatePropagationStrategy} works around this situation by augmenting this behavior:
 * - The strategy keeps all values/states for all devices contained in a specific group.
 * - Each time such a value changes, the strategy averages these values and provides that value for the group.
 *
 * # Limitations
 * This strategy does NOT propagate these values higher up than the group level. I.e., a room containing muliple groups
 * will NOT recieve averaged vales from its groups. This might be done in future implementations.
 */
export class DefaultDeviceStatePropagationStrategy implements DeviceStatePropagationStrategy {
    private decoder = new TextDecoder();

    private statesByZoneAndService: Map<ZoneIdAndService, Map<DeviceIdAndValue, number>> = new Map();

    /**
     * A map holding scheduled propagations from devices to their group. Calling the function in the value cancels such
     * a propagation, allowing to debounce the propagation effectively, as multiple devices in a group might change
     * their state in quick succession.
     */
    private scheduledGroupPropagations: Map<string, () => void> = new Map();

    constructor(
        private readonly log: Logger,
        private readonly config: Config,
        private brokerMqttClient: MqttClient,
    ) {}

    async propagateDeviceState(deviceStateTopic: DeviceStateTopicInformation, payload: Buffer): Promise<void> {
        this.persistDeviceState(deviceStateTopic, payload);
        this.updateZoneWithDeviceValues(deviceStateTopic);
    }

    /**
     * Persists the state of a device service by decoding the provided payload buffer, validating it as a number, and
     * storing it in the internal state map.
     *
     * @param params - An object containing information about the device state topic,
     *   including `zoneId`, `service`, `deviceId`, and `value`.
     * @param payloadBuffer - The buffer containing the payload to decode and persist.
     *
     * @remarks
     * - If the decoded payload is not a valid number, the method logs a warning and skips persisting the state.
     * - The state is stored in a map, keyed by a combination of zone and service, and further by device and value.
     */
    private persistDeviceState(
        { zoneId, service, deviceId, value }: DeviceStateTopicInformation,
        payloadBuffer: Buffer,
    ) {
        const payload = this.decoder.decode(payloadBuffer);
        const numberPayload = Number.parseInt(payload, 10);
        if (Number.isNaN(numberPayload)) {
            this.log.warning('Cannot persist device state which is not a number. Skipping');
            return;
        }

        const zoneIdAndService = `${zoneId}-${service}`;
        const deviceIdAndValue = `${deviceId}-${value}`;
        const serviceValues = this.statesByZoneAndService.get(zoneIdAndService) ?? new Map<string, number>();
        serviceValues.set(deviceIdAndValue, numberPayload);
        this.statesByZoneAndService.set(zoneIdAndService, serviceValues);
    }

    /**
     * Updates the zone state with the provided device values and schedules propagation to the group topic.
     *
     * This method debounces propagation events for a specific zone, service, and value combination.
     * If a propagation is already scheduled for the same combination, it cancels the previous one and schedules a new
     * one. After the debounce interval, it calculates the average of all service values for the zone, constructs the
     * appropriate MQTT topic, and publishes the averaged value to the broker.
     *
     * @param deviceStateTopic - Information about the device state, including zone ID, service, and value.
     * @param debounceInMs - The debounce interval in milliseconds before propagating the state (default: 150ms).
     */
    private updateZoneWithDeviceValues(deviceStateTopic: DeviceStateTopicInformation, debounceInMs = 150) {
        const { zoneId, service, value } = deviceStateTopic;
        const scheduledGroupPropagationKey = `${zoneId}-${service}-${value}`;
        const cancelScheduledPropagation = this.scheduledGroupPropagations.get(scheduledGroupPropagationKey);
        if (cancelScheduledPropagation) {
            cancelScheduledPropagation();
        }

        this.scheduledGroupPropagations.set(
            scheduledGroupPropagationKey,
            (() => {
                const handle = setTimeout(() => {
                    const zoneIdAndService = `${zoneId}-${service}`;
                    const serviceValues =
                        this.statesByZoneAndService.get(zoneIdAndService) ?? new Map<string, number>();
                    const topicFactory = new LitecomStatePrefixedMqttTopicFactory(this.config, zoneId);
                    const topic = topicFactory.topicServiceWithValue(service, value);

                    const averagedValues =
                        [...serviceValues.values()].reduce((acc, x) => acc + x, 0) / serviceValues.size;

                    this.brokerMqttClient.publish(topic, `${averagedValues}`);
                    this.log.info(`Propagate device state to group`, { deviceStateTopic });
                }, debounceInMs);

                return () => {
                    clearTimeout(handle);
                    this.log.debug(`Cancel scheduled propagation`, { deviceStateTopic });
                    this.scheduledGroupPropagations.delete(scheduledGroupPropagationKey);
                };
            })(),
        );
    }
}
