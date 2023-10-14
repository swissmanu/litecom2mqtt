import { Client } from "https://deno.land/x/mqtt/deno/mod.ts";
import { config } from "./config.ts";
import { LightingServiceService } from "./restClient/index.ts";

const decoder = new TextDecoder();

export const client = new Client({
  url: config.MQTT_BROKER_URL,
});
await client.connect();
client.on("message", (topic: string, payload: BufferSource) => {
  const text = decoder.decode(payload);

  // PREFIX/zones/ZONE_ID/SERVICE_TYPE/COMMAND_TOPIC
  // litecom2mqtt/zones/ZONE_ID/SERVICE_TYPE/COMMAND_TOPIC
  // litecom2mqtt/zones/ZONE_ID/lightning/set

  const match = topic.match(/litecom2mqtt\/zones\/(.*)\/(.*)\/(.*)/);
  if (match) {
    const [, zoneId, serviceType, command] = match;
    if (serviceType === "lightning") {
      switch (command) {
        case "set":
          LightingServiceService.putLightingServiceByZone(zoneId, {
            intensity: text === "ON" ? 100 : 0,
          });
          break;
        case "brightness": {
          const intensity = Number.parseInt(text, 10);
          LightingServiceService.putLightingServiceByZone(zoneId, {
            intensity,
          });
          break;
        }
      }
    }
  }
});
