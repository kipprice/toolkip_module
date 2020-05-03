"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
/**
 * clientRectToShape
 * --------------------------------------------------------------------------
 * Converts a Client Rect to a basic shape
 *
 * @param 	rect 	The rectangle to convert
 *
 * @returns The array of points that make up this shape
 */
function clientRectToShape(rect) {
    let out;
    out = new Array();
    // Top-left corner
    out[0] = {
        x: rect.left,
        y: rect.top
    };
    // Top-right corner
    out[1] = {
        x: rect.left + rect.width,
        y: rect.top
    };
    // Bottom-right corner
    out[2] = {
        x: rect.left + rect.width,
        y: rect.top + rect.height
    };
    // Bottom-left corner
    out[3] = {
        x: rect.left,
        y: rect.top + rect.height
    };
    return out;
}
exports.clientRectToShape = clientRectToShape;
/**
 * svgRectToShape
 * --------------------------------------------------------------------------
 * Converts a SVG Rect to a basic shape
 *
 * @param 	rect 	The rectangle to convert
 *
 * @returns The array of points that make up this shape
 */
function svgRectToShape(rect) {
    let out;
    out = new Array();
    // Top-left corner
    out[0] = {
        x: rect.x,
        y: rect.y
    };
    // Top-right corner
    out[1] = {
        x: rect.x + rect.width,
        y: rect.y
    };
    // Bottom-right corner
    out[2] = {
        x: rect.x + rect.width,
        y: rect.y + rect.height
    };
    // Bottom-left corner
    out[3] = {
        x: rect.x,
        y: rect.y + rect.height
    };
    return out;
}
exports.svgRectToShape = svgRectToShape;
/**
 * svgRectToBasicRect
 * --------------------------------------------------------------------------
 * Convert a SVG rectangle to a basic rectangle
 *
 * @param 	rect 	The rectangle to convert
 *
 * @returns The resulting IBasicRect representation of the passed in rect
 */
function svgRectToBasicRect(rect) {
    let out;
    out = {
        x: rect.x,
        y: rect.y,
        w: rect.width,
        h: rect.height
    };
    return out;
}
exports.svgRectToBasicRect = svgRectToBasicRect;
;
/**
 * clientRectToBasicRect
 * --------------------------------------------------------------------------
 * Convert a client rectangle to a basic rectangle
 *
 * @param 	rect 	The rectangle to convert
 *
 * @returns The resulting IBasicRect representation of the passed in rect
 */
function clientRectToBasicRect(rect) {
    let out;
    out = {
        x: rect.left + window.scrollX,
        y: rect.top + window.scrollY,
        w: rect.width,
        h: rect.height
    };
    return out;
}
exports.clientRectToBasicRect = clientRectToBasicRect;
/**
 * toBasicRect
 * --------------------------------------------------------------------------
 * Converts any supported rectangle to a basic rectangle
 *
 * @param 	rect 	The rectangle to convert
 *
 * @returns The basic rect version of this client / svg rect
 */
function toBasicRect(rect) {
    let r;
    if (_1.isIBasicRect(rect)) {
        r = rect;
    }
    else if (_1.isClientRect(rect)) {
        r = clientRectToBasicRect(rect);
    }
    else if (_1.isSVGRect(rect)) {
        r = svgRectToBasicRect(rect);
    }
    return r;
}
exports.toBasicRect = toBasicRect;
;
