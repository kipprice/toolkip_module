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
export declare function padToDigits(toPad: number, numberOfDigits: number): string;
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
export declare function fullHexString(val: number, length: number): string;
