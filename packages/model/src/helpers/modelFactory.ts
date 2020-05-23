import { IKeyedModelTransforms, IModel, IKeyedModel, IModelTransforms } from '../_shared/_interfaces';
import { _Model } from '../abstractClasses/_model';
import { isModel } from '../_typeguards';
import { isPrimitive, isArray, isDate, isObject, Primitive } from '@toolkip/shared-types';
import { isIdentifiable, IIdentifiable } from '@toolkip/identifiable';
import { MPrimitive, MDate } from '../primitiveModels';
import { MObject, MIdentifiable } from '../objectModels';
import { MArray, MManager } from '../arrayModels';

/**
 * createModelForData
 * ----------------------------------------------------------------------------
 * generate a new Model based on the type of data that is being passed in; 
 * handles models, primtives, dates, objects, identfiables, arrays, and 
 * managers of data
 * 
 * If an identifiable array is encountered, it will automatically be turned into
 * a manager for easier retrieval of data within the array. Manual passing of 
 * managers is also allowed
 */
export const createModel = <T = any>(data: T | IModel<T>, transforms?: IKeyedModelTransforms<T>): IModel<T> => {
    if (isModel(data))  { return data.clone(transforms); }
    else                { return _createModelForData(data, transforms) }
}

/**
 * _createModelForData
 * ----------------------------------------------------------------------------
 * create the actual model object for each of the types of data we could be 
 * handling. This unfortunately can't cast to Model<T> because of limitations
 * around typescripts generic handling, but it functionally returns Model<T>
 */
const _createModelForData = <T = any>(data: T, transforms?: IKeyedModelTransforms<T>): IModel<any> => {
    if (isPrimitive(data))      { return new MPrimitive(data, transforms); }
    if (isDate(data))           { return new MDate(data, transforms); }
    if (isIdentifiable(data))   { return new MIdentifiable(data, transforms); }
    if (isArray(data))          { return _createArrayModelForData(data, transforms); }
    if (isObject(data))         { return new MObject(data, transforms); }
}

const _createArrayModelForData = <T>(data: T[], transforms?: IKeyedModelTransforms<T[]>): IModel<any> => {
    if (isIdentifiable(data[0])) { return new MManager(data as any as IIdentifiable[], transforms as any); } 
    else { return new MArray(data, transforms); }
}

// once this file is loaded, we should assign the appropriate value to the generic version
// of models
export const setupModelWrapping = () => {
    _Model.createModel = createModel;
}

setupModelWrapping();