import { IModel } from '../_shared/_interfaces';
import { _Model } from '../abstractClasses/_model';

export const isModel = (test: any): test is IModel<any> => {
    if (test instanceof _Model) { return true; }
    return false;
}