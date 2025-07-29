import { Config } from '../util/config.js';

type DeviceStateTopic<
    Service extends string,
    Value extends string,
    Prefix extends string | null = null,
> = `${Prefix extends string ? `${Prefix}/` : ``}zones/${string}/devices/${string}/services/${Service}/${Value}`;
type ZoneStateTopic<
    Service extends string,
    Value extends string,
    Prefix extends string | null = null,
> = `${Prefix extends string ? `${Prefix}/` : ``}zones/${string}/services/${Service}/${Value}`;

export type DeviceStateTopicInformation = {
    zoneId: string;
    deviceId: string;
    service: string;
    value: string;
};

export function isDeviceStateTopicInformation(
    x: DeviceStateTopicInformation | ZoneStateTopicInformation,
): x is DeviceStateTopicInformation {
    return typeof (x as DeviceStateTopicInformation).deviceId === 'string';
}

type ZoneStateTopicInformation = {
    zoneId: string;
    service: string;
    value: string;
};

export class LitecomStateMqttTopicFactory {
    private static DeviceStateTopicRegex = /^zones\/(.*)\/devices\/(.*)\/services\/(.*)\/(.*)$/;
    private static ZoneStateTopicRegex = /^zones\/(.*)\/services\/(.*)\/(.*)$/;

    constructor(
        private readonly zoneId: string,
        private readonly deviceId?: string | undefined,
    ) {}

    private prefix(): typeof this.deviceId extends string
        ? `zones/${string}/devices/${string}/services`
        : `zones/${string}/services` {
        if (this.deviceId) {
            return `zones/${this.zoneId}/devices/${this.deviceId}/services`;
        }
        return `zones/${this.zoneId}/services`;
    }

    public topicServiceWithValue<Service extends string, Value extends string>(
        service: Service,
        value: Value,
    ): typeof this.deviceId extends string ? DeviceStateTopic<Service, Value> : ZoneStateTopic<Service, Value> {
        return `${this.prefix()}/${service}/${value}`;
    }

    public static matchTopic(topic: string): DeviceStateTopicInformation | ZoneStateTopicInformation | null {
        let match = topic.match(LitecomStateMqttTopicFactory.DeviceStateTopicRegex);
        if (match) {
            const [, zoneId, deviceId, service, value] = match;
            return { zoneId, deviceId, service, value };
        }

        match = topic.match(LitecomStateMqttTopicFactory.ZoneStateTopicRegex);
        if (match) {
            const [, zoneId, service, value] = match;
            return { zoneId, service, value };
        }

        return null;
    }
}

export class LitecomStatePrefixedMqttTopicFactory {
    constructor(
        private readonly config: Config,
        private readonly zoneId: string,
        private readonly deviceId?: string | undefined,
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
    ): typeof this.deviceId extends string
        ? DeviceStateTopic<Service, Value, string>
        : ZoneStateTopic<Service, Value, string> {
        return `${this.prefix()}/${service}/${value}`;
    }
}
