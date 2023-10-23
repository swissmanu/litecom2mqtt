/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Link } from './Link.js';
/**
 * Data model for _Sequence service_.<br> Attribute "pattern" shows the last applied sequence pattern.
 */
export type SequenceService = {
    /**
     * The applied sequence pattern.
     */
    pattern: string | null;
    /**
     * The intensity level expressed in percentage [%] for the combined direct light component.
     */
    direct: number | null;
    /**
     * The intensity level expressed in percentage [%] for the indirect light component.
     */
    indirect: number | null;
    /**
     * An array containing the valid actions and available sequence patterns of _Sequence service_.<br> Expect at least "self", "parent" and "child" as available sequence patterns, also operations "setSequencePattern", "ChangeScene" and "updateSequenceValues".
     */
    links: Array<Link>;
};
