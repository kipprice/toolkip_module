"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
function map(object, callback, shouldQuit) {
    let out = [];
    if (!object) {
        return out;
    }
    // Use the default map function if available
    if (object.map) {
        let done;
        object.map((value, key, arr) => {
            if (done) {
                return;
            }
            let result = callback(value, key, arr);
            out.push(result);
            // if we have a quit condition, test it & quit if appropriate
            if (!shouldQuit) {
                return;
            }
            if (shouldQuit()) {
                done = true;
            }
        });
        // Otherwise, do a standard object map
    }
    else {
        let cnt = 0;
        let key;
        // Do it safely with the appropriate checks
        for (key in object) {
            if (object.hasOwnProperty(key)) {
                let result = callback(object[key], key, cnt);
                if (result) {
                    out.push(result);
                }
                cnt += 1;
                // if we have a quit condition, test it & quit if appropriate
                if (!shouldQuit) {
                    continue;
                }
                if (shouldQuit()) {
                    break;
                }
            }
        }
    }
    return out;
}
exports.map = map;
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
function getNextKey(object, lastKey) {
    let propName;
    let nextKey = (!lastKey);
    for (propName in object) {
        if (object.hasOwnProperty(propName)) {
            if (nextKey) {
                return propName;
            }
            else if (propName === lastKey) {
                nextKey = true;
            }
        }
    }
    return "";
}
exports.getNextKey = getNextKey;
/**
 * getKeys
 * ----------------------------------------------------------------------------
 * return the keys associated with the specified object; wrapper around
 * Object.keys, but also filters out keys that aren't
 */
function getKeys(object) {
    let keys = Object.keys(object) || [];
    // remove any keys that don't belong directly to this objects
    for (let i = keys.length - 1; i >= 0; i -= 1) {
        let key = keys[i];
        if (!object.hasOwnProperty(key)) {
            keys.splice(i, 1);
        }
    }
    return keys;
}
exports.getKeys = getKeys;
/**
 * keyCount
 * ----------------------------------------------------------------------------
 * determine the number of unique keys on the specified object
 */
function keyCount(object) {
    return getKeys(object).length;
}
exports.keyCount = keyCount;
/**
 * isEmptyObject
 * ----------------------------------------------------------------------------
 * Checks if the specified object doesn't have any keys
 * @returns True if no unique keys are on this object
 */
function isEmptyObject(object) {
    return (!getNextKey(object));
}
exports.isEmptyObject = isEmptyObject;
/**
 * setDictValue
 * ----------------------------------------------------------------------------
 * set a value within a dictionary, by specifying a set of keys that should be
 * initialized to get to the value
 */
function setDictValue(object, val, keys) {
    if (!object) {
        object = {};
    }
    let curObj = object;
    for (let i = 0; i < keys.length; i += 1) {
        let k = keys[i];
        let initVal = {};
        if (i === (keys.length - 1)) {
            initVal = val;
        }
        if (!curObj[k]) {
            curObj[k] = initVal;
        }
        curObj = curObj[k];
    }
    return object;
}
exports.setDictValue = setDictValue;
function getPrototype(obj) {
    if (obj.prototype) {
        return obj.prototype;
    }
    if (obj.__proto__) {
        return obj.__proto__;
    }
    return null;
}
exports.getPrototype = getPrototype;
