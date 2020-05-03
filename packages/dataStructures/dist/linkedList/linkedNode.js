"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**----------------------------------------------------------------------------
 * @class	LinkedNoode
 * ----------------------------------------------------------------------------
 * keep track of data in a single entry in a linked list
 * @author	Kip Price
 * @version	1.0.0
 * ----------------------------------------------------------------------------
 */
class LinkedNode {
    //#endregion
    //.....................
    //...................................................
    //#region CREATE THE NODE
    constructor(data) {
        this._data = data;
        this._previous = null;
        this._next = null;
    }
    get data() { return this._data; }
    set data(data) { this._data = data; }
    get next() { return this._next; }
    set next(data) { this._next = data; }
    get previous() { return this._previous; }
    set previous(data) { this._previous = data; }
}
exports.LinkedNode = LinkedNode;
