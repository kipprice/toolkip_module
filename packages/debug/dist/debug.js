"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toolkip_object_helpers_1 = require("@kipprice/toolkip-object-helpers");
exports.IS_DEBUG = false;
/**
 * printObject
 * ----------------------------------------------------------------------------
 * print out a string representation of the object
 */
function printObject(obj) {
    let str = getObjectString(obj);
    console.log(str);
}
exports.printObject = printObject;
/**
 * getObjectString
 * ----------------------------------------------------------------------------
 * build a formatted string for any arbitrary object
 * @param   obj         The object to print
 * @param   prefix      The current prefix to use for this layer
 * @returns The created string
 */
function getObjectString(obj, prefix, isHtml) {
    if (!prefix) {
        prefix = "";
    }
    if ((typeof obj === "string") ||
        (typeof obj === "number") ||
        (typeof obj === "boolean") ||
        (obj instanceof Date) ||
        (obj instanceof Function)) {
        return obj.toString();
    }
    let newLine = isHtml ? "<br>" : "\n";
    let tab = isHtml ? "&nbsp;&nbsp;&nbsp;&nbsp;" : "\t";
    let outputStr = "";
    outputStr += "{";
    toolkip_object_helpers_1.map(obj, (elem, key) => {
        outputStr += newLine + tab + prefix + key + " : " + getObjectString(elem, prefix + tab, isHtml);
    });
    outputStr += newLine + prefix + "}\n";
    return outputStr;
}
exports.getObjectString = getObjectString;
/**
 * printCallStack
 * ----------------------------------------------------------------------------
 * Print out the current callstack
 */
function printCallStack() {
    console.log(new Error().stack);
}
exports.printCallStack = printCallStack;
/**
 * debugPoint
 * --------------------------------------------------------------------------
 * Print the coordinates contained in a point
 * @param point 	the point to print for debugging
 */
function debugPoint(point) {
    if (!point.z) {
        console.log("2D POINT: (" + point.x + ", " + point.y + ")");
    }
    else {
        console.log("3D POINT: (" + point.x + ", " + point.y + ", " + point.z + ")");
    }
}
exports.debugPoint = debugPoint;
