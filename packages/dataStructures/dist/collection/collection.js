"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toolkip_named_class_1 = require("@kipprice/toolkip-named-class");
const toolkip_comparable_1 = require("@kipprice/toolkip-comparable");
const toolkip_primitive_helpers_1 = require("@kipprice/toolkip-primitive-helpers");
const _interfaces_1 = require("./_interfaces");
/**----------------------------------------------------------------------------
 * @class	Collection
 * ----------------------------------------------------------------------------
 * Keep track of a set of items in both key-based indices and sortable formats
 * @author	Kip Price
 * @version	3.0.0
 * ----------------------------------------------------------------------------
 */
class Collection extends toolkip_named_class_1._NamedClass {
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
    constructor(type, eq_test) {
        super("Collection");
        // Initialize our arrays
        this._data = {};
        this._sortedData = new Array();
        // Store whether we should be replacing
        this._addType = type || _interfaces_1.CollectionTypeEnum.IgnoreDuplicateKeys;
        this._equalityTest = eq_test;
        if (!this._equalityTest) {
            this._equalityTest = ((a, b) => {
                return (a === b);
            });
        }
    }
    /** allow retrieval of a set of keys */
    get keys() { return Object.keys(this._data); }
    set addType(addType) { this._addType = addType; }
    get iteration() { return this._iteration; }
    /** get the current number of elements in our collection */
    get length() { return this._sortedData.length; }
    set equalityTest(test) { this._equalityTest = test; }
    ;
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
    add(key, val) {
        let idx;
        let elem;
        let sortedIdx;
        let skipSortedPush;
        // Verify that there isn't anything currently linked to this key
        if ((this._addType === _interfaces_1.CollectionTypeEnum.IgnoreDuplicateKeys) && (this._data[key])) {
            return -1;
        }
        // If we already have data, we don't need to add this key to our sorted index again
        if (this._data[key]) {
            skipSortedPush = true;
        }
        // Grab the spot that this element will be added to in our sorted index
        sortedIdx = this._sortedData.length;
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
        if (!skipSortedPush) {
            this._sortedData.push(key);
        }
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
    remove(key) {
        return this._removeElementByKey(key);
    }
    /**
     * removeElementByValue
     * ----------------------------------------------------------------------------
     * remove the element that matches the provided element
     */
    removeElementByValue(value) {
        return this._removeElementByValue(value);
    }
    /**
     * _removeElementByKey
     * ----------------------------------------------------------------------------
     * removes an element by key
     */
    _removeElementByKey(key) {
        let elem;
        elem = this._data[key];
        if (!elem)
            return null;
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
    _removeElementByIndex(idx) {
        let key;
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
    _removeElementByValue(val) {
        let e;
        e = this._findElement(val);
        return this._removeElementByKey(e && e.key);
    }
    /**
     * clear
     * ----------------------------------------------------------------------------
     * clear out all elements within the collection
     */
    clear() {
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
    _resetSortedKeys(startFrom, endWith) {
        // Set some defaults
        if (!startFrom) {
            startFrom = 0;
        }
        if (!endWith && (endWith !== 0)) {
            endWith = this._sortedData.length;
        }
        if (startFrom > endWith) {
            return;
        }
        if (startFrom > endWith) {
            let tmp = startFrom;
            startFrom = endWith;
            endWith = tmp;
        }
        let e;
        let k;
        for (let i = startFrom; i < endWith; i += 1) {
            k = this._sortedData[i];
            if (!k)
                continue;
            e = this._data[k];
            if (!e)
                continue;
            e.sortedIdx = i;
        }
    }
    /**
     * sort
     * ----------------------------------------------------------------------------
     * Sorts the collection
     * @param 	sort_func   	The function we should use to sort
     */
    sort(sort_func) {
        let sTemp;
        // Generate our wrapper sort function to guarantee we have the real elements
        // sent to the passed-in sort function
        sTemp = ((a, b) => {
            let a_tmp;
            let b_tmp;
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
    map(mapFunc) {
        if (!mapFunc) {
            return;
        }
        this.resetLoop();
        while (this.hasNext()) {
            let pair = this.getNext();
            if (!pair) {
                continue;
            }
            let value = pair.value;
            let key = pair.key;
            let idx = this.getIndex(key);
            mapFunc(value, key, idx);
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
    resetLoop(reverse) {
        if (reverse) {
            this._iteration = (this.length + 1);
        }
        else {
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
    hasNext(reverse) {
        if (reverse) {
            return ((this._iteration - 1) >= 0);
        }
        else {
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
    getNext(reverse) {
        // Grab the next appropriate index
        if (reverse) {
            this._iteration -= 1;
        }
        else {
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
    getCurrent() {
        if (this._iteration === -1) {
            return null;
        }
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
    toArray() {
        let arr;
        let key;
        for (key of this._sortedData) {
            arr.push(this._data[key]);
        }
        return arr;
    }
    /**
     * toValueArray
     * ----------------------------------------------------------------------------
     * Get an array of just the values in this collection
     */
    toValueArray() {
        let arr = [];
        this.map((value) => {
            arr.push(value);
        });
        return arr;
    }
    /**
     * getElement
     * ----------------------------------------------------------------------------
     * internal function to get an element through an identfier
     */
    getElement(identifier) {
        let out;
        // Handle the param being a key
        if (typeof identifier === "string") {
            out = this._data[identifier];
            // Handle the parm being index
        }
        else if (typeof identifier === "number") {
            if ((identifier < 0) || (identifier > this._sortedData.length)) {
                return null;
            }
            out = this._data[this._sortedData[identifier]];
        }
        return out;
    }
    /**
     * getValue
     * ----------------------------------------------------------------------------
     * Get the value associated with the specified key or index
     * @returns	The value associated with this identifier
     */
    getValue(identifier) {
        let pair;
        pair = this.getElement(identifier);
        if (!pair) {
            return null;
        }
        return pair.value;
    }
    /**
     * getIndex
     * ----------------------------------------------------------------------------
     * Get the index of the element that matches the specified key / value
     * @param 	param 	The key or value to match
     * @returns The index of the appropriate element
     */
    getIndex(param) {
        if (typeof param === "string") {
            return (this._data[param] && this._data[param].sortedIdx);
        }
        else {
            let e;
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
    _findElement(val) {
        let key;
        let elem;
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
    getKey(param) {
        if (typeof param === "number") {
            return this._sortedData[param];
        }
        else {
            let e;
            e = this._findElement(param);
            return (e && e.key);
        }
    }
    /**
     * hasElement
     * ----------------------------------------------------------------------------
     * Verify if an element exists inside this collection
     * @returns	True if the element is found in this collection
     */
    hasElement(param) {
        if (typeof param === "string") {
            return (!!this._data[param]);
        }
        else if (typeof param === "number") {
            return ((!!this._sortedData[param]) && (!!this._data[this._sortedData[param]]));
        }
        else {
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
    toString() {
        let outStr = "";
        this.map((elem, key, idx) => {
            if (outStr.length > 0) {
                outStr += ", ";
            }
            outStr += toolkip_primitive_helpers_1.format("{0} => {1}", key, elem.toString());
        });
        return outStr;
    }
    /**
     * equals
     * ----------------------------------------------------------------------------
     * Determins if this Collection is equal in value to another Collection
     * @returns	True if the specified collection is a match for our own
     */
    equals(other) {
        // quick check: determine if the lengths are mismatched
        if (this.length !== other.length) {
            return false;
        }
        // check if the sorted array is mismatched
        if (this._sortedData.length !== other._sortedData.length) {
            return false;
        }
        // verify our key arrays match
        let mismatch = false;
        this.map((elem, key, idx) => {
            // check that this key exists in the other collection
            if (!other._data[key]) {
                mismatch = true;
            }
            // determine if the two elements are equal
            if (!toolkip_comparable_1.equals(elem, other._data[key].value)) {
                mismatch = true;
            }
        });
        // quit if we were mismatched
        if (mismatch) {
            return false;
        }
        // If we made it this far, we should consider the collections the same
        return true;
    }
}
exports.Collection = Collection;
