import { MqttClient, OnMessageCallback } from 'mqtt';
import { isDeviceStateTopicInformation, LitecomStateMqttTopicFactory } from '../litecom/stateMqttTopicFactory.js';
import { Config } from '../util/config.js';
import { Logger } from '../util/logger.js';
import { DeviceStatePropagationStrategy } from './deviceStatePropagationStrategy/deviceStatePropagationStrategy.js';

/**
 * The {@link StatePropagator} mirrors zone and device states from Litecoms MQTT broker to another MQTT browser.
 *
 * Additionally, a {@link DeviceStatePropagationStrategy} can be passed. This strategy allows to compensate for lacking
 * functionality in Litecoms own implementation. See {@link DefaultDeviceStatePropagationStrategy} for more information.
 */
export class StatePropagator implements AsyncDisposable {
    constructor(
        private log: Logger,
        private config: Config,
        private litecomMqttClient: MqttClient,
        private brokerMqttClient: MqttClient,
        private deviceStatePropagationStrategy: DeviceStatePropagationStrategy,
    ) {
        this.litecomMqttClient.on('message', this.onMessage);
        this.litecomMqttClient.subscribeAsync('zones/#');
    }

    private onMessage: OnMessageCallback = (topic: string, payload: Buffer) => {
        const zoneOrDeviceState = LitecomStateMqttTopicFactory.matchTopic(topic);
        if (zoneOrDeviceState) {
            this.forwardMessage(topic, payload);

            if (isDeviceStateTopicInformation(zoneOrDeviceState)) {
                this.deviceStatePropagationStrategy.propagateDeviceState(zoneOrDeviceState, payload);
            }
        }
    };

    private async forwardMessage(topic: string, payload: Buffer): Promise<void> {
        await this.brokerMqttClient.publishAsync(
            `${this.config.LITECOM2MQTT_LITECOM_STATE_MQTT_TOPIC_PREFIX}/${topic}`,
            payload,
        );
        this.log.info(`Mirror ${topic}`);
    }

    async [Symbol.asyncDispose](): Promise<void> {
        this.litecomMqttClient.off('message', this.onMessage);
        await this.litecomMqttClient.unsubscribeAsync('zones/#');
    }
}
