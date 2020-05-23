import { Primitive } from '@toolkip/shared-types';
import { _Model } from '../abstractClasses/_model';
import { IModel } from '../_shared/_interfaces';

export class ModelPrimitive<T extends Primitive> extends _Model<T> {
    protected _getDefaultValues(): T {
        return null;
    }
}