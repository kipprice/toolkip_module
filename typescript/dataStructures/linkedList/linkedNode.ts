/**----------------------------------------------------------------------------
 * @class	LinkedNoode
 * ----------------------------------------------------------------------------
 * keep track of data in a single entry in a linked list
 * @author	Kip Price
 * @version	1.0.0
 * ----------------------------------------------------------------------------
 */
export default class LinkedNode<T> {

	//.....................
	//#region PROPERTIES

	/** track the data associated in this node */
	protected _data: T;
	public get data(): T { return this._data; }
	public set data(data: T) { this._data = data; }

	/** keep track of the next node in sequence */
	protected _next: LinkedNode<T>;
	public get next(): LinkedNode<T> { return this._next; }
	public set next(data: LinkedNode<T>) { this._next = data; }

	/** keep track of the previous node in sequence */
	protected _previous: LinkedNode<T>;
	public get previous(): LinkedNode<T> { return this._previous; }
	public set previous(data: LinkedNode<T>) { this._previous = data; }

	//#endregion
	//.....................

	//...................................................
	//#region CREATE THE NODE

	public constructor(data: T) {
		this._data = data;
		this._previous = null;
		this._next = null;
	}

	//#endregion
	//...................................................
}