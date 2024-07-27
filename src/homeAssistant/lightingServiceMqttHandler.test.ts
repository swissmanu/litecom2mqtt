import { ImmediateExecutionQueue } from '../util/testing/immedateExecutionQueue.js';
import { NoopLogger } from '../util/testing/noopLogger.js';
import { LightingServiceMQTTHandler } from './lightingServiceMqttHandler.js';

describe('LightingServiceMQTTHandler', () => {
    const zoneId = '47619c98-e8a1-469b-9068-15b23b54d980';
    const deviceId = '905de275-d0c0-4187-8255-ba55d17e09e8';
    const fakes = {
        putLightingServiceByZone: jest.fn(),
        putLightingServiceByZoneAndDevice: jest.fn(),
    };
    const handler = new LightingServiceMQTTHandler(
        {
            putLightingServiceByZone: fakes.putLightingServiceByZone,
            putLightingServiceByZoneAndDevice: fakes.putLightingServiceByZoneAndDevice,
        },
        ImmediateExecutionQueue,
        NoopLogger,
    );

    describe('handleZoneCommand()', () => {
        it('handles "set" "ON" zone commands', async () => {
            await handler.handleZoneCommand(zoneId, {
                command: 'set',
                payload: 'ON',
            });

            expect(fakes.putLightingServiceByZone).toBeCalledTimes(1);
            expect(fakes.putLightingServiceByZone).toBeCalledWith(zoneId, { intensity: 100 });
        });

        it('handles "set" "OFF" zone commands', async () => {
            await handler.handleZoneCommand(zoneId, {
                command: 'set',
                payload: 'OFF',
            });

            expect(fakes.putLightingServiceByZone).toBeCalledTimes(1);
            expect(fakes.putLightingServiceByZone).toBeCalledWith(zoneId, { intensity: 0 });
        });

        it('handles "brightness" zone commands', async () => {
            await handler.handleZoneCommand(zoneId, {
                command: 'brightness',
                payload: 42,
            });

            expect(fakes.putLightingServiceByZone).toBeCalledTimes(1);
            expect(fakes.putLightingServiceByZone).toBeCalledWith(zoneId, { intensity: 42 });
        });
    });

    describe('handleDeviceCommand()', () => {
        it('handles "set" "ON" device commands', async () => {
            await handler.handleDeviceCommand(zoneId, deviceId, {
                command: 'set',
                payload: 'ON',
            });

            expect(fakes.putLightingServiceByZoneAndDevice).toBeCalledTimes(1);
            expect(fakes.putLightingServiceByZoneAndDevice).toBeCalledWith(zoneId, deviceId, { intensity: 100 });
        });

        it('handles "set" "OFF" device commands', async () => {
            await handler.handleDeviceCommand(zoneId, deviceId, {
                command: 'set',
                payload: 'OFF',
            });

            expect(fakes.putLightingServiceByZoneAndDevice).toBeCalledTimes(1);
            expect(fakes.putLightingServiceByZoneAndDevice).toBeCalledWith(zoneId, deviceId, { intensity: 0 });
        });

        it('handles "brightness" device commands', async () => {
            await handler.handleDeviceCommand(zoneId, deviceId, {
                command: 'brightness',
                payload: 42,
            });

            expect(fakes.putLightingServiceByZoneAndDevice).toBeCalledTimes(1);
            expect(fakes.putLightingServiceByZoneAndDevice).toBeCalledWith(zoneId, deviceId, { intensity: 42 });
        });
    });
});
