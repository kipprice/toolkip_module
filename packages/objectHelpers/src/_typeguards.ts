import { ICloneable } from "./_interfaces";
import { isFunction } from "@toolkip/shared-types";

export function isCloneable<T> (test: any): test is ICloneable<T> {
    if (isFunction(test.clone)) { return true; }
    return false;
}