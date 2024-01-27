import { Scene } from '../../litecom/interrogateLitecomSystem.js';
import { Device, Zone } from '../../litecom/restClient/index.js';
import { LitecomStateMqttTopicFactory } from '../../litecom/stateMqttTopicFactory.js';
import { Config } from '../../util/config.js';
import { SceneServiceMQTTHandler } from '../sceneServiceMqttHandler.js';
import { DataPointType, HomeAssistantEntity, HomeAssistantEntityType } from './homeAssistantEntity.js';

/**
 * @see https://www.home-assistant.io/integrations/select.mqtt/
 */
export class HomeAssistantSceneEntity extends HomeAssistantEntity {
    override homeAssistantEntityType: HomeAssistantEntityType = 'select';
    override dataPointType: DataPointType = 'activeScene';

    constructor(
        config: Config,
        private readonly scenes: ReadonlyArray<Scene>,
        zone: Zone,
        device?: Device,
    ) {
        super(config, zone, device);
    }

    override get homeAssistantCommandTopics(): Record<string, string> {
        return SceneServiceMQTTHandler.createHomeAssistantCommandTopics(
            this.config,
            this.zone.id,
            this.device?.id,
            this.dataPointType,
        );
    }

    override get homeAssistantEntityConfig(): Record<string, string | number | boolean | string[]> {
        // value_template: `{{ "Absence" if value == 0 else "Foo" if value == 1 ... }}`
        const valueTemplate = this.scenes.map(({ id, name }) => `"${name}" if (value | int) == ${id}`).join(' else ');
        const stateTopicFactory = new LitecomStateMqttTopicFactory(this.config, this.zone.id, this.device?.id);

        return {
            name: 'Active Scene',
            icon: 'mdi:vector-circle',
            options: this.scenes.map((s) => s.name),
            value_template: `{{ ${valueTemplate} }}`,
            state_topic: stateTopicFactory.topicServiceWithValue('scene', 'activeScene'),
        };
    }
}
