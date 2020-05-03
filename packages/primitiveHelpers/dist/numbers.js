"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * paddToDigits
 * ----------------------------------------------------------------------------
 * pad a number out to the specified number of digits by prepending 0's
 *
 * @param   toPad           The number to add padding to
 * @param   numberOfDigits  How far to pad the number
 *
 * @returns the padded string version of the number
 */
function padToDigits(toPad, numberOfDigits) {
    let outArr = toPad.toString().split("");
    while (outArr.length < numberOfDigits) {
        outArr.splice(0, 0, "0");
    }
    return outArr.join("");
}
exports.padToDigits = padToDigits;
/**
 * fullHexString
 * ----------------------------------------------------------------------------
 * Grabs the hex value for a given number and ensures it is a certain length
 *
 * @param 	val 	The number to convert to Hex
 * @param 	length 	How long the hex string should be
 *
 * @returns The hex value of the passed in number
 *
 */
function fullHexString(val, length) {
    ;
    let outHexString;
    let i;
    length = length || 0;
    outHexString = val.toString(16);
    if (outHexString.length < length) {
        for (i = 0; i < (length - outHexString.length); i += 1) {
            outHexString = "0" + outHexString;
        }
    }
    return outHexString;
}
exports.fullHexString = fullHexString;
