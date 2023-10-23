import { ZoneWithoutAvailableServices } from '../../litecom/interrogateLitecomSystem.js';
import { Device, Zone } from '../../litecom/restClient/index.js';
import { config } from '../../util/config.js';
import { MqttClient } from '../mqttClient.js';
import { AbstractEntity } from './abstractEntity.js';

/**
 * @see https://www.home-assistant.io/integrations/light.mqtt/
 */
export class LightEntity extends AbstractEntity {
    constructor(
        mqttClient: MqttClient,
        zone: Zone,
        parentZones: ReadonlyArray<ZoneWithoutAvailableServices>,
        device?: Device,
    ) {
        super(mqttClient, zone, parentZones, device);
    }

    public static readonly LitecomServiceType = 'lighting';

    get homeAssistantEntityType(): 'light' {
        return 'light';
    }

    get litecomServiceType(): 'lighting' {
        return LightEntity.LitecomServiceType;
    }

    get homeAssistantCommandTopics(): Record<string, string> {
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

    get homeAssistantEntityConfig(): Record<string, string | number | boolean> {
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
