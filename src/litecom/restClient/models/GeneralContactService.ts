/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Link } from './Link.ts';
/**
 * Data model for _General Contact service_.
 */
export type GeneralContactService = {
    /**
     * The state of a switchable output device.<br> `OPEN` means the device is turned off and `CLOSED` means the device is turned on.
     */
    outputState: GeneralContactService.outputState | null;
    /**
     * An array containing the valid actions of _General Contact service_.<br> Expect at least "self", "parent" and all output contact operations (e.g. "open", "close").
     */
    links: Array<Link>;
};
export namespace GeneralContactService {
    /**
     * The state of a switchable output device.<br> `OPEN` means the device is turned off and `CLOSED` means the device is turned on.
     */
    export enum outputState {
        OPEN = 'OPEN',
        CLOSED = 'CLOSED',
    }
}

