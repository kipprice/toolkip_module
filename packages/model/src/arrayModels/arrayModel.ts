import { _Model, _KeyedModels } from '../abstractClasses';
import { map } from '@toolkip/object-helpers';
import { IArrayModel } from '../_shared/_interfaces';
import { isUndefined, isNullOrUndefined } from '@toolkip/shared-types';

export class MArray<T> extends _KeyedModels<T[], number, T> implements IArrayModel<T, number, T[]> {
    
    protected _getDefaultValues(): T[] {
        return [];
    }

    protected _map(data: T[], mapFunc: (val: T, key: number) => void) {
        map(data, mapFunc);
    }

    protected _getValue(output: T[], key: number) {
        return (output as any[] as _Model<T>[])[key];
    }

    protected _setValue(output: T[], key: number, value: _Model<T>) {
        if (this._shouldSplice(output, key, value)) {
            output.splice(key, 1);
        } else if (!isNullOrUndefined(value)) {
            output[key] = value as any as T;
        }
    }

    protected _shouldSplice(output: T[], key: number, value: _Model<T>): boolean {
        if (key < 0) { return false; }
        if (key >= output.length) { return false; }
        if (value === undefined) { return true; }
        if (isUndefined(value.getData())) { return true; }
        return false;
    }

    

    //..........................................
    //#region ADDITIONAL ARRAY-SPECIFIC FUNCTIONS
    
    public add(element: T) {
        this._innerSet({
            key: this._innerModel.length, 
            value: element
        })
        return true;
    }

    //#endregion
    //..........................................

}