import { _NamedClass } from '@toolkip/named-class';
import  { IEquatable, equals, IEqualityFunction } from '@toolkip/comparable';
import { format } from '@toolkip/primitive-helpers';
import { IDictionaryKeys, 
		CollectionTypeEnum, 
		ICollectionElement, 
		CollectionSortFunction, 
		SortFunction 
	} from './_interfaces';
import { IMapFunction, IDictionary } from '@toolkip/object-helpers';

/**----------------------------------------------------------------------------
 * @class	Collection
 * ----------------------------------------------------------------------------
 * Keep track of a set of items in both key-based indices and sortable formats
 * @author	Kip Price
 * @version	3.0.0
 * ----------------------------------------------------------------------------
 */
export class Collection<T> extends _NamedClass implements IEquatable {

	//.....................
	//#region PROPERTIES

	/** Tracks of the data in this collection */
	private _data: IDictionaryKeys<T>;

	/** allow retrieval of a set of keys */
	public get keys(): string[] { return Object.keys(this._data); }

	/** Stores the sorted array of keys for the collection */
	private _sortedData: Array<string>;

	/** Whether we should augment or replace in this collection  */
	private _addType: CollectionTypeEnum;
	public set addType(addType: CollectionTypeEnum) { this._addType = addType; }

	/** internal counter for the iteration we are currently on */
	private _iteration: number;
	public get iteration(): number { return this._iteration; }

	/** get the current number of elements in our collection */
	public get length(): number { return this._sortedData.length; }

	/** what to use to check for two elements being equal */
	protected _equalityTest: IEqualityFunction<T>;
	public set equalityTest(test: IEqualityFunction<T>) { this._equalityTest = test; };

	//#endregion
	//.....................

	//.....................
	//#region CONSTRUCTOR

	/**
	 * Collection
	 * ----------------------------------------------------------------------------
	 * Creates the collection
	 * @param  replace 		True if we should override the values in the list
	 * @return Collection
	 */
	constructor(type?: CollectionTypeEnum, eq_test?: IEqualityFunction<T>) {
		super("Collection");

		// Initialize our arrays
		this._data = {};
		this._sortedData = new Array<string>();

		// Store whether we should be replacing
		this._addType = type || CollectionTypeEnum.IgnoreDuplicateKeys;

		this._equalityTest = eq_test;
		if (!this._equalityTest) {
			this._equalityTest = ((a: T, b: T) => {
				return (a === b);
			});
		}
	}

	//#endregion
	//.....................

	//........................
	//#region ADD AN ELEMENT

	/**
	 * addElement
	 * ----------------------------------------------------------------------------
	 * Adds an element to the collection
	 * @param 	key  	The key to uniquely identify this element
	 * @param 	val 	The element to add to our collection
	 * @returns True if the element was successfully added
	 */
	public add(key: string, val: T): number {
		let idx: number;
		let elem: ICollectionElement<T>;
		let sortedIdx: number;

		// check if we already have data registered under this key
		const keyAlreadyAdded = (!!this._data[key]);

		// Verify that there isn't anything currently linked to this key
		if ((this._addType === CollectionTypeEnum.IgnoreDuplicateKeys) && keyAlreadyAdded) {
			return -1;
		}

		// Grab the spot that this element will be added to in our sorted index
		sortedIdx = keyAlreadyAdded ? this._sortedData.indexOf(key) : this._sortedData.length;

		// Create our new object
		elem = {
			key: key,
			value: val,
			sortedIdx: sortedIdx,
			origIdx: sortedIdx
		};

		// If there isn't anything in this index (or we should replace it), save our new value
		this._data[key] = elem;

		// Push to our sorted index if needed
		if (!keyAlreadyAdded) { this._sortedData.push(key); }

		return sortedIdx;
	}

	//#endregion
	//........................

	//........................
	//#region HANDLE REMOVING

	/**
	 * removeElement
	 * ----------------------------------------------------------------------------
	 * combination function to handle all overloads 
	 */
	public remove(key: string): ICollectionElement<T> {
		return this._removeElementByKey(key);
	}

	/**
	 * removeElementByValue
	 * ----------------------------------------------------------------------------
	 * remove the element that matches the provided element 
	 */
	public removeElementByValue(value: T): ICollectionElement<T> {
		return this._removeElementByValue(value);
	}

