import { map } from './manipulate';
import { IDictionary } from './_interfaces';

/**
 * dictionaryToArray
 * ----------------------------------------------------------------------------
 * helper to transform data in a dictionary (key-value) format into an array
 * format
 */
export const dictionaryToArray = <T>(dict: IDictionary<T> = {}): T[] => {
    const out = [];
    map(dict, (val) => {
        out.push(val);
    });
    return out;
}

/**
 * arrayToMap
 * ----------------------------------------------------------------------------
 * helper to transform data in an array into a Map, with each value serving
 * as both the key and the data
 */
export const arrayToMap = <T>(array: T[] = []): Map<T, boolean> => {
    const out = new Map<T, boolean>();
    
    for (let val of array) {
        out.set(val, true);
    }

    return out;
}

/**
 * arrayToDictionary
 * ----------------------------------------------------------------------------
 * helper to transform an array into a dictionary (key-value) format. Requires
 * the caller to define how to retrieve a key value from each element in order
 * to index appropriately.
 */
export const arrayToDictionary = <T>(array: T[] = [], keyFunc: (elem: T) => string) => {
    const out = {};
    if (!keyFunc) { return null; }

    for (let val of array) {
        const key = keyFunc(val);
        out[key] = val;
    }

    return out;
}

/**
 * identifiableArrayToDictionary
 * ----------------------------------------------------------------------------
 * additional helper for identifiable elements that automatically retrieves 
 * their identifier as the key to use as the dictionary key
 */
export const identifiableArrayToDictionary = <T extends { id: string }>(array: T[] = []) => {
    return arrayToDictionary(array, (elem: T) => elem.id);
}