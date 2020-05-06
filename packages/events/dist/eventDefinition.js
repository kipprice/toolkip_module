"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toolkip_data_structures_1 = require("@kipprice/toolkip-data-structures");
const toolkip_comparable_1 = require("@kipprice/toolkip-comparable");
/**----------------------------------------------------------------------------
 * @class	EventDefinition
 * ----------------------------------------------------------------------------
 * Declare the definition for a particular event
 * @author	Kip Price
 * @version 1.0.1
 * ----------------------------------------------------------------------------
 */
class EventDefinition {
    //#endregion
    //.....................
    /**
     * EventDefinition
     * ----------------------------------------------------------------------------
     * Creates a new Event
     * @param 	details 	The specs for this particular event
     */
    constructor(key, name) {
        /** keep track of how many listeners we've added */
        this._numOfListeners = 0;
        this._name = name;
        this._key = key;
        this._listeners = new toolkip_data_structures_1.Collection(toolkip_data_structures_1.CollectionTypeEnum.ReplaceDuplicateKeys);
    }
    /**
     * addListener
     * ----------------------------------------------------------------------------
     * add a listener to our collection (with the option to replace if using a unique key)
     *
     * @param	listenerData	The listener features to add
     *
     */
    addListener(listenerData) {
        listenerData.uniqueId = listenerData.uniqueId || (this._key + this._numOfListeners.toString());
        this._listeners.add(listenerData.uniqueId, listenerData);
        this._numOfListeners += 1;
    }
    /**
     * removeEventListener
     * ----------------------------------------------------------------------------
     * allow a listener to be skipped
     *
     * @param	uniqueId	Unique identifier for the listener to remove
     *
     */
    removeEventListener(uniqueId) {
        if (!uniqueId) {
            return;
        }
        this._listeners.remove(uniqueId);
    }
    /**
     * notifyListeners
     * ----------------------------------------------------------------------------
     * Let listeners know that an event that they care about has been fired
     *
     * @param 	context 	The context to send along with the event
     *
     */
    notifyListeners(context) {
        // loop through the listeners to find one that applies for this context
        this._listeners.map((elem, key) => {
            if (!elem) {
                return;
            }
            if (!elem.target || (toolkip_comparable_1.equals(elem.target, context.context.target))) {
                elem.func(context);
            }
        });
    }
}
exports.EventDefinition = EventDefinition;
