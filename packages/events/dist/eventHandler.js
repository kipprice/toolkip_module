"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const eventDefinition_1 = require("./eventDefinition");
const toolkip_data_structures_1 = require("@kipprice/toolkip-data-structures");
/**----------------------------------------------------------------------------
 * @class 	_EventHandler
 * ----------------------------------------------------------------------------
 * Handles all events that are raised by any applications
 * @author	Kip Price
 * @version 1.0.5
 * ----------------------------------------------------------------------------
 */
class _EventHandler {
    constructor() {
        /** keep track of all the events that are registered to this event handler */
        this._events = new toolkip_data_structures_1.Collection();
    }
    /**
     * createEvent
     * ----------------------------------------------------------------------------
     * create a new event with a partular key and name
     *
     * @param	details		Specs for the event we are creating
     *
     * @returns	True if a new event was created
     */
    createEvent(key, name) {
        let evt = new eventDefinition_1.EventDefinition(key, name);
        return (this._events.add(key, evt) !== -1);
    }
    /**
     * dispatchEvent
     * ----------------------------------------------------------------------------
     * handle notifying listeners about an event that occurred
     *
     * @param	key			The key used by this particular event
     * @param	context		THe additional context to use for the event
     * */
    dispatchEvent(key, event) {
        let evtDef = this._events.getValue(event.key);
        if (!evtDef) {
            return;
        }
        evtDef.notifyListeners(event);
    }
    /**
     * addEventListener
     * ----------------------------------------------------------------------------
     * register an additional listener with a particular event
     *
     * @param	key				The key to use for the event
     * @param	listenerData	The data to use for the listener being added
     */
    addEventListener(key, listenerData) {
        let evt = this._events.getValue(key);
        if (!evt) {
            return;
        }
        // ensure we're working with the object
        if (typeof listenerData === "function") {
            listenerData = { func: listenerData };
        }
        evt.addListener(listenerData);
    }
    /**
     * removeEventListener
     * ----------------------------------------------------------------------------
     *  remove a particular event listener
     *
     * @param	uniqueId	The unique ID for this listener
     * @param	key			If specified, the particular event to remove from
     */
    removeEventListener(uniqueID, key) {
        if (!uniqueID) {
            return;
        }
        // If it's only a particular type of event that is being removed, do so
        if (key) {
            let evt = this._events.getValue(key);
            if (!evt) {
                return;
            }
            evt.removeEventListener(uniqueID);
            // Otherwise, remove this uniqueID from all events
        }
        else {
            this._events.map((evt) => {
                evt.removeEventListener(uniqueID);
            });
        }
    }
}
exports._EventHandler = _EventHandler;
