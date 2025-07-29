import * as Litecom from '../../litecom/restClient/index.js';
import { LitecomStatePrefixedMqttTopicFactory } from '../../litecom/stateMqttTopicFactory.js';
import { Config } from '../../util/config.js';
import { CoverServiceMQTTHandler } from '../coverServiceMqttHandler.js';
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
        return {
            ...(this.hasBlinds &&
                CoverServiceMQTTHandler.createHomeAssistantCommandTopicsForBlind(
                    this.config,
                    this.zone.id,
                    this.device?.id,
                    this.dataPointType,
                )),
            ...(this.hasSlats &&
                CoverServiceMQTTHandler.createHomeAssistantCommandTopicsForSlat(
                    this.config,
                    this.zone.id,
                    this.device?.id,
                    this.dataPointType,
                )),
        };
    }

    override get homeAssistantEntityConfig(): Record<string, string | number | boolean> {
        const stateTopicFactory = new LitecomStatePrefixedMqttTopicFactory(this.config, this.zone.id, this.device?.id);
        return {
            name: 'Cover',

            ...(this.hasBlinds && {
                position_closed: 100,
                position_open: 0,
                payload_open: Litecom.putMotorService.command.OPEN,
                payload_close: Litecom.putMotorService.command.CLOSE,
                payload_stop: Litecom.putMotorService.command.STOP,
                position_topic: stateTopicFactory.topicServiceWithValue('blind', 'position'),
            }),

            ...(this.hasSlats && {
                tilt_command_template: '{{ 100 - tilt_position }}',
                tilt_status_template: '{{ 100 - value }}',
                tilt_status_topic: stateTopicFactory.topicServiceWithValue('slat', 'position'),
            }),
        };
    }
}
