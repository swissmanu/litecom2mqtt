/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Data model to change the output state a General contact.
 */
export type putGeneralContactService = {
    /**
     * The state to be set on a switchable output device.<br> `OPEN` means the device is turned off and `CLOSED` means the device is turned on.
     */
    outputState: putGeneralContactService.outputState;
};
export namespace putGeneralContactService {
    /**
     * The state to be set on a switchable output device.<br> `OPEN` means the device is turned off and `CLOSED` means the device is turned on.
     */
    export enum outputState {
        OPEN = 'OPEN',
        CLOSED = 'CLOSED',
    }
}

