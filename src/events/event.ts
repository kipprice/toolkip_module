import { IEventContext } from "./_interfaces";


/**----------------------------------------------------------------------------
 * @class	Event
 * ----------------------------------------------------------------------------
 * New instance of a particular event definition
 * @author	Kip Price
 * @version 1.0.0
 * ----------------------------------------------------------------------------
 */
export abstract class _Event<C extends IEventContext> {

	//.....................
	//#region PROPERTIES

	/** event name (overriden by child classes) */
	protected abstract get _key(): string;
	public get key(): string { return this._key; }

	/** the context to include in the event */
	protected _context: C;
	public get context(): C { return this._context; }

	//#endregion
	//.....................

	/**
	 * Event
	 * ----------------------------------------------------------------------------
	 * create a new Event with the appropriate context
	 * @param	context		The context to add to the event
	 */
	constructor(context: C) {
		this._context = context;
	}
}
