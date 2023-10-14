/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Link } from './Link.ts';
/**
 * Data model for _Scene service_.<br> Scenes 0 and 1 are always "Working" and "Absence" respectively.<br>
 */
export type SceneService = {
    /**
     * The currently active scene number.
     */
    activeScene: number | null;
    /**
     * The user defined scene name.
     */
    name: string | null;
    /**
     * If `true` the scene is out-of-tune, meaning that after the scene was recalled, the current value of the device(s) has been changed (e.g. manually dimmed), or the target areas do not match the scene preset.<br> In this case the "activeScene" attribute represents the last recalled scene.
     */
    outOfTune: boolean;
    /**
     * An array containing the valid actions and defined scenes [0-20] on an area or device for _Lighting service_.<br> Expect at least "self", "parent" and operations "ChangeScene". All defined scenes available as 'child'.
     */
    links: Array<Link>;
};

