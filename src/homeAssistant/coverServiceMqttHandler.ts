import { z } from 'zod';
import { putMotorService, type BlindsServiceService, type SlatsServiceService } from '../litecom/restClient/index.js';
import { Config } from '../util/config.js';
import { Logger } from '../util/logger.js';
import { HomeAssistantCommandMqttTopicFactory } from './commandMqttTopicFactory.js';
import { DataPointType } from './devices/homeAssistantEntity.js';

export interface LitecomBlindsServiceAdapter {
    putBlindServiceByZone: (typeof BlindsServiceService)['putBlindServiceByZone'];
    putBlindsServiceByZoneAndDevice: (typeof BlindsServiceService)['putBlindServiceByZoneAndDevice'];
}
export interface LitecomSlatsServiceAdapter {
    putSlatServiceByZone: (typeof SlatsServiceService)['putSlatServiceByZone'];
    putSlatServiceByZoneAndDevice: (typeof SlatsServiceService)['putSlatServiceByZoneAndDevice'];
}

const MOVE_BLIND_COMMAND = 'move-blind';
const POSITION_BLIND_COMMAND = 'position-blind';
const POSITION_SLAT_COMMAND = 'position-slat';

export const CoverCommand = z.discriminatedUnion('command', [
    z.object({
        command: z.literal(MOVE_BLIND_COMMAND),
        payload: z.union([z.literal('OPEN'), z.literal('CLOSE'), z.literal('STOP')]),
    }),
    z.object({
        command: z.literal(POSITION_BLIND_COMMAND),
        payload: z.coerce.number().min(0).max(100),
    }),
    z.object({
        command: z.literal(POSITION_SLAT_COMMAND),
        payload: z.coerce.number().min(0).max(100),
    }),
]);
type CoverCommand = z.infer<typeof CoverCommand>;

export class CoverServiceMQTTHandler {
    constructor(
        private readonly blindsLitecomAdapter: LitecomBlindsServiceAdapter,
        private readonly slatsLitecomAdapter: LitecomSlatsServiceAdapter,
        private readonly log: Logger,
    ) {}

    public static createHomeAssistantCommandTopicsForBlind(
        config: Config,
        zoneId: string,
        deviceId: string | undefined,
        dataPointType: DataPointType,
    ) {
        const factory = new HomeAssistantCommandMqttTopicFactory(config, zoneId, deviceId, dataPointType);
        return {
            command_topic: factory.topicForCommand(MOVE_BLIND_COMMAND),
            set_position_topic: factory.topicForCommand(POSITION_BLIND_COMMAND),
        };
    }

    public static createHomeAssistantCommandTopicsForSlat(
        config: Config,
        zoneId: string,
        deviceId: string | undefined,
        dataPointType: DataPointType,
    ) {
        const factory = new HomeAssistantCommandMqttTopicFactory(config, zoneId, deviceId, dataPointType);
        return {
            tilt_command_topic: factory.topicForCommand(POSITION_SLAT_COMMAND),
        };
    }

    async handleZoneCommand(zoneId: string, { command, payload }: CoverCommand): Promise<void> {
        switch (command) {
            case MOVE_BLIND_COMMAND:
                await this.blindsLitecomAdapter.putBlindServiceByZone(zoneId, {
                    command: payload as putMotorService.command, // cast should be fine. HomeAssistantCoverEntity announces this enums' values to Home Assistant as payloads
                });
                break;
            case POSITION_BLIND_COMMAND:
                await this.blindsLitecomAdapter.putBlindServiceByZone(zoneId, {
                    command: putMotorService.command.SET_POSITION,
                    position: payload,
                });
                break;
            case POSITION_SLAT_COMMAND:
                await this.slatsLitecomAdapter.putSlatServiceByZone(zoneId, {
                    command: putMotorService.command.SET_POSITION,
                    position: payload,
                });
                break;
        }
    }

    async handleDeviceCommand(zoneId: string, deviceId: string, { command, payload }: CoverCommand): Promise<void> {
        switch (command) {
            case MOVE_BLIND_COMMAND:
                await this.blindsLitecomAdapter.putBlindsServiceByZoneAndDevice(zoneId, deviceId, {
                    command: payload as putMotorService.command, // cast should be fine. HomeAssistantCoverEntity announces this enums' values to Home Assistant as payloads
                });
                break;
            case POSITION_BLIND_COMMAND:
                await this.blindsLitecomAdapter.putBlindsServiceByZoneAndDevice(zoneId, deviceId, {
                    command: putMotorService.command.SET_POSITION,
                    position: payload,
                });
                break;
            case POSITION_SLAT_COMMAND:
                await this.slatsLitecomAdapter.putSlatServiceByZoneAndDevice(zoneId, deviceId, {
                    command: putMotorService.command.SET_POSITION,
                    position: payload,
                });
                break;
        }
    }
}
