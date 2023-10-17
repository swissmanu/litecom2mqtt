import { config } from "../util/config.ts";
import { Device, DevicesService, Identifiable, OpenAPI, Zone, ZonesService } from "./restClient/index.ts";
import { log } from "../util/logger.ts";

OpenAPI.BASE = `https://${config.LITECOM2MQTT_LITECOM_HOST}${OpenAPI.BASE}`;
OpenAPI.USERNAME = config.LITECOM2MQTT_LITECOM_CONSUMER_NAME;
OpenAPI.TOKEN = config.LITECOM2MQTT_LITECOM_CONSUMER_API_TOKEN;

type KnownZone = {
  zone: Zone;
  hasLights: boolean;
  hasBlinds: boolean;
  hasScenes: boolean;
};

type KnownDevice = {
  device: Device;
  hasLights: boolean;
};

export async function getZonesAndDevices() {
  const knownZones: KnownZone[] = [];
  const knownDevices: KnownDevice[] = [];
  const deviceIdsByZoneId = new Map<string, string[]>();
  const zoneIdsByDeviceId = new Map<string, string[]>();

  // const zones = await ZonesService.getZones();
  const zones = [
    await ZonesService.getZoneById("1b459fde-2354-460d-bc28-3cd1df47c0ed"),
  ];

  log.debug(`Fetched ${zones.length} zones`);

  for (const zone of zones) {
    const services = await ZonesService.getServicesByZone(zone.id);
    log.debug(
      `Fetched ${services.length} services for zone "${zone.name}" (${zone.id})`,
    );
    await delay();

    const knownZone: KnownZone = {
      zone,
      hasLights: services.findIndex((s) => s.type === Identifiable.type.LIGHTING) !== -1,
      hasBlinds: services.findIndex((s) => s.type === Identifiable.type.BLIND) !== -1,
      hasScenes: services.findIndex((s) => s.type === Identifiable.type.SCENE) !== -1,
    };
    knownZones.push(knownZone);

    const devices = await DevicesService.getDevicesByZone(zone.id);
    await delay();
    for (const device of devices) {
      const services = await DevicesService.getServicesByZoneAndDevice(
        zone.id,
        device.id,
      );
      await delay();
      knownDevices.push({
        device,
        hasLights: services.findIndex((s) => s.type === Identifiable.type.LIGHTING) !== -1,
      });

      deviceIdsByZoneId.set(zone.id, [
        ...(deviceIdsByZoneId.get(zone.id) ?? []),
        device.id,
      ]);
      zoneIdsByDeviceId.set(device.id, [
        ...(zoneIdsByDeviceId.get(device.id) ?? []),
        zone.id,
      ]);
    }

    // if (zone.level === Zone.level.ROOM || zone.level === Zone.level.GROUP) {
    // const devices = await DevicesService.getDevicesByZone(zone.id);
    // await delay()

    // for(const device of devices) {
    //     const services = await DevicesService.getServicesByZoneAndDevice(zone.id, device.id)
    //     await delay()

    //     for(const service of services) {
    //         if(service.type === Identifiable.type.LIGHTING) {
    //             lights.set(device.id, [device, service])
    //         }
    //     }
    // }
    // }
  }

  return { knownZones, knownDevices, deviceIdsByZoneId, zoneIdsByDeviceId };
}

function delay(ms = 200) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
