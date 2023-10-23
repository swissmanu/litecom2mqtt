/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EnergyDataSettings } from '../models/EnergyDataSettings.js';
import type { EnergyService } from '../models/EnergyService.js';
import type { putSharedEnergyService } from '../models/putSharedEnergyService.js';
import type { CancelablePromise } from '../core/CancelablePromise.js';
import { OpenAPI } from '../core/OpenAPI.js';
import { request as __request } from '../core/request.js';
export class EnergyServiceService {
    /**
     * Returns the aggregated active energy value reported by the gear(s), converted to Watt-hour [Wh], for the area with specified __{zoneID}__.<br> It is the sum of values reported by all descendant gears in the hierarchy (i.e. gears in the area or in sub-areas) that support the _Energy service_.<br><br> Attributes available via MQTT topic subscription:
     * * /zones/{zoneID}/services/energy**active**
     * @param zoneId The unique identifier of a room, group or zone (e.g. c0077c1d-c271-4485-ae01-88c328c07afe).
     * @returns EnergyService The aggregated active energy value reported by the gear(s), converted to Watt-hour [Wh], for the area with specified __{zoneID}__.<br> It is the sum of values reported by all descendant gears in the hierarchy (i.e. gears in the area or in sub-areas) that support the _Energy service_.
     *
     * @throws ApiError
     */
    public static getEnergyServiceByZone(zoneId: string): CancelablePromise<EnergyService> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/zones/{zoneID}/services/energy',
            path: {
                zoneID: zoneId,
            },
            errors: {
                404: `Details provided on HTTP 404 'Not Found' error.`,
            },
        });
    }
    /**
     * Returns the _Energy service_ global data settings.
     * @returns EnergyDataSettings The _Energy service_ global data settings.
     *
     * @throws ApiError
     */
    public static getEnergyServiceConfiguration(): CancelablePromise<EnergyDataSettings> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/global/services/energy/dataSettings',
            errors: {
                404: `Details provided on HTTP 404 'Not Found' error.`,
            },
        });
    }
    /**
     * Allows enabling or disabling of the energy scanning for the current controller.
     * @param requestBody
     * @returns EnergyDataSettings The _Energy service_ global data settings.
     * @throws ApiError
     */
    public static putSharedEnergyService(requestBody: putSharedEnergyService): CancelablePromise<EnergyDataSettings> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/global/services/energy/dataSettings',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Details provided on HTTP 400 'Bad request' error.`,
                404: `Details provided on HTTP 404 'Not Found' error.`,
            },
        });
    }
    /**
     * Returns the _Energy service_ values reported by the gear with the specified __{deviceID}__ from the area with the specified __{zoneID}__.<br> See schema description for further details.<br><br> Attributes available via MQTT topic subscription:
     * * /zones/{zoneID}/devices/{deviceID}/services/energy**active**
     * @param zoneId The unique identifier of a room, group or zone (e.g. c0077c1d-c271-4485-ae01-88c328c07afe).
     * @param deviceId The unique identifier of a device (e.g. 29946137-08ce-4dcb-94bf-d124d768136b).
     * @returns EnergyService The _Energy service_ values reported by the gear with the specified __{deviceID}__ from the area with the specified __{zoneID}__.
     *
     * @throws ApiError
     */
    public static getEnergyServiceByZoneAndDevice(zoneId: string, deviceId: string): CancelablePromise<EnergyService> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/zones/{zoneID}/devices/{deviceID}/services/energy',
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
