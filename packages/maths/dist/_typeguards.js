"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toolkip_shared_types_1 = require("@kipprice/toolkip-shared-types");
/**
 * isExtrema
 * ----------------------------------------------------------------------------
 * check if the element is an IExtrema implementation
 */
function isIExtrema(test) {
    let extrema = {
        min: { x: 0, y: 0 },
        max: { x: 0, y: 0 }
    };
    return toolkip_shared_types_1.isInterface(test, extrema);
}
exports.isIExtrema = isIExtrema;
/** check if the element is a client rectangle */
function isClientRect(test) {
    let rect = {
        top: 1,
        bottom: 1,
        left: 1,
        right: 1,
        height: 1,
        width: 1,
    };
    if (toolkip_shared_types_1.isInterface(test, rect)) {
        return true;
    }
    return false;
}
exports.isClientRect = isClientRect;
;
/** check if the element is a SVG rectangle */
function isSVGRect(test) {
    let rect = {
        x: 1,
        y: 1,
        width: 1,
        height: 1
    };
    if (toolkip_shared_types_1.isInterface(test, rect)) {
        return true;
    }
    return false;
}
exports.isSVGRect = isSVGRect;
/** check if the element is a basic rectangle */
function isIBasicRect(test) {
    let rect = {
        x: 1,
        y: 1,
        w: 1,
        h: 1
    };
    if (toolkip_shared_types_1.isInterface(test, rect)) {
        return true;
    }
    return false;
}
exports.isIBasicRect = isIBasicRect;
function isIPoint(test) {
    let pt = {
        x: 1,
        y: 1,
        z: 0
    };
    return toolkip_shared_types_1.isInterface(test, pt);
}
exports.isIPoint = isIPoint;
