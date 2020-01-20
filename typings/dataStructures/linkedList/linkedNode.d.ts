/**----------------------------------------------------------------------------
 * @class	LinkedNoode
 * ----------------------------------------------------------------------------
 * keep track of data in a single entry in a linked list
 * @author	Kip Price
 * @version	1.0.0
 * ----------------------------------------------------------------------------
 */
export declare class LinkedNode<T> {
    /** track the data associated in this node */
    protected _data: T;
    get data(): T;
    set data(data: T);
    /** keep track of the next node in sequence */
    protected _next: LinkedNode<T>;
    get next(): LinkedNode<T>;
    set next(data: LinkedNode<T>);
    /** keep track of the previous node in sequence */
    protected _previous: LinkedNode<T>;
    get previous(): LinkedNode<T>;
    set previous(data: LinkedNode<T>);
    constructor(data: T);
}
