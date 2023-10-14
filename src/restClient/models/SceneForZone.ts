/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Link } from './Link.ts';
import type { SceneKind } from './SceneKind.ts';
/**
 * Map of the presets available for _Scene service_ of an area.
 */
export type SceneForZone = {
    /**
     * The number of the scene.
     */
    number: number | null;
    /**
     * The user defined scene name.
     */
    name: string | null;
    kind: SceneKind;
    /**
     * An array containing the valid actions on the defined scene preset. Expected at least 'self' and 'saveCurrent' operation for a scene.
     */
    links: Array<Link>;
};

