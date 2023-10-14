/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Data model to initiate and stop a brighten/dim process.
 */
export type putDimmableOption = {
    /**
     * The command can be one of the following options:
     * * `UP` - starts increasing light intensity.
     * * `DOWN` - starts decreasing light intensity.
     * * `STOP` - stops an ongoing brighten/dim operation.<br>
     *
     * Note: For the _Balance service_ `UP` will increase the direct light component and `DOWN` the indirect.
     */
    action: putDimmableOption.action;
    /**
     * Defines, for _Sequence service_ only, which component will react to the operation. Defaults to `BOTH` if missing.<br> This is ignored for other services.
     */
    components?: putDimmableOption.components;
};
export namespace putDimmableOption {
    /**
     * The command can be one of the following options:
     * * `UP` - starts increasing light intensity.
     * * `DOWN` - starts decreasing light intensity.
     * * `STOP` - stops an ongoing brighten/dim operation.<br>
     *
     * Note: For the _Balance service_ `UP` will increase the direct light component and `DOWN` the indirect.
     */
    export enum action {
        UP = 'UP',
        DOWN = 'DOWN',
        STOP = 'STOP',
    }
    /**
     * Defines, for _Sequence service_ only, which component will react to the operation. Defaults to `BOTH` if missing.<br> This is ignored for other services.
     */
    export enum components {
        DIRECT = 'DIRECT',
        INDIRECT = 'INDIRECT',
        BOTH = 'BOTH',
    }
}

