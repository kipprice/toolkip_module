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
export declare function equals<T>(orig: T, comparison: T): boolean;
/**
 * lesserThan
 * ----------------------------------------------------------------------------
 * @param 	orig 		The element to check for being less than the other
 * @param 	comparison 	The element to check for being greater than the other
 *
 * @returns True if the first element is lesser than the second
 */
export declare function lesserThan<T>(orig: T, comparison: T): boolean;
/**
 * greatherThan
 * ----------------------------------------------------------------------------
 * @param 	orig 		The element to check for being greater than the other
 * @param 	comparison 	The element to check for being lesser than the other
 *
 * @returns True if the first element is greater than the second
 */
export declare function greaterThan<T>(orig: T, comparison: T): boolean;
export declare type Equatable = IEquatable | string | number | boolean;
/**
 * isEquatable
 * ----------------------------------------------------------------------------
 * determine if the specified object can be categorized as equatable
 */
export declare function isEquatable(obj: any): obj is IEquatable;
/**
 * isComparable
 * ----------------------------------------------------------------------------
 * determine if the specified object can be categorized as comparable
 */
export declare function isComparable(obj: any): obj is IComparable;
