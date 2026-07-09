import { Logger } from '../util/logger';
import { HomeAssistantDevice } from './devices/homeAssistantDevice.js';
import { HomeAssistantMqttClient } from './mqttClient';

/**
 * This class is responsible for announcing Home Assistant devices to the MQTT broker.
 * It listens for MQTT connection events and triggers the announcement process when connected or reconnected.
 * If the connection is lost during the announcement process, it will stop announcing and wait for the next connection event.
 * This ensures that devices are announced only when the MQTT broker is available or it became available again after a disconnection.
 */
export default class HomeAssistantAnnouncer {
    private announcementInProgress = false;

    constructor(
        private readonly homeAssistantMqttClient: HomeAssistantMqttClient,
        private readonly homeAssistantDevices: Map<string, HomeAssistantDevice>,
        private readonly log: Logger,
    ) {
        this.homeAssistantMqttClient.client.on('connect', () => {
            this.log.info('Connected to MQTT broker. Announcing devices...');
            void this.announceHomeAssistantDevices();
        });
        this.homeAssistantMqttClient.client.on('reconnect', async () => {
            this.log.info('Reconnected to MQTT broker. Announcing devices...');
            void this.announceHomeAssistantDevices();
        });
        this.homeAssistantMqttClient.client.on('close', () => {
            if (this.announcementInProgress) {
                this.log.info('Disconnected from MQTT broker. Interrupt ongoing announcement.');
                this.announcementInProgress = false;
            }
        });
    }

    async announceHomeAssistantDevices(): Promise<void> {
        if (this.announcementInProgress) {
            this.log.info('Announcement already in progress. Skipping new announcement.');
            return;
        }

        this.announcementInProgress = true;
        for (const homeAssistantDevice of this.homeAssistantDevices.values()) {
            if (!this.announcementInProgress) {
                break; // Stop announcing if the connection was closed during the announcement process
            }
            await homeAssistantDevice.announceUsing(this.homeAssistantMqttClient);
        }
        this.announcementInProgress = false;
    }
}
