"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**----------------------------------------------------------------------------
 * @class	_CodeEvent
 * ----------------------------------------------------------------------------
 * event handler designed to be used as a singleton for single events; allows
 * for type safety and for passing context along with the event, including what
 * element triggered the event (without having to rely on the element being
 * identifiable)
 *
 * @author	Kip Price
 * @version	1.0.0
 * ----------------------------------------------------------------------------
 */
class CodeEvent {
    //#endregion
    //.....................
    constructor(name) {
        this._name = name;
        this._listeners = new Map();
    }
    /**
     * dispatch
     * ----------------------------------------------------------------------------
     * handle sending details to the
     */
    dispatch(target, data) {
        // make sure we include the standard data as well with the event
        let dispatchData = data;
        dispatchData.target = target;
        dispatchData.name = this._name;
        // get all listeners for this specific element, or for any element
        let listeners = [];
        listeners = listeners.concat(this._listeners.get(target));
        listeners = listeners.concat(this._listeners.get(null));
        // let all listeners know what's happening
        for (let cb of listeners) {
            if (!cb) {
                continue;
            }
            cb(dispatchData);
        }
    }
    /**
     * addEventListener
     * ----------------------------------------------------------------------------
     * allow any object to listen to this event
     *
     * @param   cb      the callback to use when this event is raised
     * @param   target  if provided, limits callbacks to events raised by the specified target
     */
    addEventListener(cb, target) {
        if (!target) {
            target = null;
        }
        // get the current set of listeners
        let listeners = this._listeners.get(target);
        if (!listeners) {
            listeners = [];
        }
        listeners.push(cb);
        this._listeners.set(target, listeners);
    }
}
exports.CodeEvent = CodeEvent;
