/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Link } from './Link.ts';
export type Device = {
    /**
     * The unique identifier of a device (e.g. 29946137-08ce-4dcb-94bf-d124d768136b).
     */
    id: string;
    /**
     * The address of the device.<br> For standard devices the address is displayed as P-Number:LM-address, e.g. 64 60 72 00 04:1-1-1.<br> For an aggregated device `null` is returned.
     */
    address?: string | null;
    /**
     * The user defined name of the device.
     */
    name: string;
    /**
     * The operational state of the device:
     * * `READY` - device is in normal operation;
     * * `ERROR` - the device has encountered an error condition;
     */
    state: Device.state;
    /**
     * A list of error codes, with timestamp, reported by the device.
     */
    errors?: Array<{
        /**
         * The error code reported by the device.<br> The meaning of the specific values are dependent on device type and field bus technology.
         */
        error?: string;
        /**
         * Unix timestamp in milliseconds of the device error detection.
         */
        timestamp?: number;
    }>;
    /**
     * An array containing the valid relations for _Device_ schema.<br> Expect at least "self" and when applicable "servicesOfDevice" if any available.
     */
    links: Array<Link>;
};
export namespace Device {
    /**
     * The operational state of the device:
     * * `READY` - device is in normal operation;
     * * `ERROR` - the device has encountered an error condition;
     */
    export enum state {
        READY = 'READY',
        ERROR = 'ERROR',
    }
}

