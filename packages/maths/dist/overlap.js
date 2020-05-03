"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rectConversion_1 = require("./rectConversion");
//...........................
//#region OVERLAP FUNCTIONS
/**
 * doElementsOverlap
 * --------------------------------------------------------------------------
 * Checks if two given elements overlap
 *
 * @param 	elem1 	The first element to check
 * @param 	elem2 	The second element to check
 *
 * @returns True if the elements overlap, false otherwise
 */
function doElementsOverlap(elem1, elem2) {
    ;
    let rect1;
    let rect2;
    rect1 = elem1.getBoundingClientRect();
    rect2 = elem2.getBoundingClientRect();
    return doRectsOverlap(rect1, rect2);
}
exports.doElementsOverlap = doElementsOverlap;
;
/**
 * doRectsOverlap
 * --------------------------------------------------------------------------
 * Checks if two rectangles overlap at all
 *
 * @param 	rect1 	The first rectangle to check
 * @param 	rect2 	The second rectangle to check
 *
 * @returns True if there is any overlap between the rectangles
 */
function doRectsOverlap(rect1, rect2) {
    let r1 = rectConversion_1.toBasicRect(rect1);
    let r2 = rectConversion_1.toBasicRect(rect2);
    return false;
}
exports.doRectsOverlap = doRectsOverlap;
/**--------------------------------------------------------------------------
 * doBasicRectsOverlap
 * --------------------------------------------------------------------------
 * detect if two rectangles overlap
 *
 * @param 	rect1	the first rectangle to compare
 * @param 	rect2	the second rectangle to compare
 *
 * @returns true if the two rectangles do overlap
 * --------------------------------------------------------------------------
 */
function doBasicRectsOverlap(rect1, rect2) {
    let x_overlap;
    let y_overlap;
    if (rect1.x >= rect2.x && rect1.x <= (rect2.w + rect2.x)) {
        x_overlap = true;
    }
    if (rect2.x >= rect1.x && rect2.x <= (rect1.w + rect1.x)) {
        x_overlap = true;
    }
    if (rect1.y >= rect2.y && rect1.y <= (rect2.h + rect2.y)) {
        y_overlap = true;
    }
    if (rect2.y >= rect1.y && rect2.y <= (rect1.h + rect1.y)) {
        y_overlap = true;
    }
    return (x_overlap && y_overlap);
}
exports.doBasicRectsOverlap = doBasicRectsOverlap;
//#endregion
//#region INTERSECTION FUNCTIONS
/**--------------------------------------------------------------------------
 * findBasicRectIntersection
 * --------------------------------------------------------------------------
 * calculate the overlap section for 2 given basic rectangles
 *
 * @param rect1 - the first rectangle to check
 * @param rect2 - the second rectangle to check
 *
 * @returns The rectangle of overlap
 * --------------------------------------------------------------------------
 */
function findBasicRectIntersection(rect1, rect2) {
    let out;
    let min_x = Math.max(rect1.x, rect2.x);
    let max_x = Math.min(rect1.x + rect1.w, rect2.x + rect2.w);
    let min_y = Math.max(rect1.y, rect2.y);
    let max_y = Math.min(rect1.y + rect1.h, rect2.y + rect2.h);
    out = {
        x: min_x,
        y: min_y,
        w: (max_x - min_x),
        h: (max_y - min_y)
    };
    return out;
}
exports.findBasicRectIntersection = findBasicRectIntersection;
//#endregion
