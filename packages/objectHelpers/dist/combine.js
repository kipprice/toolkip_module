"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const manipulate_1 = require("./manipulate");
const toolkip_shared_types_1 = require("@kipprice/toolkip-shared-types");
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
function combineObjects(objA, objB, deep) {
    let ret;
    let tmp;
    let loopThru;
    ret = objA || {};
    // Write the array copies for B
    if (objB) {
        _loopThru(objB, ret, deep);
    }
    // Return the appropriate output array
    return ret;
}
exports.combineObjects = combineObjects;
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
function _loopThru(objToCombine, outputObj, deep) {
    if (!objToCombine) {
        return outputObj;
    }
    if (objToCombine.__proto__) {
        outputObj.__proto__ = Object.create(objToCombine.__proto__);
    }
    // Loop thru each key in the array
    manipulate_1.map(objToCombine, (value, key) => {
        // skip any values that aren't set
        if (toolkip_shared_types_1.isNullOrUndefined(value)) {
            return;
        }
        // If doing a deep copy, make sure we recurse
        if (deep && (typeof (value) === "object")) {
            let tmp = outputObj[key];
            // if there's nothing to merge, just take the existing object
            if (!tmp) {
                outputObj[key] = value;
                return;
            }
            tmp = combineObjects(tmp, value, deep);
            outputObj[key] = tmp;
            // Otherwise copy directly
        }
        else {
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
function reconcileOptions(options, defaults) {
    let key;
    let opt;
    if (!options) {
        options = {};
    }
    ;
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
exports.reconcileOptions = reconcileOptions;
