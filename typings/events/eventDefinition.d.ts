import { Collection } from '../dataStructures/collection/collection';
import { IEventContext, IListenerData } from './_interfaces';
import { Event } from './event';
/**----------------------------------------------------------------------------
 * @class	EventDefinition
 * ----------------------------------------------------------------------------
 * Declare the definition for a particular event
 * @author	Kip Price
 * @version 1.0.1
 * ----------------------------------------------------------------------------
 */
export declare class EventDefinition<C extends IEventContext> {
    /** keep track of the name of the event */
    protected _name: string;
    /** key to use to associate this [articular event] */
    protected _key: string;
    /** colletcion of areas of code that care when this event fires */
    protected _listeners: Collection<IListenerData<C>>;
    /** keep track of how many listeners we've added */
    protected _numOfListeners: number;
    /**
     * EventDefinition
     * ----------------------------------------------------------------------------
     * Creates a new Event
     * @param 	details 	The specs for this particular event
     */
    constructor(key: string, name: string);
    /**
     * addListener
     * ----------------------------------------------------------------------------
     * add a listener to our collection (with the option to replace if using a unique key)
     *
     * @param	listenerData	The listener features to add
     *
     */
    addListener(listenerData: IListenerData<C>): void;
    /**
     * removeEventListener
     * ----------------------------------------------------------------------------
     * allow a listener to be skipped
     *
     * @param	uniqueId	Unique identifier for the listener to remove
     *
     */
    removeEventListener(uniqueId: string): void;
    /**
     * notifyListeners
     * ----------------------------------------------------------------------------
     * Let listeners know that an event that they care about has been fired
     *
     * @param 	context 	The context to send along with the event
     *
     */
    notifyListeners(context: Event<C>): void;
}