	/**
	 * _removeElementByKey
	 * ----------------------------------------------------------------------------
	 * removes an element by key 
	 */
	protected _removeElementByKey(key: string): ICollectionElement<T> {
		let elem: ICollectionElement<T>;

		elem = this._data[key];

		if (!elem) return null;

		// Remove from the sorted array
		this._sortedData.splice(elem.sortedIdx, 1);

		// Reset sorted keys for all others in the array
		this._resetSortedKeys(elem.sortedIdx);

		// Remove from the actual data array
		delete this._data[key];

		// Return the grabbed data
		return elem;
	}

	/**
	 * _removeElementByIndex
	 * ----------------------------------------------------------------------------
	 * removes an element by index 
	 */
	protected _removeElementByIndex(idx: number): ICollectionElement<T> {
		let key: string;

		if ((idx >= this.length) || (idx < 0)) {
			return null;
		}

		key = this._sortedData[idx];
		return this._removeElementByKey(key);
	}

	/**
	 * _removeElementByValue
	 * ----------------------------------------------------------------------------
	 * removes an element by matching the element to the provided element 
	 */
	protected _removeElementByValue(val: T): ICollectionElement<T> {
		let e: ICollectionElement<T>;
		e = this._findElement(val);
		return this._removeElementByKey(e && e.key);
	}

	/**
	 * clear
	 * ----------------------------------------------------------------------------
	 * clear out all elements within the collection
	 */
	public clear() {
		this._data = {};
		this._sortedData = [];
	}

	//#endregion
	//........................

	//........................
	//#region HANDLE SORTING

	/**
	 * _resetSortedKeys
	 * ----------------------------------------------------------------------------
	 * Ensure that the key stored with the element matches its location in the 
	 * sorted array 
	 */
	private _resetSortedKeys(startFrom?: number, endWith?: number) {

		// Set some defaults
		if (!startFrom) { startFrom = 0; }
		if (!endWith && (endWith !== 0)) { endWith = this._sortedData.length; }

		if (startFrom > endWith) { return; }

		if (startFrom > endWith) {
			let tmp: number = startFrom;
			startFrom = endWith;
			endWith = tmp;
		}

		let e: ICollectionElement<T>;
		let k: string;
		for (let i: number = startFrom; i < endWith; i += 1) {
			k = this._sortedData[i];
			if (!k) continue;

			e = this._data[k];
			if (!e) continue;

			e.sortedIdx = i;
		}
	}

	/**
	 * sort
	 * ----------------------------------------------------------------------------
	 * Sorts the collection
	 * @param 	sort_func   	The function we should use to sort
	 */
	public sort(sort_func: CollectionSortFunction<T>) {
		let sTemp: SortFunction<string>;

		// Generate our wrapper sort function to guarantee we have the real elements
		// sent to the passed-in sort function
		sTemp = ((a: string, b: string) => {
			let a_tmp: ICollectionElement<T>;
			let b_tmp: ICollectionElement<T>;

			a_tmp = this._data[a];
			b_tmp = this._data[b];

			return sort_func(a_tmp, b_tmp);
		});

		// Sort the data appropriately
		this._sortedData.sort(sTemp);

		// Make sure we update our indices appropriately
		this._resetSortedKeys();
	}

	//#endregion
	//........................

	//....................................
	//#region LOOPING OVER THE COLLECTION

	/**
	 * map
	 * ----------------------------------------------------------------------------
	 * handle looping through the collection to get each element 
	 */
	public map<R>(mapFunc: IMapFunction<T, R>): void {
		if (!mapFunc) { return; }

		const dict = this.toValueDictionary();

		this.resetLoop();
		while (this.hasNext()) {
			let pair: ICollectionElement<T> = this.getNext();
			if (!pair) { continue; }

			let value: T = pair.value;
			let key: string = pair.key;

			mapFunc(value, key, dict);
		}

		this.resetLoop();
	}

	/**
	 * resetLoop
	 * ----------------------------------------------------------------------------
	 * Resets our iteration counter
	 * 
	 * @param	reverse		If true, loops through backwards
	 */
	public resetLoop(reverse?: boolean): void {
		if (reverse) {
			this._iteration = (this.length + 1);
		} else {
			this._iteration = -1;
		}
	}

	/**
	 * hasNext
	 * ----------------------------------------------------------------------------
	 * Checks if we have a next element available for getting
	 * @param 	reverse 	True if we should loop backwards
	 * 
	 * @returns True if there is a next element available
	 */
	public hasNext(reverse?: boolean): boolean {
		if (reverse) {
			return ((this._iteration - 1) >= 0);
		} else {
			return ((this._iteration + 1) < this._sortedData.length);
		}
	}

