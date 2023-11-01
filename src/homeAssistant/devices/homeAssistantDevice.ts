import { Device, Zone, ZoneWithoutAvailableServices } from '../../litecom/interrogateLitecomSystem.js';
import { Config } from '../../util/config.js';
import { getAllParentsForZone } from '../../util/getAllParentNamesForZone.js';
import { Logger } from '../../util/logger.js';
import { HomeAssistantEntity } from './homeAssistantEntity.js';
import { HomeAssistantLightEntity } from './homeAssistantLightEntity.js';
import { HomeAssistantSceneEntity } from './homeAssistantSceneEntity.js';
import { HomeAssistantSceneOutOfTuneEntity } from './homeAssistantSceneOutOfTuneEntity.js';

export type HomeAssistantDeviceConfiguration = {
    name: string;
    identifiers: string;
    sw_version: string;
    manufacturer: string;
    configuration_url: string;
    via_device?: string;
};

export type HomeAssistantAnnouncement = {
    device: HomeAssistantDeviceConfiguration;
    uniq_id: string;
    object_id: string;
};

export interface HomeAssistantDeviceAnnouncer {
    announce: (discoveryTopic: string, announcement: HomeAssistantAnnouncement) => Promise<void>;
}

export class HomeAssistantDevice {
    public readonly entities: HomeAssistantEntity[] = [];

    private constructor(
        readonly id: string,
        readonly name: string,
        private readonly config: Config,
        private readonly log: Logger,
    ) {}

    static fromLitecomZone(
        zone: Zone,
        zoneById: ReadonlyMap<string, ZoneWithoutAvailableServices>,
        config: Config,
        log: Logger,
    ): HomeAssistantDevice {
        const device = new HomeAssistantDevice(
            zone.zone.id,
            HomeAssistantDevice.hierarchicalName(zone, undefined, zoneById),
            config,
            log,
        );

        if (zone.lighting) {
            device.addEntity(new HomeAssistantLightEntity(config, zone.zone));
        }
        if (zone.scenes) {
            device.addEntity(new HomeAssistantSceneEntity(config, zone.scenes, zone.zone));
            device.addEntity(new HomeAssistantSceneOutOfTuneEntity(config, zone.zone));
        }

        return device;
    }

    static fromLitecomDevice(
        device: Device,
        inZone: ZoneWithoutAvailableServices,
        zoneById: ReadonlyMap<string, ZoneWithoutAvailableServices>,
        config: Config,
        log: Logger,
    ): HomeAssistantDevice {
        const homeAssistantDevice = new HomeAssistantDevice(
            device.device.id,
            HomeAssistantDevice.hierarchicalName(inZone, device, zoneById),
            config,
            log,
        );

        if (device.lighting) {
            homeAssistantDevice.addEntity(new HomeAssistantLightEntity(config, inZone.zone, device.device));
        }
        if (device.scenes) {
            homeAssistantDevice.addEntity(
                new HomeAssistantSceneEntity(config, device.scenes, inZone.zone, device.device),
            );
            homeAssistantDevice.addEntity(new HomeAssistantSceneOutOfTuneEntity(config, inZone.zone, device.device));
        }

        return homeAssistantDevice;
    }

    static hierarchicalName(
        zone: ZoneWithoutAvailableServices,
        device: Device | undefined,
        zoneById: ReadonlyMap<string, ZoneWithoutAvailableServices>,
    ): string {
        const parentZones = getAllParentsForZone(zone, zoneById);
        const baseName = device?.device.name ?? zone.zone.name;
        return parentZones.length > 0 ? `${parentZones.map(({ zone }) => zone.name).join('/')}/${baseName}` : baseName;
    }

    addEntity(entity: HomeAssistantEntity): void {
        this.entities.push(entity);
    }

    private getHomeAssistantDeviceConfiguration(): HomeAssistantDeviceConfiguration {
        return {
            name: this.name,
            identifiers: this.id,
            sw_version: '0.0.1',
            manufacturer: 'Zumtobel Lighting GmbH',
            configuration_url: `https://${this.config.LITECOM2MQTT_LITECOM_HOST}`,
        };
    }

    async announceUsing(announcer: HomeAssistantDeviceAnnouncer): Promise<void> {
        // homeassistant/[component]/[node]  /[uniqueid]/config
        // homeassistant/[component]/[device]/[uniqueid]/config
        // device = HomeAssistantDevice.id
        // uniqueid = HomeAssistantDevice + Service Name
        // Example homeassistant/light/123/123_lighting/config

        const deviceConfiguration = this.getHomeAssistantDeviceConfiguration();

        const announcments: [discoveryTopic: string, announcment: HomeAssistantAnnouncement][] = this.entities.map(
            (entity) => {
                const announcment = {
                    ...entity.getHomeAssistantAnnouncement(this),
                    device: deviceConfiguration,
                };
                const discoveryTopic = `${this.config.LITECOM2MQTT_HOMEASSISTANT_DISCOVERY_MQTT_TOPIC_PREFIX}/${entity.homeAssistantEntityType}/${this.id}/${announcment.uniq_id}/config`;
                return [discoveryTopic, announcment];
            },
        );

        for (const [discoveryTopic, announcment] of announcments) {
            this.log.debug(`Announce ${discoveryTopic}`, { discoveryTopic, announcment });
            await announcer.announce(discoveryTopic, announcment);
        }
    }
}
