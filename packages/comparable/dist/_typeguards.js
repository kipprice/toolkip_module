"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toolkip_shared_types_1 = require("@kipprice/toolkip-shared-types");
/**
 * isEquatable
 * ----------------------------------------------------------------------------
 * determine if the specified object can be categorized as equatable
 */
function isEquatable(obj) {
    if (toolkip_shared_types_1.isNullOrUndefined(obj)) {
        return false;
    }
    if (obj.equals) {
        return true;
    }
    return false;
}
exports.isEquatable = isEquatable;
/**
 * isComparable
 * ----------------------------------------------------------------------------
 * determine if the specified object can be categorized as comparable
 */
function isComparable(obj) {
    if (toolkip_shared_types_1.isNullOrUndefined(obj)) {
        return false;
    }
    let comp = obj;
    if (comp.lessThan && comp.greaterThan && comp.equals) {
        return true;
    }
    return false;
}
exports.isComparable = isComparable;
