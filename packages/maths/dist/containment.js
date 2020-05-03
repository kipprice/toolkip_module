"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
/**
 * isWithin
 * --------------------------------------------------------------------------
 * Checks whether a value is within a max/min range
 *
 * @param 	val           	The value to check for inclusion
 * @param 	min           	The max value
 * @param 	max           	The min value
 * @param 	non_inclusive 	True if we shouldn't include the end points
 *
 * @returns True if the value is contained in the range
 */
function isWithin(val, min, max, non_inclusive) {
    ;
    if (non_inclusive)
        return (val < max && val > min);
    return (val <= max && val >= min);
}
exports.isWithin = isWithin;
/**
 * isPointContained
 * --------------------------------------------------------------------------
 * Determines whether a point is contained within a particular rectangle
 *
 * @param 	pt 		The point to check for containment
 * @param 	rect 	The rectangle to check
 *
 * @returns True if the point is contained in the rectangle
 */
function isPointContained(pt, rect) {
    ;
    let r = _1.toBasicRect(rect);
    if (pt.x < r.x) {
        return false;
    }
    if (pt.x > (r.x + r.w)) {
        return false;
    }
    if (pt.y < r.y) {
        return false;
    }
    if (pt.y > r.y + r.h) {
        return false;
    }
    return true;
}
exports.isPointContained = isPointContained;
/**
 * isRectContained
 * ----------------------------------------------------------------------------
 * Checks whether a client rect is entirely contained within another
 *
 * @param 	rect      	The element to check for containement
 * @param 	container 	The element to check if the rect is contained within
 *
 * @returns True if rect is completely contained by container
 */
function isRectContained(rect, container) {
    let r;
    let c;
    // Convert the first rect to a basic rect
    r = _1.toBasicRect(rect);
    // Convert the second rect to a basic rect
    c = _1.toBasicRect(container);
    // Too far left
    if (r.x < c.x)
        return false;
    // Too far right
    if ((r.x + r.w) > (c.w + c.x))
        return false;
    // Too far up
    if (r.y < c.y)
        return false;
    // Too far down
    if ((r.y + r.h) > (c.h + c.y))
        return false;
    // Just right
    return true;
}
exports.isRectContained = isRectContained;
/**
 * isElementContained
 *------------------------------------------------------------------------------
    * Checks if an element is completely contained by another element
    *
    * @param 	elem      	The element to check for containment
    * @param 	container 	The element to check if it contains the other elem
    *
    * @returns True if the element is completely contained
    */
function isElementContained(elem, container) {
    let rect = elem.getBoundingClientRect();
    let bounds = elem.getBoundingClientRect();
    return isRectContained(rect, bounds);
}
exports.isElementContained = isElementContained;
;
/**
 * isShapeContained
 * --------------------------------------------------------------------------
 * Checks if a given shape is contained within a given bounding box
 *
 * @param 	shape 	The collection of points to check
 * @param 	bounds 	The bounding box to be within
 *
 * @returns True if the shape is completely contained in the bounding box
 */
function isShapeContained(shape, bounds) {
    let pt;
    for (pt of shape) {
        if (!isPointContained(pt, bounds)) {
            return false;
        }
    }
    return true;
}
exports.isShapeContained = isShapeContained;
