import { _Model, _KeyedModel } from '../abstractClasses';
import { map } from '@toolkip/object-helpers';
import { IArrayModel } from '../_shared/_interfaces';

export class MArray<T> extends _KeyedModel<T[], number, T> implements IArrayModel<T, number> {
    protected _map(data: T[], mapFunc: (val: T, key: number) => void) {
        map(data, mapFunc);
    }

    protected _getValue(output: T[], key: number) {
        return (output as any[] as _Model<T>[])[key];
    }

    protected _setValue(output: T[], key: number, value: _Model<T>) {
        output[key] = value as any as T;
    }

    protected _getDefaultValues(): T[] {
        return [];
    }

    //..........................................
    //#region ADDITIONAL ARRAY-SPECIFIC FUNCTIONS
    
    public add(element: T) {
        this._innerSet({
            key: this._innerModel.length, 
            value: element
        })
    }

    public remove(idx: number): T {

        if (idx < 0) { return null; }
        if (idx > this._innerModel.length - 1) { return null; }

        // this approach is kind of janky, but it allows us to not 
        // raise actions for all of the nested elements that may shift
        const updatedArray = this._innerModel.slice();
        const outModel = updatedArray.splice(idx, 1)[0];

        this._innerSetData({
            key: idx,
            value: updatedArray,
            eventChain: {
                key: idx,
                value: undefined,
                oldValue: outModel,
                eventType: 'remove'
            }
        })
    }

    public clear() {
        this._innerSetData({
            value: []
        });
    }
    
    //#endregion
    //..........................................

}