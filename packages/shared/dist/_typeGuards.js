"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * isNullOrUndefined
 * ----------------------------------------------------------------------------
 * Determine whether the data passed in has value
 *
 * @param   value   The value to check for null / undefined
 *
 * @returns True if the value is null or undefined
 */
function isNullOrUndefined(value, strCheck) {
    if (value === undefined) {
        return true;
    }
    if (value === null) {
        return true;
    }
    if (strCheck && value === "") {
        return true;
    }
    return false;
}
exports.isNullOrUndefined = isNullOrUndefined;
/**
 * isInterface
 * ----------------------------------------------------------------------------
 * generic function to check if a given object implements a particular interface
 */
function isInterface(test, full_imp) {
    // Loop through all of the properties of the full interface implementation & make sure at least one required elem is populated in the test
    let prop;
    let req_match = true;
    let val;
    for (prop in full_imp) {
        if (full_imp.hasOwnProperty(prop)) {
            val = full_imp[prop];
            if (val && (test[prop] === undefined)) {
                req_match = false;
                break;
            }
        }
    }
    if (!req_match) {
        return false;
    }
    // Now loop through all properties on the test to make sure there aren't extra props
    let has_extra = false;
    for (prop in test) {
        if (test.hasOwnProperty(prop)) {
            if (full_imp[prop] === undefined) {
                has_extra = true;
                break;
            }
        }
    }
    return (!has_extra);
}
exports.isInterface = isInterface;
/**
 * isString
 * ----------------------------------------------------------------------------
 * Check if the element is a string
 */
function isString(test) {
    return (typeof test === "string");
}
exports.isString = isString;
/**
 * isKeyof
 * ----------------------------------------------------------------------------
 * check if a specified value is a keyof of an object type. If used without
 * a reference, just casts a string as type keyof T. If reference is provided
 * validates that this key exists on this type
 */
function isKeyof(test, reference) {
    if (!reference) {
        return isString(test);
    }
    return reference.hasOwnProperty(test);
}
exports.isKeyof = isKeyof;
/**
 * isNumber
 * ----------------------------------------------------------------------------
 * check if the element is a number
 */
function isNumber(test) {
    return (typeof test === "number");
}
exports.isNumber = isNumber;
/** isBoolean
 * ----------------------------------------------------------------------------
 * check if the element is a boolean
 */
function isBoolean(test) {
    return (typeof test === "boolean");
}
exports.isBoolean = isBoolean;
/**
 * isFunction
 * ----------------------------------------------------------------------------
 * check if the element is a function
 */
function isFunction(test) {
    return (typeof test === "function");
}
exports.isFunction = isFunction;
/**
  * isArray
  * ----------------------------------------------------------------------------
  * Check if some data is an array
  * @param   test  The data to check
  * @returns True (with type safety) if the data is an array
  */
function isArray(test) {
    return (test instanceof Array);
}
exports.isArray = isArray;
/**
  * isObject
  * ----------------------------------------------------------------------------
  * Checks if some data is a complex object
  * @param   test  The data to check
  * @returns True (with type safety) if the data is an object
  *
  */
function isObject(test) {
    return (typeof test === typeof {});
}
exports.isObject = isObject;
function isStandardElement(test) {
    if (test instanceof HTMLElement) {
        return true;
    }
    if (test instanceof SVGElement) {
        return true;
    }
    return false;
}
exports.isStandardElement = isStandardElement;
/** check if the element implements the drawable class */
function isDrawable(test) {
    return !!test.draw;
}
exports.isDrawable = isDrawable;
/** check if the element is one that can be used as a drawable base */
function isDrawableElement(test) {
    return (!!(test.appendChild));
}
exports.isDrawableElement = isDrawableElement;
