import { connectAsync } from 'mqtt';
import { MqttClient } from '../homeAssistant/mqttClient.js';
import { config } from '../util/config.js';
import { log } from '../util/logger.js';

export async function createLitecomMqttMirror(
    target: MqttClient,
    subscriptionTopic = 'zones/#',
    topicFilterPrefix = 'zones/',
) {
    log.debug('Set up Litecom MQTT Mirror');

    const litecomMqttClient = await connectAsync({
        host: config.LITECOM2MQTT_LITECOM_HOST,
        port: 8883,
        protocol: 'mqtts',
        rejectUnauthorized: false,
        username: config.LITECOM2MQTT_LITECOM_CONSUMER_NAME,
        password: config.LITECOM2MQTT_LITECOM_CONSUMER_API_TOKEN,
    });
    log.info(`Connected to Litecom broker mqtts://${config.LITECOM2MQTT_LITECOM_HOST}:8883`);

    litecomMqttClient.on('message', (topic: string, payload: Buffer) => {
        if (topic.startsWith(topicFilterPrefix)) {
            log.debug(`Mirror "${topic}"`);
            target.publish(`litecom/${topic}`, payload);
        }
    });
    litecomMqttClient.subscribe(subscriptionTopic);
}
