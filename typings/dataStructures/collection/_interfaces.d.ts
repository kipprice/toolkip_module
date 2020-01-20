/**
 * CollectionTypeEnum
 * ----------------------------------------------------------------------------
 * Keeps track of the different ways we can add to a collection
 */
export declare enum CollectionTypeEnum {
    ReplaceDuplicateKeys = 1,
    IgnoreDuplicateKeys = 2
}
/**
 * CollectionSortFunction
 * ----------------------------------------------------------------------------
 * Sort a collection, same as one would sort an array
 *
 * @param	a	The first element to compare
 * @param	b	The second element to compare
 *
 * @returns	-1 if the elements are in the wrong order, 1 if they are in the correct order, 0 if they are the same
 */
export interface CollectionSortFunction<T> {
    (a: ICollectionElement<T>, b: ICollectionElement<T>): number;
}
/**
 * SortFunction
 * ----------------------------------------------------------------------------
 * General sort function for comparing two elements of any type
 *
 * @param	a	The first element to compare
 * @param	b	The second element to compare
 *
 * @returns	-1 if the elements are in the wrong order, 1 if they are in the correct order, 0 if they are the same
 */
export interface SortFunction<T> {
    (a: T, b: T): number;
}
/**
 * ICollectionElement
 * ----------------------------------------------------------------------------
 * The class that stores data within a collection
 */
export interface ICollectionElement<T> {
    /** the key this element is stored under */
    key: string;
    /** the actual value for the element */
    value: T;
    /** where the element sits in the sorted index */
    sortedIdx: number;
    /** where the element was originally added */
    origIdx: number;
}
/**
 * IDisctionaryKeys
 * ----------------------------------------------------------------------------
 * The array that provides the key index within a collection
 */
export interface IDictionaryKeys<T> {
    [key: string]: ICollectionElement<T>;
}
