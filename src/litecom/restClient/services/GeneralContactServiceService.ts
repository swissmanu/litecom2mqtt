/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GeneralContactService } from '../models/GeneralContactService.js';
import type { putGeneralContactService } from '../models/putGeneralContactService.js';
import type { CancelablePromise } from '../core/CancelablePromise.js';
import { OpenAPI } from '../core/OpenAPI.js';
import { request as __request } from '../core/request.js';
export class GeneralContactServiceService {
    /**
     * Returns the aggregated output state 'OPEN' or 'CLOSED' of all general contacts in the area with specified __{zoneID}__.<br> The value will be `null` if not all general contacts in the area have the same state.<br><br> Attributes available via MQTT topic subscription:
     * * /zones/{zoneID}/services/generalContact**outputState**
     * @param zoneId The unique identifier of a room, group or zone (e.g. c0077c1d-c271-4485-ae01-88c328c07afe).
     * @returns GeneralContactService The aggregated output state 'OPEN' or 'CLOSED' of all general contacts for the area with specified __{zoneID}__.<br> The "outputState" attribute value can be `null` when:
     * * The area is not initialized;
     * * All devices under this area using this service do not have the same value;
     * * The area or any of its field devices are hosted on another controller and the execution needs to be forwarded;
     * * The value cannot be retrieved within an acceptable response time.
     *
     * @throws ApiError
     */
    public static getGeneralContactServiceByZone(zoneId: string): CancelablePromise<GeneralContactService> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/zones/{zoneID}/services/generalContact',
            path: {
                zoneID: zoneId,
            },
            errors: {
                404: `Details provided on HTTP 404 'Not Found' error.`,
            },
        });
    }
    /**
     * Sets the output state to 'OPEN' or 'CLOSED' on all general contacts for the area with specified __{zoneID}__.<br>
     * @param zoneId The unique identifier of a room, group or zone (e.g. c0077c1d-c271-4485-ae01-88c328c07afe).
     * @param requestBody
     * @returns GeneralContactService The aggregated output state 'OPEN' or 'CLOSED' of all general contacts for the area with specified __{zoneID}__.<br> The "outputState" attribute value can be `null` when:
     * * The area is not initialized;
     * * All devices under this area using this service do not have the same value;
     * * The area or any of its field devices are hosted on another controller and the execution needs to be forwarded;
     * * The value cannot be retrieved within an acceptable response time.
     * @throws ApiError
     */
    public static putGeneralContactServiceByZone(
        zoneId: string,
        requestBody: putGeneralContactService,
    ): CancelablePromise<GeneralContactService> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/zones/{zoneID}/services/generalContact',
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
     * Returns the output state 'OPEN' or 'CLOSED' of the general contact device with the specified __{deviceID}__ for the area with specified __{zoneID}__.<br><br> Attributes available via MQTT topic subscription:
     * * /zones/{zoneID}/devices/{deviceID}/services/generalContact**outputState**
     * @param zoneId The unique identifier of a room, group or zone (e.g. c0077c1d-c271-4485-ae01-88c328c07afe).
     * @param deviceId The unique identifier of a device (e.g. 29946137-08ce-4dcb-94bf-d124d768136b).
     * @returns GeneralContactService The output state 'OPEN' or 'CLOSED' of the general contact device with the specified __{deviceID}__ for the area with specified __{zoneID}__.<br> The "outputState" attribute value can be `null` when:
     * * The device is not initialized;
     * * The device is hosted on another controller and the execution needs to be forwarded;
     * * The value cannot be retrieved within an acceptable response time.
     *
     * @throws ApiError
     */
    public static getGeneralContactServiceByZoneAndDevice(
        zoneId: string,
        deviceId: string,
    ): CancelablePromise<GeneralContactService> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/zones/{zoneID}/devices/{deviceID}/services/generalContact',
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
     * Sets the output state 'OPEN' or 'CLOSED' on the general contact device with the specified __{deviceID}__ for the area with specified __{zoneID}__.<br>
     * @param zoneId The unique identifier of a room, group or zone (e.g. c0077c1d-c271-4485-ae01-88c328c07afe).
     * @param deviceId The unique identifier of a device (e.g. 29946137-08ce-4dcb-94bf-d124d768136b).
     * @param requestBody
     * @returns GeneralContactService The set output state 'OPEN' or 'CLOSED' of the general contact device with the specified __{deviceID}__ for the area with specified __{zoneID}__.<br> The "outputState" attribute value can be `null` when:
     * * The device is not initialized;
     * * The device is hosted on another controller and the execution needs to be forwarded;
     * * The value cannot be retrieved within an acceptable response time.
     *
     * @throws ApiError
     */
    public static putGeneralContactServiceByZoneAndDevice(
        zoneId: string,
        deviceId: string,
        requestBody: putGeneralContactService,
    ): CancelablePromise<GeneralContactService> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/zones/{zoneID}/devices/{deviceID}/services/generalContact',
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
