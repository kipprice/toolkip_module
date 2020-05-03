"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const history_1 = require("./history");
/**----------------------------------------------------------------------------
 * @class   UndoChain
 * ----------------------------------------------------------------------------
 * Allow actions to be undone / redone
 * @author  Kip Price
 * @version 1.0.0
 * ----------------------------------------------------------------------------
 */
class _UndoChain extends history_1.HistoryChain {
    /**
     * UndoChain
     * ----------------------------------------------------------------------------
     * Create an undo chain and registers appropriate listeners
     */
    constructor() {
        super();
        window.addEventListener("keyup", (event) => {
            if (!event.ctrlKey) {
                return;
            } // we always need ctrl to be pressed
            if (event.keyCode !== 90) {
                return;
            } // likewise, we always need a z
            if (this._shouldIgnoreEvent(event)) {
                return;
            } // alo listen to user-specified ignores
            // shift key means we're trying to redo
            if (event.shiftKey) {
                this.redo();
                // otherwise, perform an undo
            }
            else {
                this.undo();
            }
        });
    }
    /**
     * undo
     * ----------------------------------------------------------------------------
     * Undo an action. Also fired by ctrl + z;
     */
    undo() {
        let undoable = this.navigateBack();
        if (!undoable || !undoable.reverseFunction) {
            return;
        }
        undoable.reverseFunction();
    }
    /**
     * redo
     * ----------------------------------------------------------------------------
     * Redo an action. Also fired by ctrl + shift + z.
     */
    redo() {
        let undoable = this.navigateForward();
        if (!undoable || !undoable.forwardFunction) {
            return;
        }
        undoable.forwardFunction();
    }
}
exports._UndoChain = _UndoChain;
