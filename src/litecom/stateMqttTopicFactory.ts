import { Config } from '../util/config';

type DeviceState<
    Service extends string,
    Value extends string,
> = `${string}/zones/${string}/devices/${string}/services/${Service}/${Value}`;
type ZoneState<Service extends string, Value extends string> = `${string}/zones/${string}/services/${Service}/${Value}`;

export class LitecomStateMqttTopicFactory {
    constructor(
        private readonly config: Config,
        private readonly zoneId: string,
        private readonly deviceId: string | undefined,
    ) {}

    private prefix(): typeof this.deviceId extends string
        ? `${string}/zones/${string}/devices/${string}/services`
        : `${string}/zones/${string}/services` {
        if (this.deviceId) {
            return `${this.config.LITECOM2MQTT_LITECOM_STATE_MQTT_TOPIC_PREFIX}/zones/${this.zoneId}/devices/${this.deviceId}/services`;
        }
        return `${this.config.LITECOM2MQTT_LITECOM_STATE_MQTT_TOPIC_PREFIX}/zones/${this.zoneId}/services`;
    }

    public topicServiceWithValue<Service extends string, Value extends string>(
        service: Service,
        value: Value,
    ): typeof this.deviceId extends string ? DeviceState<Service, Value> : ZoneState<Service, Value> {
        return `${this.prefix()}/${service}/${value}`;
    }
}
