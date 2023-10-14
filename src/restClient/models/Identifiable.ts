/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Link } from './Link.ts';
/**
 * The name and type of a service.
 */
export type Identifiable = {
    /**
     * The name of the service.
     */
    name: string;
    /**
     * The type of the service.
     */
    type: Identifiable.type;
    /**
     * An array containing the valid relations/actions for _Identifiable_ schema.<br>Expect at least "self" and when applicable "parent".
     */
    links: Array<Link>;
};
export namespace Identifiable {
    /**
     * The type of the service.
     */
    export enum type {
        BALANCE = 'BALANCE',
        BLIND = 'BLIND',
        ENERGY = 'ENERGY',
        GENERAL_CONTACT = 'GENERAL_CONTACT',
        LIGHTING = 'LIGHTING',
        RGB = 'RGB',
        SCENE = 'SCENE',
        SCREEN = 'SCREEN',
        SEQUENCE = 'SEQUENCE',
        SLAT = 'SLAT',
        TUNABLE_WHITE = 'TUNABLE_WHITE',
        WINDOW = 'WINDOW',
        ERROR = 'ERROR',
    }
}

