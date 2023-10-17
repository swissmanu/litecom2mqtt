/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { putSceneService } from '../models/putSceneService.ts';
import type { Scene } from '../models/Scene.ts';
import type { SceneForZone } from '../models/SceneForZone.ts';
import type { SceneNumber } from '../models/SceneNumber.ts';
import type { SceneService } from '../models/SceneService.ts';
import type { CancelablePromise } from '../core/CancelablePromise.ts';
import { OpenAPI } from '../core/OpenAPI.ts';
import { request as __request } from '../core/request.ts';
export class SceneServiceService {
    /**
     * Returns the current active scene and its out-of-tune state, along with other details, for the area with the specified __{zoneID}__.<br><br> Attributes available via MQTT topic subscription:
     * * /zones/{zoneID}/services/scene**activeScene**
     * * /zones/{zoneID}/services/scene**outOfTune**
     * @param zoneId The unique identifier of a room, group or zone (e.g. c0077c1d-c271-4485-ae01-88c328c07afe).
     * @returns SceneService The current active scene and its out-of-tune state, along with other details, for the area with the specified __{zoneID}__.
     * @throws ApiError
     */
    public static getSceneServiceByZone(
        zoneId: string,
    ): CancelablePromise<SceneService> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/zones/{zoneID}/services/scene',
            path: {
                'zoneID': zoneId,
            },
            errors: {
                404: `Details provided on HTTP 404 'Not Found' error.`,
            },
        });
    }
    /**
     * Recalls the scene "activeScene" for all devices in the area with the specified __{zoneID}__.<br> This operation also recalls the scene on all the devices in the area.
     * @param zoneId The unique identifier of a room, group or zone (e.g. c0077c1d-c271-4485-ae01-88c328c07afe).
     * @param requestBody
     * @returns SceneService The recalled active scene and its out-of-tune state, along with other details, for the area with the specified __{zoneID}__.
     * @throws ApiError
     */
    public static putSceneServiceByZone(
        zoneId: string,
        requestBody: putSceneService,
    ): CancelablePromise<SceneService> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/zones/{zoneID}/services/scene',
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
     * Returns the scene information for the specified __{sceneNumber}__ [0-20] for the area with the specified __{zoneID}__.
     * @param zoneId The unique identifier of a room, group or zone (e.g. c0077c1d-c271-4485-ae01-88c328c07afe).
     * @param sceneNumber The scene number.
     * @returns SceneForZone The scene information for the specified __{sceneNumber}__ [0-20] for the area with the specified __{zoneID}__.
     * @throws ApiError
     */
    public static getSceneByZoneAndNumber(
        zoneId: string,
        sceneNumber: SceneNumber,
    ): CancelablePromise<SceneForZone> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/zones/{zoneID}/services/scene/{sceneNumber}',
            path: {
                'zoneID': zoneId,
                'sceneNumber': sceneNumber,
            },
            errors: {
                404: `Details provided on HTTP 404 'Not Found' error.`,
            },
        });
    }
    /**
     * Stores the current intensity values of all luminaires in the area with the specified __{zoneID}__, into the scene number specified in __{sceneNumber}__.<br> If __{sceneNumber}__ as the same value as the _Scene service_ "activeScene", then the scene is activated and "outOftune" attribute is set to `false`.<br> For the operation to be allowed, the scene number defined in __{sceneNumber}__ must already exist and the area specified __{zoneID}__ cannot have "level" `ZONE`.
     * @param zoneId The unique identifier of a room, group or zone (e.g. c0077c1d-c271-4485-ae01-88c328c07afe).
     * @param sceneNumber The scene number.
     * @returns string The operation was accepted.
     * @throws ApiError
     */
    public static putSceneByZoneAndNumber(
        zoneId: string,
        sceneNumber: SceneNumber,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/zones/{zoneID}/services/scene/store/{sceneNumber}',
            path: {
                'zoneID': zoneId,
                'sceneNumber': sceneNumber,
            },
            responseHeader: 'X-Remote-Execution',
            errors: {
                400: `Details provided on HTTP 400 'Bad request' error.`,
                404: `Details provided on HTTP 404 'Not Found' error.`,
            },
        });
    }
    /**
     * Returns the current active scene and its out-of-tune state, along with other details, for the device with the specified __{deviceID}__ from the area with the specified __{zoneID}__.<br><br> Attributes available via MQTT topic subscription:
     * * /zones/{zoneID}/devices/{deviceID}/services/scene**activeScene**
     * * /zones/{zoneID}/devices/{deviceID}/services/scene**outOfTune**
     * @param zoneId The unique identifier of a room, group or zone (e.g. c0077c1d-c271-4485-ae01-88c328c07afe).
     * @param deviceId The unique identifier of a device (e.g. 29946137-08ce-4dcb-94bf-d124d768136b).
     * @returns SceneService The current active scene and its out-of-tune state, along with other details, for the device with the specified __{deviceID}__ from the area with the specified __{zoneID}__.
     * @throws ApiError
     */
    public static getSceneServiceByZoneAndDevice(
        zoneId: string,
        deviceId: string,
    ): CancelablePromise<SceneService> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/zones/{zoneID}/devices/{deviceID}/services/scene',
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
     * Recalls the scene "activeScene" for the device with the specified __{zoneID}__.<br> If the chosen "activeScene" value differs from the one set on the corresponding area, the _Scene service_ of the area can become out-of-tune.
     * @param zoneId The unique identifier of a room, group or zone (e.g. c0077c1d-c271-4485-ae01-88c328c07afe).
     * @param deviceId The unique identifier of a device (e.g. 29946137-08ce-4dcb-94bf-d124d768136b).
     * @param requestBody
     * @returns SceneService The recalled active scene and its out-of-tune state, along with other details, for the device with the specified __{deviceID}__ from the area with the specified __{zoneID}__.
     * @throws ApiError
     */
    public static putSceneServiceByZoneAndDevice(
        zoneId: string,
        deviceId: string,
        requestBody: putSceneService,
    ): CancelablePromise<SceneService> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/zones/{zoneID}/devices/{deviceID}/services/scene',
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
     * Returns the scene information for the specified __{sceneNumber}__ [0-20] for the device with the specified __{deviceID}__ from the area with the specified __{zoneID}__.
     * @param zoneId The unique identifier of a room, group or zone (e.g. c0077c1d-c271-4485-ae01-88c328c07afe).
     * @param deviceId The unique identifier of a device (e.g. 29946137-08ce-4dcb-94bf-d124d768136b).
     * @param sceneNumber The scene number.
     * @returns Scene The scene information for the specified __{sceneNumber}__ [0-20] for the device with the specified __{deviceID}__ from the area with the specified __{zoneID}__.
     * @throws ApiError
     */
    public static getSceneByZoneAndDeviceAndNumber(
        zoneId: string,
        deviceId: string,
        sceneNumber: SceneNumber,
    ): CancelablePromise<Scene> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/zones/{zoneID}/devices/{deviceID}/services/scene/{sceneNumber}',
            path: {
                'zoneID': zoneId,
                'deviceID': deviceId,
                'sceneNumber': sceneNumber,
            },
            errors: {
                404: `Details provided on HTTP 404 'Not Found' error.`,
            },
        });
    }
    /**
     * Stores the current intensity values of the luminaire with the specified __{deviceID}__ from the area with the specified __{zoneID}__, into the scene number specified in __{sceneNumber}__.<br> If __{sceneNumber}__ as the same value as the luminaire's _Scene service_ "activeScene", then the scene is activated and "outOftune" attribute is set to `false`. However this can still set the parent area in an out-of-tune condition.<br> For the operation to be allowed, the scene number defined in __{sceneNumber}__ must already exist.
     * @param zoneId The unique identifier of a room, group or zone (e.g. c0077c1d-c271-4485-ae01-88c328c07afe).
     * @param deviceId The unique identifier of a device (e.g. 29946137-08ce-4dcb-94bf-d124d768136b).
     * @param sceneNumber The scene number.
     * @returns string The operation was accepted.
     * @throws ApiError
     */
    public static putSceneByZoneAndDeviceAndNumber(
        zoneId: string,
        deviceId: string,
        sceneNumber: SceneNumber,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/zones/{zoneID}/devices/{deviceID}/services/scene/store/{sceneNumber}',
            path: {
                'zoneID': zoneId,
                'deviceID': deviceId,
                'sceneNumber': sceneNumber,
            },
            responseHeader: 'X-Remote-Execution',
            errors: {
                400: `Details provided on HTTP 400 'Bad request' error.`,
                404: `Details provided on HTTP 404 'Not Found' error.`,
            },
        });
    }
}
