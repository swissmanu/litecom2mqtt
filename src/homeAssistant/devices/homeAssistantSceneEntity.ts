import { Scene } from '../../litecom/interrogateLitecomSystem.js';
import { Device, Zone } from '../../litecom/restClient/index.js';
import { Config } from '../../util/config.js';
import { HomeAssistantEntity, HomeAssistantEntityType, LitecomServiceType } from './homeAssistantEntity.js';

/**
 * @see https://www.home-assistant.io/integrations/select.mqtt/
 */
export class HomeAssistantSceneEntity extends HomeAssistantEntity {
    override homeAssistantEntityType: HomeAssistantEntityType = 'select';
    override litecomServiceType: LitecomServiceType = 'scene';

    constructor(
        config: Config,
        private readonly scenes: ReadonlyArray<Scene>,
        zone: Zone,
        device?: Device,
    ) {
        super(config, zone, device);
    }

    override get homeAssistantCommandTopics(): Record<string, string> {
        if (this.device) {
            return {
                command_topic: `${this.config.LITECOM2MQTT_MQTT_TOPIC_PREFIX}/${this.zone.id}/devices/${this.objectId}/${this.litecomServiceType}/activate`,
            };
        }
        return {
            command_topic: `${this.config.LITECOM2MQTT_MQTT_TOPIC_PREFIX}/${this.zone.id}/${this.litecomServiceType}/activate`,
        };
    }

    override get homeAssistantEntityConfig(): Record<string, string | number | boolean | string[]> {
        // value_template: `{{ "Absence" if value == 0 else "Foo" if value == 1 ... }}`
        const valueTemplate = this.scenes.map(({ id, name }) => `"${name}" if (value | int) == ${id}`).join(' else ');

        const shared = {
            options: this.scenes.map((s) => s.name),
            icon: 'mdi:vector-circle',
            value_template: `{{ ${valueTemplate} }}`,
        };

        if (this.device) {
            return {
                ...shared,
                state_topic: `${this.config.LITECOM2MQTT_LITECOM_STATE_MQTT_TOPIC_PREFIX}/zones/${this.zone.id}/devices/${this.device.id}/services/${this.litecomServiceType}/activeScene`,
            };
        }

        return {
            ...shared,
            state_topic: `${this.config.LITECOM2MQTT_LITECOM_STATE_MQTT_TOPIC_PREFIX}/zones/${this.zone.id}/services/${this.litecomServiceType}/activeScene`,
        };
    }
}
