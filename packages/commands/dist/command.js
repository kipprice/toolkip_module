"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _interfaces_1 = require("./_interfaces");
/**----------------------------------------------------------------------------
 * @class	CustomizableCommand
 * ----------------------------------------------------------------------------
 * framework command that allows for a "do" and an "undo"
 * @author	Kip Price
 * @version	1.0.0
 * ----------------------------------------------------------------------------
 */
class CustomizableCommand {
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
    execute(params) {
        // validate that we can execute this command
        if (this._state === _interfaces_1.CommandState.EXECUTED) {
            throw new Error("already performed");
        }
        if (!this._onExecute) {
            throw new Error("no do action");
        }
        // execute the command & update the state
        this._state = _interfaces_1.CommandState.EXECUTED;
        return this._onExecute(params);
    }
    /**
     * unexecute
     * ---------------------------------------------------------------------------
     * reverse the action of this command
     */
    unexecute(params) {
        // validate that we can unexecute this command
        if (this._state !== _interfaces_1.CommandState.EXECUTED) {
            throw new Error("not yet performed");
        }
        if (!this._onUnexecute) {
            throw new Error("no undo action");
        }
        // reverse the command & update the state
        this._state = _interfaces_1.CommandState.REVERSED;
        return this._onUnexecute(params);
    }
}
exports.CustomizableCommand = CustomizableCommand;
