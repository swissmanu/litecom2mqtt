/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise.js';
import { OpenAPI } from '../core/OpenAPI.js';
import { request as __request } from '../core/request.js';
export class SensorDataService {
    /**
     * Returns the input state value of the device with the specified __{deviceID}__ from the area with the specified __{zoneID}__.<br><br> Attributes available via MQTT topic subscription:
     * * /zones/{zoneID}/devices/{deviceID}/data**inputState**
     * @param zoneId The unique identifier of a room, group or zone (e.g. c0077c1d-c271-4485-ae01-88c328c07afe).
     * @param deviceId The unique identifier of a device (e.g. 29946137-08ce-4dcb-94bf-d124d768136b).
     * @returns string The input state value for the device with the specified __{deviceID}__ from the area with the specified __{zoneID}__.
     * @throws ApiError
     */
    public static getInputStateByZoneAndDevice(zoneId: string, deviceId: string): CancelablePromise<'OPEN' | 'CLOSED'> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/zones/{zoneID}/devices/{deviceID}/data/inputState',
            path: {
                zoneID: zoneId,
                deviceID: deviceId,
            },
        });
    }
    /**
     * Returns the brightness value of the sensor device with the specified __{deviceID}__ from the area with the specified __{zoneID}__.<br><br> Attributes available via MQTT topic subscription:
     * * /zones/{zoneID}/devices/{deviceID}/data**brightness**
     * @param zoneId The unique identifier of a room, group or zone (e.g. c0077c1d-c271-4485-ae01-88c328c07afe).
     * @param deviceId The unique identifier of a device (e.g. 29946137-08ce-4dcb-94bf-d124d768136b).
     * @returns number The brightness value in lux [lx] of the sensor device with the specified __{deviceID}__ from the area with the specified __{zoneID}__.
     * @throws ApiError
     */
    public static getBrightnessByZoneAndDevice(zoneId: string, deviceId: string): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/zones/{zoneID}/devices/{deviceID}/data/brightness',
            path: {
                zoneID: zoneId,
                deviceID: deviceId,
            },
        });
    }
    /**
     * Returns the intensity value in percentage [%] of the sensor device with the specified __{deviceID}__ from the area with the specified __{zoneID}__. Typically available from a generic intensity sensor.<br><br> Attributes available via MQTT topic subscription:
     * * /zones/{zoneID}/devices/{deviceID}/data**intensity**
     * @param zoneId The unique identifier of a room, group or zone (e.g. c0077c1d-c271-4485-ae01-88c328c07afe).
     * @param deviceId The unique identifier of a device (e.g. 29946137-08ce-4dcb-94bf-d124d768136b).
     * @returns number The intensity value in percentage [%] for the sensor device with the specified __{deviceID}__ from the area with the specified __{zoneID}__.
     * @throws ApiError
     */
    public static getIntensityByZoneAndDevice(zoneId: string, deviceId: string): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/zones/{zoneID}/devices/{deviceID}/data/intensity',
            path: {
                zoneID: zoneId,
                deviceID: deviceId,
            },
        });
    }
    /**
     * Returns the presence detection state of the sensor device with the specified __{deviceID}__ from the area with the specified __{zoneID}__.<br><br> Attributes available via MQTT topic subscription:
     * * /zones/{zoneID}/devices/{deviceID}/data**presence**
     * @param zoneId The unique identifier of a room, group or zone (e.g. c0077c1d-c271-4485-ae01-88c328c07afe).
     * @param deviceId The unique identifier of a device (e.g. 29946137-08ce-4dcb-94bf-d124d768136b).
     * @returns boolean The presence detection state of the sensor device with the specified __{deviceID}__ from the area with the specified __{zoneID}__.
     * @throws ApiError
     */
    public static getPresenceByZoneAndDevice(zoneId: string, deviceId: string): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/zones/{zoneID}/devices/{deviceID}/data/presence',
            path: {
                zoneID: zoneId,
                deviceID: deviceId,
            },
        });
    }
    /**
     * Returns the average noise value in Decibels [dB] of the sensor device with the specified __{deviceID}__ from the area with the specified __{zoneID}__.<br><br> Attributes available via MQTT topic subscription:
     * * /zones/{zoneID}/devices/{deviceID}/data**averageNoise**
     * @param zoneId The unique identifier of a room, group or zone (e.g. c0077c1d-c271-4485-ae01-88c328c07afe).
     * @param deviceId The unique identifier of a device (e.g. 29946137-08ce-4dcb-94bf-d124d768136b).
     * @returns number The average noise value in Decibels [dB] of the sensor device with the specified __{deviceID}__ from the area with the specified __{zoneID}__.
     * @throws ApiError
     */
    public static getAverageNoiseByZoneAndDevice(zoneId: string, deviceId: string): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/zones/{zoneID}/devices/{deviceID}/data/averageNoise',
            path: {
                zoneID: zoneId,
                deviceID: deviceId,
            },
        });
    }
    /**
     * Returns the minimum noise value in Decibels [dB] of the sensor device with the specified __{deviceID}__ from the area with the specified __{zoneID}__.<br><br> Attributes available via MQTT topic subscription:
     * * /zones/{zoneID}/devices/{deviceID}/data**minimumNoise**
     * @param zoneId The unique identifier of a room, group or zone (e.g. c0077c1d-c271-4485-ae01-88c328c07afe).
     * @param deviceId The unique identifier of a device (e.g. 29946137-08ce-4dcb-94bf-d124d768136b).
     * @returns number The minimum noise value in Decibels [dB] of the sensor device with the specified __{deviceID}__ from the area with the specified __{zoneID}__.
     * @throws ApiError
     */
    public static getMinimumNoiseByZoneAndDevice(zoneId: string, deviceId: string): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/zones/{zoneID}/devices/{deviceID}/data/minimumNoise',
            path: {
                zoneID: zoneId,
                deviceID: deviceId,
            },
        });
    }
    /**
     * Returns the maximum noise value in Decibels [dB] of the sensor device with the specified __{deviceID}__ from the area with the specified __{zoneID}__.<br><br> Attributes available via MQTT topic subscription:
     * * /zones/{zoneID}/devices/{deviceID}/data**maximumNoise**
     * @param zoneId The unique identifier of a room, group or zone (e.g. c0077c1d-c271-4485-ae01-88c328c07afe).
     * @param deviceId The unique identifier of a device (e.g. 29946137-08ce-4dcb-94bf-d124d768136b).
     * @returns number The maximum noise value in Decibels [dB] of the sensor device with the specified __{deviceID}__ from the area with the specified __{zoneID}__.
     * @throws ApiError
     */
    public static getMaximumNoiseByZoneAndDevice(zoneId: string, deviceId: string): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/zones/{zoneID}/devices/{deviceID}/data/maximumNoise',
            path: {
                zoneID: zoneId,
                deviceID: deviceId,
            },
        });
    }
    /**
     * Returns the CO2 value in parts-per-million [ppm] of the sensor device with the specified __{deviceID}__ from the area with the specified __{zoneID}__.<br><br> Attributes available via MQTT topic subscription:
     * * /zones/{zoneID}/devices/{deviceID}/data**co2**
     * @param zoneId The unique identifier of a room, group or zone (e.g. c0077c1d-c271-4485-ae01-88c328c07afe).
     * @param deviceId The unique identifier of a device (e.g. 29946137-08ce-4dcb-94bf-d124d768136b).
     * @returns number The CO2 value in parts-per-million [ppm] of the sensor device with the specified __{deviceID}__ from the area with the specified __{zoneID}__.
     * @throws ApiError
     */
    public static getCo2ByZoneAndDevice(zoneId: string, deviceId: string): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/zones/{zoneID}/devices/{deviceID}/data/co2',
            path: {
                zoneID: zoneId,
                deviceID: deviceId,
            },
        });
    }
    /**
     * Returns the VOC value in parts-per-million [ppm] of the sensor device with the specified __{deviceID}__ from the area with the specified __{zoneID}__.<br><br> Attributes available via MQTT topic subscription:
     * * /zones/{zoneID}/devices/{deviceID}/data**voc**
     * @param zoneId The unique identifier of a room, group or zone (e.g. c0077c1d-c271-4485-ae01-88c328c07afe).
     * @param deviceId The unique identifier of a device (e.g. 29946137-08ce-4dcb-94bf-d124d768136b).
     * @returns number The VOC value in parts-per-million [ppm] of the sensor device with the specified __{deviceID}__ from the area with the specified __{zoneID}__.
     * @throws ApiError
     */
    public static getVocByZoneAndDevice(zoneId: string, deviceId: string): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/zones/{zoneID}/devices/{deviceID}/data/voc',
            path: {
                zoneID: zoneId,
                deviceID: deviceId,
            },
        });
    }
    /**
     * Returns the humidity value in parts-per-million [ppm] of the sensor device with the specified __{deviceID}__ from the area with the specified __{zoneID}__.<br><br> Attributes available via MQTT topic subscription:
     * * /zones/{zoneID}/devices/{deviceID}/data**humidity**
     * @param zoneId The unique identifier of a room, group or zone (e.g. c0077c1d-c271-4485-ae01-88c328c07afe).
     * @param deviceId The unique identifier of a device (e.g. 29946137-08ce-4dcb-94bf-d124d768136b).
     * @returns number The humidity value in parts-per-million [ppm] of the sensor device with the specified __{deviceID}__ from the area with the specified __{zoneID}__.
     * @throws ApiError
     */
    public static getHumidityByZoneAndDevice(zoneId: string, deviceId: string): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/zones/{zoneID}/devices/{deviceID}/data/humidity',
            path: {
                zoneID: zoneId,
                deviceID: deviceId,
            },
        });
    }
    /**
     * Returns the relative humidity value in percentage [%] of the sensor device with the specified __{deviceID}__ from the area with the specified __{zoneID}__.<br><br> Attributes available via MQTT topic subscription:
     * * /zones/{zoneID}/devices/{deviceID}/data/humidity**relative**
     * @param zoneId The unique identifier of a room, group or zone (e.g. c0077c1d-c271-4485-ae01-88c328c07afe).
     * @param deviceId The unique identifier of a device (e.g. 29946137-08ce-4dcb-94bf-d124d768136b).
     * @returns number The relative humidity value in percentage [%] of the sensor device with the specified __{deviceID}__ from the area with the specified __{zoneID}__.
     * @throws ApiError
     */
    public static getRelativeHumidityByZoneAndDevice(zoneId: string, deviceId: string): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/zones/{zoneID}/devices/{deviceID}/data/humidity/relative',
            path: {
                zoneID: zoneId,
                deviceID: deviceId,
            },
        });
    }
    /**
     * Returns the temperature value in Celsius degrees [ºC] of the sensor device with the specified __{deviceID}__ from the area with the specified __{zoneID}__.<br><br> Attributes available via MQTT topic subscription:
     * * /zones/{zoneID}/devices/{deviceID}/data**temperature**
     * @param zoneId The unique identifier of a room, group or zone (e.g. c0077c1d-c271-4485-ae01-88c328c07afe).
     * @param deviceId The unique identifier of a device (e.g. 29946137-08ce-4dcb-94bf-d124d768136b).
     * @returns number The temperature value in Celsius degrees [ºC] of the sensor device with the specified __{deviceID}__ from the area with the specified __{zoneID}__.
     * @throws ApiError
     */
    public static getTemperatureByZoneAndDevice(zoneId: string, deviceId: string): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/zones/{zoneID}/devices/{deviceID}/data/temperature',
            path: {
                zoneID: zoneId,
                deviceID: deviceId,
            },
        });
    }
    /**
     * Returns the leveled temperature value in Celsius degrees [ºC] of the sensor device with the specified __{deviceID}__ from the area with the specified __{zoneID}__.<br><br> Attributes available via MQTT topic subscription:
     * * /zones/{zoneID}/devices/{deviceID}/data/temperature**leveled**
     * @param zoneId The unique identifier of a room, group or zone (e.g. c0077c1d-c271-4485-ae01-88c328c07afe).
     * @param deviceId The unique identifier of a device (e.g. 29946137-08ce-4dcb-94bf-d124d768136b).
     * @returns number The leveled temperature value in Celsius degrees [ºC] of the sensor device with the specified __{deviceID}__ from the area with the specified __{zoneID}__.
     * @throws ApiError
     */
    public static getLeveledTemperatureByZoneAndDevice(zoneId: string, deviceId: string): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/zones/{zoneID}/devices/{deviceID}/data/temperature/leveled',
            path: {
                zoneID: zoneId,
                deviceID: deviceId,
            },
        });
    }
}
