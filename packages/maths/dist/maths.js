"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * _normalizeValue
 * ----------------------------------------------------------------------------
 * make sure a value is not past the relevant extrema
 *
 * @param	val		The value to normalize
 * @param	min     The minimum this value can be
 * @param   max     The maximum this value can be
 *
 * @returns The normalized value
 *
 */
function normalizeValue(val, min, max) {
    if (val < min) {
        val = min;
    }
    if (val > max) {
        val = max;
    }
    return val;
}
exports.normalizeValue = normalizeValue;
/**
 * boundedRandomNumber
 * ----------------------------------------------------------------------------
 * Find a random number between two values
 *
 * @param   max             The maximum value accepted
 * @param   min             The minimun value accepted. Defaults to 0
 * @param   isExclusive     True if we should not include the max/min values
 *
 * @returns A random number fitting these parameters
 *
 */
function boundedRandomNumber(max, min, isExclusive) {
    if (!min) {
        min = 0;
    }
    // make sure we can handle the inclusivity
    if (isExclusive) {
        min += 1;
    }
    else {
        max += 1;
    }
    return min + (Math.floor(Math.random() * (max - min)));
}
exports.boundedRandomNumber = boundedRandomNumber;
/**
 * roundToPlace
 * ----------------------------------------------------------------------------
 * Helper function to round a number to a particular place
 *
 * @param   num     The number to round
 * @param   place   A multiple of 10 that indicates the decimal place to round
 *                  to. I.e., passing in 100 would round to the hundredths
 *                  place
 *
 * @returns The rounded number
 *
 */
function roundToPlace(num, place) {
    return (Math.round(num * place) / place);
}
exports.roundToPlace = roundToPlace;
;
