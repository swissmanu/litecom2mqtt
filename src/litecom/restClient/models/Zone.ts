/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Link } from './Link.ts';
/**
 * Data model for a _Zone_ container.
 */
export type Zone = {
    /**
     * The unique identifier of a room, group or zone (e.g. c0077c1d-c271-4485-ae01-88c328c07afe).
     */
    id: string;
    /**
     * The user defined name of the room, group or zone.
     */
    name: string;
    /**
     * Defines the hierarchy level of the container. The following are possible:
     * * `ROOM` - room level hierarchy, meaning it can contain GROUPs and/or devices;
     * * `GROUP` - group level hierarchy, meaning it can contain devices only;
     * * `ZONE` - zone level hierarchy, meaning it can contain a free combination of ROOMs and/or GROUPs and/or devices.
     */
    level: Zone.level;
    /**
     * If `true` at least one descendant device belonging to the area has an active error.
     */
    anyError?: boolean;
    /**
     * An array containing the valid relations for _Zone_ schema.<br>Expect at least "self" and when applicable "parent" and "child". Also possible are "devicesOfZone" and "servicesOfZone" if any available.
     */
    links: Array<Link>;
};
export namespace Zone {
    /**
     * Defines the hierarchy level of the container. The following are possible:
     * * `ROOM` - room level hierarchy, meaning it can contain GROUPs and/or devices;
     * * `GROUP` - group level hierarchy, meaning it can contain devices only;
     * * `ZONE` - zone level hierarchy, meaning it can contain a free combination of ROOMs and/or GROUPs and/or devices.
     */
    export enum level {
        ZONE = 'ZONE',
        ROOM = 'ROOM',
        GROUP = 'GROUP',
    }
}

