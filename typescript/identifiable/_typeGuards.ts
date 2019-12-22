import Model from './_model';
import IdentifiableModel from '../identifiable/identifiableModel';

export function isIdentifiableModel(model: Model<any>): model is IdentifiableModel {
    if (!model) { return false; }
    if (!(model as any).id) { return false; }
    return true;
}