import { map } from '@toolkip/object-helpers';
import { IPartial } from '@toolkip/structs';
import { 
    isNullOrUndefined, 
    isArray, 
    isObject 
} from '@toolkip/shared-types';
import { 
    IModel,
    ModelEventCallback,
    IModelTransforms
} from './_interfaces';
import { ModelEvent } from './_event';
import { isModel } from './_typeguards';
import { HistoryChain } from '@toolkip/history';
import { isEquatable } from '@toolkip/comparable';


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
 * Accounts for referential immutability; that is, the objects directly defined
 * will not be the objects that end up modified. Instead, copies will be made when
 * needed to allow for safe retrieval and updating
 * 
 * @author  Kip Price
 * @version 2.0.0 (Add referential immutability)
 * ----------------------------------------------------------------------------
 */
export class Model<T extends IModel = IModel> {

    //.....................
    //#region PROPERTIES

    /** keep track of the changes that this model has gone through */
    private __history: HistoryChain<T>;
    private __isUpdatingFromHistory: boolean;

    /** TODO: create the event used by this model and in some way expose it */
    protected _event: ModelEvent<T>;

    protected _innerModel: T;
    
    private __transforms = {}; 
    protected get _transforms(): IModelTransforms<T> { return this.__transforms; }

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
    constructor(dataToCopy?: IPartial<T>, transforms?: IModelTransforms<T> ) {

        // set up all of the tracking we need to do
        // on the model itself
        this._innerModel = {} as T;

        // initialize the history to make this model back-trackable
        this.__history = new HistoryChain<T>();

        // setup the notification event
        this._event = new ModelEvent<T>('modelchange');

        // Copy data over from the passed in interface
        this._setDefaultValues();
        if (transforms) { this.__transforms = transforms; }
        if (dataToCopy) {
            if (isModel(dataToCopy)) { 
                this._importData(dataToCopy.export() as T)
            } else {
                this._importData(dataToCopy);
            }
            
        }

        // start out with some initial history
        this.__history.push(this.export());
    }

    /**
     * _setDefaultValues
     * ----------------------------------------------------------------------------
     * Overridable function to initialize any default data that is needed
     */
    protected _setDefaultValues(): void {}
    
    //#endregion
    //..........................................

    //..........................................
    //#region GETTERS AND SETTERS

    public get<K extends keyof T>(key: K): T[K] {
        return this._getValue(key);
    }

    protected _getValue<K extends keyof T>(key: K): T[K] {
        const currentValue = this._innerModel[key]
        return this._importPiece(key, currentValue);
    }

    public set<K extends keyof T>(key: K, value: T[K]) {
        return this._setValue(key, value);
    }

    protected _setValue<K extends keyof T>(key: K, value: T[K]) {
        // because we are always returning callers a copy
        // we can safely just set the new value; it is 
        // guaranteed to be a different reference than the 
        // original

        const currentValue = this._innerModel[key];
        this._innerModel[key] = value;

        // update history and our listeners
        if (!this.__isUpdatingFromHistory) { this.__history.push(this.export()); }
        this._notifyListeners(key, currentValue, value);
        
    }
    
    //#endregion
    //..........................................
    
    //.......................................
    //#region IMPORTING DATA

    /**
     * _importData
     * ----------------------------------------------------------------------------
     * Copies data from a JSON version of this model
     * @param   data    The data to save into our model
     */
    protected _importData<K extends keyof T>(data: IPartial<T>): void {
        map(data, (value: T[K], key: K) => {
            this._setValue(key, this._importPiece(key, value));
        });
    }

    /**
     * _importPiece
     * ----------------------------------------------------------------------------
     * Copy a particular piece of data into this class
     * @param   key     The key to copy over 
     * @param   value   The value to copy over
     */
    protected _importPiece<K extends keyof T>(key: K, value: T[K]): T[K] {

        let transformedVal = value;
        // if we have a custom function to write this data, update the 
        // value via this function
        if (this._transforms[key]?.incoming) {
            transformedVal = this._transforms[key].incoming(value);
            return transformedVal;
        } else {
            return this._copyData(key, transformedVal);
        }
    }

    /**
     * _copyData
     * ----------------------------------------------------------------------------
     * helper for getting the copied version of a particular field; can handle
     * primitives, simple objects, arrays, and anything with models
     * 
     * @param   value     The value to copy over
     * 
     * @returns The copied version of the specified value
     */
    protected _copyData<K extends keyof T>(key: K, value: T[K]): T[K] {

        // handle models via their built in copy method
        if (isModel(value)) {
            return this._copyModel(key, value);

        // make shallow copies of arrays by default
        } else if (isArray(value)) {
            return this._copyArray(key, value);

        // stringify and parse objects by default
        } else if (isObject(value)) {
            return this._copyObject(key, value);

        // just use primitives as is
        } else {
            return value;
        }
    }

