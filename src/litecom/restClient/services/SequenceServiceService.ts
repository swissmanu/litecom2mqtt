/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { putDimmableOption } from '../models/putDimmableOption.ts';
import type { putSequenceService } from '../models/putSequenceService.ts';
import type { Sequence } from '../models/Sequence.ts';
import type { SequenceService } from '../models/SequenceService.ts';
import type { CancelablePromise } from '../core/CancelablePromise.ts';
import { OpenAPI } from '../core/OpenAPI.ts';
import { request as __request } from '../core/request.ts';
export class SequenceServiceService {
    /**
     * Returns the aggregated sequence pattern name, direct and indirect light values for all sequence luminaires in the area with the specified __{zoneID}__.<br><br> Attributes available via MQTT topic subscription:
     * * /zones/{zoneID}/services/sequence**direct**
     * * /zones/{zoneID}/services/sequence**indirect**
     * @param zoneId The unique identifier of a room, group or zone (e.g. c0077c1d-c271-4485-ae01-88c328c07afe).
     * @returns SequenceService The aggregated sequence pattern name, direct and indirect light values for all sequence luminaires in the area with the specified __{zoneID}__.<br> The "pattern", "direct" and "indirect" attribute values can be `null` when:
     * * The area is not initialized;
     * * All devices under this area using this service do not have the same value;
     * * The area or any of its field devices are hosted on another controller and the execution needs to be forwarded;
     * * The value cannot be retrieved within an acceptable response time.
     * @throws ApiError
     */
    public static getSequenceServiceByZone(
        zoneId: string,
    ): CancelablePromise<SequenceService> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/zones/{zoneID}/services/sequence',
            path: {
                'zoneID': zoneId,
            },
            errors: {
                404: `Details provided on HTTP 404 'Not Found' error.`,
            },
        });
    }
    /**
     * Sets the sequence pattern or the direct or indirect light values for all sequence luminaires in the area with the specified __{zoneID}__.<br> Note that if "pattern" value is specified in the request, then the "indirect" and "direct" attributes should not be used.
     * @param zoneId The unique identifier of a room, group or zone (e.g. c0077c1d-c271-4485-ae01-88c328c07afe).
     * @param requestBody
     * @returns SequenceService The aggregate sequence pattern name, direct and indirect light values for all sequence luminaires in the area with the specified __{zoneID}__.<br> The "pattern", "direct" and "indirect" attribute values can be `null` when:
     * * The area is not initialized;
     * * All devices under this area using this service do not have the same value;
     * * The area or any of its field devices are hosted on another controller and the execution needs to be forwarded;
     * * The value cannot be retrieved within an acceptable response time.
     * @throws ApiError
     */
    public static putSequenceServiceByZone(
        zoneId: string,
        requestBody: putSequenceService,
    ): CancelablePromise<SequenceService> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/zones/{zoneID}/services/sequence',
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
     * Start a brighten operation with `UP` or a dimming operation with `DOWN` for direct, indirect or both light components on all sequence luminaires in the area specified by __{zoneID}__. A dimmable operation can be stopped by sending `STOP`.<br> For this request the "component" attribute is required.
     * @param zoneId The unique identifier of a room, group or zone (e.g. c0077c1d-c271-4485-ae01-88c328c07afe).
     * @param requestBody
     * @returns any The operation was accepted.
     * @throws ApiError
     */
    public static putDimmableSequenceServiceByZone(
        zoneId: string,
        requestBody: putDimmableOption,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/zones/{zoneID}/services/sequence/dimmable',
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
     * Returns the global _Sequence service_ pattern preset with the specified __{patternName}__.<br>
     * @param patternName Pattern Name
     * @returns Sequence The global _Sequence service_ pattern preset with the specified __{patternName}__.<br>
     * @throws ApiError
     */
    public static getSequencePatternByName(
        patternName: string,
    ): CancelablePromise<Sequence> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/global/services/sequence/{patternName}',
            path: {
                'patternName': patternName,
            },
            errors: {
                404: `Details provided on HTTP 404 'Not Found' error.`,
            },
        });
    }
    /**
     * Returns the sequence pattern name, direct and indirect light values for the sequence luminaire with the specified __{deviceID}__ in the area with the specified __{zoneID}__.<br><br> Attributes available via MQTT topic subscription:
     * * /zones/{zoneID}/devices/{deviceID}/services/sequence**direct**
     * * /zones/{zoneID}/devices/{deviceID}/services/sequence**indirect**
     * @param zoneId The unique identifier of a room, group or zone (e.g. c0077c1d-c271-4485-ae01-88c328c07afe).
     * @param deviceId The unique identifier of a device (e.g. 29946137-08ce-4dcb-94bf-d124d768136b).
     * @returns SequenceService The sequence pattern name, direct and indirect light values for the sequence luminaire with the specified __{deviceID}__ in the area with the specified __{zoneID}__.<br> The "pattern", "direct" and "indirect" attribute values can be `null` when:
     * * The device is not initialized;
     * * The device is hosted on another controller and the execution needs to be forwarded;
     * * The value cannot be retrieved within an acceptable response time.
     * @throws ApiError
     */
    public static getSequenceServiceByZoneAndDevice(
        zoneId: string,
        deviceId: string,
    ): CancelablePromise<SequenceService> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/zones/{zoneID}/devices/{deviceID}/services/sequence',
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
     * Sets the sequence pattern, or the direct and indirect light values for the sequence luminaire with the specified __{deviceID}__ in the area with the specified __{zoneID}__.<br> Note that if "pattern" value is specified in the request, then the "indirect" and "direct" attributes should not be used.
     * @param zoneId The unique identifier of a room, group or zone (e.g. c0077c1d-c271-4485-ae01-88c328c07afe).
     * @param deviceId The unique identifier of a device (e.g. 29946137-08ce-4dcb-94bf-d124d768136b).
     * @param requestBody
     * @returns SequenceService The sequence pattern, and the direct and indirect light values for the sequence luminaire with the specified __{deviceID}__ in the area with the specified __{zoneID}__.<br> The "pattern", "direct" and "indirect" attribute values can be `null` when:
     * * The device is not initialized;
     * * The device is hosted on another controller and the execution needs to be forwarded;
     * * The value cannot be retrieved within an acceptable response time.
     * @throws ApiError
     */
    public static putSequenceServiceByZoneAndDevice(
        zoneId: string,
        deviceId: string,
        requestBody: putSequenceService,
    ): CancelablePromise<SequenceService> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/zones/{zoneID}/devices/{deviceID}/services/sequence',
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
     * Start a brighten operation with `UP` or a dimming operation with `DOWN` for direct, indirect or both light components on the sequence luminaire with the specified __{deviceID}__ in the area with the specified __{zoneID}__. A dimmable operation can be stopped by sending `STOP`.<br> For this request the "component" attribute is required.
     * @param zoneId The unique identifier of a room, group or zone (e.g. c0077c1d-c271-4485-ae01-88c328c07afe).
     * @param deviceId The unique identifier of a device (e.g. 29946137-08ce-4dcb-94bf-d124d768136b).
     * @param requestBody
     * @returns any The operation was accepted.
     * @throws ApiError
     */
    public static putDimmableSequenceServiceByZoneAndDevice(
        zoneId: string,
        deviceId: string,
        requestBody: putDimmableOption,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/zones/{zoneID}/devices/{deviceID}/services/sequence/dimmable',
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
