"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**----------------------------------------------------------------------------
 * @class	ApplicationState<T>
 * ----------------------------------------------------------------------------
 * Keep track of state at the navigation level
 * @author	Kip Price
 * @version 1.0.0
 * ----------------------------------------------------------------------------
 */
class _ApplicationState {
    /**
     * create an instance of navigation state
     *
     */
    constructor() {
        this._models = {};
    }
    /**
     * getState
     *
     * Gets the current state of a particular model
     * @param 	key		The state model to retrieve
     *
     */
    getState(key) {
        return this._models[key];
    }
    /**
     * setState
     *
     * Sets the current state of a particular model
     * @param 	key		The state model to retrieve
     * @param 	value	The value to set for the model
     *
     */
    setState(key, value) {
        this._models[key] = value;
    }
    /**
     * clearState
     *
     * Clears out the current state for a state model
     * @param 	key		The state model to clear
     *
     */
    clearState(key) {
        delete this._models[key];
    }
}
exports._ApplicationState = _ApplicationState;
