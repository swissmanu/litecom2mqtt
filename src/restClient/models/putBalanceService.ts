/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Data model to change the light balance (direct and indirect light).
 */
export type putBalanceService = {
    /**
     * The balance to be set between direct and indirect light.<br> A value of `0` means only indirect light, `100` means only direct light.
     */
    balance: number;
};

