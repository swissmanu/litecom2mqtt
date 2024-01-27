import { z } from 'zod';
import { Scene } from '../litecom/interrogateLitecomSystem.js';
import type { SceneServiceService } from '../litecom/restClient/index.js';
import { Config } from '../util/config.js';
import { Logger } from '../util/logger.js';
import { HomeAssistantCommandMqttTopicFactory } from './commandMqttTopicFactory.js';
import { DataPointType } from './devices/homeAssistantEntity.js';

export interface LitecomSceneServiceAdapter {
    putSceneServiceByZone: (typeof SceneServiceService)['putSceneServiceByZone'];
    putSceneServiceByZoneAndDevice: (typeof SceneServiceService)['putSceneServiceByZoneAndDevice'];
}

const ACTIVATE_COMMAND = 'activate';

export const SceneCommand = z.discriminatedUnion('command', [
    z.object({
        command: z.literal(ACTIVATE_COMMAND),
        payload: z.string(),
    }),
]);
type SceneCommand = z.infer<typeof SceneCommand>;

export class SceneServiceMQTTHandler {
    constructor(
        private readonly litecomAdapter: LitecomSceneServiceAdapter,
        private readonly scenesByZoneOrDeviceId: ReadonlyMap<string, ReadonlyArray<Scene>>,
        private readonly log: Logger,
    ) {}

    public static createHomeAssistantCommandTopics(
        config: Config,
        zoneId: string,
        deviceId: string | undefined,
        dataPointType: DataPointType,
    ) {
        const factory = new HomeAssistantCommandMqttTopicFactory(config, zoneId, deviceId, dataPointType);
        return {
            command_topic: factory.topicForCommand(ACTIVATE_COMMAND),
        };
    }

    async handleZoneCommand(zoneId: string, { command, payload }: SceneCommand): Promise<void> {
        switch (command) {
            case ACTIVATE_COMMAND: {
                const scenes = this.scenesByZoneOrDeviceId.get(zoneId);
                if (!scenes) {
                    this.log.error(`Could not find scenes for zone "${zoneId}"`);
                } else {
                    const scene = scenes.find((s) => s.name === payload);
                    if (!scene) {
                        this.log.error(`Could not find scene "${payload}" for zone "${zoneId}"`);
                    } else {
                        this.log.debug(`Activate scene "${payload}" (${scene.id}) in zone "${zoneId}"`);
                        await this.litecomAdapter.putSceneServiceByZone(zoneId, {
                            activeScene: scene.id,
                        });
                    }
                }

                break;
            }
        }
    }

    async handleDeviceCommand(zoneId: string, deviceId: string, { command, payload }: SceneCommand): Promise<void> {
        switch (command) {
            case ACTIVATE_COMMAND: {
                const scenes = this.scenesByZoneOrDeviceId.get(deviceId);
                if (!scenes) {
                    this.log.error(`Could not find scenes for device "${deviceId}"`);
                } else {
                    const scene = scenes.find((s) => s.name === payload);
                    if (!scene) {
                        this.log.error(`Could not find scene "${payload}" for device "${deviceId}"`);
                    } else {
                        this.log.debug(`Activate scene "${payload}" for device "${deviceId}" in zone "${zoneId}"`);
                        await this.litecomAdapter.putSceneServiceByZoneAndDevice(zoneId, deviceId, {
                            activeScene: scene.id,
                        });
                    }
                }

                break;
            }
        }
    }
}
