import { _Model } from "../abstractClasses/_model";
import { MIdentifiable } from '../objectModels/identifiableModel';
import { MObject } from '../objectModels';
import { MPrimitive, MDate } from '../primitiveModels';
import { Primitive } from '@toolkip/shared-types';
import { MArray, MManager } from '../arrayModels';
import { IIdentifiable } from '@toolkip/identifiable';

export const isPrimitiveModel = <T extends Primitive = Primitive>(test: any): test is MPrimitive<T> => {
    if (test instanceof MPrimitive) { return true; }
    return false
}

export const isDateModel = (test: any): test is MDate => {
    if (test instanceof MDate) { return true; }
    return false; 
}

export const isObjectModel = <T>(test: any): test is MObject<T> => {
    if (test instanceof MObject) { return true; }
    return false;
}

export const isArrayModel = <T>(test: any): test is MArray<T> => {
    if (test instanceof MArray) { return true; }
    return false; 
}

export const isManagerModel = <T extends IIdentifiable>(test: any): test is MManager<T> => {
    if (test instanceof MManager) { return true; }
    return false;
}

export function isIdentifiableModel(model: any): model is MIdentifiable<any> {
    if (model instanceof MIdentifiable) { return true; }
    return false;
}