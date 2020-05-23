import { _Model } from "../abstractClasses/_model";
import { IModel } from './_interfaces';
import { IdentifiableModel } from '../objectModels/identifiableModel';

export const isModel = (test: any): test is IModel<any> => {
    if (test instanceof _Model) { return true; }
    return false;
}

export function isIdentifiableModel(model: _Model<any>): model is IdentifiableModel<any> {
    if (!model) { return false; }
    if (!(model as any).id) { return false; }
    return true;
}