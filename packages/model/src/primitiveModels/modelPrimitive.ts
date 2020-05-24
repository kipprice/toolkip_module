import { Primitive } from '@toolkip/shared-types';
import { _Model } from '../abstractClasses/_model';

export class MPrimitive<T extends Primitive> extends _Model<T> {
    protected _getDefaultValues(): T {
        return undefined;
    }
}