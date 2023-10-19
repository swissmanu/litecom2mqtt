import { LightEntity } from "./homeAssistant/entities/lightEntity.ts";
import { LightingServiceMQTTHandler } from "./homeAssistant/lightingServiceMqttHandler.ts";
import { MqttClient } from "./homeAssistant/mqttClient.ts";
import { createLitecomMqttMirror } from "./litecom/createLitecomMqttMirror.ts";
import { interrogateLitecomSystem } from "./litecom/interrogateLitecomSystem.ts";
import * as Litecom from "./litecom/restClient/index.ts";
import { config } from "./util/config.ts";
import { getAllParentsForZone } from "./util/getAllParentNamesForZone.ts";
import { log } from "./util/logger.ts";

const mqttClient = new MqttClient(
  new LightingServiceMQTTHandler({
    putLightingServiceByZone: Litecom.LightingServiceService.putLightingServiceByZone,
    putLightingServiceByZoneAndDevice: Litecom.LightingServiceService.putLightingServiceByZoneAndDevice,
  }, log),
  log,
);
await mqttClient.init(config);

await createLitecomMqttMirror(mqttClient);

const { zones, groups, rooms, devices, zoneIdsByDeviceId, zoneById } = await interrogateLitecomSystem(config);

for (
  const zone of [
    ...(config.LITECOM2MQTT_HOMEASSISTANT_ANNOUNCE_ZONES ? zones : []),
    ...(config.LITECOM2MQTT_HOMEASSISTANT_ANNOUNCE_GROUPS ? groups : []),
    ...(config.LITECOM2MQTT_HOMEASSISTANT_ANNOUNCE_ROOMS ? rooms : []),
  ]
) {
  if (zone.lighting) {
    const parentZones = getAllParentsForZone(zone, zoneById);
    const entity = new LightEntity(mqttClient, zone.zone, parentZones);
    await entity.announce();
  }
}

for (const { device } of devices) {
  const zoneIds = zoneIdsByDeviceId.get(device.id);
  if (zoneIds && zoneIds.length > 0) {
    const zone = zoneById.get(zoneIds[0]);
    if (zone) {
      const parentZones = getAllParentsForZone(zone, zoneById);
      const entity = new LightEntity(mqttClient, zone.zone, parentZones, device);
      await entity.announce();
    }
  } else {
    log.warning(`No zone identifiers found for device "${device.name}"`);
  }
}
