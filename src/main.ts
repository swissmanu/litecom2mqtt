import { CoverServiceMQTTHandler } from './homeAssistant/coverServiceMqttHandler.js';
import { HomeAssistantDevice } from './homeAssistant/devices/homeAssistantDevice.js';
import { LightingServiceMQTTHandler } from './homeAssistant/lightingServiceMqttHandler.js';
import { HomeAssistantMqttClient } from './homeAssistant/mqttClient.js';
import { SceneServiceMQTTHandler } from './homeAssistant/sceneServiceMqttHandler.js';
import { Scene, idForZoneOrDevice, interrogateLitecomSystem } from './litecom/interrogateLitecomSystem.js';
import * as Litecom from './litecom/restClient/index.js';
import { DefaultDeviceStatePropagationStrategy } from './statePropagation/deviceStatePropagationStrategy/defaultDeviceStatePropagationStrategy.js';
import { NoopDeviceStatePropagationStrategy } from './statePropagation/deviceStatePropagationStrategy/noopDeviceStatePropagationStrategy.js';
import { StatePropagator } from './statePropagation/statePropagator.js';
import { config } from './util/config.js';
import { ExecutionQueue } from './util/executionQueue.js';
import { log } from './util/logger.js';
import { connectLitecomMqtt, connectMqttBroker } from './util/mqttClientFactories.js';

const { zones, groups, rooms, devices, zoneIdsByDeviceId, zoneById } = await interrogateLitecomSystem(config);
const scenesByZoneOrDeviceId: ReadonlyMap<string, ReadonlyArray<Scene>> = new Map(
    [...zones, ...groups, ...rooms, ...devices].reduce<ReadonlyArray<[string, ReadonlyArray<Scene>]>>(
        (acc, x) => (x.scenes ? [...acc, [idForZoneOrDevice(x), x.scenes]] : acc),
        [],
    ),
);

const queue = new ExecutionQueue(log);
const brokerMqttClient = await connectMqttBroker(config, log);
const homeAssistantMqttClient = new HomeAssistantMqttClient(
    config,
    brokerMqttClient,
    new LightingServiceMQTTHandler(
        {
            putLightingServiceByZone: Litecom.LightingServiceService.putLightingServiceByZone,
            putLightingServiceByZoneAndDevice: Litecom.LightingServiceService.putLightingServiceByZoneAndDevice,
        },
        queue,
        log,
    ),
    new SceneServiceMQTTHandler(
        {
            putSceneServiceByZone: Litecom.SceneServiceService.putSceneServiceByZone,
            putSceneServiceByZoneAndDevice: Litecom.SceneServiceService.putSceneServiceByZoneAndDevice,
        },
        scenesByZoneOrDeviceId,
        queue,
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
        queue,
        log,
    ),
    log,
);

new StatePropagator(
    log,
    config,
    await connectLitecomMqtt(config, log),
    brokerMqttClient,
    config.LITECOM2MQTT_LITECOM_PROPAGATE_DEVICE_STATE_TO_GROUPS
        ? new DefaultDeviceStatePropagationStrategy(log, config, brokerMqttClient)
        : new NoopDeviceStatePropagationStrategy(),
);

for (const zone of [
    ...(config.LITECOM2MQTT_HOMEASSISTANT_ANNOUNCE_ZONES ? zones : []),
    ...(config.LITECOM2MQTT_HOMEASSISTANT_ANNOUNCE_GROUPS ? groups : []),
    ...(config.LITECOM2MQTT_HOMEASSISTANT_ANNOUNCE_ROOMS ? rooms : []),
]) {
    const homeAssistantDevice = HomeAssistantDevice.fromLitecomZone(zone, zoneById, config, log);
    await homeAssistantDevice.announceUsing(homeAssistantMqttClient);
    await homeAssistantMqttClient.subscribeToHomeAssistantDeviceCommandTopics(homeAssistantDevice);
}

for (const device of config.LITECOM2MQTT_HOMEASSISTANT_ANNOUNCE_DEVICES ? devices : []) {
    const zoneIds = zoneIdsByDeviceId.get(device.device.id);
    if (zoneIds && zoneIds.length > 0) {
        const zone = zoneById.get(zoneIds[0]);
        if (zone) {
            const homeAssistantDevice = HomeAssistantDevice.fromLitecomDevice(device, zone, zoneById, config, log);
            await homeAssistantDevice.announceUsing(homeAssistantMqttClient);
            await homeAssistantMqttClient.subscribeToHomeAssistantDeviceCommandTopics(homeAssistantDevice);
        }
    } else {
        log.warning(`No zone identifiers found for device "${device.device.name}"`);
    }
}
