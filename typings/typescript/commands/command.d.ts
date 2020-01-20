/**----------------------------------------------------------------------------
 * @class	CustomizableCommand
 * ----------------------------------------------------------------------------
 * framework command that allows for a "do" and an "undo"
 * @author	Kip Price
 * @version	1.0.0
 * ----------------------------------------------------------------------------
 */
export declare class CustomizableCommand<R = void, P = any> implements ICommand<R> {
    /** how to perform this action */
    protected _onExecute: ICommandFunction<R, P>;
    /** how to reverse performing this action */
    protected _onUnexecute: ICommandFunction<R, P>;
    /** the current state of the command (e.g. executed or unexecuted) */
    protected _state: CommandState;
    constructor(onExecute: any, onUnexecute: any);
    /**
     * execute
     * ---------------------------------------------------------------------------
     * perform the action on this commend
     */
    execute(params: P): R;
    /**
     * unexecute
     * ---------------------------------------------------------------------------
     * reverse the action of this command
     */
    unexecute(params: P): R;
}
export interface ICommand<R = void, P = any> {
    execute: (params?: P) => R;
    unexecute: (params?: P) => R;
}
export interface ICommandFunction<R, P> {
    (params?: P): R;
}
export declare enum CommandState {
    ERR = 0,
    EXECUTED = 1,
    REVERSED = 2
}
