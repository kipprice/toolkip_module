import { ICodeEventStandardContent } from '@toolkip/code-event';
import { _Model } from './_model';
import { IKeyedModelTransforms, ModelEventCallback, ModelEventPayload, IModel } from '../_shared';
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
    //#region GETTERS

    /**
     * _getValue
     * ----------------------------------------------------------------------------
     * retrieve our model data appropriately; we never will be retrieving raw data
     * ourselves but instead will rely on the models themselves to do so.
     */
    protected abstract _getValue(output: T, key: K): IModel<X>;

    protected abstract _map(data: T, mapFunc: (val: X, key: K) => void);

    public get(key: K): X {
        const model = this._getValue(this._innerModel, key);
        return model ?  model.getData() : undefined;
    }

    protected _innerGetData(): T {
        const out = this._getDefaultValues();
        this._map(this._innerModel, (val: X, key: K) => {
            if (!isModel(val)) { return }
            this._setValue(out, key as K, val.getData());
        })
        return out;
    }

    public getModel(key: K) {
        return this._getValue(this._innerModel, key);
    }

    //#endregion
    //..........................................
    
    //..........................................
    //#region SETTERS
    
    /**
     * _setValue
     * ----------------------------------------------------------------------------
     * set the newly wrapped model into our inner model structure appropriately
     */
    protected abstract _setValue(output: T, key: K, value: IModel<X>): void;
    protected _innerSet( payload: ModelEventPayload<K, X>) {
        const { value, key } = payload;

        const newModel = this._wrapInModel(value, key);
        const oldValue = payload.oldValue || this.get(key);

        this._setValue(this._innerModel, key, newModel);

        this._sendUpdate<K, X>({ 
            ...payload,
            oldValue, 
            value: newModel.getData()
        });

        return newModel;
    }
    public set(key: K, value: X): void { this._innerSet({ key, value }); }
    
    protected _innerSetData(payload): void {
        const { value } = payload;

        if (isModel(value)) {
            super._innerSetData({ ...payload, value: this._wrapInModel(value) });
        } else {
            const modelValue = this._getDefaultValues();

            this._map(value, (val: X, key: K) => {
                let updatedVal = this._wrapInModel(val, key);
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
                updatedValue = transform(val);
            }
            this._setValue(out, key, this._wrapInModel(updatedValue, key))
        })

        return out;
    } 

    // TODO: evaluate this
    protected _innerExport(): T {
        return super._innerExport();
    }
    
    //#endregion
    //..........................................


    //..........................................
    //#region MODEL WRAPPING
    
    protected _wrapInModel(dataToWrap: X | IModel<X>, key?: K): IModel<X> {
        const applicableTransform = this._getApplicableTransforms(key);
        const newModel = _Model.createModel<X>(dataToWrap, applicableTransform);
        let oldValue = newModel.getData();

        // if we created a new model, make sure we are listening to its changes

        // TODO: there is an edge case where a model is passed in without
        // a listener; we should handle that as well
        if (!isModel(dataToWrap)) {
        
            newModel.addEventListener((payload) => {
                if (isNullOrUndefined(key)) { return }

                // this allows us to update from formerly cloned models instead of 
                // always using the new one we've cloned in
                const { target } = payload;
                this._innerSet({ key, oldValue, value: target as any as X, eventChain: payload })

                // update what we treat as the most recent data
                oldValue = isModel(target) ? target.getData() : target;
            })
        }
        return newModel;
    }
    
    //#endregion
    //..........................................


}