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
export declare function normalizeValue(val: number, min?: number, max?: number): number;
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
export declare function boundedRandomNumber(max: number, min?: number, isExclusive?: boolean): number;
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
export declare function roundToPlace(num: number, place: number): number;
