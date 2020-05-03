"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const historyNode_1 = require("./historyNode");
const toolkip_object_helpers_1 = require("@kipprice/toolkip-object-helpers");
/**----------------------------------------------------------------------------
 * @class	HistoryChain
 * ----------------------------------------------------------------------------
 * Keep track of internal history & allow moving forward and backward
 * @author	Kip Price
 * @version 1.0.0
 * ----------------------------------------------------------------------------
 */
class HistoryChain {
    //#endregion
    //.....................
    /**
     * push
     * ----------------------------------------------------------------------------
     * Push a new value into our history chain
     * @param   data    The data to add
     */
    push(data) {
        let node = new historyNode_1.HistoryNode(data);
        // case 1: first node we're adding
        if (!this._start) {
            this._start = node;
            this._end = node;
            this._curNode = node;
            return;
        }
        // clear the forward history if we're adding new data
        if (this._curNode !== this._end) {
            this._clearToCurIdx();
        }
        // everything else will just add to the end
        this._end.next = node;
        node.previous = this._end;
        this._end = node;
        this._curNode = this._end;
    }
    /**
     * _clearToCurIdx
     * ----------------------------------------------------------------------------
     * Clear out all history events that happened after the current index
     */
    _clearToCurIdx() {
        this._end = this._curNode;
        this._curNode.next = null;
    }
    /**
     * navigateBack
     * ----------------------------------------------------------------------------
     * Move bakcwards in the history chain
     * @returns The state we're moving to
     */
    navigateBack() {
        if (!this._curNode.previous) {
            return null;
        }
        window.setTimeout(() => {
            this._curNode = this._curNode.previous;
        }, 0);
        return this._curNode.previous.data;
    }
    /**
     * navigateForward
     * ----------------------------------------------------------------------------
     * Move forwards in the history chain
     * @returns The atate we're moving to
     */
    navigateForward() {
        if (!this._curNode.next) {
            return null;
        }
        window.setTimeout(() => {
            this._curNode = this._curNode.next;
        }, 0);
        return this._curNode.next.data;
    }
    /**
     * updateCurrentState
     * ----------------------------------------------------------------------------
     * Update our current history node to include a new aspect of state
     * @param 	newState 	The state to update to
     * @returns	True if the state was updated, false otherwise
     */
    updateCurrentState(newState) {
        if (!this._curNode) {
            return false;
        }
        let curState = this._curNode.data;
        let combinedState = toolkip_object_helpers_1.combineObjects(curState, newState, true);
        this._curNode.data = combinedState;
        return true;
    }
}
exports.HistoryChain = HistoryChain;
