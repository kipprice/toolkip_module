
/**
 * IComparable
 * ----------------------------------------------------------------------------
 * Interface for objects that can be compared to like objects
 */
export interface IComparable extends IEquatable {

	/**
	 * lessThan
	 * ----------------------------------------------------------------------------
	 * Determines if this element is lesser than the other passed in
	 * 
	 * @param	other	The element to compare to
	 * 
	 * @returns	True if this object should be considered lesser
	 */
	lessThan(other: IComparable): boolean;

	/**
	 * greaterThan
	 * ----------------------------------------------------------------------------
	 * Determines if this element is greater than the other passed in
	 * 
	 * @param	other	The element to compare to
	 * 
	 * @returns	True if this object should be considered greater
	 */
	greaterThan(other: IComparable): boolean;
}

/**
 * IEquatable
 * ----------------------------------------------------------------------------
 * Interface for objects that can be equal to one another
 */
export interface IEquatable {

	/**
	 * equals
	 * ----------------------------------------------------------------------------
	 * Determines whether this element is equal to the other passed in
	 * 
	 * @param	other	The element to compare to
	 * 
	 * @returns	True if the objects should be considered the same
	 */
	equals(other: IEquatable): boolean;
}

export interface IEqualityFunction<T> {

	/**
	 * IEqualityFunction<T>
	 * ----------------------------------------------------------------------------
	 * Given two values of T, determine whether they are equivalent
	 * @param	a	The first value to compare
	 * @param	b	The second value to compare
	 * 
	 * @returns	True if the two values are equivalent, false otherwise
	 */
	(a: T, b: T): boolean;
}


export type Equatable = IEquatable | string | number | boolean;

export enum SortOrderEnum {
    INCORRECT_ORDER = 1,
    SAME = 0,
    CORRECT_ORDER = -1
}