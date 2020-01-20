import { EventDefinition } from "./eventDefinition";
import { Collection } from "../dataStructures/collection/collection";
import { IListenerData, IListener } from "./_interfaces";
import { Event } from './event';
/**----------------------------------------------------------------------------
 * @class 	EventHandler
 * ----------------------------------------------------------------------------
 * Handles all events that are raised by any applications
 * @author	Kip Price
 * @version 1.0.5
 * ----------------------------------------------------------------------------
 */
export declare abstract class EventHandler<T = any> {
    /** keep track of all the events that are registered to this event handler */
    protected _events: Collection<EventDefinition<any>>;
    /**
     * createEvent
     * ----------------------------------------------------------------------------
     * create a new event with a partular key and name
     *
     * @param	details		Specs for the event we are creating
     *
     * @returns	True if a new event was created
     */
    createEvent<K extends keyof T>(key: K, name?: string): boolean;
    /**
     * dispatchEvent
     * ----------------------------------------------------------------------------
     * handle notifying listeners about an event that occurred
     *
     * @param	key			The key used by this particular event
     * @param	context		THe additional context to use for the event
     * */
    dispatchEvent<K extends keyof T>(key: K, event: Event<T[K]>): void;
    /**
     * addEventListener
     * ----------------------------------------------------------------------------
     * register an additional listener with a particular event
     *
     * @param	key				The key to use for the event
     * @param	listenerData	The data to use for the listener being added
     */
    addEventListener<K extends keyof T>(key: K, listenerData: IListenerData<T[K]> | IListener<T[K]>): void;
    /**
     * removeEventListener
     * ----------------------------------------------------------------------------
     *  remove a particular event listener
     *
     * @param	uniqueId	The unique ID for this listener
     * @param	key			If specified, the particular event to remove from
     */
    removeEventListener(uniqueID: string, key?: string): void;
}
