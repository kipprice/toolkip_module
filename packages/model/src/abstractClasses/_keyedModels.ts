import { _KeyedModel } from './_keyedModel';
import { IArrayModel } from '../_shared';
import { equals } from '@toolkip/comparable';
import { isUndefined } from '@toolkip/shared-types';
import { isModel } from '../_typeguards';

/**----------------------------------------------------------------------------
 * @class	_KeyedModels
 * ----------------------------------------------------------------------------
 * add specific functionality to collection-style models so that we can more
 * easily manipulate collections of data within the model context.
 * 
 * @author	Kip Price
 * @version	1.0.0
 * ----------------------------------------------------------------------------
 */
export abstract class _KeyedModels<T, K, X> extends _KeyedModel<T, K, X> implements IArrayModel<X, K> {

    /**
     * add
     * ----------------------------------------------------------------------------
     * adds an element to the collection to the appropriate spot
     * 
     * (implemented by child classes)
     */
    public abstract add(value: X): boolean;

    /**
     * remove
     * ----------------------------------------------------------------------------
     * take a particular element with the specified key out of the collection &
     * notify all relevant listeners
     */
    public remove(key: K): X {
        const out = this.get(key);
        this._innerSet({
            key,
            value: undefined
        });
        return out;
    }

    /**
     * findIndex
     * ----------------------------------------------------------------------------
     * if an element already exists in the collection, finds the index at which it
     * occurs
     */
    public findIndex(val: X): K {
        this._map(this._innerModel, (v: X, key: K) => {
            if (equals(val, isModel(v) ? v.getData() : v )) { return key; }
        })
        return undefined;
    }

    public contains(val: X): boolean {
        const key = this.findIndex(val);
        if (isUndefined(key)) { return false; }
        return true;
    }

    /**
     * clear
     * ----------------------------------------------------------------------------
     * remove all data from the collection
     */
    public clear() {
        this._innerSetData({ 
            eventType: 'remove', 
            value: this._getDefaultValues()
        });
    }
}