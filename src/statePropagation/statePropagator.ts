import { MqttClient, OnMessageCallback } from 'mqtt';
import { LitecomStateMqttTopicFactory } from '../litecom/stateMqttTopicFactory.js';
import { Config } from '../util/config.js';
import { Logger } from '../util/logger.js';

// interface StateMqttHandler {}

export class StatePropagator implements AsyncDisposable {
    // private handlers: Map<string, StateMqttHandler> = new Map();

    constructor(
        private log: Logger,
        private config: Config,
        private litecomMqttClient: MqttClient,
        private brokerMqttClient: MqttClient,
    ) {
        this.litecomMqttClient.on('message', this.onMessage);
        this.litecomMqttClient.subscribeAsync('zones/#');
    }

    private onMessage: OnMessageCallback = (topic: string, payload: Buffer) => {
        const zoneOrDeviceState = LitecomStateMqttTopicFactory.matchTopic(topic);
        if (zoneOrDeviceState) {
            // Just replicate mirror for now
            this.brokerMqttClient?.publish(
                `${this.config.LITECOM2MQTT_LITECOM_STATE_MQTT_TOPIC_PREFIX}/${topic}`,
                payload,
            );
            this.log.info(`Mirror ${topic}`);
        }
    };

    // registerHandlerFor(dataPointType: 'lighting', zone: Litecom.Zone, device?: Litecom.Device) {
    //     const key = StatePropagator.getHandlerKey(dataPointType, zone, device);
    //     const handler = StatePropagator.createHandler(dataPointType, zone, device);

    //     if (this.handlers.has(key)) {
    //         this.log.warning(`State Handler with key "${key}" was already registered before.`);
    //         return;
    //     }

    //     this.handlers.set(key, handler);
    // }

    // private static createHandler(
    //     dataPointType: 'lighting',
    //     zone: Litecom.Zone,
    //     device?: Litecom.Device,
    // ): StateMqttHandler {
    //     // TODO
    //     return {};
    // }

    // private static getHandlerKey(dataPointType: 'lighting', zone: Litecom.Zone, device?: Litecom.Device): string {
    //     return `${dataPointType}-${zone.id}${device ? device.id : ''}`;
    // }

    async [Symbol.asyncDispose](): Promise<void> {
        this.litecomMqttClient.off('message', this.onMessage);
        await this.litecomMqttClient.unsubscribeAsync('zones/#');
    }
}
