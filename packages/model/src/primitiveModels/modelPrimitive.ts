import { Primitive } from '@toolkip/shared-types';
import { _Model } from '../abstractClasses/_model';
import { IBasicModel } from '../_shared';

export class MPrimitive<T extends Primitive> extends _Model<T> implements IBasicModel<T> {
    protected _getDefaultValues(): T {
        return undefined;
    }
}