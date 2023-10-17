import { z } from "https://deno.land/x/zod/mod.ts";

const Config = z.object({
  LITECOM_HOST: z.string(),
  LITECOM_CONSUMER_NAME: z.string(),
  LITECOM_CONSUMER_API_TOKEN: z.string(),
  HOMEASSISTANT_MQTT_DISCOVERY_PREFIX: z.string().default("homeassistant"),
  MQTT_BROKER_URL: z.string(),
  MQTT_LITECOM_STATE_TOPIC_PREFIX: z.string().default("litecom"),
  MQTT_TOPIC_PREFIX: z.string().default("litecom2mqtt"),
  LOG_LEVEL: z.union([
    z.literal("NOTSET"),
    z.literal("DEBUG"),
    z.literal("INFO"),
    z.literal("WARNING"),
    z.literal("ERROR"),
    z.literal("CRITICAL"),
  ]).default("ERROR"),
});
export type Config = z.infer<typeof Config>;

const result = Config.safeParse(Deno.env.toObject());
if (!result.success) {
  throw new Error(`Invalid Configuration. ${result.error}`);
}
export const config = result.data;
