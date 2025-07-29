import { connectAsync, MqttClient } from 'mqtt';
import { Config } from './config.js';
import { Logger } from './logger.js';

export async function connectMqttBroker(config: Config, log: Logger): Promise<MqttClient> {
    const client = await connectAsync({
        protocol: config.LITECOM2MQTT_MQTT_BROKER_PROTOCOL,
        host: config.LITECOM2MQTT_MQTT_BROKER_HOST,
        port: config.LITECOM2MQTT_MQTT_BROKER_PORT,
    });
    log.info(
        `Connected to broker ${config.LITECOM2MQTT_MQTT_BROKER_PROTOCOL}://${config.LITECOM2MQTT_LITECOM_HOST}:${config.LITECOM2MQTT_MQTT_BROKER_PORT}`,
    );

    return client;
}

export async function connectLitecomMqtt(config: Config, log: Logger): Promise<MqttClient> {
    const client = await connectAsync({
        host: config.LITECOM2MQTT_LITECOM_HOST,
        port: 8883,
        protocol: 'mqtts',
        rejectUnauthorized: false,
        username: config.LITECOM2MQTT_LITECOM_CONSUMER_NAME,
        password: config.LITECOM2MQTT_LITECOM_CONSUMER_API_TOKEN,
    });
    log.info(`Connected to Litecom broker mqtts://${config.LITECOM2MQTT_LITECOM_HOST}:8883`);

    return client;
}
