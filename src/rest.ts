import { config } from "./config.ts";
import { LightEntity } from "./homeAssistant/lightEntity.ts";
import { client } from "./mqtt.ts";
import {
  Identifiable,
  OpenAPI,
  Zone,
  ZonesService,
} from "./restClient/index.ts";

OpenAPI.BASE = `https://${config.LITECOM_HOST}${OpenAPI.BASE}`;
OpenAPI.USERNAME = config.LITECOM_CONSUMER_NAME;
OpenAPI.TOKEN = config.LITECOM_CONSUMER_API_TOKEN;

type KnownZone = {
  zone: Zone;
  hasLights: boolean;
  hasBlinds: boolean;
  hasScenes: boolean;
};
const knownZones: KnownZone[] = [];

// type Leaf<T> = {
//     data: T;
// }

// type InnerNode<T, C> = Leaf<T> & {
//     children: C[]
// }

// type Tree2<A,B> = InnerNode<A, Leaf<B>>;
// type Tree3<A,B,C> = InnerNode<A, Tree2<B,C>>;

// type RoomNode = {
//     room: Zone;
// }
// type DeviceNode = {
//     device: Device;
//     type: Identifiable.type
// }
// const rooms: Tree2<RoomNode, DeviceNode>[] = [];

const zones = await ZonesService.getZones();
for (const zone of zones) {
  const services = await ZonesService.getServicesByZone(zone.id);
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

  if (
    knownZone.zone.name === "Pendel Essen" ||
    knownZone.zone.name === "Profil Wohnen"
  ) {
    const entity = new LightEntity(client, zone);
    entity.announce();
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

console.log(knownZones);

function delay(ms = 200) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
