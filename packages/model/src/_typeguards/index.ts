import { _Model } from "../abstractClasses/_model";
import { IModel } from '../_shared/_interfaces';
import { MIdentifiable } from '../objectModels/identifiableModel';

export const isModel = (test: any): test is IModel<any> => {
    if (test instanceof _Model) { return true; }
    return false;
}

export function isIdentifiableModel(model: _Model<any>): model is MIdentifiable<any> {
    if (model instanceof MIdentifiable) { return true; }
    return false;
}