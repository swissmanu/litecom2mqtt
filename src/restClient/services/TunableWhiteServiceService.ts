/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { putDimmableOption } from '../models/putDimmableOption.ts';
import type { putTunableWhiteService } from '../models/putTunableWhiteService.ts';
import type { TunableWhiteService } from '../models/TunableWhiteService.ts';
import type { CancelablePromise } from '../core/CancelablePromise.ts';
import { OpenAPI } from '../core/OpenAPI.ts';
import { request as __request } from '../core/request.ts';
export class TunableWhiteServiceService {
    /**
     * Returns the aggregate white colour temperature value in Kelvins [K] of all tuneable white luminaires in the area with specified __{zoneID}__.<br> The value will be `null` if not all devices in the area have the same intensity.<br><br> Attributes available via MQTT topic subscription:
     * * /zones/{zoneID}/services/tunableWhite**temperature**
     * @param zoneId The unique identifier of a room, group or zone (e.g. c0077c1d-c271-4485-ae01-88c328c07afe).
     * @returns TunableWhiteService The aggregate white colour temperature value in Kelvins [K] of all tuneable white luminaires in the area with specified __{zoneID}__.<br> The "temperature" attribute value can be `null` when:
     * * The area is not initialized;
     * * All devices under this area using this service do not have the same value;
     * * The area or any of its field devices are hosted on another controller and the execution needs to be forwarded;
     * * The value cannot be retrieved within an acceptable response time.
     * @throws ApiError
     */
    public static getTunableWhiteServiceByZone(
        zoneId: string,
    ): CancelablePromise<TunableWhiteService> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/zones/{zoneID}/services/tunableWhite',
            path: {
                'zoneID': zoneId,
            },
            errors: {
                404: `Details provided on HTTP 404 'Not Found' error.`,
            },
        });
    }
    /**
     * Sets the white colour temperature value in Kelvins [K] for all tuneable white luminaires in the area with specified __{zoneID}__.<br>
     * @param zoneId The unique identifier of a room, group or zone (e.g. c0077c1d-c271-4485-ae01-88c328c07afe).
     * @param requestBody
     * @returns TunableWhiteService The value set for white colour temperature in Kelvins [K] for all tuneable white luminaires in the area with specified __{zoneID}__.<br> The "temperature" attribute value can be `null` when:
     * * The area is not initialized;
     * * All devices under this area using this service do not have the same value;
     * * The area or any of its field devices are hosted on another controller and the execution needs to be forwarded;
     * * The value cannot be retrieved within an acceptable response time.
     * @throws ApiError
     */
    public static putTunableWhiteServiceByZone(
        zoneId: string,
        requestBody: putTunableWhiteService,
    ): CancelablePromise<TunableWhiteService> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/zones/{zoneID}/services/tunableWhite',
            path: {
                'zoneID': zoneId,
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
     * Start a brighten operation with `UP` towards a cold white colour temperature or a dimming operation with `DOWN` towards a warm white colour temperature on all tuneable white luminaires in the area specified by __{zoneID}__. A dimmable operation can be stopped by sending `STOP`.
     * @param zoneId The unique identifier of a room, group or zone (e.g. c0077c1d-c271-4485-ae01-88c328c07afe).
     * @param requestBody
     * @returns any The operation was accepted.
     * @throws ApiError
     */
    public static putDimmableTunableWhiteServiceByZone(
        zoneId: string,
        requestBody: putDimmableOption,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/zones/{zoneID}/services/tunableWhite/dimmable',
            path: {
                'zoneID': zoneId,
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
     * Returns the white colour temperature value in Kelvins [K] for the device with the specified __{deviceID}__ from the area with specified __{zoneID}__.<br><br> Attributes available via MQTT topic subscription:
     * * /zones/{zoneID}/services/tunableWhite**temperature**
     * @param zoneId The unique identifier of a room, group or zone (e.g. c0077c1d-c271-4485-ae01-88c328c07afe).
     * @param deviceId The unique identifier of a device (e.g. 29946137-08ce-4dcb-94bf-d124d768136b).
     * @returns TunableWhiteService The white colour temperature value in Kelvins [K] for the device with the specified __{deviceID}__ from the area with specified __{zoneID}__.<br> The "temperature" attribute value can be `null` when:
     * * The device is not initialized;
     * * The device is hosted on another controller and the execution needs to be forwarded;
     * * The value cannot be retrieved within an acceptable response time.
     * @throws ApiError
     */
    public static getTunableWhiteServiceByZoneAndDevice(
        zoneId: string,
        deviceId: string,
    ): CancelablePromise<TunableWhiteService> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/zones/{zoneID}/devices/{deviceID}/services/tunableWhite',
            path: {
                'zoneID': zoneId,
                'deviceID': deviceId,
            },
            errors: {
                404: `Details provided on HTTP 404 'Not Found' error.`,
            },
        });
    }
    /**
     * Sets the white colour temperature value in Kelvins [K] for the device with the specified __{deviceID}__ from the area with specified __{zoneID}__.<br>
     * @param zoneId The unique identifier of a room, group or zone (e.g. c0077c1d-c271-4485-ae01-88c328c07afe).
     * @param deviceId The unique identifier of a device (e.g. 29946137-08ce-4dcb-94bf-d124d768136b).
     * @param requestBody
     * @returns TunableWhiteService The white colour temperature value in Kelvins [K] from the device with specified __{deviceID}__ from the area with the specified __{zoneID}__.<br> The "temperature" attribute value can be `null` when:
     * * The device is not initialized;
     * * The device is hosted on another controller and the execution needs to be forwarded;
     * * The value cannot be retrieved within an acceptable response time.
     *
     * @throws ApiError
     */
    public static putTunableWhiteServiceByZoneAndDevice(
        zoneId: string,
        deviceId: string,
        requestBody: putTunableWhiteService,
    ): CancelablePromise<TunableWhiteService> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/zones/{zoneID}/devices/{deviceID}/services/tunableWhite',
            path: {
                'zoneID': zoneId,
                'deviceID': deviceId,
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
     * Start a brighten operation with `UP` towards a cold white colour temperature or a dimming operation with `DOWN` towards a warm white colour temperature on the tuneable white luminaire with the specified __{deviceID}__ from the area specified by __{zoneID}__. A dimmable operation can be stopped by sending `STOP`.
     * @param zoneId The unique identifier of a room, group or zone (e.g. c0077c1d-c271-4485-ae01-88c328c07afe).
     * @param deviceId The unique identifier of a device (e.g. 29946137-08ce-4dcb-94bf-d124d768136b).
     * @param requestBody
     * @returns any The operation was accepted.
     * @throws ApiError
     */
    public static putDimmableTunableWhiteServiceByZoneAndDevice(
        zoneId: string,
        deviceId: string,
        requestBody: putDimmableOption,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/zones/{zoneID}/devices/{deviceID}/services/tunableWhite/dimmable',
            path: {
                'zoneID': zoneId,
                'deviceID': deviceId,
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
