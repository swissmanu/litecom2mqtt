/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Data model for the _Energy service_.
 */
export type EnergyService = {
    /**
     * The active energy value reported by the gear(s) converted to Watt-hour [Wh].<br> For an area this is the sum of values reported by all descendant gears in the hierarchy (i.e. gears in the area or in sub-areas) that support the _Energy Service_.<br> This value is not available for areas with "level" `ZONE`.
     */
    active: number;
    /**
     * For a device:
     * * `true` - the value "active" has been succesfully read from the gear.
     * * `false` - the value from the gear was not successfuly read, and "active" and "timestamp" represent the last known value read from the gear.
     *
     * For an area of type `ROOM` or `GROUP`:
     * * `true` - the value "active" has been succesfully read from all descendant gears that support the _Energy service_.
     * * `false` - at least one value from a descendant gear was not successfuly read, and  "active" and "timestamp" represent only the succesfully read gears.
     */
    valid: boolean;
    /**
     * The Unix timestamp in milliseconds of the reported active energy value "active".<br> For areas, the value is always updated with the latest timestamp of the individual gears.<br> If all individual gear values are invalid ("valid" equal to `false`), then the timestamp is the time of the last scan.
     */
    timestamp: number;
};

