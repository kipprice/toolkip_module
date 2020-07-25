
import { _Model } from '../abstractClasses/_model';
import { isModel } from '../_typeguards/core';
import { IArrayModel, IKeyedModel, IBasicModel } from '../_shared';
import { MManager } from '../arrayModels';

export class Model<T = any> extends _Model<T> {

    protected _getDefaultValues(): T { return undefined; }

    public setData(data: T): void {
        const newValue = this._wrapInModel(data, this._transforms);
        this._innerSetData({ value: newValue as any as T });
    }

    public getData() {
        const clonedModel = this._innerGetData();
        return isModel(clonedModel) ? clonedModel.getData() : clonedModel ;
    }

    public getModel(asType?: 'o'): IKeyedModel<T, any, any>;
    public getModel(asType: 'b'): IBasicModel<T>;
    public getModel(asType: 'a'): IArrayModel<any, any, T>;
    public getModel(asType: 'm'): MManager<any>;
    public getModel(asType: 'a' | 'o' | 'b' | 'm' = 'o') {
        if (!isModel(this._innerModel)) { return undefined; }
        return this._innerModel as any;
    }
}