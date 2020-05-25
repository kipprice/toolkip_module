import { ICloneable } from "./_interfaces";
import { isFunction, isObject, isArray } from "@toolkip/shared-types";

export function isCloneable<T> (test: any): test is ICloneable<T> {
    if (isFunction(test.clone)) { return true; }
    return false;
}

export function isMappable(test: any): boolean {
    if (isArray(test)) { return true; }
    if (isObject(test)) { return true; }
    return false;
}