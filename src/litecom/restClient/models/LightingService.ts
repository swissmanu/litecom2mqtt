/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Link } from './Link.js';
/**
 * Data model for _Lighting service_.
 */
export type LightingService = {
    /**
     * The intensity level expressed in percentage [%].<br> For an area, the value will be `null` if not all devices have the same intensity.
     */
    intensity: number | null;
    /**
     * An array containing the valid relations/actions for _Lighting service_ .<br> Expect at least "self" and operations to set intensity.
     */
    links: Array<Link>;
};
