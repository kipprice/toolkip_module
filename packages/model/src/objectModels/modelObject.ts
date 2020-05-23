import { _Model, _KeyedModel } from '../abstractClasses';
import { IModelData } from '../_shared/_interfaces';
import { map } from '@toolkip/object-helpers';

/**----------------------------------------------------------------------------
 * @class	ModelObject
 * ----------------------------------------------------------------------------
 * creates a model that tracks all changes to a nested object within; handles
 * updating listeners as well as tracking its own history. Can be embedded 
 * within other models as well as be its own top level
 * 
 * @author	Kip Price
 * @version	1.0.0
 * ----------------------------------------------------------------------------
 */
export class ModelObject<T extends IModelData, K extends keyof T = keyof T> extends _KeyedModel<T, K, T[K]> {

    //..........................................
    //#region IMPLEMENT ABSTRACT FUNCTIONS

    protected _getDefaultValues(): T { return {} as T; }

    protected _map<_K extends keyof T>(data: T, mapFunc: (val: T[_K], key: _K) => void): void {
        map(data, mapFunc);
    }

    //#endregion
    //..........................................

    //..........................................
    //#region GETTER AND SETTERS
    
    protected _getValue<_K extends keyof T>(model: T, key: _K) { return model[key]; }
    public get(key: K): T[K] { return super.get(key); }

    protected _setValue<_K extends keyof T>(model: T, key: _K, value: _Model<T[_K]>) {
        model[key] = value as T[_K]; 
    }
    public set <_K extends K>(key: _K, value: T[_K]) {
        return super.set(key, value as T[K]);
    }
    
    //#endregion
    //..........................................

}
