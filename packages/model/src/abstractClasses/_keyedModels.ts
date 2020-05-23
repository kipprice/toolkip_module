import { _KeyedModel } from './_keyedModel';
import { IArrayModel } from '../_shared';
import { isModel } from '../_typeguards';

export abstract class _KeyedModels<T, K, X> extends _KeyedModel<T, K, X> implements IArrayModel<X, K> {

    // individual implementers will still need to add this
    public abstract add(value: X);

    // remove should be handled 
    public remove(key: K): X {
        const out = this.get(key);
        this._innerSet({ key, value: undefined });
        return isModel(out) ? out.getData() : out;
    }

    public clear() {
        const newData = this._getDefaultValues();
        this._innerSetData({ value: newData });
    }
}