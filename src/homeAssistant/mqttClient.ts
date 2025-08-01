import { MqttClient } from 'mqtt';
import { Config } from '../util/config.js';
import { createAsyncDisposable } from '../util/createDisposable.js';
import { log, Logger } from '../util/logger.js';
import { CoverCommand, CoverServiceMQTTHandler } from './coverServiceMqttHandler.js';
import {
    HomeAssistantAnnouncement,
    HomeAssistantDevice,
    HomeAssistantDeviceAnnouncer,
} from './devices/homeAssistantDevice.js';
import { LightingCommand, LightingServiceMQTTHandler } from './lightingServiceMqttHandler.js';
import { SceneCommand, SceneServiceMQTTHandler } from './sceneServiceMqttHandler.js';

export class HomeAssistantMqttClient implements HomeAssistantDeviceAnnouncer {
    constructor(
        private readonly config: Config,
        private readonly client: MqttClient,
        private readonly lightingHandler: LightingServiceMQTTHandler,
        private readonly sceneHandler: SceneServiceMQTTHandler,
        private readonly coverHandler: CoverServiceMQTTHandler,
        private readonly log: Logger,
    ) {
        const decoder = new TextDecoder();

        // PREFIX/ZONE_ID/ZONE_ID/devices/DEVICE_ID/DATA_POINT_TYPE/COMMAND_TOPIC
        const deviceTopicRegex = new RegExp(`^${config.LITECOM2MQTT_MQTT_TOPIC_PREFIX}/(.*)/devices/(.*)/(.*)/(.*)$`);

        // PREFIX/ZONE_ID/DATA_POINT_TYPE/COMMAND_TOPIC
        const zoneTopicRegex = new RegExp(`^${config.LITECOM2MQTT_MQTT_TOPIC_PREFIX}/(.*)/(.*)/(.*)$`);

        this.client.on('message', (topic: string, payloadBuffer: Buffer) => {
            const match = topic.match(deviceTopicRegex);
            const payload = decoder.decode(payloadBuffer);

            if (match) {
                const [, zoneId, deviceId, dataPointType, command] = match;
                switch (dataPointType) {
                    case 'lighting':
                        this.lightingHandler.handleDeviceCommand(
                            zoneId,
                            deviceId,
                            LightingCommand.parse({ command, payload }),
                        );
                        break;
                    case 'activeScene':
                        this.sceneHandler.handleDeviceCommand(
                            zoneId,
                            deviceId,
                            SceneCommand.parse({ command, payload }),
                        );
                        break;
                    case 'cover':
                        this.coverHandler.handleDeviceCommand(
                            zoneId,
                            deviceId,
                            CoverCommand.parse({ command, payload }),
                        );
                        break;
                    default:
                        this.log.warning(`Cannot handle unknown datapoint type "${dataPointType}"`, {
                            zoneId,
                            deviceId,
                            serviceType: dataPointType,
                            command,
                            payload,
                        });
                }
                return;
            }

            const match1 = topic.match(zoneTopicRegex);
            if (match1) {
                const [, zoneId, dataPointType, command] = match1;
                switch (dataPointType) {
                    case 'lighting':
                        this.lightingHandler.handleZoneCommand(
                            zoneId,
                            LightingCommand.parse({
                                command,
                                payload,
                            }),
                        );
                        break;
                    case 'activeScene':
                        this.sceneHandler.handleZoneCommand(
                            zoneId,
                            SceneCommand.parse({
                                command,
                                payload,
                            }),
                        );
                        break;
                    case 'cover':
                        this.coverHandler.handleZoneCommand(zoneId, CoverCommand.parse({ command, payload }));
                        break;
                    default:
                        this.log.warning(`Cannot handle unknown datapoint type "${dataPointType}"`, {
                            zoneId,
                            serviceType: dataPointType,
                            command,
                            payload,
                        });
                }
                return;
            }
        });
    }

    async publish(topic: string, payload: Buffer | string, options?: { retain?: boolean }): Promise<void> {
        if (this.client) {
            await this.client.publishAsync(topic, payload, options);
        } else {
            log.warning('Mqtt client is not initialized. Call init() before publish().');
        }
    }

    async subscribe(topic: string): Promise<AsyncDisposable> {
        if (this.client) {
            await this.client.subscribeAsync(topic);
            return createAsyncDisposable(async () => {
                await this.client?.unsubscribeAsync(topic);
            });
        }

        log.warning('Mqtt client is not initialized. Call init() before subscribe().');
        return createAsyncDisposable(() => Promise.resolve());
    }

    async announce(discoveryTopic: string, announcement: HomeAssistantAnnouncement) {
        this.log.debug(
            `Announce${this.config.LITECOM2MQTT_HOMEASSISTANT_RETAIN_ANNOUNCEMENTS ? ' retained ' : ' '}${discoveryTopic}`,
            {
                discoveryTopic,
                announcement,
                retain: this.config.LITECOM2MQTT_HOMEASSISTANT_RETAIN_ANNOUNCEMENTS,
            },
        );
        await this.publish(discoveryTopic, JSON.stringify(announcement), {
            retain: this.config.LITECOM2MQTT_HOMEASSISTANT_RETAIN_ANNOUNCEMENTS,
        });
    }

    async subscribeToHomeAssistantDeviceCommandTopics(device: HomeAssistantDevice) {
        for (const entity of device.entities) {
            for (const topic of Object.values(entity.homeAssistantCommandTopics)) {
                log.debug(`Subscribe ${topic}`);
                await this.subscribe(topic);
            }
        }
    }
}
