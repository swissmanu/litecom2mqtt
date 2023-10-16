import { createMqttClient } from "./createMqttClient.ts";
import { getZones } from "./getZones.ts";
import { LightEntity } from "./homeAssistant/lightEntity.ts";
import { createLitecomMqttMirror } from "./litecomMqttMirror.ts";

const mqttClient = await createMqttClient();
await createLitecomMqttMirror(mqttClient);
const zones = await getZones();

for (const { zone } of zones) {
  if (
    zone.name === "Pendel Essen" ||
    zone.name === "Profil Wohnen"
  ) {
    const entity = new LightEntity(mqttClient, zone);
    await entity.announce();
  }
}
