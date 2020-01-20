import { NamedClass } from '../../namedClass/namedClass';
import { IEquatable, IEqualityFunction } from '../../comparable/comparable';
import { CollectionTypeEnum, ICollectionElement, CollectionSortFunction } from './_interfaces';
import { IMapFunction } from '../../objectHelpers/_interfaces';
/**----------------------------------------------------------------------------
 * @class	Collection
 * ----------------------------------------------------------------------------
 * Keep track of a set of items in both key-based indices and sortable formats
 * @author	Kip Price
 * @version	3.0.0
 * ----------------------------------------------------------------------------
 */
export declare class Collection<T> extends NamedClass implements IEquatable {
    /** Tracks of the data in this collection */
    private _data;
    /** allow retrieval of a set of keys */
    get keys(): string[];
    /** Stores the sorted array of keys for the collection */
    private _sortedData;
    /** Whether we should augment or replace in this collection  */
    private _addType;
    set addType(addType: CollectionTypeEnum);
    /** internal counter for the iteration we are currently on */
    private _iteration;
    get iteration(): number;
    /** get the current number of elements in our collection */
    get length(): number;
    /** what to use to check for two elements being equal */
    protected _equalityTest: IEqualityFunction<T>;
    set equalityTest(test: IEqualityFunction<T>);
    /**
     * Collection
     * ----------------------------------------------------------------------------
     * Creates the collection
     * @param  replace 		True if we should override the values in the list
     * @return Collection
     */
    constructor(type?: CollectionTypeEnum, eq_test?: IEqualityFunction<T>);
    /**
     * addElement
     * ----------------------------------------------------------------------------
     * Adds an element to the collection
     * @param 	key  	The key to uniquely identify this element
     * @param 	val 	The element to add to our collection
     * @returns True if the element was successfully added
     */
    add(key: string, val: T): number;
    /**
     * removeElement
     * ----------------------------------------------------------------------------
     * combination function to handle all overloads
     */
    remove(key: string): ICollectionElement<T>;
    /**
     * removeElementByValue
     * ----------------------------------------------------------------------------
     * remove the element that matches the provided element
     */
    removeElementByValue(value: T): ICollectionElement<T>;
    /**
     * _removeElementByKey
     * ----------------------------------------------------------------------------
     * removes an element by key
     */
    protected _removeElementByKey(key: string): ICollectionElement<T>;
    /**
     * _removeElementByIndex
     * ----------------------------------------------------------------------------
     * removes an element by index
     */
    protected _removeElementByIndex(idx: number): ICollectionElement<T>;
    /**
     * _removeElementByValue
     * ----------------------------------------------------------------------------
     * removes an element by matching the element to the provided element
     */
    protected _removeElementByValue(val: T): ICollectionElement<T>;
    /**
     * clear
     * ----------------------------------------------------------------------------
     * clear out all elements within the collection
     */
    clear(): void;
    /**
     * _resetSortedKeys
     * ----------------------------------------------------------------------------
     * Ensure that the key stored with the element matches its location in the
     * sorted array
     */
    private _resetSortedKeys;
    /**
     * sort
     * ----------------------------------------------------------------------------
     * Sorts the collection
     * @param 	sort_func   	The function we should use to sort
     */
    sort(sort_func: CollectionSortFunction<T>): void;
    /**
     * map
     * ----------------------------------------------------------------------------
     * handle looping through the collection to get each element
     */
    map<R>(mapFunc: IMapFunction<T, R>): void;
    /**
     * resetLoop
     * ----------------------------------------------------------------------------
     * Resets our iteration counter
     *
     * @param	reverse		If true, loops through backwards
     */
    resetLoop(reverse?: boolean): void;
    /**
     * hasNext
     * ----------------------------------------------------------------------------
     * Checks if we have a next element available for getting
     * @param 	reverse 	True if we should loop backwards
     *
     * @returns True if there is a next element available
     */
    hasNext(reverse?: boolean): boolean;
    /**
     * getNext
     * ----------------------------------------------------------------------------
     * Finds the next element in our loop
     * @param 	reverse 	True if we should loop backwards
     *
     * @returns The element next in our array
     */
    getNext(reverse?: boolean): ICollectionElement<T>;
    /**
     * getCurrent
     * ----------------------------------------------------------------------------
     * Grab the current selected element
     */
    getCurrent(): ICollectionElement<T>;
    /**
     * toArray
     * ----------------------------------------------------------------------------
     * Return a sorted array of the elements in this collection
     */
    toArray(): Array<ICollectionElement<T>>;
    /**
     * toValueArray
     * ----------------------------------------------------------------------------
     * Get an array of just the values in this collection
     */
    toValueArray(): Array<T>;
    /**
     * getElement
     * ----------------------------------------------------------------------------
     * Get an element within our collection using the specified key
     * @returns	The appropriate element for this key
     */
    getElement(key: string): ICollectionElement<T>;
    /**
     * getElement
     * ----------------------------------------------------------------------------
     * Get an element within our collection using the specified index
     * @returns	The appropriate element for this index
     */
    getElement(idx: number): ICollectionElement<T>;
    /**
     * getValue
     * ----------------------------------------------------------------------------
     * Get the value associated with the specified key
     * @returns	The value associated with this key
     */
    getValue(key: string): T;
    /**
     * getValue
     * ----------------------------------------------------------------------------
     * Get the value associated with the specified index
     * @returns	The value associated with this index
     */
    getValue(idx: number): T;
    /**
     * getIndex
     * ----------------------------------------------------------------------------
     * Get the index of the element that matches the specified key
     * @returns The index of the appropriate element
     */
    getIndex(key: string): number;
    /**
     * getIndex
     * ----------------------------------------------------------------------------
     * Get the index of the element that matches the specified value
     * @returns The index of the appropriate element
     */
    getIndex(val: T): number;
    /**
     * _findElement
     * ----------------------------------------------------------------------------
     * Find the associated element with the specified value
     */
    private _findElement;
    /**
     * getKey
     * ----------------------------------------------------------------------------
     * Retrieve the key for the element located at the specified index
     */
    getKey(idx: number): string;
    /**
     * getKey
     * ----------------------------------------------------------------------------
     * Retrieve the key for the element matching the specified value
     */
    getKey(val: T): string;
    /**
     * hasElement
     * ----------------------------------------------------------------------------
     * Verify if an element exists inside this collection
     * @returns	True if the element is found in this collection
     */
    hasElement(key: string): boolean;
    /**
     * hasElement
     * ----------------------------------------------------------------------------
     * Verify if an element exists inside this collection
     * @returns	True if the element is found in this collection
     */
    hasElement(val: T): boolean;
    /**
     * hasElement
     * ----------------------------------------------------------------------------
     * Verify if an element exists inside this collection
     * @returns	True if the element is found in this collection
     */
    hasElement(idx: number): boolean;
    /**
     * toString
     * ----------------------------------------------------------------------------
     * Turns this collection into a human readable string
     */
    toString(): string;
    /**
     * equals
     * ----------------------------------------------------------------------------
     * Determins if this Collection is equal in value to another Collection
     * @returns	True if the specified collection is a match for our own
     */
    equals(other: Collection<T>): boolean;
}