	/**
	 * getNext
	 * ----------------------------------------------------------------------------
	 * Finds the next element in our loop
	 * @param 	reverse 	True if we should loop backwards
	 * 
	 * @returns The element next in our array
	 */
	public getNext(reverse?: boolean): ICollectionElement<T> {

		// Grab the next appropriate index
		if (reverse) {
			this._iteration -= 1;
		} else {
			this._iteration += 1;
		}

		// Get the data from that index
		return this._data[this._sortedData[this._iteration]];
	}

	/**
	 * getCurrent
	 * ----------------------------------------------------------------------------
	 * Grab the current selected element
	 */
	public getCurrent(): ICollectionElement<T> {
		if (this._iteration === -1) { return null; }
		return this._data[this._sortedData[this._iteration]];
	}

	//#endregion
	//....................................

	//........................
	//#region OUTPUT TO ARRAY

	/**
	 * toArray
	 * ----------------------------------------------------------------------------
	 * Return a sorted array of the elements in this collection
	 */
	public toArray(): Array<ICollectionElement<T>> {
		const arr: ICollectionElement<T>[] = [];

		for (let key of this._sortedData) {
			arr.push(this._data[key]);
		}

		return arr;
	}

	/**
	 * toDictionary
	 * ----------------------------------------------------------------------------
	 * get the dictionary version of this collection
	 */
	public toDictionary(): IDictionary<ICollectionElement<T>> {
		const out: IDictionary<ICollectionElement<T>> = {};

		for (let key of this._sortedData) {
			out[key] = this._data[key];
		}

		return out;
	}

	/**
	 * toValueArray
	 * ----------------------------------------------------------------------------
	 * Get an array of just the values in this collection
	 */
	public toValueArray(): Array<T> {
		let arr: T[] = [];
		for (let key of this._sortedData) {
			arr.push(this._data[key].value);
		};
		return arr;
	}

	/**
	 * toValueDictionary
	 * ----------------------------------------------------------------------------
	 * return dictionary form of just the values in this collection
	 */
	public toValueDictionary(): IDictionary<T> {
		const out: IDictionary<T> = {};
		for (let key of this._sortedData) {
			out[key] = this._data[key].value;
		};
		return out;
	}

	//#endregion
	//........................

	//..........................................
	//#region RETRIEVE DATA FROM THE COLLECTION

	/**
	 * getElement
	 * ----------------------------------------------------------------------------
	 * Get an element within our collection using the specified key
	 * @returns	The appropriate element for this key
	 */
	public getElement(key: string): ICollectionElement<T>;

	/**
	 * getElement
	 * ----------------------------------------------------------------------------
	 * Get an element within our collection using the specified index
	 * @returns	The appropriate element for this index
	 */
	public getElement(idx: number): ICollectionElement<T>;


	/**
	 * getElement
	 * ---------------------------------------------------------------------------- 
	 * internal function to get an element through an identfier 
	 */
	public getElement(identifier: string | number): ICollectionElement<T> {
		let out: ICollectionElement<T>;

		// Handle the param being a key
		if (typeof identifier === "string") {
			out = this._data[identifier];

			// Handle the parm being index
		} else if (typeof identifier === "number") {
			if ((identifier < 0) || (identifier > this._sortedData.length)) { return null; }
			out = this._data[this._sortedData[identifier]];
		}

		return out;
	}

	//#endregion

	//.............................................
	//#region RETRIEVE VALUES FROM THE COLLECTION

	/**
	 * getValue
	 * ----------------------------------------------------------------------------
	 * Get the value associated with the specified key
	 * @returns	The value associated with this key
	 */
	public getValue(key: string): T;

	/**
	 * getValue
	 * ----------------------------------------------------------------------------
	 * Get the value associated with the specified index
	 * @returns	The value associated with this index
	 */
	public getValue(idx: number): T;

	/**
	 * getValue
	 * ----------------------------------------------------------------------------
	 * Get the value associated with the specified key or index
	 * @returns	The value associated with this identifier
	 */
	public getValue(identifier: string | number): T {
		let pair: ICollectionElement<T>;
		pair = this.getElement(identifier as string);
		if (!pair) { return null; }
		return pair.value;
	}

	//#endregion
	//.............................................

	//.......................................
	//#region RETRIEVE ALTERNATE IDENTFIERS

	/**
	 * getIndex
	 * ----------------------------------------------------------------------------
	 * Get the index of the element that matches the specified key 
	 * @returns The index of the appropriate element
	 */
	public getIndex(key: string): number;

	/**
	 * getIndex
	 * ----------------------------------------------------------------------------
	 * Get the index of the element that matches the specified value 
	 * @returns The index of the appropriate element
	 */
	public getIndex(val: T): number;

