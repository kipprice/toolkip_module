import Model from '../structs/models/_model';
import IdentifiableModel from './identifiableModel';

export function isIdentifiableModel(model: Model<any>): model is IdentifiableModel {
    if (!model) { return false; }
    if (!(model as any).id) { return false; }
    return true;
}