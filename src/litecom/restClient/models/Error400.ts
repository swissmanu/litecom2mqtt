/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Error400 = {
    /**
     * Error code 400.
     */
    code: Error400.code;
    /**
     * Detailed message for error code.
     */
    message?: string;
};
export namespace Error400 {
    /**
     * Error code 400.
     */
    export enum code {
        MALFORMED_SYNTAX = 'MALFORMED_SYNTAX',
        INVALID_VALUE = 'INVALID_VALUE',
        INVALID_SCENE_NUMBER = 'INVALID_SCENE_NUMBER',
    }
}

