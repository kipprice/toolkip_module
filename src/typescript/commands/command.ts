/**----------------------------------------------------------------------------
 * @class	CustomizableCommand
 * ----------------------------------------------------------------------------
 * framework command that allows for a "do" and an "undo"
 * @author	Kip Price
 * @version	1.0.0
 * ----------------------------------------------------------------------------
 */
export class CustomizableCommand<R = void, P = any> implements ICommand<R> {

    //.....................
    //#region PROPERTIES

    /** how to perform this action */
    protected _onExecute: ICommandFunction<R, P>;

    /** how to reverse performing this action */
    protected _onUnexecute: ICommandFunction<R, P>;

    /** the current state of the command (e.g. executed or unexecuted) */
    protected _state: CommandState;

    //#endregion
    //.....................

    //..........................................
    //#region HANDLE RUNNING THE COMMAND

    constructor(onExecute, onUnexecute) {
        this._onExecute = onExecute;
        this._onUnexecute = onUnexecute;
    }

    /**
     * execute
     * ---------------------------------------------------------------------------
     * perform the action on this commend
     */
    public execute(params: P): R {

        // validate that we can execute this command
        if (this._state === CommandState.EXECUTED) { throw new Error("already performed"); }
        if (!this._onExecute) { throw new Error("no do action"); }

        // execute the command & update the state
        this._state = CommandState.EXECUTED;
        return this._onExecute(params);
    }

    /**
     * unexecute
     * ---------------------------------------------------------------------------
     * reverse the action of this command
     */
    public unexecute(params: P): R {

        // validate that we can unexecute this command
        if (this._state !== CommandState.EXECUTED) { throw new Error("not yet performed"); }
        if (!this._onUnexecute) { throw new Error("no undo action"); }

        // reverse the command & update the state
        this._state = CommandState.REVERSED;
        return this._onUnexecute(params);
    }

    //#endregion
    //..........................................

}

//..........................................
//#region TYPES AND INTERFACES


export interface ICommand<R = void, P = any> {
    execute: (params?: P) => R;
    unexecute: (params?: P) => R;
}

export interface ICommandFunction<R, P> {
    (params?: P): R;
}

export enum CommandState {
    ERR = 0,
    EXECUTED = 1,
    REVERSED = 2
}

//#endregion
//..........................................