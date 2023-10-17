/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Link } from './Link.ts';
/**
 * Data model for _Motor service_.<br> This is used for _Blind_, _Slat_, _Screen_ and _Window_ services.<br> Provides the last know motor position. The real position is only available in xSM mode of the motor device.
 */
export type MotorService = {
    /**
     * The motor position expressed in percentage [%].
     */
    position: number | null;
    /**
     * An array containing the valid actions of _Motor service_.<br> Expect at least "self", "parent" and all motor operations (e.g. "open", "close", "stepUp", "stepDown", "setPosition", "stop").
     */
    links: Array<Link>;
};

