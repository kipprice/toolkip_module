import { isEquatable, isComparable } from "./_typeguards";

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
export function equals<T>(orig: T, comparison: T): boolean {
	// Handle the equatable case
	if (isEquatable(orig)) {
		return (orig as any).equals(comparison);
	}

	// otherwise directly compare the values
	return (orig === comparison);
}

/**
 * lesserThan
 * ----------------------------------------------------------------------------
 * @param 	orig 		The element to check for being less than the other
 * @param 	comparison 	The element to check for being greater than the other
 * 
 * @returns True if the first element is lesser than the second
 */
export function lesserThan<T>(orig: T, comparison: T): boolean {
	if (isComparable(orig)) {
		return (orig as any).lesserThan(comparison);
	}

	return (orig < comparison);
}

/**
 * greatherThan
 * ----------------------------------------------------------------------------
 * @param 	orig 		The element to check for being greater than the other
 * @param 	comparison 	The element to check for being lesser than the other
 * 
 * @returns True if the first element is greater than the second
 */
export function greaterThan<T>(orig: T, comparison: T): boolean {
	if (isComparable(orig)) {
		return (orig as any).greaterThan(comparison);
	}

	return (orig > comparison);
}