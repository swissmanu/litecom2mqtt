import { LightEntity } from "./homeAssistant/entities/lightEntity.ts";
import { LightingServiceMQTTHandler } from "./homeAssistant/lightingServiceMqttHandler.ts";
import { MqttClient } from "./homeAssistant/mqttClient.ts";
import { createLitecomMqttMirror } from "./litecom/createLitecomMqttMirror.ts";
import { interrogateLitecomSystem } from "./litecom/interrogateLitecomSystem.ts";
import { LightingServiceService } from "./litecom/restClient/index.ts";
import { config } from "./util/config.ts";
import { log } from "./util/logger.ts";

const mqttClient = new MqttClient(
  new LightingServiceMQTTHandler({
    putLightingServiceByZone: LightingServiceService.putLightingServiceByZone,
    putLightingServiceByZoneAndDevice: LightingServiceService.putLightingServiceByZoneAndDevice,
  }, log),
  log,
);
await mqttClient.init(config);

await createLitecomMqttMirror(mqttClient);

const { groups, devices, zoneIdsByDeviceId, zoneById } = await interrogateLitecomSystem(config);

for (const { zone } of groups) {
  if (
    // zone.name === "Pendel Essen" ||
    // zone.name === "Profil Wohnen" ||
    zone.id === "1b459fde-2354-460d-bc28-3cd1df47c0ed" // Profil Büro
  ) {
    const entity = new LightEntity(mqttClient, zone);
    await entity.announce();
  }
}

for (const { device } of devices) {
  if (device.id === "ca672328-6263-4b3f-a510-fd8bc620afd9") { // Profil Büro LED Strip
    const zoneIds = zoneIdsByDeviceId.get(device.id);
    if (zoneIds && zoneIds.length > 0) {
      const zone = zoneById.get(zoneIds[0]);
      if (zone) {
        const entity = new LightEntity(mqttClient, zone, device);
        await entity.announce();
      }
    }
  }
}
