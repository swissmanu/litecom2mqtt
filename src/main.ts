import { HomeAssistantDevice } from './homeAssistant/devices/homeAssistantDevice.js';
import { LightingServiceMQTTHandler } from './homeAssistant/lightingServiceMqttHandler.js';
import { MqttClient } from './homeAssistant/mqttClient.js';
import { createLitecomMqttMirror } from './litecom/createLitecomMqttMirror.js';
import { interrogateLitecomSystem } from './litecom/interrogateLitecomSystem.js';
import * as Litecom from './litecom/restClient/index.js';
import { config } from './util/config.js';
import { log } from './util/logger.js';

const mqttClient = new MqttClient(
    new LightingServiceMQTTHandler(
        {
            putLightingServiceByZone: Litecom.LightingServiceService.putLightingServiceByZone,
            putLightingServiceByZoneAndDevice: Litecom.LightingServiceService.putLightingServiceByZoneAndDevice,
        },
        log,
    ),
    log,
);
await mqttClient.init(config);

await createLitecomMqttMirror(mqttClient);

const { zones, groups, rooms, devices, zoneIdsByDeviceId, zoneById } = await interrogateLitecomSystem(config);

for (const zone of [
    ...(config.LITECOM2MQTT_HOMEASSISTANT_ANNOUNCE_ZONES ? zones : []),
    ...(config.LITECOM2MQTT_HOMEASSISTANT_ANNOUNCE_GROUPS ? groups : []),
    ...(config.LITECOM2MQTT_HOMEASSISTANT_ANNOUNCE_ROOMS ? rooms : []),
]) {
    const homeAssistantDevice = HomeAssistantDevice.fromLitecomZone(zone, zoneById, config, log);
    await homeAssistantDevice.announceUsing(mqttClient);
    await mqttClient.subscribeToHomeAssistantDeviceCommandTopics(homeAssistantDevice);
}

for (const device of devices) {
    const zoneIds = zoneIdsByDeviceId.get(device.device.id);
    if (zoneIds && zoneIds.length > 0) {
        const zone = zoneById.get(zoneIds[0]);
        if (zone) {
            const homeAssistantDevice = HomeAssistantDevice.fromLitecomDevice(device, zone, zoneById, config, log);
            await homeAssistantDevice.announceUsing(mqttClient);
            await mqttClient.subscribeToHomeAssistantDeviceCommandTopics(homeAssistantDevice);
        }
    } else {
        log.warning(`No zone identifiers found for device "${device.device.name}"`);
    }
}
