"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**----------------------------------------------------------------------------
 * @class	BucketHelper
 * ----------------------------------------------------------------------------
 * handle bucketing elements into a dictionary
 * @author	Kip Price
 * @version	1.0.0
 * ----------------------------------------------------------------------------
 */
class _BucketHelper {
    bucket(things, getBucket, ...addlParams) {
        let out = {};
        if (!things) {
            return out;
        }
        for (let t of things) {
            let bucket = getBucket(t, ...addlParams);
            if (!out[bucket]) {
                out[bucket] = [];
            }
            out[bucket].push(t);
        }
        return out;
    }
}
exports.BucketHelper = new _BucketHelper();
function bucket(things, getBucket, ...addlParams) {
    return exports.BucketHelper.bucket(things, getBucket, ...addlParams);
}
exports.bucket = bucket;
//#endregion
//..........................................
