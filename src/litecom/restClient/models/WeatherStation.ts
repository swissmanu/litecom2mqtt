/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Data model for _Global device_ Weather Station.
 */
export type WeatherStation = {
    /**
     * The wind speed measured in kilometers per hour [km/h].
     */
    windSpeed?: number;
    /**
     * Wind direction in degrees.
     */
    windDirection?: number;
    /**
     * The outdoor temperature in degrees Celsius [ºC].
     */
    temperature?: number;
    /**
     * The presence of a precipitation flow (`true`).
     */
    rain?: boolean;
};

