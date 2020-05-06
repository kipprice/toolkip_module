"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**----------------------------------------------------------------------------
 * @class	Event
 * ----------------------------------------------------------------------------
 * New instance of a particular event definition
 * @author	Kip Price
 * @version 1.0.0
 * ----------------------------------------------------------------------------
 */
class _Event {
    //#endregion
    //.....................
    /**
     * Event
     * ----------------------------------------------------------------------------
     * create a new Event with the appropriate context
     * @param	context		The context to add to the event
     */
    constructor(context) {
        this._context = context;
    }
    get key() { return this._key; }
    get context() { return this._context; }
}
exports._Event = _Event;
