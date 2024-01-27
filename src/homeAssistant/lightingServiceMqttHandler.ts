import { z } from 'zod';
import type { LightingServiceService } from '../litecom/restClient/index.js';
import { Config } from '../util/config.js';
import { Logger } from '../util/logger.js';
import { HomeAssistantCommandMqttTopicFactory } from './commandMqttTopicFactory.js';
import { DataPointType } from './devices/homeAssistantEntity.js';

const SET_COMMAND = 'set';
const BRIGHTNESS_COMMAND = 'brightness';

export interface LitecomLightingServiceAdapter {
    putLightingServiceByZone: (typeof LightingServiceService)['putLightingServiceByZone'];
    putLightingServiceByZoneAndDevice: (typeof LightingServiceService)['putLightingServiceByZoneAndDevice'];
}

export const LightingCommand = z.discriminatedUnion('command', [
    z.object({
        command: z.literal(SET_COMMAND),
        payload: z.union([z.literal('ON'), z.literal('OFF')]),
    }),
    z.object({
        command: z.literal(BRIGHTNESS_COMMAND),
        payload: z.string().transform((v) => Number.parseInt(v, 10)),
    }),
]);
type LightingCommand = z.infer<typeof LightingCommand>;

export class LightingServiceMQTTHandler {
    constructor(
        private readonly litecomAdapter: LitecomLightingServiceAdapter,
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
            command_topic: factory.topicForCommand(SET_COMMAND),
            brightness_command_topic: factory.topicForCommand(BRIGHTNESS_COMMAND),
        };
    }

    async handleZoneCommand(zoneId: string, { command, payload }: LightingCommand): Promise<void> {
        switch (command) {
            case SET_COMMAND:
                this.log.debug(`Turn zone "${zoneId}" ${payload}`);
                await this.litecomAdapter.putLightingServiceByZone(zoneId, {
                    intensity: payload === 'ON' ? 100 : 0,
                });
                break;
            case BRIGHTNESS_COMMAND: {
                this.log.debug(`Set brigthness for zone "${zoneId}" to ${payload}`);

                await this.litecomAdapter.putLightingServiceByZone(zoneId, {
                    intensity: payload,
                });

                break;
            }
        }
    }

    async handleDeviceCommand(zoneId: string, deviceId: string, { command, payload }: LightingCommand): Promise<void> {
        switch (command) {
            case SET_COMMAND:
                this.log.debug(`Turn device "${deviceId}" ${payload}`);
                await this.litecomAdapter.putLightingServiceByZoneAndDevice(zoneId, deviceId, {
                    intensity: payload === 'ON' ? 100 : 0,
                });
                break;
            case BRIGHTNESS_COMMAND: {
                this.log.debug(`Set brigthness for device "${deviceId}" to ${payload}`);

                await this.litecomAdapter.putLightingServiceByZoneAndDevice(zoneId, deviceId, {
                    intensity: payload,
                });
                break;
            }
        }
    }
}
