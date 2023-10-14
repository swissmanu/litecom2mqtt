import { z } from "https://deno.land/x/zod/mod.ts";

const envSchema = z.object({
  LITECOM_HOST: z.string(),
  LITECOM_CONSUMER_NAME: z.string(),
  LITECOM_CONSUMER_API_TOKEN: z.string(),
  HOMEASSISTANT_MQTT_DISCOVERY_PREFIX: z.string(),
  MQTT_BROKER_URL: z.string(),
});

const result = envSchema.safeParse(Deno.env.toObject());
if (!result.success) {
  throw new Error(`Invalid Configuration. ${result.error}`);
}
export const config = result.data;
