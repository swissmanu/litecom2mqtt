/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Link } from './Link.ts';
/**
 * Data model for _Tunable White service_.
 */
export type TunableWhiteService = {
    /**
     * Colour temperature in Kelvins [K].
     */
    temperature: number | null;
    /**
     * An array containing the valid actions of _Tunable White service_.<br> Expect at least "self", "parent" and "setTemperature" operation.
     */
    links: Array<Link>;
};

