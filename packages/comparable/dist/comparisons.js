"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _typeguards_1 = require("./_typeguards");
/**
 * equals
 * ----------------------------------------------------------------------------
 * Determines if two elements of the same type can be considered equal
 *
 * @param   orig        The first elem to examine
 * @param   comparison  The second elem to examine
 *
 * True if the two elements can be considered equal
 */
function equals(orig, comparison) {
    // Handle the equatable case
    if (_typeguards_1.isEquatable(orig)) {
        return orig.equals(comparison);
    }
    // otherwise directly compare the values
    return (orig === comparison);
}
exports.equals = equals;
/**
 * lesserThan
 * ----------------------------------------------------------------------------
 * @param 	orig 		The element to check for being less than the other
 * @param 	comparison 	The element to check for being greater than the other
 *
 * @returns True if the first element is lesser than the second
 */
function lesserThan(orig, comparison) {
    if (_typeguards_1.isComparable(orig)) {
        return orig.lesserThan(comparison);
    }
    return (orig < comparison);
}
exports.lesserThan = lesserThan;
/**
 * greatherThan
 * ----------------------------------------------------------------------------
 * @param 	orig 		The element to check for being greater than the other
 * @param 	comparison 	The element to check for being lesser than the other
 *
 * @returns True if the first element is greater than the second
 */
function greaterThan(orig, comparison) {
    if (_typeguards_1.isComparable(orig)) {
        return orig.greaterThan(comparison);
    }
    return (orig > comparison);
}
exports.greaterThan = greaterThan;
