import { LitecomStateMqttTopicFactory } from '../../litecom/stateMqttTopicFactory.js';
import { LightingServiceMQTTHandler } from '../lightingServiceMqttHandler.js';
import { DataPointType, HomeAssistantEntity, HomeAssistantEntityType } from './homeAssistantEntity.js';

/**
 * @see https://www.home-assistant.io/integrations/light.mqtt/
 */
export class HomeAssistantLightEntity extends HomeAssistantEntity {
    override readonly homeAssistantEntityType: HomeAssistantEntityType = 'light';
    override readonly dataPointType: DataPointType = 'lighting';

    override get homeAssistantCommandTopics(): Record<string, string> {
        return LightingServiceMQTTHandler.createHomeAssistantCommandTopics(
            this.config,
            this.zone.id,
            this.device?.id,
            this.dataPointType,
        );
    }

    override get homeAssistantEntityConfig(): Record<string, string | number | boolean> {
        const stateTopicFactory = new LitecomStateMqttTopicFactory(this.config, this.zone.id, this.device?.id);

        return {
            name: 'Lighting',
            brightness_scale: 100,
            on_command_type: 'brightness',
            state_topic: stateTopicFactory.topicServiceWithValue('lighting', 'intensity'),
            state_value_template: `{{ 'OFF' if (value | int) == 0 else 'ON' }}`,
            brightness_state_topic: stateTopicFactory.topicServiceWithValue('lighting', 'intensity'),
            brightness_value_template: `{{ value | int }}`,
        };
    }
}
