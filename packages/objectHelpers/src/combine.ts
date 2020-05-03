import { map } from "./manipulate";
import { IDictionary } from './_interfaces';
import { isNullOrUndefined } from '@kipprice/toolkip-shared";

/**
 * combineObjects
 * ----------------------------------------------------------------------------
 * Take two separate objects and combine them into one
 * 
 * @param   objA    First object to combine
 * @param   objB    Second object to combine; will override A in cases of conflict
 * @param   deep    True if this should be recursive
 * 
 * @returns The combined object
 */
export function combineObjects(objA: any, objB: any, deep?: boolean): any {
    let ret: {};
    let tmp: any;
    let loopThru: Function;
    ret = objA || {};

    // Write the array copies for B
    if (objB) { _loopThru(objB, ret, deep); }

    // Return the appropriate output array
    return ret;
}

/**
 * _loopThru
 * ----------------------------------------------------------------------------
 * Combine an object into an output array
 * 
 * @param   objToCombine  The object to merge into the output
 * @param   outputObj     The object to output
 * @param   deep          True if we should recurse on this object
 * 
 * @returns The merged object
 */
function _loopThru(objToCombine: any, outputObj: any, deep?: boolean): any {

    if (!objToCombine) { return outputObj; }

    if (objToCombine.__proto__) { outputObj.__proto__ = Object.create(objToCombine.__proto__); }

    // Loop thru each key in the array
    map(objToCombine, (value: any, key: string) => {

        // skip any values that aren't set
        if (isNullOrUndefined(value)) {
            return;
        }

        // If doing a deep copy, make sure we recurse
        if (deep && (typeof (value) === "object")) {
            let tmp: any = outputObj[key];

            // if there's nothing to merge, just take the existing object
            if (!tmp) {
                outputObj[key] = value;
                return;
            }

            tmp = combineObjects(tmp, value, deep);
            outputObj[key] = tmp;

            // Otherwise copy directly
        } else {
            outputObj[key] = value;
        }

    });
}

/**
 * reconcileOptions
 * ----------------------------------------------------------------------------
 * Takes in two different option objects & reconciles the options between them
 * 
 * @param   options    The user-defined set of option
 * @param   defaults   The default options
 * 
 * @returns The reconciled option list
 */
export function reconcileOptions<T extends IDictionary<any>>(options: T, defaults: T): T {
    let key: keyof T;
    let opt: string;

    if (!options) { options = ({} as T) };

    for (key in defaults) {
        if (defaults.hasOwnProperty(key)) {

            opt = options[key];
            if ((opt === undefined) || (opt === null)) {
                options[key] = defaults[key];
            }
        }
    }

    return options;
}