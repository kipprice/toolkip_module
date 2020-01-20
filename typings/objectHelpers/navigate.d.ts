import { IMapFunction, IQuitConditionFunction } from "./_interfaces";
/**
 * map
 * ----------------------------------------------------------------------------
 * Loop through all keys in an object or array and perform an action on each
 * element. Similar to Array.map.
 *
 * @param   object      The object to loop through
 * @param   callback    What to do with each element
 * @param   shouldQuit  Function to evaluate whether we are done looping
 */
export declare function map<T = any>(object: any, callback: IMapFunction<any, T>, shouldQuit?: IQuitConditionFunction): T[];
/**
 * getNextKey
 * ----------------------------------------------------------------------------
 * Grab the next keyed element in an object. This is terribly un-performant in
 * all but the first key case.
 *
 * @param   object    The object to get the key from
 * @param   lastKey   If provided, the key before the key we're looking for
 *
 * @returns The next key for this element
 */
export declare function getNextKey(object: any, lastKey?: string): string;
/**
 * getKeys
 * ----------------------------------------------------------------------------
 * return the keys associated with the specified object; wrapper around
 * Object.keys, but also filters out keys that aren't
 */
export declare function getKeys<T, K extends keyof T>(object: T): K[];
/**
 * keyCount
 * ----------------------------------------------------------------------------
 * determine the number of unique keys on the specified object
 */
export declare function keyCount(object: any): number;
/**
 * isEmptyObject
 * ----------------------------------------------------------------------------
 * Checks if the specified object doesn't have any keys
 * @returns True if no unique keys are on this object
 */
export declare function isEmptyObject(object: any): boolean;
