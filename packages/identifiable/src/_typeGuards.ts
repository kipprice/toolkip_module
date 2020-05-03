import { _Model }  from '@kipprice/toolkip-model';
import { IdentifiableModel } from './identifiableModel';


export function isIdentifiableModel(model: _Model<any>): model is IdentifiableModel {
    if (!model) { return false; }
    if (!(model as any).id) { return false; }
    return true;
}