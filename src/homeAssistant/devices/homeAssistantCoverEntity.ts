import * as Litecom from '../../litecom/restClient/index.js';
import { Config, config } from '../../util/config.js';
import { DataPointType, HomeAssistantEntity, HomeAssistantEntityType } from './homeAssistantEntity.js';

/**
 * @see https://www.home-assistant.io/integrations/cover.mqtt/
 */
export class HomeAssistantCoverEntity extends HomeAssistantEntity {
    override readonly homeAssistantEntityType: HomeAssistantEntityType = 'cover';
    override readonly dataPointType: DataPointType = 'cover';

    constructor(
        config: Config,
        private readonly hasBlinds: boolean,
        private readonly hasSlats: boolean,
        zone: Litecom.Zone,
        device?: Litecom.Device,
    ) {
        super(config, zone, device);
    }

    override get homeAssistantCommandTopics(): Record<string, string> {
        if (this.device) {
            return {
                command_topic: `${config.LITECOM2MQTT_MQTT_TOPIC_PREFIX}/${this.zone.id}/evices/${this.objectId}/${this.dataPointType}/move`,
            };
        }
        return {
            command_topic: `${config.LITECOM2MQTT_MQTT_TOPIC_PREFIX}/${this.zone.id}/${this.dataPointType}/move`,
        };
    }

    override get homeAssistantEntityConfig(): Record<string, string | number | boolean> {
        const shared = {
            name: 'Cover',
            position_closed: 100.0,
            position_open: 0.0,
            payload_open: Litecom.putMotorService.command.OPEN,
            payload_close: Litecom.putMotorService.command.CLOSE,
            payload_stop: Litecom.putMotorService.command.STOP,
        };

        if (this.device) {
            return {
                ...shared,
                position_topic: `${config.LITECOM2MQTT_LITECOM_STATE_MQTT_TOPIC_PREFIX}/zones/${this.zone.id}/devices/${this.device.id}/services/blind/position`,
            };
        }

        return {
            ...shared,
            position_topic: `${config.LITECOM2MQTT_LITECOM_STATE_MQTT_TOPIC_PREFIX}/zones/${this.zone.id}/services/blind/position`,
        };
    }
}
