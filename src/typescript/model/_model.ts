import { IDictionary, IConstructor } from '../objectHelpers/_interfaces';
import { rest } from '../primitiveHelpers/strings'; 
import IPartial from '../structs/partial';
import { map } from '../objectHelpers/navigate';
import { isUpdatable } from '../typeGuards/interfaceGuard';
import { isArray, isObject } from '../typeGuards/simpleGuard';
import { isNullOrUndefined } from '../typeGuards/falsey';
import { IPropertyChangeListener, IModel, IPropertyChangeListeners, IModelChangeListener } from '../models/_interfaces';


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
export default abstract class _Model<T extends IModel = IModel> {

    //.....................
    //#region PROPERTIES

    /** track listeners for specific properties registered by callers */
    private __propertyListeners: IPropertyChangeListeners<T>;

    /** track listeners for specific properties registered by callers */
    private __modelListeners: IModelChangeListener<T>[];

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
    constructor(dataToCopy?: IPartial<T>) {
        
        // initialize the listeners for our properties
        this.__propertyListeners = {};
        this.__modelListeners = [];

        // Copy data over from the passed in interface
        this._setDefaultValues();
        if (dataToCopy) {
            if ((dataToCopy as any).saveData) { dataToCopy = (dataToCopy as any).saveData(); }
            this._copyData(dataToCopy);
        }
    }

    /**
     * _setDefaultValues
     * ----------------------------------------------------------------------------
     * Overridable function to initialize any default data that is needed
     */
    protected _setDefaultValues(): void {}
    
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
    protected _copyData<K extends keyof T>(data: IPartial<T>): void {
        map(data, (value: T[K], key: K) => {
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
    protected _copyPiece<K extends keyof T>(key: K, value: T[K]): void {
        let capitalizedName: string = (key[0].toUpperCase() + rest(key as string, 1));
        let copyFuncName: string = "_copy" + capitalizedName;

        // don't override values for undefined elements
        if (value === undefined) { 
            return; 
        }
        
        // if we have a custom function to write this data, use it
        if (this[copyFuncName]) {
            this[copyFuncName](value);
            return;
        };

        // if our current value for this field can be updated, do that instead
        if (isUpdatable(this[key as any])) {
            this[key as any].update(value);
            return;
        }

        let savableValue: T[K];

        // make shallow copies of arrays by default
        if (isArray(value)) {
            savableValue = (value.slice()) as any as T[K];

        // stringify and parse objects by default
        } else if (isObject(value)) {
            savableValue = JSON.parse(JSON.stringify(value))

        // just use primitives as is
        } else {
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
    protected _copyModelArray<I, M extends I>(arr: I[], constructor: IConstructor<M>): M[] {
        let out: M[] = [];

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
    protected _copyModelDictionary<I, M extends I>(dict: IDictionary<I>, constructor: IConstructor<M>): IDictionary<M> {
        let out: IDictionary<M> = {};

        map(dict, (m: I, key: string) => {
            out[key] = new constructor(m);
        });

        return out;
    }
    
    /**
     * update
     * ----------------------------------------------------------------------------
     * update various elements of the model to match the passed in data
     */
    public update(model: IPartial<T>): void {
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
    public saveData<K extends keyof T>(): T {
        let out: T = {} as T;

        map(this, (val: any, key: string) => {

            // don't try to copy functions
            if (typeof val === "function") { return; }

            // determine the formatted key
            let fmtKey: string = key;
            if (fmtKey[0] === "_") { fmtKey = rest(fmtKey, 1); }
            if (fmtKey === "_modelListeners") { return; }
            if (fmtKey === "_propertyListeners") { return; }

            // save this particular key-value
            let outVal = this._savePiece(fmtKey as keyof T, val);
            if (!isNullOrUndefined(outVal)) { out[fmtKey as keyof T] = outVal; }
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
    protected _savePiece<K extends keyof T>(key: K, val: T[K]): T[K] {
        let capitalizedName: string = (key[0].toUpperCase() + rest(key as string, 1));
        let saveFuncName: string = "_save" + capitalizedName;

        // if there is a custom function to save this particular data element, use that
        if (this[saveFuncName]) {
            return this[saveFuncName]();
        }

        let privateName: string = "_" + key;
        let data = val || this[privateName];

        // determine if this is an array of elements, and if so, check if they have the ability to save themselves
        return this._innerSavePiece(data);
    }

    protected _innerSavePiece<K extends keyof T>(data: T[K]): T[K] {
        if (data as any instanceof Array) {
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

    protected _saveArray<K extends keyof T, A extends Array<T[K]>>(data: A): T[K] {
        let outArr = [];

        // loop through each element to save appropriately
        for (let elem of data) {
            outArr.push(this._innerSavePiece(elem));
        }
        return outArr as any as T[K];
    }

    protected _saveModel<K extends keyof T, M extends _Model<T[K]>>(data: M): T[K] {
        return data.saveData();
    }

    protected _saveObject<K extends keyof T>(data: T[K]): T[K] {
        let out: T[K] = {} as T[K];
        map(data, (elem: any, key: string) => {
            out[key] = this._innerSavePiece(elem);
        });
        return out;
    }

    protected _saveSimple<K extends keyof T>(data: T[K]): T[K] {
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
    protected _setValue<K extends keyof T>(key: K, value: T[K]): void {
        let privateName: string = "_" + key;
        let currentValue: T[K] = this[privateName];
        this[privateName] =  value;
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
    protected _notifyListeners<K extends keyof T>(key: K, oldVal: T[K], newVal: T[K]): void {
        this._notifyModelListeners(key, oldVal, newVal);
        this._notifyPropertyListeners(key, oldVal, newVal);
    }

    /**
     * _notifyModelListeners
     * ----------------------------------------------------------------------------
     * Let any listeners that care about any change to the model know that this 
     * particular key has changed to this particular value
     */
    protected _notifyModelListeners<K extends keyof T>(key: K, oldVal: T[K], newVal: T[K]): void {
        let listeners = this.__modelListeners;
        if (!listeners || listeners.length === 0) { return; }

        for (let listener of listeners) {
            if (!listener) { continue; }
            listener(key, newVal, oldVal);
        }
    }

    /**
     * _notifyPropertyListerners
     * ----------------------------------------------------------------------------
     * Let any listeners that care about this particular property know that it has 
     * changed
     */
    protected _notifyPropertyListeners<K extends keyof T>(key: K, oldVal: T[K], newVal: T[K]): void {
        let listeners = this.__propertyListeners[key];
        if (!listeners) { return; }

        // notify all registered listeners
        for (let listener of listeners) {
            if (!listener) { continue; }
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
    public registerPropertyListener<K extends keyof T>(key: K, listener: IPropertyChangeListener<T, K>): void {
        if (!this.__propertyListeners[key]) { this.__propertyListeners[key] = []; }
        this.__propertyListeners[key].push(listener);
    }

    /**
     * registerModelListener
     * ----------------------------------------------------------------------------
     * register a listener for any change that occurs in this model
     */
    public registerModelListener(listener: IModelChangeListener<T>): void {
        if (!listener) { return; }
    }

    /**
     * unregisterListeners
     * ----------------------------------------------------------------------------
     * delete any listeners attached to this model (allows for GC)
     */
    public unregisterListeners(): void {
        this.__propertyListeners = {};
        this.__modelListeners = [];
    }

    //#endregion
    //...........................
}