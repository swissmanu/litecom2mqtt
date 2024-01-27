import { z } from 'zod';
import { putMotorService, type BlindsServiceService, type SlatsServiceService } from '../litecom/restClient/index.js';
import { Logger } from '../util/logger.js';

export interface LitecomBlindsServiceAdapter {
    putBlindServiceByZone: (typeof BlindsServiceService)['putBlindServiceByZone'];
    putBlindsServiceByZoneAndDevice: (typeof BlindsServiceService)['putBlindServiceByZoneAndDevice'];
}
export interface LitecomSlatsServiceAdapter {
    putSlatServiceByZone: (typeof SlatsServiceService)['putSlatServiceByZone'];
    putSlatServiceByZoneAndDevice: (typeof SlatsServiceService)['putSlatServiceByZoneAndDevice'];
}

export const CoverCommand = z.discriminatedUnion('command', [
    z.object({
        command: z.literal('move-blind'),
        payload: z.union([z.literal('OPEN'), z.literal('CLOSE'), z.literal('STOP')]),
    }),
    z.object({
        command: z.literal('position-blind'),
        payload: z.coerce.number().min(0).max(100),
    }),
    z.object({
        command: z.literal('position-slat'),
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

    async handleZoneCommand(zoneId: string, { command, payload }: CoverCommand): Promise<void> {
        switch (command) {
            case 'move-blind':
                await this.blindsLitecomAdapter.putBlindServiceByZone(zoneId, {
                    command: payload as putMotorService.command, // cast should be fine. HomeAssistantCoverEntity announces this enums' values to Home Assistant as payloads
                });
                break;
            case 'position-blind':
                await this.blindsLitecomAdapter.putBlindServiceByZone(zoneId, {
                    command: putMotorService.command.SET_POSITION,
                    position: payload,
                });
                break;
            case 'position-slat':
                await this.slatsLitecomAdapter.putSlatServiceByZone(zoneId, {
                    command: putMotorService.command.SET_POSITION,
                    position: payload,
                });
                break;
        }
    }

    async handleDeviceCommand(zoneId: string, deviceId: string, { command, payload }: CoverCommand): Promise<void> {
        switch (command) {
            case 'move-blind':
                await this.blindsLitecomAdapter.putBlindsServiceByZoneAndDevice(zoneId, deviceId, {
                    command: payload as putMotorService.command, // cast should be fine. HomeAssistantCoverEntity announces this enums' values to Home Assistant as payloads
                });
                break;
            case 'position-blind':
                await this.blindsLitecomAdapter.putBlindsServiceByZoneAndDevice(zoneId, deviceId, {
                    command: putMotorService.command.SET_POSITION,
                    position: payload,
                });
                break;
            case 'position-slat':
                await this.slatsLitecomAdapter.putSlatServiceByZoneAndDevice(zoneId, deviceId, {
                    command: putMotorService.command.SET_POSITION,
                    position: payload,
                });
                break;
        }
    }
}
