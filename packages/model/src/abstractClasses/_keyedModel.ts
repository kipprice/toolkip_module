import { ICodeEventStandardContent } from '@toolkip/code-event';
import { _Model } from './_model';
import { IKeyedModelTransforms, ModelEventCallback, ModelEventPayload, isModel, IModel } from '../_shared';

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

    public getModel(key: K): IModel<X> {
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

        const newModel = this._wrapInModel(value);
        const oldValue = this.get(key);

        this._setValue(this._innerModel, key, newModel);

        this._sendUpdate<K, X>({ 
            ...payload,
            oldValue, 
            value: newModel.getData()
        });

        return newModel;
    }
    public set(key: K, value: X): void { this._innerSet({ key, value }); }
    
    
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
            this._setValue(out, key, this._wrapInModel(updatedValue))
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

        // ensure that we are listening to this model's changes

        // TODO: is this actually necessary with the fact that 
        // we clone over the old event listeners? maybe need a unique
        // identifier to be able to not fire a bunch of unused events
        newModel.addEventListener((payload) => {
            if (!key) { return }
            this._innerSet({ key, value: newModel as any as X, eventChain: payload })
        })

        return newModel;
    }
    
    //#endregion
    //..........................................


}