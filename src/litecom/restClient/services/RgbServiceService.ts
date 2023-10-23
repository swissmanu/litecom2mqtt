/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { putRGBService } from '../models/putRGBService.js';
import type { RGBService } from '../models/RGBService.js';
import type { CancelablePromise } from '../core/CancelablePromise.js';
import { OpenAPI } from '../core/OpenAPI.js';
import { request as __request } from '../core/request.js';
export class RgbServiceService {
    /**
     * Returns the aggregate RGB colour in hexadecimal format (#RRGGBB) of all RGB colour luminaires in the area with specified __{zoneID}__.<br> The value will be `null` if not all devices in the area have the same RGB colour.<br><br> Attributes available via MQTT topic subscription:
     * * /zones/{zoneID}/services/rgb**colour**
     * @param zoneId The unique identifier of a room, group or zone (e.g. c0077c1d-c271-4485-ae01-88c328c07afe).
     * @returns RGBService The aggregate RGB colour in hexadecimal format (#RRGGBB) of all RGB colour luminaires in the area with specified __{zoneID}__.<br> The "colour" attribute value can be `null` when:
     * * The area is not initialized;
     * * All devices under this area using this service do not have the same value;
     * * The area or any of its field devices are hosted on another controller and the execution needs to be forwarded;
     * * The value cannot be retrieved within an acceptable response time.
     * @throws ApiError
     */
    public static getRgbServiceByZone(zoneId: string): CancelablePromise<RGBService> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/zones/{zoneID}/services/rgb',
            path: {
                zoneID: zoneId,
            },
            errors: {
                404: `Details provided on HTTP 404 'Not Found' error.`,
            },
        });
    }
    /**
     * Sets the RGB colour in hexadecimal format (#RRGGBB) for all RGB luminaires in the area with specified __{zoneID}__.
     * @param zoneId The unique identifier of a room, group or zone (e.g. c0077c1d-c271-4485-ae01-88c328c07afe).
     * @param requestBody
     * @returns RGBService The value set for RGB colour in hexadecimal format (#RRGGBB) for all RGB luminaires in the area with specified __{zoneID}__.<br> The "colour" attribute value can be `null` when:
     * * The area is not initialized;
     * * All devices under this area using this service do not have the same value;
     * * The area or any of its field devices are hosted on another controller and the execution needs to be forwarded;
     * * The value cannot be retrieved within an acceptable response time.
     * @throws ApiError
     */
    public static putRgbServiceByZone(zoneId: string, requestBody: putRGBService): CancelablePromise<RGBService> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/zones/{zoneID}/services/rgb',
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
     * Returns the RGB colour in hexadecimal format (#RRGGBB) for the device with the specified __{deviceID}__ from the area with specified __{zoneID}__.<br><br> Attributes available via MQTT topic subscription:
     * * /zones/{zoneID}/devices/{deviceID}/services/rgb**colour**
     * @param zoneId The unique identifier of a room, group or zone (e.g. c0077c1d-c271-4485-ae01-88c328c07afe).
     * @param deviceId The unique identifier of a device (e.g. 29946137-08ce-4dcb-94bf-d124d768136b).
     * @returns RGBService The RGB colour in hexadecimal format (#RRGGBB) for the device with the specified __{deviceID}__ from the area with specified __{zoneID}__.<br> The "colour" attribute value can be `null` when:
     * * The device is not initialized;
     * * The device is hosted on another controller and the execution needs to be forwarded;
     * * The value cannot be retrieved within an acceptable response time.
     * @throws ApiError
     */
    public static getRgbServiceByZoneAndDevice(zoneId: string, deviceId: string): CancelablePromise<RGBService> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/zones/{zoneID}/devices/{deviceID}/services/rgb',
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
     * Sets the RGB colour in hexadecimal format (#RRGGBB) for the device with the specified __{deviceID}__ from the area with specified __{zoneID}__.
     * @param zoneId The unique identifier of a room, group or zone (e.g. c0077c1d-c271-4485-ae01-88c328c07afe).
     * @param deviceId The unique identifier of a device (e.g. 29946137-08ce-4dcb-94bf-d124d768136b).
     * @param requestBody
     * @returns RGBService The value set for RGB colour in hexadecimal format (#RRGGBB) for the device with the specified __{deviceID}__ from the area with specified __{zoneID}__.<br> The "colour" attribute value can be `null` when:
     * * The device is not initialized;
     * * The device is hosted on another controller and the execution needs to be forwarded;
     * * The value cannot be retrieved within an acceptable response time.
     * @throws ApiError
     */
    public static putRgbServiceByZoneAndDevice(
        zoneId: string,
        deviceId: string,
        requestBody: putRGBService,
    ): CancelablePromise<RGBService> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/zones/{zoneID}/devices/{deviceID}/services/rgb',
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