	/**
	 * getIndex
	 * ----------------------------------------------------------------------------
	 * Get the index of the element that matches the specified key / value
	 * @param 	param 	The key or value to match
	 * @returns The index of the appropriate element
	 */
	public getIndex(param: string | T): number {

		if (typeof param === "string") {
			return (this._data[param] && this._data[param].sortedIdx);
		} else {
			let e: ICollectionElement<T>;
			e = this._findElement(param);
			return (e && e.sortedIdx);
		}
	}

	//#endregion
	//.......................................

	//.......................................
	//#region FIND AN ELEMENT BY ITS VALUE

	/**
	 * _findElement
	 * ----------------------------------------------------------------------------
	 * Find the associated element with the specified value
	 */
	private _findElement(val: T): ICollectionElement<T> {
		let key: string;
		let elem: ICollectionElement<T>;

		// loop over everything in our data array
		for (key in this._data) {
			if (this._data.hasOwnProperty(key)) {
				elem = this._data[key];

				if (this._equalityTest(elem.value, val)) {
					return elem;
				}
			}
		}

		return null;
	}

	//#endregion
	//.......................................

	//.................................
	//#region RETRIEVE ASSOCIATED KEYS

	/**
	 * getKey
	 * ----------------------------------------------------------------------------
	 * Retrieve the key for the element located at the specified index
	 */
	public getKey(idx: number): string;

	/**
	 * getKey
	 * ----------------------------------------------------------------------------
	 * Retrieve the key for the element matching the specified value
	 */
	public getKey(val: T): string;

	/**
	 * getKey
	 * ----------------------------------------------------------------------------
	 * Retrieve the key for the element located at the specified index or with the 
	 * specified value.
	 * 
	 * @param	The index or value to match on
	 * 
	 * @returns	The appropriate key for the associated element
	 */
	public getKey(param: number | T): string {
		if (typeof param === "number") {
			return this._sortedData[param];
		} else {
			let e: ICollectionElement<T>;
			e = this._findElement(param);
			return (e && e.key);
		}
	}

	//#endregion
	//.................................

	//..............................
	//#region CHECK FOR AN ELEMENT

	/**
	 * hasElement
	 * ----------------------------------------------------------------------------
	 * Verify if an element exists inside this collection
	 * @returns	True if the element is found in this collection
	 */
	public hasElement(key: string): boolean;

	/**
	 * hasElement
	 * ----------------------------------------------------------------------------
	 * Verify if an element exists inside this collection
	 * @returns	True if the element is found in this collection
	 */
	public hasElement(val: T): boolean;

	/**
	 * hasElement
	 * ----------------------------------------------------------------------------
	 * Verify if an element exists inside this collection
	 * @returns	True if the element is found in this collection
	 */
	public hasElement(idx: number): boolean;

	/**
	 * hasElement
	 * ----------------------------------------------------------------------------
	 * Verify if an element exists inside this collection
	 * @returns	True if the element is found in this collection
	 */
	public hasElement(param: string | T | number): boolean {
		if (typeof param === "string") {
			return (!!this._data[param]);
		} else if (typeof param === "number") {
			return ((!!this._sortedData[param]) && (!!this._data[this._sortedData[param]]));
		} else {
			return (this._findElement(param) !== null);
		}
	}

	//#endregion
	//..............................

	//..................
	//#region HELPERS

	/**
	 * toString
	 * ----------------------------------------------------------------------------
	 * Turns this collection into a human readable string
	 */
	public toString(): string {
		let outStr: string = "";
		this.map((elem: T, key: string) => {
			if (outStr.length > 0) { outStr += ", "; }
			outStr += format("{0} => {1}", key, elem.toString());
		});
		return outStr;
	}

	/**
	 * equals
	 * ----------------------------------------------------------------------------
	 * Determins if this Collection is equal in value to another Collection
	 * @returns	True if the specified collection is a match for our own
	 */
	public equals(other: Collection<T>): boolean {

		// quick check: determine if the lengths are mismatched
		if (this.length !== other.length) { return false; }

		// check if the sorted array is mismatched
		if (this._sortedData.length !== other._sortedData.length) { return false; }

		// verify our key arrays match
		let mismatch: boolean = false;
		this.map((elem: T, key: string) => {

			// check that this key exists in the other collection
			if (!other._data[key]) {
				mismatch = true;
			}

			// determine if the two elements are equal
			if (!equals(elem, other._data[key].value)) {
				mismatch = true;
			}
		});

		// quit if we were mismatched
		if (mismatch) { return false; }

		// If we made it this far, we should consider the collections the same
		return true;
	}

	//#endregion
	//...............

}
