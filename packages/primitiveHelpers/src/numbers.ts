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
export function padToDigits(toPad: number, numberOfDigits: number): string {
    let outArr = toPad.toString().split("");

    while (outArr.length < numberOfDigits) {
        outArr.splice(0, 0, "0");
    }

    return outArr.join("")

}

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
export function fullHexString(val: number, length: number): string {
    ;
    let outHexString: string;
    let i: number;

    length = length || 0;

    outHexString = val.toString(16);

    if (outHexString.length < length) {
        for (i = 0; i < (length - outHexString.length); i += 1) {
            outHexString = "0" + outHexString;
        }
    }

    return outHexString;
}
