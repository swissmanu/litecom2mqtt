import { Client } from "https://deno.land/x/mqtt/deno/mod.ts";
import { config } from "../util/config.ts";
import { LightingServiceService } from "../litecom/restClient/index.ts";
import { log } from "../util/logger.ts";

export async function createMqttClient() {
  const decoder = new TextDecoder();
  const client = new Client({
    url: config.MQTT_BROKER_URL,
  });
  await client.connect();

  client.on("message", (topic: string, payloadBuffer: BufferSource) => {
    const payload = decoder.decode(payloadBuffer);

    // PREFIX/ZONE_ID/devices/DEVICE_ID/SERVICE_TYPE/COMMAND_TOPIC
    // litecom2mqtt/ZONE_ID/devices/DEVICE_ID/SERVICE_TYPE/COMMAND_TOPIC
    // litecom2mqtt/ZONE_ID/devices/DEVICE_ID/lighting/set

    const match = topic.match(
      /^litecom2mqtt\/(.*)\/devices\/(.*)\/(.*)\/(.*)$/,
    );
    if (match) {
      const [, zoneId, deviceId, serviceType, command] = match;
      switch (serviceType) {
        case "lighting":
          handlelightingService(zoneId, command, payload, deviceId);
          break;
        default:
          log.warning(`Cannot handle unknown serviceType "${serviceType}"`, {
            zoneId,
            deviceId,
            serviceType,
            command,
            payload,
          });
      }
    }

    // PREFIX/ZONE_ID/SERVICE_TYPE/COMMAND_TOPIC
    // litecom2mqtt/ZONE_ID/SERVICE_TYPE/COMMAND_TOPIC
    // litecom2mqtt/ZONE_ID/lighting/set
    const match1 = topic.match(/^litecom2mqtt\/(.*)\/(.*)\/(.*)$/);
    if (match1) {
      const [, zoneId, serviceType, command] = match1;
      switch (serviceType) {
        case "lighting":
          handlelightingService(zoneId, command, payload);
          break;
        default:
          log.warning(`Cannot handle unknown serviceType "${serviceType}"`, {
            zoneId,
            serviceType,
            command,
            payload,
          });
      }
    }
  });

  return client;
}

function handlelightingService(
  zoneId: string,
  command: string,
  payload: string,
  deviceId?: string,
) {
  switch (command) {
    case "set":
      log.debug(`Turn device "${deviceId}" ${payload}`);
      if (deviceId) {
        LightingServiceService.putLightingServiceByZoneAndDevice(
          zoneId,
          deviceId,
          {
            intensity: payload === "ON" ? 100 : 0,
          },
        );
      } else {
        LightingServiceService.putLightingServiceByZone(
          zoneId,
          {
            intensity: payload === "ON" ? 100 : 0,
          },
        );
      }

      break;
    case "brightness": {
      const intensity = Number.parseInt(payload, 10);
      log.debug(`Set brigthness for device "${deviceId}" to ${intensity}`);

      if (deviceId) {
        LightingServiceService.putLightingServiceByZoneAndDevice(
          zoneId,
          deviceId,
          {
            intensity,
          },
        );
      } else {
        LightingServiceService.putLightingServiceByZone(
          zoneId,
          {
            intensity,
          },
        );
      }

      break;
    }
  }
}
