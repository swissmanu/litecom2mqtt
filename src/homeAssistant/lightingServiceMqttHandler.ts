import type { LightingServiceService } from "../litecom/restClient/index.ts";
import { Logger } from "../util/logger.ts";

export interface LitecomLightingServiceAdapter {
  putLightingServiceByZone:
    typeof LightingServiceService["putLightingServiceByZone"];
  putLightingServiceByZoneAndDevice:
    typeof LightingServiceService["putLightingServiceByZoneAndDevice"];
}

export type LightingCommand = SetCommand | BrightnessCommand;
type SetCommand = {
  command: "set";
  payload: "ON" | "OFF";
};
type BrightnessCommand = {
  command: "brightness";
  payload: number;
};

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
