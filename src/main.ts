import { LightEntity } from "./homeAssistant/lightEntity.ts";
import { createMqttClient } from "./createMqttClient.ts";
import { getZones } from "./getZones.ts";

const mqttClient = await createMqttClient();
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
