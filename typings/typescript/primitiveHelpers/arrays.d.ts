import { IEqualityFunction } from '../comparable/comparable';
/**
 * contains
 * ----------------------------------------------------------------------------
 * Determine whether a particular element is contained in an array
 * @param 	arr		The array to check
 * @param 	value 	The value to check for
 *
 * @returns	True if the value is contained in the array
 */
export declare function contains<T>(arr: T[], value: T, equalityFunction?: IEqualityFunction<T>): boolean;
/**
 * indexOf
 * ----------------------------------------------------------------------------
 * Find the index of a particular value in the array
 * @param	arr		The array to search
 * @param	value	The value to look for
 *
 * @returns	The first index of the value in the array or -1 if it doesn't exist
 */
export declare function indexOf<T>(arr: T[], value: T, equalityFunction?: IEqualityFunction<T>): number;
/**
* removeElemFromArr
* ----------------------------------------------------------------------------
* Finds & removes an element from the array if it exists.
* @param   arr     The array to remove from
* @param   elem    The element to remove
* @param   equal   The function that is used to test for equality
*
* @returns The updated array
*/
export declare function removeElemFromArr<T>(arr: T[], elem: T, equal?: Function): T[];
