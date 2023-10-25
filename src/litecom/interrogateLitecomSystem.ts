import { Config } from '../util/config.js';
import { log } from '../util/logger.js';
import * as Litecom from './restClient/index.js';

type AvailableServices = {
    lighting: boolean;
    blinds: boolean;
    scenes: false | ReadonlyArray<Scene>;
};

type Zone = AvailableServices & ZoneWithoutAvailableServices;

export type ZoneWithoutAvailableServices = {
    zone: Litecom.Zone;
    parentZoneId?: string;
};

type Device = AvailableServices & {
    device: Litecom.Device;
    parentZoneId?: string;
};

type Scene = {
    id: number;
    name: string;
};

type LitecomSystemInformation = {
    /**
     * All known zones. Might be empty if zones were not part of the interrogation.
     */
    zones: ReadonlyArray<Zone>;

    /**
     * All known rooms. Might be empty if rooms were not part of the interrogation.
     */
    rooms: ReadonlyArray<Zone>;

    /**
     * All known groups. Might be empty if groups were not part of the interrogation.
     */
    groups: ReadonlyArray<Zone>;

    /**
     * All known devices. Might be empty if devices were not part of the interrogation.
     */
    devices: ReadonlyArray<Device>;

    /**
     * As a device belongs to one or multiple zones, this `Map` contains all zone identifiers for a given device
     * identifier.
     */
    zoneIdsByDeviceId: ReadonlyMap<string, string[]>;

    /**
     * Contains all known `Zone`s, accessible by their identifier.
     */
    zoneById: ReadonlyMap<string, ZoneWithoutAvailableServices>;
};

export async function interrogateLitecomSystem(config: Config): Promise<LitecomSystemInformation> {
    const zones: Zone[] = [];
    const rooms: Zone[] = [];
    const groups: Zone[] = [];
    const devices: Device[] = [];
    const zoneIdsByDeviceId: Map<string, string[]> = new Map();
    const zoneById: Map<string, ZoneWithoutAvailableServices> = new Map();
    const missingParentZoneIds: Set<string> = new Set();

    function getAndHandleParentZoneId(links: Litecom.Link[]) {
        const parentId = extractParentIdFromLinks(links);
        if (parentId && !zoneById.has(parentId)) {
            missingParentZoneIds.add(parentId);
        }
        return parentId;
    }

    if (
        !config.LITECOM2MQTT_HOMEASSISTANT_ANNOUNCE_ZONES &&
        !config.LITECOM2MQTT_HOMEASSISTANT_ANNOUNCE_ROOMS &&
        !config.LITECOM2MQTT_HOMEASSISTANT_ANNOUNCE_GROUPS &&
        !config.LITECOM2MQTT_HOMEASSISTANT_ANNOUNCE_DEVICES
    ) {
        log.warning('Interrogation for zones, rooms, groups, and devices disabled.');
        return { zones, rooms, groups, devices, zoneIdsByDeviceId, zoneById };
    }

    log.debug(`Start interrogation of Litecom system on ${config.LITECOM2MQTT_LITECOM_HOST}...`);
    log.debug(
        `Interrogate: ${[
            config.LITECOM2MQTT_HOMEASSISTANT_ANNOUNCE_ZONES && 'zones',
            config.LITECOM2MQTT_HOMEASSISTANT_ANNOUNCE_ROOMS && 'rooms',
            config.LITECOM2MQTT_HOMEASSISTANT_ANNOUNCE_GROUPS && 'groups',
            config.LITECOM2MQTT_HOMEASSISTANT_ANNOUNCE_DEVICES && 'devices',
        ]
            .filter((x) => !!x)
            .join(', ')}`,
    );

    Litecom.OpenAPI.BASE = `https://${config.LITECOM2MQTT_LITECOM_HOST}${Litecom.OpenAPI.BASE}`;
    Litecom.OpenAPI.USERNAME = config.LITECOM2MQTT_LITECOM_CONSUMER_NAME;
    Litecom.OpenAPI.TOKEN = config.LITECOM2MQTT_LITECOM_CONSUMER_API_TOKEN;

    log.debug('Fetching zones from Litecom...');
    const systemZones = await throttled(() => Litecom.ZonesService.getZones());
    log.debug(`Fetched ${systemZones.length} zones from Litecom.`);

    for (const systemZone of systemZones) {
        const parentZoneId = getAndHandleParentZoneId(systemZone.links);
        zoneById.set(systemZone.id, { zone: systemZone, parentZoneId: parentZoneId });

        if (
            (systemZone.level === Litecom.Zone.level.ZONE && config.LITECOM2MQTT_HOMEASSISTANT_ANNOUNCE_ZONES) ||
            (systemZone.level === Litecom.Zone.level.ROOM && config.LITECOM2MQTT_HOMEASSISTANT_ANNOUNCE_ROOMS) ||
            (systemZone.level === Litecom.Zone.level.GROUP && config.LITECOM2MQTT_HOMEASSISTANT_ANNOUNCE_GROUPS)
        ) {
            log.debug(`Fetching services for ${systemZone.level.toLowerCase()} "${systemZone.id}"...`);
            const systemZoneServices = await throttled(() => Litecom.ZonesService.getServicesByZone(systemZone.id));
            log.debug(`Fetched services for ${systemZone.level.toLowerCase()} "${systemZone.id}".`);

            const zone: Zone = {
                zone: systemZone,
                parentZoneId: parentZoneId,
                ...(await availableServices(systemZoneServices, systemZone)),
            };
            switch (systemZone.level) {
                case Litecom.Zone.level.ZONE:
                    zones.push(zone);
                    break;
                case Litecom.Zone.level.ROOM:
                    rooms.push(zone);
                    break;
                case Litecom.Zone.level.GROUP:
                    groups.push(zone);
                    break;
            }

            if (config.LITECOM2MQTT_HOMEASSISTANT_ANNOUNCE_DEVICES) {
                log.debug(`Fetching devices for ${systemZone.level.toLowerCase()} "${systemZone.id}"...`);
                const systemDevices = await throttled(() => Litecom.DevicesService.getDevicesByZone(systemZone.id));
                log.debug(`Fetched ${systemDevices.length} devices for "${systemZone.id}".`);

                for (const systemDevice of systemDevices) {
                    zoneIdsByDeviceId.set(systemDevice.id, [
                        ...(zoneIdsByDeviceId.get(systemDevice.id) ?? []),
                        systemZone.id,
                    ]);

                    log.debug(`Fetching services for device "${systemZone.id}"...`);
                    const systemDeviceServices = await throttled(() =>
                        Litecom.ZonesService.getServicesByZone(systemZone.id),
                    );
                    log.debug(`Fetched services for device "${systemZone.id}".`);

                    devices.push({
                        device: systemDevice,
                        parentZoneId: getAndHandleParentZoneId(systemDevice.links),
                        ...(await availableServices(systemDeviceServices, systemZone, systemDevice)),
                    });
                }
            }
        }
    }

    // Resolve parent zones:
    const missingParentZoneIdsList = [...missingParentZoneIds];
    while (missingParentZoneIdsList.length > 0) {
        const parentZoneId = missingParentZoneIdsList.pop();
        if (!parentZoneId) break;
        if (zoneById.has(parentZoneId)) continue;

        const systemZone = await throttled(() => Litecom.ZonesService.getZoneById(parentZoneId));
        const id = extractParentIdFromLinks(systemZone.links);
        if (id && !zoneById.has(id)) {
            missingParentZoneIdsList.push(id);
        }
        zoneById.set(parentZoneId, { zone: systemZone, parentZoneId: id });
    }

    return {
        zones,
        rooms,
        groups,
        devices,
        zoneIdsByDeviceId,
        zoneById,
    };
}

