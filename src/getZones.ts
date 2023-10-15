import { config } from "./config.ts";
import {
  Identifiable,
  OpenAPI,
  Zone,
  ZonesService,
} from "./restClient/index.ts";
import { log } from "./util/logger.ts";

OpenAPI.BASE = `https://${config.LITECOM_HOST}${OpenAPI.BASE}`;
OpenAPI.USERNAME = config.LITECOM_CONSUMER_NAME;
OpenAPI.TOKEN = config.LITECOM_CONSUMER_API_TOKEN;

type KnownZone = {
  zone: Zone;
  hasLights: boolean;
  hasBlinds: boolean;
  hasScenes: boolean;
};

export async function getZones() {
  const knownZones: KnownZone[] = [];
  const zones = await ZonesService.getZones();
  log.debug(`Fetched ${zones.length} zones`);

  for (const zone of zones) {
    const services = await ZonesService.getServicesByZone(zone.id);
    log.debug(
      `Fetched ${services.length} services for zone "${zone.name}" (${zone.id})`,
    );
    await delay();

    const knownZone: KnownZone = {
      zone,
      hasLights: services.findIndex((s) =>
        s.type === Identifiable.type.LIGHTING
      ) !== -1,
      hasBlinds:
        services.findIndex((s) => s.type === Identifiable.type.BLIND) !== -1,
      hasScenes:
        services.findIndex((s) => s.type === Identifiable.type.SCENE) !== -1,
    };
    knownZones.push(knownZone);

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

  return knownZones;
}

function delay(ms = 200) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
