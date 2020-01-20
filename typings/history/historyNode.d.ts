/**----------------------------------------------------------------------------
     * @class	HistoryNode
     * ----------------------------------------------------------------------------
     * Keep track of a history event
     * @author	Kip Price
     * @version 1.0.1
     * ----------------------------------------------------------------------------
     */
export declare class HistoryNode<T> {
    data: T;
    next: HistoryNode<T>;
    previous: HistoryNode<T>;
    /**
     * HistoryNode<T>
     * ----------------------------------------------------------------------------
     * Create the history node
     * @param   data    What to store in the node
     */
    constructor(data: T);
}
