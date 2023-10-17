import { createMqttClient } from "./homeAssistant/createMqttClient.ts";
import { LightEntity } from "./homeAssistant/entities/lightEntity.ts";
import { createLitecomMqttMirror } from "./litecom/createLitecomMqttMirror.ts";
import { getZonesAndDevices } from "./litecom/getZonesAndDevices.ts";

const mqttClient = await createMqttClient();
await createLitecomMqttMirror(mqttClient);
const { knownZones, knownDevices, zoneIdsByDeviceId } =
  await getZonesAndDevices();

for (const { zone } of knownZones) {
  if (
    // zone.name === "Pendel Essen" ||
    // zone.name === "Profil Wohnen" ||
    zone.id === "1b459fde-2354-460d-bc28-3cd1df47c0ed" // Profil Büro
  ) {
    const entity = new LightEntity(mqttClient, zone);
    await entity.announce();
  }
}

for (const { device } of knownDevices) {
  if (device.id === "ca672328-6263-4b3f-a510-fd8bc620afd9") { // Profil Büro LED Strip
    const zoneIds = zoneIdsByDeviceId.get(device.id);
    if (zoneIds && zoneIds.length > 0) {
      const zone = knownZones.find(({ zone: { id } }) => id === zoneIds[0]);
      if (zone) {
        const entity = new LightEntity(mqttClient, zone.zone, device);
        await entity.announce();
      }
    }
  }
}
