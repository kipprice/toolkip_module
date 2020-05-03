"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toolkip_object_helpers_1 = require("@kipprice/toolkip-object-helpers");
const toolkip_primitive_helpers_1 = require("@kipprice/toolkip-primitive-helpers");
const toolkip_structs_1 = require("@kipprice/toolkip-structs");
const toolkip_shared_types_1 = require("@kipprice/toolkip-shared-types");
/**----------------------------------------------------------------------------
 * @class   Model
 * ----------------------------------------------------------------------------
 * Generic class to be able to easily create models that can save down to JSON.
 *
 * By default, can copy over simple data (primitives, arrays, objects) for both
 * loading and saving.
 * If more complex logic is needed, supports functions of the format
 *      _copy[CamelCasePropertyName] : get data out of JSON onto the class
 *      _save[CamelCasePropertyName] : save data into JSON from this class
 *
 * @author  Kip Price
 * @version 1.0.5
 * ----------------------------------------------------------------------------
 */
class _Model {
    //#endregion
    //.....................
    //..........................................
    //#region CREATE THE MODEL
    /**
     * Model
     * ----------------------------------------------------------------------------
     * Create a new model from specific data
     * @param   dataToCopy  If provided, the JSON of this data to copy over
     */
    constructor(dataToCopy) {
        // initialize the listeners for our properties
        this.__propertyListeners = {};
        this.__modelListeners = [];
        // Copy data over from the passed in interface
        this._setDefaultValues();
        if (dataToCopy) {
            if (dataToCopy.saveData) {
                dataToCopy = dataToCopy.saveData();
            }
            this._copyData(dataToCopy);
        }
    }
    /**
     * _setDefaultValues
     * ----------------------------------------------------------------------------
     * Overridable function to initialize any default data that is needed
     */
    _setDefaultValues() { }
    //#endregion
    //..........................................
    //.......................................
    //#region MOVE DATA FROM OTHER ELEMENT
    /**
     * _copyData
     * ----------------------------------------------------------------------------
     * Copies data from a JSON version of this model
     * @param   data    The data to save into our model
     */
    _copyData(data) {
        toolkip_object_helpers_1.map(data, (value, key) => {
            this._copyPiece(key, value);
        });
    }
    /**
     * _copyPiece
     * ----------------------------------------------------------------------------
     * Copy a particular piece of data into this class
     * @param   key     The key to copy over
     * @param   value   The value to copy over
     */
    _copyPiece(key, value) {
        let capitalizedName = (key[0].toUpperCase() + toolkip_primitive_helpers_1.rest(key, 1));
        let copyFuncName = "_copy" + capitalizedName;
        // don't override values for undefined elements
        if (value === undefined) {
            return;
        }
        // if we have a custom function to write this data, use it
        if (this[copyFuncName]) {
            this[copyFuncName](value);
            return;
        }
        ;
        // if our current value for this field can be updated, do that instead
        if (toolkip_structs_1.isUpdatable(this[key])) {
            this[key].update(value);
            return;
        }
        let savableValue;
        // make shallow copies of arrays by default
        if (toolkip_shared_types_1.isArray(value)) {
            savableValue = (value.slice());
            // stringify and parse objects by default
        }
        else if (toolkip_shared_types_1.isObject(value)) {
            savableValue = JSON.parse(JSON.stringify(value));
            // just use primitives as is
        }
        else {
            savableValue = value;
        }
        // otherwise, just set our internal property to have this value
        this._setValue(key, value);
    }
    /**
     * _copyModelArray
     * ----------------------------------------------------------------------------
     *
     * @param arr
     * @param constructor
     */
    _copyModelArray(arr, constructor) {
        let out = [];
        for (let m of arr) {
            let model = new constructor(m);
            out.push(model);
        }
        return out;
    }
    /**
     * _copyModelDictionary
     * ----------------------------------------------------------------------------
     * @param dict
     * @param constructor
     */
    _copyModelDictionary(dict, constructor) {
        let out = {};
        toolkip_object_helpers_1.map(dict, (m, key) => {
            out[key] = new constructor(m);
        });
        return out;
    }
    /**
     * update
     * ----------------------------------------------------------------------------
     * update various elements of the model to match the passed in data
     */
    update(model) {
        this._copyData(model);
    }
    //#endregion
    //.......................................
    //....................
    //#region SAVE DATA
    /**
     * saveData
     * ----------------------------------------------------------------------------
     * Gets data out of this model in JSON format
     */
    saveData() {
        let out = {};
        toolkip_object_helpers_1.map(this, (val, key) => {
            // don't try to copy functions
            if (typeof val === "function") {
                return;
            }
            // determine the formatted key
            let fmtKey = key;
            if (fmtKey[0] === "_") {
                fmtKey = toolkip_primitive_helpers_1.rest(fmtKey, 1);
            }
            if (fmtKey === "_modelListeners") {
                return;
            }
            if (fmtKey === "_propertyListeners") {
                return;
            }
            // save this particular key-value
            let outVal = this._savePiece(fmtKey, val);
            if (!toolkip_shared_types_1.isNullOrUndefined(outVal)) {
                out[fmtKey] = outVal;
            }
        });
        return out;
    }
    /**
     * _savePiece
     * ----------------------------------------------------------------------------
     * Save a piece of data to our out array. If the data is a model itself, calls
     * SaveData to retrieve the data from that model.
     * @param   key     The key to save data for
     * @param   value   The value of that key
     *
     * @returns The value
     */
    _savePiece(key, val) {
        let capitalizedName = (key[0].toUpperCase() + toolkip_primitive_helpers_1.rest(key, 1));
        let saveFuncName = "_save" + capitalizedName;
        // if there is a custom function to save this particular data element, use that
        if (this[saveFuncName]) {
            return this[saveFuncName]();
        }
        let privateName = "_" + key;
        let data = val || this[privateName];
        // determine if this is an array of elements, and if so, check if they have the ability to save themselves
        return this._innerSavePiece(data);
    }
    _innerSavePiece(data) {
        if (data instanceof Array) {
            return this._saveArray(data);
        }
        else if (data && data.saveData) {
            return this._saveModel(data);
        }
        else if (typeof data === "object") {
            return this._saveObject(data);
        }
        else {
            return this._saveSimple(data);
        }
    }
    _saveArray(data) {
        let outArr = [];
        // loop through each element to save appropriately
        for (let elem of data) {
            outArr.push(this._innerSavePiece(elem));
        }
        return outArr;
    }
    _saveModel(data) {
        return data.saveData();
    }
    _saveObject(data) {
        let out = {};
        toolkip_object_helpers_1.map(data, (elem, key) => {
            out[key] = this._innerSavePiece(elem);
        });
        return out;
    }
    _saveSimple(data) {
        return data;
    }
    //#endregion
    //....................
    //...........................
    //#region MANAGE LISTENERS
    /**
     * _setValue
     * ---------------------------------------------------------------------------
     * Helper to update a value in this model & notify listeners about the change
     */
    _setValue(key, value) {
        let privateName = "_" + key;
        let currentValue = this[privateName];
        this[privateName] = value;
        this._notifyListeners(key, currentValue, value);
    }
    /**
     * _notifyListeners
     * ---------------------------------------------------------------------------
     * Let any subscribers to this model know that some changes have occurred
     * @param   key     The key that changed in the model
     * @param   oldVal  The previous version of this key's value
     * @param   newVal  The new version of this key's value
     */
    _notifyListeners(key, oldVal, newVal) {
        this._notifyModelListeners(key, oldVal, newVal);
        this._notifyPropertyListeners(key, oldVal, newVal);
    }
    /**
     * _notifyModelListeners
     * ----------------------------------------------------------------------------
     * Let any listeners that care about any change to the model know that this
     * particular key has changed to this particular value
     */
    _notifyModelListeners(key, oldVal, newVal) {
        let listeners = this.__modelListeners;
        if (!listeners || listeners.length === 0) {
            return;
        }
        for (let listener of listeners) {
            if (!listener) {
                continue;
            }
            listener(key, newVal, oldVal);
        }
    }
    /**
     * _notifyPropertyListerners
     * ----------------------------------------------------------------------------
     * Let any listeners that care about this particular property know that it has
     * changed
     */
    _notifyPropertyListeners(key, oldVal, newVal) {
        let listeners = this.__propertyListeners[key];
        if (!listeners) {
            return;
        }
        // notify all registered listeners
        for (let listener of listeners) {
            if (!listener) {
                continue;
            }
            listener(newVal, oldVal);
        }
    }
    /**
     * registerListener
     * ---------------------------------------------------------------------------
     * @param key
     * @param listener
     * @param uniqueKey
     */
    registerPropertyListener(key, listener) {
        if (!this.__propertyListeners[key]) {
            this.__propertyListeners[key] = [];
        }
        this.__propertyListeners[key].push(listener);
    }
    /**
     * registerModelListener
     * ----------------------------------------------------------------------------
     * register a listener for any change that occurs in this model
     */
    registerModelListener(listener) {
        if (!listener) {
            return;
        }
    }
    /**
     * unregisterListeners
     * ----------------------------------------------------------------------------
     * delete any listeners attached to this model (allows for GC)
     */
    unregisterListeners() {
        this.__propertyListeners = {};
        this.__modelListeners = [];
    }
}
exports._Model = _Model;
