"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const linkedNode_1 = require("./linkedNode");
const toolkip_comparable_1 = require("@kipprice/toolkip-comparable");
/**---------------------------------------------------------------------------
 * @class   LinkedList<T>
 * ---------------------------------------------------------------------------
 * generic storage for items as a linkeed list
 * @author  Kip Price
 * @version 1.0.0
 * ---------------------------------------------------------------------------
 */
class LinkedList {
    //#endregion
    //.....................
    //...................................................
    //#region CREATE THE LINKED LIST
    constructor() {
        this._length = 0;
    }
    get length() { return this._length; }
    //#endregion
    //...................................................
    //...................................................
    //#region ADD ELEMENTS
    /**
     * add
     * ---------------------------------------------------------------------------
     * add an element to the end of the linked list
     *
     * @param	data	The element to add
     *
     * @returns	True if the element was added successfully
     */
    add(data) {
        return this.insert(data, this._length);
    }
    /**
     * insert
     * ---------------------------------------------------------------------------
     * add an element at the specified index
     *
     * @param	data	The element to add
     * @param	idx		The index at which to add the element
     *
     * @returns	True if the element was added successfully
     */
    insert(data, idx) {
        // validate that we'll be able to insert
        if (idx < 0) {
            return false;
        }
        if (idx > this._length) {
            return false;
        }
        // create the node
        let newNode = new linkedNode_1.LinkedNode(data);
        // grab the adjacent nodes
        let nextNode = this._getNodeAtIdx(idx);
        let prevNode = this._getNodeAtIdx(idx - 1);
        // if there's a node after this element, update the pointers
        if (nextNode) {
            nextNode.previous = newNode;
            newNode.next = nextNode;
            // otherwise, this must be the new last node
        }
        else {
            this._lastNode = newNode;
        }
        // if there's a node before this element, update the pointers
        if (prevNode) {
            prevNode.next = newNode;
            newNode.previous = prevNode;
            // otherwise, this must be the new first node
        }
        else {
            this._firstNode = newNode;
        }
        // increment the number of elements in this list
        this._length += 1;
    }
    //#endregion
    //...................................................
    //...................................................
    //#region REMOVE ELEMENTS
    /**
     * remove
     * ---------------------------------------------------------------------------
     * remove the element at the specified index
     *
     * @param	idx		The index to remove from
     *
     * @returns	The data contained at that index
     */
    remove(idx) {
        let node = this._getNodeAtIdx(idx);
        if (!node) {
            return null;
        }
        if (node.previous) {
            node.previous.next = node.next;
        }
        if (node.next) {
            node.next.previous = node.previous;
        }
        if (this._lastNode === node) {
            this._lastNode = node.previous;
        }
        if (this._firstNode === node) {
            this._firstNode = node.next;
        }
        // update the total number of elements
        this._length -= 1;
        // return the data that was in the node
        return node.data;
    }
    /**
     * findAndRemove
     * ---------------------------------------------------------------------------
     * description
     */
    findAndRemove(val) {
        let idx = this.getIndex(val);
        if (idx === -1) {
            return false;
        }
        return !!this.remove(idx);
    }
    //#endregion
    //...................................................
    //...................................................
    //#region GET ELEMENTS
    get(idx) {
        let node = this._getNodeAtIdx(idx);
        if (!node) {
            return null;
        }
        return node.data;
    }
    getIndex(val) {
        let cnt = 0;
        let curNode = this._firstNode;
        while (curNode) {
            if (this._isEqual(val, curNode.data)) {
                return cnt;
            }
            curNode = curNode.next;
            cnt += 1;
        }
        return null;
    }
    contains(val) {
        let idx = this.getIndex(val);
        if (idx === -1) {
            return false;
        }
        return true;
    }
    _getNodeAtIdx(idx) {
        // validate that we have a valid input
        if (idx < 0) {
            return null;
        }
        if (idx >= this._length) {
            return null;
        }
        // search from the end of the list that will be closer to the node
        if (idx < this._length / 2) {
            return this._getNodeAtIdxForward(idx);
        }
        else {
            return this._getNodeAtIdxBackward(idx);
        }
    }
    _isEqual(a, b) {
        if (toolkip_comparable_1.isEquatable(a) && toolkip_comparable_1.isEquatable(b)) {
            return (a.equals(b));
        }
        return (a === b);
    }
    _getNodeAtIdxForward(idx) {
        // loop through until we've hit the node at the specified index
        let curNode = this._firstNode;
        for (let count = 0; count < idx; count += 1) {
            curNode = curNode.next;
        }
        return curNode;
    }
    _getNodeAtIdxBackward(idx) {
        let curNode = this._lastNode;
        for (let count = this._length - 1; count > idx; count -= 1) {
            curNode = curNode.previous;
        }
        return curNode;
    }
}
exports.LinkedList = LinkedList;
