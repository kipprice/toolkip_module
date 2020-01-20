import { INumericDictionary, IDictionary } from "../objectHelpers/_interfaces";
/**----------------------------------------------------------------------------
 * @class	BucketHelper
 * ----------------------------------------------------------------------------
 * handle bucketing elements into a dictionary
 * @author	Kip Price
 * @version	1.0.0
 * ----------------------------------------------------------------------------
 */
declare class _BucketHelper {
    /**
     * bucket
     * ----------------------------------------------------------------------------
     * helper to run bucket sort on a set of objects
     *
     * @param   things      The items to bucket sort
     * @param   getBucket   The function that determines what bucket an item falls into
     * @param   addlParams  Allow for any other details that might change the bucket
     *
     * @returns A dictionary of items, based on the bucketing specified
     */
    bucket<T>(things: T[], getBucket: IBucketFunc<T, number>, ...addlParams: any[]): INumericDictionary<T>;
    bucket<T>(things: T[], getBucket: IBucketFunc<T, string>, ...addlParams: any[]): IDictionary<T>;
}
export declare const BucketHelper: _BucketHelper;
export interface IBucketFunc<T, O extends string | number> {
    (thing: T, ...addlParams: any[]): O;
}
export {};
