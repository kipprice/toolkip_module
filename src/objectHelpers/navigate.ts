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
export function map<T = any>(object: any, callback: IMapFunction<any, T>, shouldQuit?: IQuitConditionFunction): T[] {
  let out: T[] = [];
  if (!object) { return out; }

  // Use the default map function if available
  if (object.map) {
    let done: boolean;
    object.map((value: any, key: any, arr: any) => {
      if (done) { return; }

      let result = callback(value, key, arr);
      out.push(result);

      // if we have a quit condition, test it & quit if appropriate
      if (!shouldQuit) { return; }
      if (shouldQuit()) { done = true; }
    }
    );

    // Otherwise, do a standard object map
  } else {
    let cnt: number = 0;
    let key: string;

    // Do it safely with the appropriate checks
    for (key in object) {
      if (object.hasOwnProperty(key)) {

        let result = callback(object[key], key, cnt);
        if (result) { out.push(result); }

        cnt += 1;

        // if we have a quit condition, test it & quit if appropriate
        if (!shouldQuit) { continue; }
        if (shouldQuit()) { break; }
      }
    }

  }

  return out;
}

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
export function getNextKey(object: any, lastKey?: string): string {
  let propName: string;
  let nextKey: boolean = (!lastKey);

  for (propName in object) {
    if (object.hasOwnProperty(propName)) {
      if (nextKey) {
        return propName;
      } else if (propName === lastKey) {
        nextKey = true;
      }
    }
  }

  return "";
}

/**
 * getKeys
 * ----------------------------------------------------------------------------
 * return the keys associated with the specified object; wrapper around 
 * Object.keys, but also filters out keys that aren't 
 */
export function getKeys<T, K extends keyof T>(object: T): K[] {
  let keys = Object.keys(object) as K[] || [];

  // remove any keys that don't belong directly to this objects
  for (let i = keys.length - 1; i >= 0 ; i -= 1) {
    let key = keys[i];
    if (!object.hasOwnProperty(key)) {
      keys.splice(i, 1);
    }
  }

  return keys;
}

/**
 * keyCount
 * ----------------------------------------------------------------------------
 * determine the number of unique keys on the specified object
 */
export function keyCount(object: any): number {
  return getKeys(object).length;
}

/**
 * isEmptyObject
 * ----------------------------------------------------------------------------
 * Checks if the specified object doesn't have any keys
 * @returns True if no unique keys are on this object
 */
export function isEmptyObject(object: any): boolean {
  return (!getNextKey(object));
}

/**
 * setDictValue
 * ----------------------------------------------------------------------------
 * set a value within a dictionary, by specifying a set of keys that should be 
 * initialized to get to the value
 */
export function setDictValue(object: any, val: any, keys: string[]) {
  if (!object) { object = {}; }

  let curObj = object;
  for (let i = 0; i < keys.length; i += 1) {
    let k = keys[i];
    let initVal = {};
    if (i === (keys.length - 1)) { initVal = val; }
    
    if (!curObj[k]) { curObj[k] = initVal; }
    curObj = curObj[k];
  }

  return object;
}