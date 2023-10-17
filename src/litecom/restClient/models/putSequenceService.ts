/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Data model to recall a specific pattern, or to set the direct or indirect intensity values.
 */
export type putSequenceService = {
    /**
     * The sequence pattern to be recalled.<br> The "pattern" attribute is only accepted when sent individually.
     */
    pattern?: string;
    /**
     * The intensity level to be set for the combined direct light component, expressed in percentage [%].
     */
    direct?: number;
    /**
     * The intensity level to be set for indirect light, expressed in percentage [%].
     */
    indirect?: number;
};

