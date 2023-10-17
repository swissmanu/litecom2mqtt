/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Link } from './Link.ts';
/**
 * Data model of pattern presets used by _Sequence service_.
 */
export type Sequence = {
    /**
     * The name of the pattern preset.
     */
    pattern: string;
    /**
     * The mode of the pattern preset.
     */
    mode: Sequence.mode;
    /**
     * The intensity level expressed in percentage [%] for direct light on the right side.
     */
    directRight: number;
    /**
     * The intensity level expressed in percentage [%] for direct light on the middle.
     */
    directMiddle: number;
    /**
     * The intensity level expressed in percentage [%] for direct light on the left side.
     */
    directLeft: number;
    /**
     * The intensity level expressed in percentage [%] for indirect light.
     */
    indirect: number;
    /**
     * An array containing the available pattern presets.
     */
    links: Array<Link>;
};
export namespace Sequence {
    /**
     * The mode of the pattern preset.
     */
    export enum mode {
        PARTITION = 'PARTITION',
        LINEAR = 'LINEAR',
        SPLINE = 'SPLINE',
        PATTERN = 'PATTERN',
        UNDEFINED = 'UNDEFINED',
    }
}

