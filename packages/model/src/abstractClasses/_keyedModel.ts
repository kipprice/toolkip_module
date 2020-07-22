import { ICodeEventStandardContent } from '@toolkip/code-event';
import { _Model } from './_model';
import { IKeyedModelTransforms, ModelEventCallback, ModelEventPayload, IModel, ModelEventType, IKeyedModel, ModelType, IArrayModel, IBasicModel } from '../_shared';
import { isModel } from '../_typeguards/core';
import { isNullOrUndefined } from '@toolkip/shared-types';

/**----------------------------------------------------------------------------
 * @class	_KeyedModel
 * ----------------------------------------------------------------------------
 * Abstract model that allows for key-based getters and setters. Base of all
 * models in the "complex" bucket. Every element within the keyed model is 
 * actually a model itself, which is how we keep immutability going effectively.
 * 
 * Transforms can be applied to individual keys or to the model as a whole 
 * with keyed models. Listeners can also be applied at a key-by-key level.
 * 
 * @author	Kip Price
 * @version	1.0.0
 * ----------------------------------------------------------------------------
 */
export abstract class _KeyedModel<T, K, X> extends _Model<T> {

    public constructor(data?: Partial<T>, transforms?: IKeyedModelTransforms<T, X>) {
        super(data, transforms);
    }
    public getType(): ModelType { return 'keyed' }
    
    //..........................................
    //#region EVENT HANDLING
    
    public addKeyedListener(key: K, cbFunc: ModelEventCallback<K, X>): void {
        this._event.addEventListener((payload: ModelEventPayload<K, X> & ICodeEventStandardContent<T>) => {
            if (payload.key !== key) { return; }
            cbFunc(payload);
        }, this)
    }
    
    //#endregion
    //..........................................

    //..........................................
    //#region TRANSFORMS
    
    protected _transforms: IKeyedModelTransforms<T, X>;

    protected _getApplicableTransforms(key?: K) {
        if (!key) { return super._getApplicableTransforms(); }
        return (this._transforms as any)[key];
    }
    
    //#endregion
    //..........................................

    //..........................................
    //#region ABSTRACT FUNCTIONS
    
    /**
     * _getValue
     * ----------------------------------------------------------------------------
     * retrieve our model data appropriately; we never will be retrieving raw data
     * ourselves but instead will rely on the models themselves to do so.
     */
    protected abstract _getValue(output: T, key: K): X | IModel<X>;

     /**
     * _setValue
     * ----------------------------------------------------------------------------
     * set the newly wrapped model into our inner model structure appropriately
     */
    protected abstract _setValue(output: T, key: K, value: X | IModel<X>): void;

    /**
     * _map
     * ----------------------------------------------------------------------------
     * allow for looping through a set of data, either within the model or within
     * the external form of data
     */
    protected abstract _map(data: T, mapFunc: (val: X | IModel<X>, key: K) => void);
    
    
    //#endregion
    //..........................................

    //..........................................
    //#region GETTERS

    public get(key: K): X {
        return this._innerGet(key);
    }

    protected _innerGet(key: K): X {
        const model = this._getValue(this._innerModel, key);
        return isModel(model) ?  model.getData() : undefined;
    }

    protected _innerGetData(): T {
        if (isNullOrUndefined(this._innerModel)) { return this._innerModel; }

        const out = this._getDefaultValues();
        this._map(this._innerModel, (val: X, key: K) => {
            if (!isModel(val)) { return }
            this._setValue(out, key as K, val.getData());
        })
        return out;
    }

    public getModel(key: K, type: 'b'): IBasicModel<X>;
    public getModel(key: K, type?: 'o'): IKeyedModel<X, any, any>;
    public getModel(key: K, type: 'a'): IArrayModel<any, any, X> & IKeyedModel<X, any, any>;
    public getModel(key: K): IModel<X> {
        const m = this._getValue(this._innerModel, key);
        if (!isModel(m)) { return null; }

        switch(m.getType()) {
            case 'array':       return m as IArrayModel<any, any, X> & IKeyedModel<X, any, any>;
            case 'keyed':       return m as IKeyedModel<X, any, any>;
            case 'primitive':   return m as IBasicModel<X>;
        }
    }

    //#endregion
    //..........................................
    
    //..........................................
    //#region SETTERS
    
    public update(key: K, newValue: Partial<X>): void { 
        const value: X = {
            ...this.get(key),
            ...newValue
        }
        this._innerSet({ key, value }); 
    }

    public set(key: K, value: X): void {
        this._innerSet({ key, value });
    }

    protected _innerSet( payload: Partial<ModelEventPayload<K, X>>) {
        const { value, key } = payload;

        // retrieve what is already present
        const oldModel = this.getModel(key);

        // if we already have a model, just update it
        if (isModel(oldModel)) {
            oldModel.setData(value);
            this._setValue(this._innerModel, key, oldModel);

        // otherwise, we need to create a model & we need
        // to handle notifying on our own
        } else {
            const oldValue = payload.oldValue || this.get(key);
            const newModel = this._wrapInModel<K, X>(value, key);

            this._setValue(this._innerModel, key, newModel);

            this._sendUpdate<K, X>({ 
                ...payload,
                oldValue, 
                value: newModel.getData()
            });
        }

        return this.getModel(key);
    }
    
    protected _innerSetData(payload): void {
        const { value } = payload;

        if (isModel(value)) {
            super._innerSetData({ ...payload, value: this._wrapInModel<K, X>(value) });
        } else if (isNullOrUndefined(value)) { 
            super._innerSetData(payload);
        } else {
            const modelValue = this._getDefaultValues();

            this._map(value, (val: X, key: K) => {
                let updatedVal = this._wrapInModel<K, X>(val, key);
                this._setValue(modelValue, key, updatedVal);
            })

            super._innerSetData({ ...payload, value: modelValue });
        }
    }

    //#endregion
    //..........................................

    

    //..........................................
    //#region IMPORT AND EXPORT
    
    protected _innerImport(data: T): T {
        const out = this._getDefaultValues();

        this._map(data, (val: X, key: K) => {

            let updatedValue: X = val;
            const transform = this._getApplicableTransforms(key)?.incoming;
            if (transform) {
                updatedValue = transform(val, key, this);
            }
            this._setValue(out, key, this._wrapInModel<K, X>(updatedValue, key))
        })

        return out;
    } 


    protected _innerExport(): T {

        // start with the basic form of the export
        const out = this._getDefaultValues();

        // then, loop through the transforms to make sure everything
        // is getting applied appropriately
        this._map(this._innerModel, (val: X, key: K) => {
            let outValue = isModel(val) ? val.export() : val;
            const transform = this._getApplicableTransforms(key)?.outgoing;
            if (transform) {
                outValue = transform(outValue, key, this);
            }
            this._setValue(out, key, outValue);
        });

        return out; 
    }
    
    //#endregion
    //..........................................


}