"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toolkip_object_helpers_1 = require("@kipprice/toolkip-object-helpers");
/**----------------------------------------------------------------------------
 * @class	DataMaanager
 * ----------------------------------------------------------------------------
 * generic manager for any element that has an ID
 * @author	Kip Price
 * @version	1.0.0
 * ----------------------------------------------------------------------------
 */
class DataManager {
    //#endregion
    //.....................
    //..........................................
    //#region CREATE THE MANAGER
    /**
     * DataManager
     * ----------------------------------------------------------------------------
     * generate a new data manager
     */
    constructor() {
        this._data = {};
        this._populateWithDefaultData();
    }
    /**
     * _populateWithDefaultData
     * ----------------------------------------------------------------------------
     * overridable function that can assign default data to this manager
     */
    _populateWithDefaultData() { }
    /**
     * _createAndAddDefault
     * ----------------------------------------------------------------------------
     * add a generic default to this manager
     */
    _createAndAddDefault(data) {
        this.add(data);
    }
    //#endregion
    //..........................................
    //..........................................
    //#region ADD AND REMOVE DATA
    /**
     * add
     * ----------------------------------------------------------------------------
     * add a new element to this manager
     */
    add(datum) {
        if (this.contains(datum.id)) {
            return false;
        }
        this._data[datum.id] = datum;
        return true;
    }
    /**
     * remove
     * ----------------------------------------------------------------------------
     * remove an element from this manager
     */
    remove(id) {
        if (!this.contains(id)) {
            return null;
        }
        let out = this.get(id);
        delete this._data[id];
        return out;
    }
    /**
     * contains
     * ----------------------------------------------------------------------------
     * test if a particular element is present in the manager
     */
    contains(id) {
        return !!this._data[id];
    }
    /**
     * clear
     * ----------------------------------------------------------------------------
     * clear out all elements in the manager
     */
    clear() {
        this._data = {};
    }
    //#endregion
    //..........................................
    //..........................................
    //#region RETRIEVE DATA     
    /**
     * get
     * ----------------------------------------------------------------------------
     * get the element with the specified ID
     */
    get(id) {
        if (!this.contains(id)) {
            return null;
        }
        return this._data[id];
    }
    //#endregion
    //.........................................
    //..........................................
    //#region STANDARD COLLECTION FORM
    /**
     * toArray
     * ----------------------------------------------------------------------------
     * get the data contained within this manager as an array
     */
    toArray() {
        let out = [];
        toolkip_object_helpers_1.map(this._data, (elem) => {
            out.push(elem);
        });
        return out;
    }
    /**
     * toDictionary
     * ----------------------------------------------------------------------------
     * get the data contained wuthin this manager as an dictionary
     */
    toDictionary() {
        let out = {};
        toolkip_object_helpers_1.map(this._data, (elem, id) => {
            out[id] = elem;
        });
        return out;
    }
}
exports.DataManager = DataManager;
