import { z } from "../deps.ts";
import type { LightingServiceService } from "../litecom/restClient/index.ts";
import { Logger } from "../util/logger.ts";

export interface LitecomLightingServiceAdapter {
  putLightingServiceByZone: typeof LightingServiceService["putLightingServiceByZone"];
  putLightingServiceByZoneAndDevice: typeof LightingServiceService["putLightingServiceByZoneAndDevice"];
}

export const LightingCommand = z.discriminatedUnion(
  "command",
  [
    z.object({
      command: z.literal("set"),
      payload: z.union([z.literal("ON"), z.literal("OFF")]),
    }),
    z.object({
      command: z.literal("brightness"),
      payload: z.string().transform((v) => Number.parseInt(v, 10)),
    }),
  ],
);
type LightingCommand = z.infer<typeof LightingCommand>;

export class LightingServiceMQTTHandler {
  constructor(
    private readonly litecomAdapter: LitecomLightingServiceAdapter,
    private readonly log: Logger,
  ) {}

  async handleZoneCommand(
    zoneId: string,
    { command, payload }: LightingCommand,
  ): Promise<void> {
    switch (command) {
      case "set":
        this.log.debug(`Turn zone "${zoneId}" ${payload}`);
        await this.litecomAdapter.putLightingServiceByZone(
          zoneId,
          {
            intensity: payload === "ON" ? 100 : 0,
          },
        );
        break;
      case "brightness": {
        this.log.debug(`Set brigthness for zone "${zoneId}" to ${payload}`);

        await this.litecomAdapter.putLightingServiceByZone(
          zoneId,
          {
            intensity: payload,
          },
        );

        break;
      }
    }
  }

  async handleDeviceCommand(
    zoneId: string,
    deviceId: string,
    { command, payload }: LightingCommand,
  ): Promise<void> {
    switch (command) {
      case "set":
        this.log.debug(`Turn device "${deviceId}" ${payload}`);
        await this.litecomAdapter.putLightingServiceByZoneAndDevice(
          zoneId,
          deviceId,
          {
            intensity: payload === "ON" ? 100 : 0,
          },
        );
        break;
      case "brightness": {
        this.log.debug(
          `Set brigthness for device "${deviceId}" to ${payload}`,
        );

        await this.litecomAdapter.putLightingServiceByZoneAndDevice(
          zoneId,
          deviceId,
          {
            intensity: payload,
          },
        );
        break;
      }
    }
  }
}
