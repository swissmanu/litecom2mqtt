/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SkyScanner } from '../models/SkyScanner.js';
import type { WeatherStation } from '../models/WeatherStation.js';
import type { CancelablePromise } from '../core/CancelablePromise.js';
import { OpenAPI } from '../core/OpenAPI.js';
import { request as __request } from '../core/request.js';
export class GlobalDevicesService {
    /**
     * Returns all iluminance values in lux [lx] reported by the global Sky-Scanner device available in the controller or in the multi-controller instalation.<br><br> Attributes available via MQTT topic subscription:
     * * /global/devices/skyScanner**glare**
     * * /global/devices/skyScanner**sky**
     * * /global/devices/skyScanner**sun**
     * * /global/devices/skyScanner**total**
     * * /global/devices/skyScanner**verticalNorth**
     * * /global/devices/skyScanner**verticalEast**
     * * /global/devices/skyScanner**verticalSouth**
     * * /global/devices/skyScanner**verticalWest**
     * * /global/devices/skyScanner**horizontalNorth**
     * * /global/devices/skyScanner**horizontalEast**
     * * /global/devices/skyScanner**horizontalSouth**
     * * /global/devices/skyScanner**horizontalWest**
     * @returns SkyScanner The iluminance values in lux [lx] reported by the Sky-Scanner device.
     * @throws ApiError
     */
    public static getSkyScanner(): CancelablePromise<SkyScanner> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/global/devices/skyScanner',
            errors: {
                404: `Details provided on HTTP 404 'Not Found' error.`,
            },
        });
    }
    /**
     * Returns all aggregate values available in the global Weather-Station device available in the controller or in the multi-controller instalation.<br><br> Attributes available via MQTT topic subscription:
     * * /global/devices/weatherStation**windSpeed**
     * * /global/devices/weatherStation**windDirection**
     * * /global/devices/weatherStation**temperature**
     * * /global/devices/weatherStation**rain**
     * @returns WeatherStation Aggregate values available in the global Weather-Station device.
     * @throws ApiError
     */
    public static getWeatherStation(): CancelablePromise<WeatherStation> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/global/devices/weatherStation',
            errors: {
                404: `Details provided on HTTP 404 'Not Found' error.`,
            },
        });
    }
}
