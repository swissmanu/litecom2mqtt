/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LightingService } from '../models/LightingService.js';
import type { putDimmableOption } from '../models/putDimmableOption.js';
import type { putLightingService } from '../models/putLightingService.js';
import type { CancelablePromise } from '../core/CancelablePromise.js';
import { OpenAPI } from '../core/OpenAPI.js';
import { request as __request } from '../core/request.js';
export class LightingServiceService {
    /**
     * Returns the current aggregated intensity value in percentage [%] of all luminaires in the area with specified __{zoneID}__.<br> The value will be `null` if not all devices in the area have the same intensity.<br><br> Attributes available via MQTT topic subscription:
     * * /zones/{zoneID}/services/lighting**intensity**
     * @param zoneId The unique identifier of a room, group or zone (e.g. c0077c1d-c271-4485-ae01-88c328c07afe).
     * @returns LightingService The current aggregated intensity value in percentage [%] of all luminaires in the area with specified __{zoneID}__.<br> The "intensity" attribute value can be `null` when:
     * * The area is not initialized;
     * * All devices under this area using this service do not have the same value;
     * * The area or any of its field devices are hosted on another controller and the execution needs to be forwarded;
     * * The value cannot be retrieved within an acceptable response time.
     * @throws ApiError
     */
    public static getLightingServiceByZone(zoneId: string): CancelablePromise<LightingService> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/zones/{zoneID}/services/lighting',
            path: {
                zoneID: zoneId,
            },
            errors: {
                404: `Details provided on HTTP 404 'Not Found' error.`,
            },
        });
    }
    /**
     * Sets the current aggregated intensity value in percentage [%] for all luminaires in the area with specified __{zoneID}__.<br>. This operation also sets the "outOfTune" attribute to `true` in the corresponding _Scene service_.<br> For the devices contained in the area the same intensity value is set, and also the "outOfTune" attribute is set to `true` in the corresponding device _Scene service_.
     * @param zoneId The unique identifier of a room, group or zone (e.g. c0077c1d-c271-4485-ae01-88c328c07afe).
     * @param requestBody
     * @returns LightingService The set intensity value in percentage [%] of all luminaires in the area with specified __{zoneID}__.<br> The "intensity" attribute value can be `null` when:
     * * The area is not initialized;
     * * All devices under this area using this service do not have the same value;
     * * The area or any of its field devices are hosted on another controller and the execution needs to be forwarded;
     * * The value cannot be retrieved within an acceptable response time.
     * @throws ApiError
     */
    public static putLightingServiceByZone(
        zoneId: string,
        requestBody: putLightingService,
    ): CancelablePromise<LightingService> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/zones/{zoneID}/services/lighting',
            path: {
                zoneID: zoneId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Details provided on HTTP 400 'Bad request' error.`,
                404: `Details provided on HTTP 404 'Not Found' error.`,
            },
        });
    }
    /**
     * Start a brighten operation with `UP` or a dimming operation with `DOWN` on all luminaires in the area specified by __{zoneID}__. A dimmable operation can be stopped by sending `STOP`.<br> This operation also sets the "outOfTune" attribute to `true` in the corresponding _Scene service_ of the area and its devices.
     * @param zoneId The unique identifier of a room, group or zone (e.g. c0077c1d-c271-4485-ae01-88c328c07afe).
     * @param requestBody
     * @returns any The operation was accepted.
     * @throws ApiError
     */
    public static putDimmableLightingServiceByZone(
        zoneId: string,
        requestBody: putDimmableOption,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/zones/{zoneID}/services/lighting/dimmable',
            path: {
                zoneID: zoneId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Details provided on HTTP 400 'Bad request' error.`,
                404: `Details provided on HTTP 404 'Not Found' error.`,
            },
        });
    }
    /**
     * Returns the current intensity value in percentage [%] for the device with specified __{deviceID}__ from the area with the specified __{zoneID}__.<br><br> Attributes available via MQTT topic subscription:
     * * /zones/{zoneID}/devices/{deviceID}/services/lighting**intensity**
     * @param zoneId The unique identifier of a room, group or zone (e.g. c0077c1d-c271-4485-ae01-88c328c07afe).
     * @param deviceId The unique identifier of a device (e.g. 29946137-08ce-4dcb-94bf-d124d768136b).
     * @returns LightingService The current intensity value in percentage [%] for the device with specified __{deviceID}__ from the area with the specified __{zoneID}__.<br> The "intensity" attribute value can be `null` when:
     * * The device is not initialized;
     * * The device is hosted on another controller and the execution needs to be forwarded;
     * * The value cannot be retrieved within an acceptable response time.
     *
     * @throws ApiError
     */
    public static getLightingServiceByZoneAndDevice(
        zoneId: string,
        deviceId: string,
    ): CancelablePromise<LightingService> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/zones/{zoneID}/devices/{deviceID}/services/lighting',
            path: {
                zoneID: zoneId,
                deviceID: deviceId,
            },
            errors: {
                404: `Details provided on HTTP 404 'Not Found' error.`,
            },
        });
    }
    /**
     * Sets the intensity value in percentage [%] for the device with the specified __{deviceID}__ from the area with the specified __{zoneID}__.<br> This operation also sets the "outOfTune" attribute to `true` in the corresponding _Scene service_ of the device.
     * @param zoneId The unique identifier of a room, group or zone (e.g. c0077c1d-c271-4485-ae01-88c328c07afe).
     * @param deviceId The unique identifier of a device (e.g. 29946137-08ce-4dcb-94bf-d124d768136b).
     * @param requestBody
     * @returns LightingService The intensity value in percentage [%] set on the device with specified __{deviceID}__ from the area with the specified __{zoneID}__.<br> The "intensity" attribute value can be `null` when:
     * * The device is not initialized;
     * * The device is hosted on another controller and the execution needs to be forwarded;
     * * The value cannot be retrieved within an acceptable response time.
     * @throws ApiError
     */
    public static putLightingServiceByZoneAndDevice(
        zoneId: string,
        deviceId: string,
        requestBody: putLightingService,
    ): CancelablePromise<LightingService> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/zones/{zoneID}/devices/{deviceID}/services/lighting',
            path: {
                zoneID: zoneId,
                deviceID: deviceId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Details provided on HTTP 400 'Bad request' error.`,
                404: `Details provided on HTTP 404 'Not Found' error.`,
            },
        });
    }
    /**
     * Start a brighten operation with `UP` or a dimming operation with `DOWN` on the luminaire specified by __{deviceID}__ from the area with the specified __{zoneID}__. A dimmable operation can be stopped by sending `STOP`.<br> This operation also sets the "outOfTune" attribute to `true` in the corresponding _Scene service_.
     * @param zoneId The unique identifier of a room, group or zone (e.g. c0077c1d-c271-4485-ae01-88c328c07afe).
     * @param deviceId The unique identifier of a device (e.g. 29946137-08ce-4dcb-94bf-d124d768136b).
     * @param requestBody
     * @returns any The operation was accepted.
     * @throws ApiError
     */
    public static putDimmableLightingServiceByZoneAndDevice(
        zoneId: string,
        deviceId: string,
        requestBody: putDimmableOption,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/zones/{zoneID}/devices/{deviceID}/services/lighting/dimmable',
            path: {
                zoneID: zoneId,
                deviceID: deviceId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Details provided on HTTP 400 'Bad request' error.`,
                404: `Details provided on HTTP 404 'Not Found' error.`,
            },
        });
    }
}
