/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Data model to initiate and stop a relative movement of a motor device.
 */
export type putMotorDimmableOption = {
    /**
     * The command can be one of the following options
     * * `OPEN` - starts moving the device towards the opened state using a sequence of progressive commands.
     * * `CLOSE` - starts moving the device towards the closed state using a sequence of progressive commands
     * * `STOP` - stops an ongoing relative movement operation.
     *
     * The practical meaning of the open and close family of commands depends on the motor device type, as described:
     * * blind
     * * `OPEN` - the blinds will move to a fully collapsed/retracted position, allowing outside light to pass.
     * * `CLOSE` - the blinds will move to a fully extended position, blocking outside light.
     * * blind slats
     * * `OPEN` - the blind slats will move to an horizontal position, allowing outside light to pass.
     * * `CLOSE` - the blind slats will move to a vertical position, blocking outside light.
     * * window
     * * `OPEN` - the window will move towards an opened position.
     * * `CLOSE` - the window will move towards a closed position.
     * * screen
     * * `OPEN` - the screen will be lowered.
     * * `CLOSE` - the screen will be raised.
     */
    action: putMotorDimmableOption.action;
};
export namespace putMotorDimmableOption {
    /**
     * The command can be one of the following options
     * * `OPEN` - starts moving the device towards the opened state using a sequence of progressive commands.
     * * `CLOSE` - starts moving the device towards the closed state using a sequence of progressive commands
     * * `STOP` - stops an ongoing relative movement operation.
     *
     * The practical meaning of the open and close family of commands depends on the motor device type, as described:
     * * blind
     * * `OPEN` - the blinds will move to a fully collapsed/retracted position, allowing outside light to pass.
     * * `CLOSE` - the blinds will move to a fully extended position, blocking outside light.
     * * blind slats
     * * `OPEN` - the blind slats will move to an horizontal position, allowing outside light to pass.
     * * `CLOSE` - the blind slats will move to a vertical position, blocking outside light.
     * * window
     * * `OPEN` - the window will move towards an opened position.
     * * `CLOSE` - the window will move towards a closed position.
     * * screen
     * * `OPEN` - the screen will be lowered.
     * * `CLOSE` - the screen will be raised.
     */
    export enum action {
        OPEN = 'OPEN',
        CLOSE = 'CLOSE',
        STOP = 'STOP',
    }
}

