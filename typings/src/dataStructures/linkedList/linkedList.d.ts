import LinkedNode from './linkedNode';
/**---------------------------------------------------------------------------
 * @class   LinkedList<T>
 * ---------------------------------------------------------------------------
 * generic storage for items as a linkeed list
 * @author  Kip Price
 * @version 1.0.0
 * ---------------------------------------------------------------------------
 */
export default class LinkedList<T> {
    /** track the first node in the list */
    protected _firstNode: LinkedNode<T>;
    /** track the last node in the list */
    protected _lastNode: LinkedNode<T>;
    /** keep track of the length of the list */
    protected _length: number;
    get length(): number;
    constructor();
    /**
     * add
     * ---------------------------------------------------------------------------
     * add an element to the end of the linked list
     *
     * @param	data	The element to add
     *
     * @returns	True if the element was added successfully
     */
    add(data: T): boolean;
    /**
     * insert
     * ---------------------------------------------------------------------------
     * add an element at the specified index
     *
     * @param	data	The element to add
     * @param	idx		The index at which to add the element
     *
     * @returns	True if the element was added successfully
     */
    insert(data: T, idx: number): boolean;
    /**
     * remove
     * ---------------------------------------------------------------------------
     * remove the element at the specified index
     *
     * @param	idx		The index to remove from
     *
     * @returns	The data contained at that index
     */
    remove(idx: number): T;
    /**
     * findAndRemove
     * ---------------------------------------------------------------------------
     * description
     */
    findAndRemove(val: T): boolean;
    get(idx: number): T;
    getIndex(val: T): number;
    contains(val: T): boolean;
    protected _getNodeAtIdx(idx: number): LinkedNode<T>;
    protected _isEqual(a: T, b: T): boolean;
    protected _getNodeAtIdxForward(idx: number): LinkedNode<T>;
    protected _getNodeAtIdxBackward(idx: number): LinkedNode<T>;
}
