import { ICloneable } from "./_interfaces";
import { isFunction, isObject, isArray } from "@toolkip/shared-types";
import { getNextKey } from './manipulate';

export function isCloneable<T> (test: any): test is ICloneable<T> {
    if (isFunction(test.clone)) { return true; }
    return false;
}

export function isMappable(test: any): boolean {
    if (isArray(test)) { return true; }
    if (isObject(test)) { return true; }
    return false;
}

/**
 * isEmptyObject
 * ----------------------------------------------------------------------------
 * Checks if the specified object doesn't have any keys
 * @returns True if no unique keys are on this object
 */
export function isEmptyObject(object: any): boolean {
    if (!isObject(object)) { return false; }
    return (!getNextKey(object));
}

export function isEmptyArray(object: any): boolean {
    if (!isArray(object)) { return false; }
    if (object.length > 0) { return false; }
    return true;
}
