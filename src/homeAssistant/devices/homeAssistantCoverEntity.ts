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
                ...(this.hasBlinds
                    ? {
                          command_topic: `${config.LITECOM2MQTT_MQTT_TOPIC_PREFIX}/${this.zone.id}/devices/${this.objectId}/${this.dataPointType}/move-blind`,
                          set_position_topic: `${config.LITECOM2MQTT_MQTT_TOPIC_PREFIX}/${this.zone.id}/devices/${this.objectId}/${this.dataPointType}/position-blind`,
                      }
                    : {}),
                ...(this.hasSlats
                    ? {
                          tilt_command_topic: `${config.LITECOM2MQTT_MQTT_TOPIC_PREFIX}/${this.zone.id}/devices/${this.objectId}/${this.dataPointType}/position-slat`,
                      }
                    : {}),
            };
        }
        return {
            ...(this.hasBlinds
                ? {
                      command_topic: `${config.LITECOM2MQTT_MQTT_TOPIC_PREFIX}/${this.zone.id}/${this.dataPointType}/move-blind`,
                      set_position_topic: `${config.LITECOM2MQTT_MQTT_TOPIC_PREFIX}/${this.zone.id}/${this.dataPointType}/position-blind`,
                  }
                : {}),
            ...(this.hasSlats
                ? {
                      tilt_command_topic: `${config.LITECOM2MQTT_MQTT_TOPIC_PREFIX}/${this.zone.id}/${this.dataPointType}/position-slat`,
                  }
                : {}),
        };
    }

    override get homeAssistantEntityConfig(): Record<string, string | number | boolean> {
        const shared = {
            name: 'Cover',
            position_closed: 100,
            position_open: 0,
            payload_open: Litecom.putMotorService.command.OPEN,
            payload_close: Litecom.putMotorService.command.CLOSE,
            payload_stop: Litecom.putMotorService.command.STOP,
            tilt_command_template: '{{ 100 - tilt_position }}',
            tilt_status_template: '{{ 100 - value }}',
        };

        if (this.device) {
            return {
                ...shared,
                ...(this.hasBlinds
                    ? {
                          position_topic: `${config.LITECOM2MQTT_LITECOM_STATE_MQTT_TOPIC_PREFIX}/zones/${this.zone.id}/devices/${this.device.id}/services/blind/position`,
                      }
                    : {}),
                ...(this.hasSlats
                    ? {
                          tilt_status_topic: `${config.LITECOM2MQTT_LITECOM_STATE_MQTT_TOPIC_PREFIX}/zones/${this.zone.id}/devices/${this.device.id}/services/slat/position`,
                      }
                    : {}),
            };
        }

        return {
            ...shared,
            ...(this.hasBlinds
                ? {
                      position_topic: `${config.LITECOM2MQTT_LITECOM_STATE_MQTT_TOPIC_PREFIX}/zones/${this.zone.id}/services/blind/position`,
                  }
                : {}),
            ...(this.hasSlats
                ? {
                      tilt_status_topic: `${config.LITECOM2MQTT_LITECOM_STATE_MQTT_TOPIC_PREFIX}/zones/${this.zone.id}/services/slat/position`,
                  }
                : {}),
        };
    }
}
