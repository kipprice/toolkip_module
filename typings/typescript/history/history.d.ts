import HistoryNode from "./historyNode";
/**----------------------------------------------------------------------------
 * @class	HistoryChain
 * ----------------------------------------------------------------------------
 * Keep track of internal history & allow moving forward and backward
 * @author	Kip Price
 * @version 1.0.0
 * ----------------------------------------------------------------------------
 */
export default class HistoryChain<T> {
    /** the first history event tracked */
    protected _start: HistoryNode<T>;
    /** the last history event tracked */
    protected _end: HistoryNode<T>;
    /** the current history node we are sitting on */
    protected _curNode: HistoryNode<T>;
    /**
     * push
     * ----------------------------------------------------------------------------
     * Push a new value into our history chain
     * @param   data    The data to add
     */
    push(data: T): void;
    /**
     * _clearToCurIdx
     * ----------------------------------------------------------------------------
     * Clear out all history events that happened after the current index
     */
    protected _clearToCurIdx(): void;
    /**
     * navigateBack
     * ----------------------------------------------------------------------------
     * Move bakcwards in the history chain
     * @returns The state we're moving to
     */
    navigateBack(): T;
    /**
     * navigateForward
     * ----------------------------------------------------------------------------
     * Move forwards in the history chain
     * @returns The atate we're moving to
     */
    navigateForward(): T;
    /**
     * updateCurrentState
     * ----------------------------------------------------------------------------
     * Update our current history node to include a new aspect of state
     * @param 	newState 	The state to update to
     * @returns	True if the state was updated, false otherwise
     */
    updateCurrentState(newState: T): boolean;
}
