import { z } from "../deps.ts";

const Config = z.object({
  LITECOM2MQTT_LOG_LEVEL: z.union([
    z.literal("NOTSET"),
    z.literal("DEBUG"),
    z.literal("INFO"),
    z.literal("WARNING"),
    z.literal("ERROR"),
    z.literal("CRITICAL"),
  ]).default("ERROR"),
  LITECOM2MQTT_MQTT_BROKER_URL: z.string(),
  LITECOM2MQTT_MQTT_TOPIC_PREFIX: z.string().default("litecom2mqtt"),
  LITECOM2MQTT_LITECOM_HOST: z.string(),
  LITECOM2MQTT_LITECOM_CONSUMER_NAME: z.string(),
  LITECOM2MQTT_LITECOM_CONSUMER_API_TOKEN: z.string(),
  LITECOM2MQTT_LITECOM_STATE_MQTT_TOPIC_PREFIX: z.string().default("litecom"),
  LITECOM2MQTT_HOMEASSISTANT_DISCOVERY_MQTT_TOPIC_PREFIX: z.string().default(
    "homeassistant",
  ),
  LITECOM2MQTT_HOMEASSISTANT_ANNOUNCE_DEVICES: z.string().optional().transform(stringToBoolean),
  LITECOM2MQTT_HOMEASSISTANT_ANNOUNCE_GROUPS: z.string().optional().transform(stringToBoolean),
  LITECOM2MQTT_HOMEASSISTANT_ANNOUNCE_ROOMS: z.string().optional().transform(stringToBoolean),
  LITECOM2MQTT_HOMEASSISTANT_ANNOUNCE_ZONES: z.string().optional().transform(stringToBoolean),
});
export type Config = z.infer<typeof Config>;

function stringToBoolean(x: string | undefined): boolean {
  return x === "true";
}

const result = Config.safeParse(Deno.env.toObject());
if (!result.success) {
  throw new Error(`Invalid Configuration. ${result.error}`);
}
export const config = result.data;
