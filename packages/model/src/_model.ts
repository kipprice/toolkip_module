import { map, clone, Key } from '@toolkip/object-helpers';
import { IPartial } from '@toolkip/structs';
import { 
    isNullOrUndefined, 
    isArray, 
    isObject 
} from '@toolkip/shared-types';
import { 
    IModel,
    ModelEventCallback,
    IModelTransforms,
    ModelEventPayload,
    ModelKey,
    ModelValue,
    ModelEventType
} from './_interfaces';
import { ModelEvent } from './_event';
import { isModel } from './_typeguards';
import { HistoryChain } from '@toolkip/history';
import { equals, IEquatable } from '@toolkip/comparable';
import { CodeEvent } from '@toolkip/code-event';


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
export class Model<T extends IModel = IModel> implements IEquatable {

    //.....................
    //#region PROPERTIES

    /** keep track of the changes that this model has gone through */
    private __history: HistoryChain<T>;

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
        this._innerModel = this._getDefaultValues();

        // initialize the history to make this model back-trackable
        this.__history = new HistoryChain<T>();

        // setup the notification event
        this._event = new ModelEvent<T>('modelchange');

        // Copy data over from the passed in interface
        if (transforms) { this.__transforms = transforms; }
        if (dataToCopy) {
            if (isModel(dataToCopy)) { 
                this._importData(dataToCopy.export() as T)
            } else {
                this._importData(dataToCopy);
            }

            // send the update notifications globally instead of with each
            // individual change
            this.__updateHistory();
            this.__notifyListenersOfUpdate("_", this._getDefaultValues())
            
        }

