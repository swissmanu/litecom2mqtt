import { Device, Zone } from '../../litecom/restClient/index.js';
import { Config } from '../../util/config.js';
import { HomeAssistantAnnouncement, HomeAssistantDevice } from './homeAssistantDevice.js';

export type HomeAssistantEntityType = 'light' | 'button' | 'cover' | 'select' | 'sensor';
export type DataPointType = 'lighting' | 'activeScene' | 'sceneOutOfTune';

export abstract class HomeAssistantEntity {
    abstract readonly homeAssistantEntityType: HomeAssistantEntityType;
    abstract readonly homeAssistantCommandTopics: Record<string, string>;
    abstract readonly homeAssistantEntityConfig: Record<string, string | number | boolean | string[]>;

    /**
     * Identifies the type of information exposed by a `HomeAssistantEntity`. Used as part of the `unique_id` of a Home
     * Assistant Entity.
     */
    abstract readonly dataPointType: DataPointType;

    constructor(
        protected readonly config: Config,
        protected readonly zone: Zone,
        protected readonly device?: Device,
    ) {
        // this.subscribe();
    }

    get name(): string {
        return this.device?.name ?? this.zone.name;
    }

    get objectId(): string {
        return HomeAssistantEntity.createObjectId(this.device ?? this.zone);
    }

    get uniqueId(): string {
        return `${this.objectId}_${this.dataPointType}`;
    }

    getHomeAssistantAnnouncement(homeAssistantDevice: HomeAssistantDevice): Omit<HomeAssistantAnnouncement, 'device'> {
        const uniqueId = `${homeAssistantDevice.id}_${this.dataPointType}`;
        const name = this.name;

        const payload = {
            name,
            uniq_id: uniqueId,
            object_id: uniqueId,
            ...this.homeAssistantCommandTopics,
            ...this.homeAssistantEntityConfig,
        };

        return payload;
    }

    static createObjectId(x: Zone | Device): string {
        return x.id;
    }
}
