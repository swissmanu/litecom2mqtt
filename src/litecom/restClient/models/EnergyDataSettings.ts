/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Data model for _Energy service_ data settings.
 */
export type EnergyDataSettings = {
    /**
     * The Unix timestamp of the latest valid energy scan performed by the system.
     */
    energyLastScanTimestamp?: number;
    /**
     * The scan interval in minutes.
     */
    energyScanInterval?: number;
    /**
     * The clock minute when the scan was started.
     */
    energyScanMinuteStart?: number;
    /**
     * The setting for enabling (`true`) or disabling (`false`) the active energy scan.
     */
    energyScanningEnabled?: boolean;
};

