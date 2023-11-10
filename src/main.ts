import { CoverServiceMQTTHandler } from './homeAssistant/coverServiceMqttHandler.js';
import { HomeAssistantDevice } from './homeAssistant/devices/homeAssistantDevice.js';
import { LightingServiceMQTTHandler } from './homeAssistant/lightingServiceMqttHandler.js';
import { MqttClient } from './homeAssistant/mqttClient.js';
import { SceneServiceMQTTHandler } from './homeAssistant/sceneServiceMqttHandler.js';
import { createLitecomMqttMirror } from './litecom/createLitecomMqttMirror.js';
import { Scene, idForZoneOrDevice, interrogateLitecomSystem } from './litecom/interrogateLitecomSystem.js';
import * as Litecom from './litecom/restClient/index.js';
import { config } from './util/config.js';
import { log } from './util/logger.js';

const { zones, groups, rooms, devices, zoneIdsByDeviceId, zoneById } = await interrogateLitecomSystem(config);
const scenesByZoneOrDeviceId: ReadonlyMap<string, ReadonlyArray<Scene>> = new Map(
    [...zones, ...groups, ...rooms, ...devices].reduce<ReadonlyArray<[string, ReadonlyArray<Scene>]>>(
        (acc, x) => (x.scenes ? [...acc, [idForZoneOrDevice(x), x.scenes]] : acc),
        [],
    ),
);

const mqttClient = new MqttClient(
    new LightingServiceMQTTHandler(
        {
            putLightingServiceByZone: Litecom.LightingServiceService.putLightingServiceByZone,
            putLightingServiceByZoneAndDevice: Litecom.LightingServiceService.putLightingServiceByZoneAndDevice,
        },
        log,
    ),
    new SceneServiceMQTTHandler(
        {
            putSceneServiceByZone: Litecom.SceneServiceService.putSceneServiceByZone,
            putSceneServiceByZoneAndDevice: Litecom.SceneServiceService.putSceneServiceByZoneAndDevice,
        },
        scenesByZoneOrDeviceId,
        log,
    ),
    new CoverServiceMQTTHandler(
        {
            putBlindServiceByZone: Litecom.BlindsServiceService.putBlindServiceByZone,
            putBlindsServiceByZoneAndDevice: Litecom.BlindsServiceService.putBlindServiceByZoneAndDevice,
        },
        {
            putSlatServiceByZone: Litecom.SlatsServiceService.putSlatServiceByZone,
            putSlatServiceByZoneAndDevice: Litecom.SlatsServiceService.putSlatServiceByZoneAndDevice,
        },
        log,
    ),
    log,
);
await mqttClient.init(config);

await createLitecomMqttMirror(mqttClient);

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
