import { Config } from '../util/config';
import { DataPointType } from './devices/homeAssistantEntity';

type DeviceCommand<Command extends string> = `${string}/${string}/devices/${string}/${DataPointType}/${Command}`;
type ZoneCommand<Command extends string> = `${string}/${string}/${DataPointType}/${Command}`;

export class HomeAssistantCommandMqttTopicFactory {
    constructor(
        private readonly config: Config,
        private readonly zoneId: string,
        private readonly deviceId: string | undefined,
        private readonly dataPointType: DataPointType,
    ) {}

    private prefix(): typeof this.deviceId extends string
        ? `${string}/${string}/devices/${string}/${DataPointType}`
        : `${string}/${string}/${DataPointType}` {
        if (this.deviceId) {
            return `${this.config.LITECOM2MQTT_MQTT_TOPIC_PREFIX}/${this.zoneId}/devices/${this.deviceId}/${this.dataPointType}`;
        }
        return `${this.config.LITECOM2MQTT_MQTT_TOPIC_PREFIX}/${this.zoneId}/${this.dataPointType}`;
    }

    public topicForCommand<Command extends string>(
        command: Command,
    ): typeof this.deviceId extends string ? DeviceCommand<Command> : ZoneCommand<Command> {
        return `${this.prefix()}/${command}`;
    }
}
