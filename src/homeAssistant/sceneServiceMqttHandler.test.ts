import { ImmediateExecutionQueue } from '../util/testing/immedateExecutionQueue.js';
import { NoopLogger } from '../util/testing/noopLogger.js';
import { SceneServiceMQTTHandler } from './sceneServiceMqttHandler.js';

describe('SceneServiceMQTTHandler', () => {
    const zoneId = '47619c98-e8a1-469b-9068-15b23b54d980';
    const deviceId = '905de275-d0c0-4187-8255-ba55d17e09e8';
    const fakes = {
        putSceneServiceByZoneAndDevice: jest.fn(),
        putSceneServiceByZone: jest.fn(),
    };
    const handler = new SceneServiceMQTTHandler(
        {
            putSceneServiceByZoneAndDevice: fakes.putSceneServiceByZoneAndDevice,
            putSceneServiceByZone: fakes.putSceneServiceByZone,
        },
        new Map([
            [zoneId, [{ id: 42, name: 'Zone Scene' }]],
            [deviceId, [{ id: 720, name: 'Device Scene' }]],
        ]),
        ImmediateExecutionQueue,
        NoopLogger,
    );

    describe('handleZoneCommand()', () => {
        it('handles "activate" zone commands', async () => {
            await handler.handleZoneCommand(zoneId, {
                command: 'activate',
                payload: 'Zone Scene',
            });

            expect(fakes.putSceneServiceByZone).toBeCalledTimes(1);
            expect(fakes.putSceneServiceByZone).toBeCalledWith(zoneId, { activeScene: 42 });
        });
    });

    describe('handleDeviceCommand()', () => {
        it('handles "activate" device commands', async () => {
            await handler.handleDeviceCommand(zoneId, deviceId, {
                command: 'activate',
                payload: 'Device Scene',
            });

            expect(fakes.putSceneServiceByZoneAndDevice).toBeCalledTimes(1);
            expect(fakes.putSceneServiceByZoneAndDevice).toBeCalledWith(zoneId, deviceId, { activeScene: 720 });
        });
    });
});
