/**----------------------------------------------------------------------------
	 * @class	HistoryNode
	 * ----------------------------------------------------------------------------
	 * Keep track of a history event
	 * @author	Kip Price
	 * @version 1.0.1
	 * ----------------------------------------------------------------------------
	 */
export class HistoryNode<T> {

    //.....................
    //#region PROPERTIES
    public data: T;
    public next: HistoryNode<T>;
    public previous: HistoryNode<T>;
    //#endregion
    //.....................

    /**
     * HistoryNode<T>
     * ----------------------------------------------------------------------------
     * Create the history node
     * @param   data    What to store in the node
     */
    constructor(data: T) {
        this.data = data;
    }
}