        // start out with some initial history
        this.__history.push(this.export());
    }

    /**
     * _setDefaultValues
     * ----------------------------------------------------------------------------
     * Overridable function to initialize any default data that is needed
     */
    protected _getDefaultValues(): T {
        return {} as T;
    }
    
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
        const oldValue = this.__updateValue(key, value);
        this.__updateHistory();
        this.__notifyListenersOfUpdate(key, oldValue);
    }

    private __updateValue<K extends keyof T>(key: K, value: T[K]) {
        const currentValue = this._innerModel[key];
        this._innerModel[key] = value;
        return currentValue;
    }

    private __updateHistory() {
        this.__history.push(this.export());
    }

    private __notifyListenersOfUpdate<K extends keyof T>(key: ModelKey<T>, oldValue: ModelValue<T>, addlEvent?: ModelEventPayload<any>) : void {
        let newValue;
        if (key === "_") {
            newValue = this.export();
        } else {
            newValue = this.get(key)
        }
        this._notifyListeners(key, oldValue, newValue, addlEvent);
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
            this.__updateValue(key, this._importPiece(key, value));
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

        return clone<any>(value, [{
            typeGuard: (v) => isModel(v),
            cloner: (v, k) => this._copyModel(k as keyof T, v as any)
        }], key);

    }

    protected _copyModel<X extends Model<any>, K extends keyof T>(key: K, value: X): X {

        // create a new model
        const Ctor = (value as any).constructor;
        const newModel = new Ctor(value);

        // copy over listeners to the event
        newModel._event = value._event;

        // when this new model updates, update our version too
        newModel.addEventListener((data) => {
            const anotherNewModel = new Ctor(newModel);
            const currentValue = this.__updateValue(key, anotherNewModel);
            this.__updateHistory();
            this._notifyListeners(key, currentValue, anotherNewModel, data);
        });

        return newModel;
    }

    
    /**
     * update
     * ----------------------------------------------------------------------------
     * update various elements of the model to match the passed in data
     */
    public update(model: IPartial<T>): void {
        this._importData(model);
    }

    /**
     * _updateFromHistory
     * ----------------------------------------------------------------------------
     * handle when the user chooses to undo or redo
     */
    protected _updateFromHistory(model: IPartial<T>): void {
        const currentValue = new (this as any).constructor(this.export());
        this._importData(model);

        this.__notifyListenersOfUpdate("_", currentValue.export());
    }

    //#endregion
    //.......................................

    //....................
    //#region EXPORT DATA
    
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

    protected _innerExportPiece<X>(data: X): X {
        if (isArray(data)) {
            return this._exportArray(data);
        }
        else if (isModel(data)) {
            return this._exportModel(data);
        } 
        else if (isObject(data)) {
            return this._exportObject(data);
        }
        else {
            return this._exportSimple(data);
        }
    }

    protected _exportArray<X extends Array<Y>, Y = any>(data: X): X {
        let outArr: X = [] as X;

        for (let elem of data) {
            outArr.push(this._innerExportPiece(elem));
        }

        return outArr;
    }

    protected _exportModel<X extends IModel>(data: X): X {
        return data.export();
    }

    protected _exportObject<X extends Object>(data: X): X {
        let out: X = {} as X;
        map(data, (elem: any, key: string) => {
            out[key] = this._innerExportPiece(elem);
        });
        return out;
    }

    protected _exportSimple<X>(data: X): X {
        return data;
    }
    
    //#endregion
    //....................

    //...........................
    //#region MANAGE LISTENERS

    public addEventListener(cbFunc: ModelEventCallback<T>): void {
        this._event.addEventListener(cbFunc, this);
    }

    public addPropertyListener<K extends keyof T>(property: K, cbFunc: ModelEventCallback<T>): void {
        this._event.addEventListener((payload) => {
            if (payload.key !== property) { return; }
            cbFunc(payload);
        }, this)
    }

    /**
     * _notifyListeners
     * ---------------------------------------------------------------------------
     * Let any subscribers to this model know that some changes have occurred
     * @param   key     The key that changed in the model
     * @param   oldVal  The previous version of this key's value
     * @param   newVal  The new version of this key's value
     */
    protected _notifyListeners(key: ModelKey<T>, oldValue: ModelValue<T>, newValue: ModelValue<T>, originatingEvent?: ModelEventPayload<any>): void {
        if (!this._needsUpdate(oldValue, newValue)) { return; }
        
        const eventType = this._calculateChangeType(oldValue, newValue, originatingEvent);
        this._notifyModelListeners({ key, oldValue, value: newValue, originatingEvent, eventType });
    }

    protected _needsUpdate(oldVal: ModelValue<T>, newVal: ModelValue<T>): boolean {
        return !equals(oldVal, newVal);
    }

    public equals(otherModel: IEquatable) {
        if (!isModel(otherModel)) { return false; }
        return equals(otherModel._innerModel, this._innerModel);
    }

    /**
     * _calculateChangeType
     * ----------------------------------------------------------------------------
     * determine what type of change occurred in this event
     * 
     * this calculation is only used if there is not an originating event to draw 
     * from (e.g. if a nested model raises an 'add' we will also use 'add' despite 
     * the change at this level being a 'modify')
     */
    protected _calculateChangeType(oldVal: ModelValue<T>, newVal: ModelValue<T>, originatingEvent?: ModelEventPayload<any>): ModelEventType {
        if (originatingEvent) { return originatingEvent.eventType; }

        if (newVal && !oldVal) { return 'add'; }
        if (oldVal && !newVal) { return 'remove'; }
        return 'modify'; 
    }

    /**
     * _notifyModelListeners
     * ----------------------------------------------------------------------------
     * Let any listeners that care about any change to the model know that this 
     * particular key has changed to this particular value
     */
    protected _notifyModelListeners(payload: ModelEventPayload<T>): void {

        // convert to the exported version of the values
        payload.oldValue = this._innerExportPiece(payload.oldValue);
        payload.value = this._innerExportPiece(payload.value);

        this._event.dispatch(this, payload);
    }


    //#endregion
    //...........................

    //..........................................
    //#region UNDO AND REDO
    
    /**
     * undo
     * ----------------------------------------------------------------------------
     * reverse the last change made to the model
     */
    public undo() {
        const lastState = this.__history.navigateBack();
        if (!lastState) { return; }
        this._updateFromHistory(lastState);
    }

    /**
     * redo
     * ----------------------------------------------------------------------------
     * redo the last undone action to the model
     */
    public redo() {
        const nextState = this.__history.navigateForward();
        if (!nextState) { return; }
        this._updateFromHistory(nextState);
    }
    
    //#endregion
    //..........................................

}