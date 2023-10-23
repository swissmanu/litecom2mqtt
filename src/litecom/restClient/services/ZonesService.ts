/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Identifiable } from '../models/Identifiable.js';
import type { Zone } from '../models/Zone.js';
import type { CancelablePromise } from '../core/CancelablePromise.js';
import { OpenAPI } from '../core/OpenAPI.js';
import { request as __request } from '../core/request.js';
export class ZonesService {
    /**
     * Returns an array of all areas (rooms, groups and zones).<br> If no areas are available an empty list is returned.<br> In multi-controller instalations areas from other controllers are also returned.<br> __Warning:__ This is a computation heavy operation!
     * @returns Zone Array of all areas (rooms, groups and zones).
     * @throws ApiError
     */
    public static getZones(): CancelablePromise<Array<Zone>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/zones',
        });
    }
    /**
     * Returns the area information and all available services for the specified __{zoneID}__.
     * @param zoneId The unique identifier of a room, group or zone (e.g. c0077c1d-c271-4485-ae01-88c328c07afe).
     * @returns Zone Area information and all available services for the specified __{zoneID}__.
     * @throws ApiError
     */
    public static getZoneById(zoneId: string): CancelablePromise<Zone> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/zones/{zoneID}',
            path: {
                zoneID: zoneId,
            },
            errors: {
                404: `Details provided on HTTP 404 'Not Found' error.`,
            },
        });
    }
    /**
     * Returns the service IDs for the area with the specified __{zoneID}__".<br> If no services are available an empty list is returned.
     * @param zoneId The unique identifier of a room, group or zone (e.g. c0077c1d-c271-4485-ae01-88c328c07afe).
     * @returns Identifiable An array of service IDs available in the area with the specified __{zoneID}__".
     * @throws ApiError
     */
    public static getServicesByZone(zoneId: string): CancelablePromise<Array<Identifiable>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/zones/{zoneID}/services',
            path: {
                zoneID: zoneId,
            },
            errors: {
                404: `Details provided on HTTP 404 'Not Found' error.`,
            },
        });
    }
}
