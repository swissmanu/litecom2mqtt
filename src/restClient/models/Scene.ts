/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Intensity } from './Intensity.ts';
import type { Link } from './Link.ts';
import type { SceneKind } from './SceneKind.ts';
/**
 * Map of the presets available for _Scene service_.
 */
export type Scene = {
    /**
     * The number of the scene.
     */
    number: number | null;
    /**
     * The user defined scene name.
     */
    name: string | null;
    kind: SceneKind;
    intensity: Intensity;
    /**
     * An array containing the valid actions on the defined scene preset for _Scene service_.<br> Expect at least 'self' and 'saveCurrent' operation for a scene.
     */
    links: Array<Link>;
};

