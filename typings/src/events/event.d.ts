import { IEventContext } from "./interface";
/**----------------------------------------------------------------------------
 * @class	Event
 * ----------------------------------------------------------------------------
 * New instance of a particular event definition
 * @author	Kip Price
 * @version 1.0.0
 * ----------------------------------------------------------------------------
 */
export default abstract class Event<C extends IEventContext> {
    /** event name (overriden by child classes) */
    protected abstract get _key(): string;
    get key(): string;
    /** the context to include in the event */
    protected _context: C;
    get context(): C;
    /**
     * Event
     * ----------------------------------------------------------------------------
     * create a new Event with the appropriate context
     * @param	context		The context to add to the event
     */
    constructor(context: C);
}
