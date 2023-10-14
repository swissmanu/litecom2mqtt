/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Error404 = {
    /**
     * Error code 404.
     */
    code: Error404.code;
    /**
     * Detailed message for error code.
     */
    message?: string;
};
export namespace Error404 {
    /**
     * Error code 404.
     */
    export enum code {
        GENERAL_ERROR = 'GENERAL_ERROR',
        INVALID_ZONE_ID = 'INVALID_ZONE_ID',
        INVALID_DEVICE_ID = 'INVALID_DEVICE_ID',
        INVALID_SCENE_NUMBER = 'INVALID_SCENE_NUMBER',
        INVALID_PATTERN_NAME = 'INVALID_PATTERN_NAME',
        INVALID_SERVICE = 'INVALID_SERVICE',
        INVALID_MALFORMED_SYNTAX = 'INVALID_MALFORMED_SYNTAX',
        DEVICE_NOT_EXIST = 'DEVICE_NOT_EXIST',
    }
}

