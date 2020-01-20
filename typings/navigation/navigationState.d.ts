import { IDictionary } from "../objectHelpers/_interfaces";
/**----------------------------------------------------------------------------
 * @class	NavigationState<T>
 * ----------------------------------------------------------------------------
 * Keep track of state at the navigation level
 * @author	Kip Price
 * @version 1.0.0
 * ----------------------------------------------------------------------------
 */
export declare abstract class ApplicationState<T extends IDictionary<any>> {
    /** each instance of state will have its own set of data it wants to store */
    protected _models: T;
    /**
     * create an instance of navigation state
     *
     */
    constructor();
    /**
     * getState
     *
     * Gets the current state of a particular model
     * @param 	key		The state model to retrieve
     *
     */
    getState<K extends keyof T>(key: K): T[K];
    /**
     * setState
     *
     * Sets the current state of a particular model
     * @param 	key		The state model to retrieve
     * @param 	value	The value to set for the model
     *
     */
    setState<K extends keyof T>(key: K, value: T[K]): void;
    /**
     * clearState
     *
     * Clears out the current state for a state model
     * @param 	key		The state model to clear
     *
     */
    clearState<K extends keyof T>(key: K): void;
}
