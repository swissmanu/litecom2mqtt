/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Defines the kind of a scene for a device, or the aggregated value for an area:
 * * `STATIC` - the defined output value for the scene is always constant;
 * * `DYNAMIC` - the defined output value for the scene can vary over time (e.g. as result of automation);
 * * `MIXED` - for areas only, at least one device does not share the same scene kind.<br>
 * `null` can be returned when this request is sent to an area.
 */
export enum SceneKind {
    STATIC = 'STATIC',
    DYNAMIC = 'DYNAMIC',
    MIXED = 'MIXED',
}