async function availableServices(
    services: Litecom.Identifiable[],
    zone: Litecom.Zone,
    device?: Litecom.Device,
): Promise<AvailableServices> {
    const hasSceneService = services.findIndex((s) => s.type === Litecom.Identifiable.type.SCENE) !== -1;

    return {
        lighting: services.findIndex((s) => s.type === Litecom.Identifiable.type.LIGHTING) !== -1,
        blinds: services.findIndex((s) => s.type === Litecom.Identifiable.type.BLIND) !== -1,
        scenes: hasSceneService && (await getScenes(zone, device)),
    };
}

async function getScenes(zone: Litecom.Zone, device?: Litecom.Device): Promise<ReadonlyArray<Scene>> {
    log.debug(
        `Fetching scene service for ${device ? `device "${device.id}" in zone "${zone.id}"` : `zone "${zone.id}"`}`,
    );
    const sceneService = await (device
        ? throttled(() => Litecom.SceneServiceService.getSceneServiceByZoneAndDevice(zone.id, device.id))
        : throttled(() => Litecom.SceneServiceService.getSceneServiceByZone(zone.id)));
    log.debug(
        `Fetched scene service for ${device ? `device "${device.id}" in zone "${zone.id}"` : `zone "${zone.id}"`}`,
    );

    const sceneNumbers = sceneService.links
        .filter((x) => x.rel === 'child')
        .map((x) => Number.parseInt(x.href.split('/').at(-1) ?? '', 10));

    const scenes: Scene[] = [];
    for (const sceneNumber of sceneNumbers) {
        log.debug(
            `Fetching scene number "${sceneNumber}" for ${
                device ? `device "${device.id}" in zone "${zone.id}"` : `zone "${zone.id}"`
            }`,
        );
        const scene = await (device
            ? throttled(() =>
                  Litecom.SceneServiceService.getSceneByZoneAndDeviceAndNumber(zone.id, device.id, sceneNumber),
              )
            : throttled(() => Litecom.SceneServiceService.getSceneByZoneAndNumber(zone.id, sceneNumber)));
        log.debug(
            `Fetched scene number "${sceneNumber}" for ${
                device ? `device "${device.id}" in zone "${zone.id}"` : `zone "${zone.id}"`
            }`,
        );

        if (scene.name !== null && scene.number !== null) {
            scenes.push({ id: scene.number, name: scene.name });
        } else {
            log.warning(`Name and/or number for scene was null. Scene ignored.`);
        }
    }
    return scenes;
}

function delay(ms = 200) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Litecom CCD complains when we request data in quick succession. Therefore, throttle our requests accordingly.
 *
 * @param fn
 * @param ms
 * @returns
 */
async function throttled<T>(fn: () => Promise<T>, ms?: number): Promise<T> {
    const result = await fn();
    await delay(ms);
    return result;
}

function extractParentIdFromLinks(links: Litecom.Link[]): string | undefined {
    for (const link of links) {
        if (link.rel === 'parent') {
            return link.href.split('/').at(-1);
        }
    }
    return undefined;
}
