"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const combine_1 = require("./combine");
function cloneRect(rect) {
    let out = {
        x: rect.x,
        y: rect.y,
        w: rect.w,
        h: rect.h
    };
    return out;
}
exports.cloneRect = cloneRect;
function clonePoint(point) {
    let out = {
        x: point.x,
        y: point.y
    };
    return out;
}
exports.clonePoint = clonePoint;
function clonePointArray(points) {
    let out = [];
    let pt;
    for (pt of points) {
        let clone = clonePoint(pt);
        out.push(clone);
    }
    return out;
}
exports.clonePointArray = clonePointArray;
/**
 * cloneObject
 * ----------------------------------------------------------------------------
 * Generic function to try to clone any object, using JSON stringify + parse
 * @param 	obj		The object to clone
 *
 * @returns	The cloned elements
 */
function cloneObject(obj) {
    return JSON.parse(JSON.stringify(obj));
}
exports.cloneObject = cloneObject;
function shallowCloneObject(object) {
    return combine_1.combineObjects({}, object);
}
exports.shallowCloneObject = shallowCloneObject;
