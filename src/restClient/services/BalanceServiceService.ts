/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BalanceService } from '../models/BalanceService.ts';
import type { putBalanceService } from '../models/putBalanceService.ts';
import type { putDimmableOption } from '../models/putDimmableOption.ts';
import type { CancelablePromise } from '../core/CancelablePromise.ts';
import { OpenAPI } from '../core/OpenAPI.ts';
import { request as __request } from '../core/request.ts';
export class BalanceServiceService {
    /**
     * Returns the aggregated light balance value in percentage [%] of all balance luminaires in the area with specified __{zoneID}__. A "balance" value of `100` means only direct light and `0` only indirect light.<br> The value will be `null` if not all balance luminaires in the area have the same balance value.<br><br> Attributes available via MQTT topic subscription:
     * * /zones/{zoneID}/services/balance**balance**
     * @param zoneId The unique identifier of a room, group or zone (e.g. c0077c1d-c271-4485-ae01-88c328c07afe).
     * @returns BalanceService The aggregated light balance value in percentage [%] of all balance luminaires in the area with specified __{zoneID}__.<br> The "balance" attribute value can be `null` when:
     * * The area is not initialized;
     * * All devices under this area using this service do not have the same value;
     * * The area or any of its field devices are hosted on another controller and the execution needs to be forwarded;
     * * The value cannot be retrieved within an acceptable response time.
     *
     * @throws ApiError
     */
    public static getBalanceServiceByZone(
        zoneId: string,
    ): CancelablePromise<BalanceService> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/zones/{zoneID}/services/balance',
            path: {
                'zoneID': zoneId,
            },
            errors: {
                404: `Details provided on HTTP 404 'Not Found' error.`,
            },
        });
    }
    /**
     * Sets the light balance value in percentage [%] on all balance luminaires in the area with specified __{zoneID}__.<br>
     * @param zoneId The unique identifier of a room, group or zone (e.g. c0077c1d-c271-4485-ae01-88c328c07afe).
     * @param requestBody
     * @returns BalanceService The set light balance value in percentage [%] for all balance luminaires in the area with specified __{zoneID}__.<br> The "balance" attribute value can be `null` when:
     * * The area is not initialized;
     * * All devices under this area using this service do not have the same value;
     * * The area or any of its field devices are hosted on another controller and the execution needs to be forwarded;
     * * The value cannot be retrieved within an acceptable response time.
     * @throws ApiError
     */
    public static putBalanceServiceByZone(
        zoneId: string,
        requestBody: putBalanceService,
    ): CancelablePromise<BalanceService> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/zones/{zoneID}/services/balance',
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
     * Sets the light balance towards the direct light with `UP` or towards the indirect light with `DOWN` on all balance luminaires in the area specified by __{zoneID}__. A dimmable operation can be stopped by sending `STOP`.
     * @param zoneId The unique identifier of a room, group or zone (e.g. c0077c1d-c271-4485-ae01-88c328c07afe).
     * @param requestBody
     * @returns any The operation was accepted.
     * @throws ApiError
     */
    public static putDimmableBalanceServiceByZone(
        zoneId: string,
        requestBody: putDimmableOption,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/zones/{zoneID}/services/balance/dimmable',
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
     * Returns the light balance value in percentage [%] for the balance luminaire with the specified __{deviceID}__ in the area with the specified __{zoneID}__. A "balance" value of `100` means only direct light and `0` only indirect light.<br><br> Attributes available via MQTT topic subscription:
     * * /zones/{zoneID}/devices/{deviceID}/services/balance**balance**
     * @param zoneId The unique identifier of a room, group or zone (e.g. c0077c1d-c271-4485-ae01-88c328c07afe).
     * @param deviceId The unique identifier of a device (e.g. 29946137-08ce-4dcb-94bf-d124d768136b).
     * @returns BalanceService The light balance value in percentage [%] for the balance luminaire with the specified __{deviceID}__ in the area with the specified __{zoneID}__.<br> The "balance" attribute value can be `null` when:
     * * The device is not initialized;
     * * The device is hosted on another controller and the execution needs to be forwarded;
     * * The value cannot be retrieved within an acceptable response time.
     *
     * @throws ApiError
     */
    public static getBalanceServiceByZoneAndDevice(
        zoneId: string,
        deviceId: string,
    ): CancelablePromise<BalanceService> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/zones/{zoneID}/devices/{deviceID}/services/balance',
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
     * Sets the light balance value in percentage [%] for the balance luminaire with the specified __{deviceID}__ in the area with the specified __{zoneID}__.
     * @param zoneId The unique identifier of a room, group or zone (e.g. c0077c1d-c271-4485-ae01-88c328c07afe).
     * @param deviceId The unique identifier of a device (e.g. 29946137-08ce-4dcb-94bf-d124d768136b).
     * @param requestBody
     * @returns BalanceService The set light balance value in percentage [%] for the balance luminaire with the specified __{deviceID}__ in the area with the specified __{zoneID}__.<br> The "balance" attribute value can be `null` when:
     * * The device is not initialized;
     * * The device is hosted on another controller and the execution needs to be forwarded;
     * * The value cannot be retrieved within an acceptable response time.
     * @throws ApiError
     */
    public static putBalanceServiceByZoneAndDevice(
        zoneId: string,
        deviceId: string,
        requestBody: putBalanceService,
    ): CancelablePromise<BalanceService> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/zones/{zoneID}/devices/{deviceID}/services/balance',
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
     * Sets the light balance towards the direct light with `UP` or towards the indirect light with `DOWN` on the balance luminaire with the specified __{deviceID}__ in the area with the specified __{zoneID}__. A dimmable operation can be stopped by sending `STOP`.
     * @param zoneId The unique identifier of a room, group or zone (e.g. c0077c1d-c271-4485-ae01-88c328c07afe).
     * @param deviceId The unique identifier of a device (e.g. 29946137-08ce-4dcb-94bf-d124d768136b).
     * @param requestBody
     * @returns any The operation was accepted.
     * @throws ApiError
     */
    public static putDimmableBalanceServiceByZoneAndDevice(
        zoneId: string,
        deviceId: string,
        requestBody: putDimmableOption,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/zones/{zoneID}/devices/{deviceID}/services/balance/dimmable',
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
