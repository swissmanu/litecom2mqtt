/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Link } from './Link.js';
/**
 * Data model for _Balance service_.
 */
export type BalanceService = {
    /**
     * The balance between direct and indirect light.<br> A value of `0` means only indirect light, `100` means only direct light.
     */
    balance: number | null;
    /**
     * An array containing the valid actions of _Balance service_.<br> Expect at least "self" and "setBalance" operation.
     */
    links: Array<Link>;
};
