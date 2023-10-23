/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MotorService } from '../models/MotorService.js';
import type { putMotorDimmableOption } from '../models/putMotorDimmableOption.js';
import type { putMotorService } from '../models/putMotorService.js';
import type { CancelablePromise } from '../core/CancelablePromise.js';
import { OpenAPI } from '../core/OpenAPI.js';
import { request as __request } from '../core/request.js';
export class WindowServiceService {
    /**
     * Returns the aggregated window position value in percentage [%] for the area with specified __{zoneID}__.<br> The value will be `null` if not all windows in the area have the same position.<br><br> Attributes available via MQTT topic subscription:
     * * /zones/{zoneID}/services/window**position**
     * @param zoneId The unique identifier of a room, group or zone (e.g. c0077c1d-c271-4485-ae01-88c328c07afe).
     * @returns MotorService The aggregated window position value in percentage [%] for the area with specified __{zoneID}__.<br> The "position" attribute value can be `null` when:
     * * The area is not initialized;
     * * All devices under this area using this service do not have the same value;
     * * The area or any of its field devices are hosted on another controller and the execution needs to be forwarded;
     * * The value cannot be retrieved within an acceptable response time.
     *
     * @throws ApiError
     */
    public static getWindowServiceByZone(zoneId: string): CancelablePromise<MotorService> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/zones/{zoneID}/services/window',
            path: {
                zoneID: zoneId,
            },
            errors: {
                404: `Details provided on HTTP 404 'Not Found' error.`,
            },
        });
    }
    /**
     * Sets position value in percentage [%] for all windows in the area with specified __{zoneID}__.
     * @param zoneId The unique identifier of a room, group or zone (e.g. c0077c1d-c271-4485-ae01-88c328c07afe).
     * @param requestBody
     * @returns MotorService The requested command is accepted for execution and the service resource is returned. The "position" attribute value can be `null` when:
     * * A relative position command was executed: `STEP_OPEN`, `STEP_CLOSE`, `STOP`;
     * * The area is not initialized;
     * * All devices under this area using this service do not have the same value;
     * * The area or any of its field devices are hosted on another controller;
     * * The value cannot be retrieved within an acceptable response time.
     *
     * @throws ApiError
     */
    public static putWindowServiceByZone(
        zoneId: string,
        requestBody: putMotorService,
    ): CancelablePromise<MotorService> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/zones/{zoneID}/services/window',
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
     * Start a movement operation to `OPEN`or `CLOSE` all the windows in the area specified by __{zoneID}__. A dimmable operation can be stopped by sending `STOP`.
     * @param zoneId The unique identifier of a room, group or zone (e.g. c0077c1d-c271-4485-ae01-88c328c07afe).
     * @param requestBody
     * @returns any The operation was accepted.
     * @throws ApiError
     */
    public static putDimmableWindowServiceByZone(
        zoneId: string,
        requestBody: putMotorDimmableOption,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/zones/{zoneID}/services/window/dimmable',
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
     * Returns the window position value in percentage [%] for the device with the specified __{deviceID}__ from the area with the specified __{zoneID}__.<br><br> Attributes available via MQTT topic subscription:
     * * /zones/{zoneID}/devices/{deviceID}/services/window**position**
     * @param zoneId The unique identifier of a room, group or zone (e.g. c0077c1d-c271-4485-ae01-88c328c07afe).
     * @param deviceId The unique identifier of a device (e.g. 29946137-08ce-4dcb-94bf-d124d768136b).
     * @returns MotorService The window position value in percentage [%] for the device with the specified __{deviceID}__ from the area with the specified __{zoneID}__.<br> The "position" attribute value can be `null` when:
     * * The device is not initialized;
     * * The device is hosted on another controller and the execution needs to be forwarded;
     * * The value cannot be retrieved within an acceptable response time.
     * @throws ApiError
     */
    public static getWindowServiceByZoneAndDevice(zoneId: string, deviceId: string): CancelablePromise<MotorService> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/zones/{zoneID}/devices/{deviceID}/services/window',
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
     * Sets the window position value in percentage [%] for the device with the specified __{deviceID}__ from the area with the specified __{zoneID}__.
     * @param zoneId The unique identifier of a room, group or zone (e.g. c0077c1d-c271-4485-ae01-88c328c07afe).
     * @param deviceId The unique identifier of a device (e.g. 29946137-08ce-4dcb-94bf-d124d768136b).
     * @param requestBody
     * @returns MotorService The requested command is accepted for execution and the service resource is returned. The "position" attribute value can be `null` when:
     * * A relative position command was executed: `STEP_OPEN`, `STEP_CLOSE`, `STOP`;
     * * The device is not initialized;
     * * The device is hosted on another controller;
     * * The value cannot be retrieved within an acceptable response time.
     *
     * @throws ApiError
     */
    public static putWindowServiceByZoneAndDevice(
        zoneId: string,
        deviceId: string,
        requestBody: putMotorService,
    ): CancelablePromise<MotorService> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/zones/{zoneID}/devices/{deviceID}/services/window',
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
     * Start a movement operation to `OPEN` or `CLOSE` the window with the specified __{deviceID}__ from the area with the specified __{zoneID}__. A dimmable operation can be stopped by sending `STOP`.
     * @param zoneId The unique identifier of a room, group or zone (e.g. c0077c1d-c271-4485-ae01-88c328c07afe).
     * @param deviceId The unique identifier of a device (e.g. 29946137-08ce-4dcb-94bf-d124d768136b).
     * @param requestBody
     * @returns any The operation was accepted.
     * @throws ApiError
     */
    public static putDimmableWindowServiceByZoneAndDevice(
        zoneId: string,
        deviceId: string,
        requestBody: putMotorDimmableOption,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/zones/{zoneID}/devices/{deviceID}/services/window/dimmable',
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
