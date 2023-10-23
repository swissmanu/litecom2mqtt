/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Device } from '../models/Device.js';
import type { Identifiable } from '../models/Identifiable.js';
import type { CancelablePromise } from '../core/CancelablePromise.js';
import { OpenAPI } from '../core/OpenAPI.js';
import { request as __request } from '../core/request.js';
export class DevicesService {
    /**
     * Returns the devices assigned to the specified __{zoneID}__.<br> If no devices are available in the area an empty list is returned.<br> Devices of sub-areas are not returned.
     * @param zoneId The unique identifier of a room, group or zone (e.g. c0077c1d-c271-4485-ae01-88c328c07afe).
     * @returns Device Array of the devices assigned to the specified __{zoneID}__.<br>
     * @throws ApiError
     */
    public static getDevicesByZone(zoneId: string): CancelablePromise<Array<Device>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/zones/{zoneID}/devices',
            path: {
                zoneID: zoneId,
            },
            errors: {
                404: `Details provided on HTTP 404 'Not Found' error.`,
            },
        });
    }
    /**
     * Returns the device information and available services for the specified __{deviceID}__ from the area with the specified __{zoneID}__.
     * @param zoneId The unique identifier of a room, group or zone (e.g. c0077c1d-c271-4485-ae01-88c328c07afe).
     * @param deviceId The unique identifier of a device (e.g. 29946137-08ce-4dcb-94bf-d124d768136b).
     * @returns Device The details of the device with the specified __{deviceID}__ from the area with the specified __{zoneID}__.
     * @throws ApiError
     */
    public static getDeviceByZoneAndId(zoneId: string, deviceId: string): CancelablePromise<Device> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/zones/{zoneID}/devices/{deviceID}',
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
     * Returns the service IDs for the device with the specified __{deviceID}__ from the area with the specified __{zoneID}__.<br> If no services are available an empty list is returned.
     * @param zoneId The unique identifier of a room, group or zone (e.g. c0077c1d-c271-4485-ae01-88c328c07afe).
     * @param deviceId The unique identifier of a device (e.g. 29946137-08ce-4dcb-94bf-d124d768136b).
     * @returns Identifiable An array of service IDs available in the device with the specified __{deviceID}__".
     * @throws ApiError
     */
    public static getServicesByZoneAndDevice(zoneId: string, deviceId: string): CancelablePromise<Array<Identifiable>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/zones/{zoneID}/devices/{deviceID}/services',
            path: {
                zoneID: zoneId,
                deviceID: deviceId,
            },
            errors: {
                404: `Details provided on HTTP 404 'Not Found' error.`,
            },
        });
    }
}
