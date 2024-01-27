import { Device, Zone } from '../../litecom/restClient/index.js';
import { LitecomStateMqttTopicFactory } from '../../litecom/stateMqttTopicFactory.js';
import { Config } from '../../util/config.js';
import { DataPointType, HomeAssistantEntity, HomeAssistantEntityType } from './homeAssistantEntity.js';

/**
 * @see https://www.home-assistant.io/integrations/sensor.mqtt/
 */
export class HomeAssistantSceneOutOfTuneEntity extends HomeAssistantEntity {
    override homeAssistantEntityType: HomeAssistantEntityType = 'sensor';
    override dataPointType: DataPointType = 'sceneOutOfTune';

    constructor(config: Config, zone: Zone, device?: Device) {
        super(config, zone, device);
    }

    override get homeAssistantCommandTopics(): Record<string, string> {
        return {};
    }

    override get homeAssistantEntityConfig(): Record<string, string | number | boolean | string[]> {
        const stateTopicFactory = new LitecomStateMqttTopicFactory(this.config, this.zone.id, this.device?.id);
        return {
            icon: 'mdi:tune-variant',
            name: 'Scene Out Of Tune',
            state_topic: stateTopicFactory.topicServiceWithValue('scene', 'outOfTune'),
        };
    }
}
