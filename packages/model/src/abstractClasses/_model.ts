import { IEquatable, equals } from "@toolkip/comparable";
import { ICloneable, clone } from '@toolkip/object-helpers';
import { HistoryChain } from '@toolkip/history';
import { 
    ModelEventPayload, 
    IModelTransforms, 
    ModelEventCallback, 
    ModelEventType, 
    IKeyedModelTransforms,  
    ModelEvent,
    IModel
} from "../_shared";
import { isModel } from '../_typeguards/core';

/**----------------------------------------------------------------------------
 * @class	_Model
 * ----------------------------------------------------------------------------
 * class_description
 * @author	Kip Price
 * @version	1.0.0
 * ----------------------------------------------------------------------------
 */
export abstract class _Model<T> implements IEquatable, ICloneable<_Model<T>>, IModel<T> {

        //..........................................
    //#region CONSTRUCTOR
    
    public constructor(data?: Partial<T>, transforms?: IModelTransforms<T>) {

        // set up all of the instance variables
        this._innerModel = this._getDefaultValues();
        this.__history = new HistoryChain<T>();
        this._event = new ModelEvent<T, any, any>('modelchange');

        // Copy data over from the passed in interface
        if (transforms) { this._transforms = transforms; }
        else { this._transforms = {}; }

        if (data) { this.import(data as T) }
    }

    protected abstract _getDefaultValues(): T;
    
    //#endregion
    //..........................................
    
    //..........................................
    //#region CREATING OTHER MODELS
    
    public static createModel: <T = any>(data: T | IModel<T>, transforms?: IKeyedModelTransforms<T>) => IModel<T>
    
    //#endregion
    //..........................................

    //..........................................
    //#region EVENT HANDLING

    protected _event: ModelEvent<T, any, any>;
    public addEventListener<K, X>(cbFunc: ModelEventCallback<K, X>) {
        this._event.addEventListener(cbFunc);
    }

    protected static _event: ModelEvent<any, any, any> = new ModelEvent<any, any, any>('modelchange');
    public static addEventListener(cbFunc: ModelEventCallback<any, any>) {
        this._event.addEventListener(cbFunc);
    }
    

    protected _dispatchEvent<K, X>(payload: ModelEventPayload<K, X>): void {
        this._event.dispatch(this, payload);
        _Model._event.dispatch(this, payload);
    }
    
    /**
     * _notifyListeners
     * ---------------------------------------------------------------------------
     * Let any subscribers to this model know that some changes have occurred
     * @param   key     The key that changed in the model
     * @param   oldVal  The previous version of this key's value
     * @param   newVal  The new version of this key's value
     */
    protected _notifyListeners<K, X>(payload: ModelEventPayload<K, X>): void {
        const { oldValue, value: newValue, eventChain } = payload;
        if (equals(oldValue, newValue)) { return; }
        if (!payload.eventType) { 
            payload.eventType = this._calculateChangeType(oldValue, newValue, eventChain);
        }
        this._dispatchEvent(payload);
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
    protected _calculateChangeType<X>(oldVal:X, newVal: X, eventChain?: ModelEventPayload<any, any>): ModelEventType {
        if (eventChain) { return eventChain.eventType; }

        if (newVal && !oldVal) { return 'add'; }
        if (oldVal && !newVal) { return 'remove'; }
        return 'modify'; 
    }

    //#endregion
    //..........................................

    //..........................................
    //#region TRANSFORM HANDLING
    
    protected _transforms: IModelTransforms<T>;

    protected _getApplicableTransforms() {
        return this._transforms["_"];
    }

    //#endregion
    //..........................................

    //..........................................
    //#region HISTORY HANDLING
    
    /** keep track of the changes that this model has gone through */
    private __history: HistoryChain<T>;

    protected _updateHistory(): void {
        this.__history.push(this.getData());
    }

    /**
     * undo
     * ----------------------------------------------------------------------------
     * reverse the last change made to the model
     */
    public undo() {
        this.__history.navigateBack((lastState) => {
            if (!lastState) { return; }
            this.import(lastState);
            return;
        });
        
    }

    /**
     * redo
     * ----------------------------------------------------------------------------
     * redo the last undone action to the model
     */
    public redo() {
        this.__history.navigateForward((nextState) => {
            if (!nextState) { return; }
            this.import(nextState);
            return;
        });
        
    }

    //#endregion
    //..........................................

    //..........................................
    //#region GETTERS AND SETTERS
    
    protected _innerModel: T;

    /**
     * get
     * ----------------------------------------------------------------------------
     * retrieve data from within the model
     */
    public getData(): T { 
        return this._innerGetData()
    }

    protected _innerGetData(): T {
        return this._cloneData(this._innerModel); 
    }

    /**
     * set
     * ----------------------------------------------------------------------------
     * set data into the model
     */
    public setData(newData: T): void {
        this._innerSetData({ value: newData });
    }

    protected _innerSetData<K>(payload: ModelEventPayload<K, T>): void {
        const oldValue = this.getData();

        const { value: newData } = payload;
        const clonedData = this._cloneData(newData as T);
        this._innerModel = clonedData;
        
        this._sendUpdate({ ...payload, oldValue, value: this.getData() });
    }

    protected _sendUpdate<K, X>(payload: ModelEventPayload<K, X>): void {
        this._updateHistory();
        this._notifyListeners(payload);
    }

    //#endregion
    //..........................................

    //..........................................
    //#region IMPORT & EXPORT DATA
    
    /**
     * _import
     * ----------------------------------------------------------------------------
     * loads in data from the specified type into this particular model. Also 
     * handles transforming any data that needs transforming
     */
    public import(data: T) {
        const transform = this._getApplicableTransforms()?.incoming;

        let importedData;
        if (transform) {
            importedData = transform(data);
        } else {
            importedData = this._innerImport(data);
        }

        this.setData(importedData);
    };

    protected _innerImport(data: T): T {
        return data;
    }
    
    /**
     * _export
     * ----------------------------------------------------------------------------
     * transforms the data within this model into an appropriate form to be abke
     * to send to servers or between areas of code
     */
    public export(): T {
        const transform = this._getApplicableTransforms()?.outgoing;
        if (transform) {
            return transform(this.getData());
        } else {
            return this._innerExport();
        }
    }

    protected _innerExport(): T {
        return this.getData();
    }
    
    //#endregion
    //..........................................

    //..........................................
    //#region EQUATABLE
    
    public equals(otherModel: IEquatable) {
        if (!isModel(otherModel)) { return false; }
        return equals(otherModel.getData(), this.getData());
    }
    
    //#endregion
    //..........................................

    //..........................................
    //#region CLONEABLE
    
    public clone(tx?: IModelTransforms<T>): _Model<T> {
        const transforms = tx || this._transforms;
        const Ctor = (this as any).constructor;
        const newModel = new Ctor(this.getData(), transforms);

        // copy over event listeners as part of the cloning process
        newModel._event = this._event;
        return newModel;
    }

    protected _cloneData<X>(data: X): X {
        return clone(data);
    }
    
    //#endregion
    //..........................................

}