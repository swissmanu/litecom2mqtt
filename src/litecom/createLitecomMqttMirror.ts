import { Client } from "https://deno.land/x/mqtt@0.1.2/deno/mod.ts";
import { MqttClient } from "../homeAssistant/mqttClient.ts";
import { config } from "../util/config.ts";
import { log } from "../util/logger.ts";

export async function createLitecomMqttMirror(
  target: MqttClient,
  subscriptionTopic = "zones/#",
  topicFilterPrefix = "zones/",
) {
  log.debug("Set up Litecom MQTT Mirror");

  const litecomMqttClient = new Client({
    url: `mqtts://${config.LITECOM_HOST}:8883`,
    username: config.LITECOM_CONSUMER_NAME,
    password: config.LITECOM_CONSUMER_API_TOKEN,
  });

  litecomMqttClient.on("message", (topic: string, payload: BufferSource) => {
    if (topic.startsWith(topicFilterPrefix)) {
      log.debug(`Mirror "${topic}"`);
      target.publish(`litecom/${topic}`, payload);
    }
  });
  await litecomMqttClient.connect();
  litecomMqttClient.subscribe(subscriptionTopic);
}