    protected _copyModel<X extends Model<any>, K extends keyof T>(key: K, value: X): X {

        // create a new model
        const Ctor = (value as any).constructor;
        const newModel = new Ctor(value);

        // copy over listeners to the event
        newModel._event = value._event;

        // when this new model updates, update our version too
        newModel.registerListener((data) => {
            this._setValue(key, newModel)
        });

        return newModel;
    }

    protected _copyArray<X extends Array<any>, K extends keyof T>(key: K, value: X): X {
        const out = [];

        for (let i of value) {
            const copiedData = this._copyData(key, i);
            out.push(copiedData);
        }

        return out as X;
    }

    protected _copyObject<X extends Object, K extends keyof T>(key: K, value: X): X {
        const out = {} as X;

        map(value, (m: any, key: string) => {
            out[key] = this._copyData(key, m);
        });

        // ensure we copy over the prototype as well
        Object.setPrototypeOf(out, Object.getPrototypeOf(value)); 

        return out;
    }
    
    /**
     * update
     * ----------------------------------------------------------------------------
     * update various elements of the model to match the passed in data
     */
    public update(model: IPartial<T>): void {
        this._importData(model);
    }

    protected _updateFromHistory(model: IPartial<T>): void {
        this.__isUpdatingFromHistory = true;
        this._importData(model);
        this.__isUpdatingFromHistory = false;
    }
    //#endregion
    //.......................................

    //....................
    //#region SAVE DATA
    
    /**
     * export
     * ----------------------------------------------------------------------------
     * Gets data out of this model in JSON format
     */
    public export<K extends keyof T>(): T {
        let out: T = {} as T;

        map(this._innerModel, (val: T[K], key: K) => {

            // save this particular key-value
            let outVal = this._exportPiece(key, val);
            if (isNullOrUndefined(outVal)) { return; }

            out[key] = outVal;
        });
        
        return out;
    }

    /**
     * _savePiece
     * ----------------------------------------------------------------------------
     * Save a piece of data to our out array. If the data is a model itself, calls
     * export to retrieve the data from that model.
     * @param   key     The key to save data for
     * @param   value   The value of that key
     * 
     * @returns The value
     */
    protected _exportPiece<K extends keyof T>(key: K, val: T[K]): T[K] {
        let out = val;

        // if there is a custom function to save this particular data 
        // element, use it before passing along to standard functions
        if (this._transforms[key]?.outgoing) {
            return this._transforms[key].outgoing(val);
        } else {
            return this._innerExportPiece(out);
        }
        
    }

    protected _innerExportPiece<K extends keyof T>(data: T[K]): T[K] {
        if (data as any instanceof Array) {
            return this._exportArray(data);
        }
        else if (isModel(data)) {
            return this._exportModel(data);
        } 
        else if (typeof data === "object") {
            return this._exportObject(data);
        }
        else {
            return this._exportSimple(data);
        }
    }

    protected _exportArray<K extends keyof T, A extends Array<T[K]>>(data: A): T[K] {
        let outArr = [];

        // loop through each element to save appropriately
        for (let elem of data) {
            outArr.push(this._innerExportPiece(elem));
        }
        return outArr as any as T[K];
    }

    protected _exportModel<K extends keyof T, M extends Model<T[K]>>(data: M): T[K] {
        return data.export();
    }

    protected _exportObject<K extends keyof T>(data: T[K]): T[K] {
        let out: T[K] = {} as T[K];
        map(data, (elem: any, key: string) => {
            out[key] = this._innerExportPiece(elem);
        });
        return out;
    }

    protected _exportSimple<K extends keyof T>(data: T[K]): T[K] {
        return data;
    }
    
    //#endregion
    //....................

    //...........................
    //#region MANAGE LISTENERS

    public registerListener(cbFunc: ModelEventCallback<T>): void {
        this._event.addEventListener(cbFunc, this);
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
        if (!this._needsUpdate(oldVal, newVal)) { return; }
        this._notifyModelListeners(key, oldVal, newVal);
    }

    protected _needsUpdate<K extends keyof T>(oldVal: T[K], newVal: T[K]): boolean {
        if (isEquatable(oldVal)) { return oldVal.equals(newVal); }
        return oldVal !== newVal; 
    }

    /**
     * _notifyModelListeners
     * ----------------------------------------------------------------------------
     * Let any listeners that care about any change to the model know that this 
     * particular key has changed to this particular value
     */
    protected _notifyModelListeners<K extends keyof T>(key: K, oldVal: T[K], newVal: T[K]): void {
        this._event.dispatch(this, { 
            key,
            value: isModel(newVal)? newVal.export() : newVal,
            oldValue: isModel(oldVal)? oldVal.export() : oldVal
        });
    }


    //#endregion
    //...........................

    //..........................................
    //#region UNDO AND REDO
    
    public undo() {
        const lastState = this.__history.navigateBack();
        if (!lastState) { return; }
        this._updateFromHistory(lastState);
    }

    public redo() {
        const nextState = this.__history.navigateForward();
        if (!nextState) { return; }
        this._updateFromHistory(nextState);
    }
    
    //#endregion
    //..........................................

}