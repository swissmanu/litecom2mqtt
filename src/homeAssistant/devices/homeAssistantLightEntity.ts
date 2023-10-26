import { config } from '../../util/config.js';
import { HomeAssistantEntity, HomeAssistantEntityType, LitecomServiceType } from './homeAssistantEntity.js';

/**
 * @see https://www.home-assistant.io/integrations/light.mqtt/
 */
export class HomeAssistantLightEntity extends HomeAssistantEntity {
    override readonly homeAssistantEntityType: HomeAssistantEntityType = 'light';
    override readonly litecomServiceType: LitecomServiceType = 'lighting';

    override get homeAssistantCommandTopics(): Record<string, string> {
        if (this.device) {
            return {
                command_topic: `${config.LITECOM2MQTT_MQTT_TOPIC_PREFIX}/${this.zone.id}/devices/${this.objectId}/${this.litecomServiceType}/set`,
                brightness_command_topic: `${config.LITECOM2MQTT_MQTT_TOPIC_PREFIX}/${this.zone.id}/devices/${this.objectId}/${this.litecomServiceType}/brightness`,
            };
        }
        return {
            command_topic: `${config.LITECOM2MQTT_MQTT_TOPIC_PREFIX}/${this.zone.id}/${this.litecomServiceType}/set`,
            brightness_command_topic: `${config.LITECOM2MQTT_MQTT_TOPIC_PREFIX}/${this.zone.id}/${this.litecomServiceType}/brightness`,
        };
    }

    override get homeAssistantEntityConfig(): Record<string, string | number | boolean> {
        const shared = { brightness_scale: 100, on_command_type: 'brightness' };

        if (this.device) {
            return {
                ...shared,
                state_topic: `${config.LITECOM2MQTT_LITECOM_STATE_MQTT_TOPIC_PREFIX}/zones/${this.zone.id}/devices/${this.device.id}/services/${this.litecomServiceType}/intensity`,
                state_value_template: `{{ 'OFF' if (value | int) == 0 else 'ON' }}`,
                brightness_state_topic: `${config.LITECOM2MQTT_LITECOM_STATE_MQTT_TOPIC_PREFIX}/zones/${this.zone.id}/devices/${this.device.id}/services/${this.litecomServiceType}/intensity`,
                brightness_value_template: `{{ value | int }}`,
            };
        }

        return {
            ...shared,
            state_topic: `${config.LITECOM2MQTT_LITECOM_STATE_MQTT_TOPIC_PREFIX}/zones/${this.zone.id}/services/${this.litecomServiceType}/intensity`,
            state_value_template: `{{ 'OFF' if (value | int) == 0 else 'ON' }}`,
            brightness_state_topic: `${config.LITECOM2MQTT_LITECOM_STATE_MQTT_TOPIC_PREFIX}/zones/${this.zone.id}/services/${this.litecomServiceType}/intensity`,
            brightness_value_template: `{{ value | int }}`,
        };
    }
}
