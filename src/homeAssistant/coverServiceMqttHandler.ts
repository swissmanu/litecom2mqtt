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
        command: z.literal('move'),
        payload: z.union([z.literal('OPEN'), z.literal('CLOSE'), z.literal('STOP')]),
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
            case 'move': {
                await this.blindsLitecomAdapter.putBlindServiceByZone(zoneId, {
                    command: payload as putMotorService.command, // cast should be fine. HomeAssistantCoverEntity announces this enums' values to Home Assistant as payloads
                });
            }
        }
    }

    async handleDeviceCommand(zoneId: string, deviceId: string, { command, payload }: CoverCommand): Promise<void> {
        switch (command) {
            case 'move': {
                await this.blindsLitecomAdapter.putBlindsServiceByZoneAndDevice(zoneId, deviceId, {
                    command: payload as putMotorService.command, // cast should be fine. HomeAssistantCoverEntity announces this enums' values to Home Assistant as payloads
                });
            }
        }
    }
}
