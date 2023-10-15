import { Client } from "https://deno.land/x/mqtt/deno/mod.ts";
import { config } from "./config.ts";
import { LightingServiceService } from "./restClient/index.ts";
import { log } from "./util/logger.ts";

export async function createMqttClient() {
  const decoder = new TextDecoder();
  const client = new Client({
    url: config.MQTT_BROKER_URL,
  });
  await client.connect();

  client.on("message", (topic: string, payloadBuffer: BufferSource) => {
    const payload = decoder.decode(payloadBuffer);

    // PREFIX/zones/ZONE_ID/SERVICE_TYPE/COMMAND_TOPIC
    // litecom2mqtt/zones/ZONE_ID/SERVICE_TYPE/COMMAND_TOPIC
    // litecom2mqtt/zones/ZONE_ID/lightning/set

    const match = topic.match(/^litecom2mqtt\/zones\/(.*)\/(.*)\/(.*)$/);
    if (match) {
      const [, zoneId, serviceType, command] = match;
      switch (serviceType) {
        case "lightning":
          handleLightningService(zoneId, command, payload);
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

function handleLightningService(
  zoneId: string,
  command: string,
  payload: string,
) {
  switch (command) {
    case "set":
      log.debug(`Turn zone "${zoneId}" ${payload}`);
      LightingServiceService.putLightingServiceByZone(zoneId, {
        intensity: payload === "ON" ? 100 : 0,
      });
      break;
    case "brightness": {
      const intensity = Number.parseInt(payload, 10);
      log.debug(`Set brigthness for zone "${zoneId}" to ${intensity}`);
      LightingServiceService.putLightingServiceByZone(zoneId, {
        intensity,
      });
      break;
    }
  }
}
