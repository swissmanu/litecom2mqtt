/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Data model to send and execute commands to a _Motor service_.
 */
export type putMotorService = {
    /**
     * The command can be one of the following options:
     * * Absolute position commands:
     * * `SET_POSITION` - sets motor position to the defined percentage stated in the "position" attribute;
     * * `OPEN` - moves the motor device to the open state of the associated device type;
     * * `CLOSE` - moves the motor device to the close state of the associated device type;
     * * Relative position commands:
     * * `STEP_OPEN` - moves the motor, for the minimum step size, in the direction of the open state;
     * * `STEP_CLOSE` - moves the motor, for the minimum step size, in the direction of the closed state
     * * `STOP` - sends an simple stop request to the motor device, stopping any in-progress movement;
     *
     * The meaning of the `OPEN` and `CLOSE` commands depends on the motor device type as described below:
     * * blind
     * * `OPEN` - the blinds are collapsed/retracted and allow outside light to pass. Its absolute position is 0%.
     * * `CLOSE` - the blinds are fully extended and block the outside light. Its absolute position is 100%.
     * * blind slats
     * * `OPEN` - the blind slats are horizontally positioned and allow outside light to pass. Its absolute position is 0%.
     * * `CLOSE` - the blind slats are vertically positioned and block outside light. Its absolute position is 100%.
     * * window
     * * `OPEN` - the window is open. Its absolute position is 100%.
     * * `CLOSE` - the window is closed. Its absolute position is 0%.
     * * screen
     * * `OPEN` - the screen is lowered/rolled down. Its absolute position is 100%.
     * * `CLOSE` - the screen is raised/rolled up. Its absolute position is 0%.
     *
     */
    command: putMotorService.command;
    /**
     * Motor position expressed in percentage [%].<br> The attribute is only required for the `SET_POSITION` command.
     */
    position?: number;
};
export namespace putMotorService {
    /**
     * The command can be one of the following options:
     * * Absolute position commands:
     * * `SET_POSITION` - sets motor position to the defined percentage stated in the "position" attribute;
     * * `OPEN` - moves the motor device to the open state of the associated device type;
     * * `CLOSE` - moves the motor device to the close state of the associated device type;
     * * Relative position commands:
     * * `STEP_OPEN` - moves the motor, for the minimum step size, in the direction of the open state;
     * * `STEP_CLOSE` - moves the motor, for the minimum step size, in the direction of the closed state
     * * `STOP` - sends an simple stop request to the motor device, stopping any in-progress movement;
     *
     * The meaning of the `OPEN` and `CLOSE` commands depends on the motor device type as described below:
     * * blind
     * * `OPEN` - the blinds are collapsed/retracted and allow outside light to pass. Its absolute position is 0%.
     * * `CLOSE` - the blinds are fully extended and block the outside light. Its absolute position is 100%.
     * * blind slats
     * * `OPEN` - the blind slats are horizontally positioned and allow outside light to pass. Its absolute position is 0%.
     * * `CLOSE` - the blind slats are vertically positioned and block outside light. Its absolute position is 100%.
     * * window
     * * `OPEN` - the window is open. Its absolute position is 100%.
     * * `CLOSE` - the window is closed. Its absolute position is 0%.
     * * screen
     * * `OPEN` - the screen is lowered/rolled down. Its absolute position is 100%.
     * * `CLOSE` - the screen is raised/rolled up. Its absolute position is 0%.
     *
     */
    export enum command {
        OPEN = 'OPEN',
        CLOSE = 'CLOSE',
        STEP_OPEN = 'STEP_OPEN',
        STEP_CLOSE = 'STEP_CLOSE',
        SET_POSITION = 'SET_POSITION',
        STOP = 'STOP',
    }
}

