"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**----------------------------------------------------------------------------
     * @class	HistoryNode
     * ----------------------------------------------------------------------------
     * Keep track of a history event
     * @author	Kip Price
     * @version 1.0.1
     * ----------------------------------------------------------------------------
     */
class HistoryNode {
    //#endregion
    //.....................
    /**
     * HistoryNode<T>
     * ----------------------------------------------------------------------------
     * Create the history node
     * @param   data    What to store in the node
     */
    constructor(data) {
        this.data = data;
    }
}
exports.HistoryNode = HistoryNode;
