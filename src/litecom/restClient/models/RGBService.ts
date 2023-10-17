/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Link } from './Link.ts';
/**
 * Data model for _RGB service_.
 */
export type RGBService = {
    /**
     * The colour of the light in hex colour code representation (e.g. `#FFFFFF` for white colour).
     */
    colour: string | null;
    /**
     * An array containing the valid actions of _RGB service_.<br> Expect at least "self" and "setColour" operation.
     */
    links: Array<Link>;
};

