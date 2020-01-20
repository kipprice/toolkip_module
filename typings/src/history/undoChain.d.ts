import { HistoryChain } from "./history";
import { Undoable } from "./_interfaces";
/**----------------------------------------------------------------------------
 * @class   UndoChain
 * ----------------------------------------------------------------------------
 * Allow actions to be undone / redone
 * @author  Kip Price
 * @version 1.0.0
 * ----------------------------------------------------------------------------
 */
export declare abstract class UndoChain extends HistoryChain<Undoable> {
    /**
     * UndoChain
     * ----------------------------------------------------------------------------
     * Create an undo chain and registers appropriate listeners
     */
    constructor();
    /**
     * _shouldIgnoreEvent
     * ----------------------------------------------------------------------------
     * Overridable function that checks if we should ignore a relevant key event.
     * This is useful for cases where the browser has built in undo/redo
     * functionality, so we don't perform 2 actions.
     *
     * @param   event   The event we could potentially ignore
     *
     * @returns True if we should ignore the event
     */
    protected abstract _shouldIgnoreEvent(event: KeyboardEvent): boolean;
    /**
     * undo
     * ----------------------------------------------------------------------------
     * Undo an action. Also fired by ctrl + z;
     */
    undo(): void;
    /**
     * redo
     * ----------------------------------------------------------------------------
     * Redo an action. Also fired by ctrl + shift + z.
     */
    redo(): void;
}
