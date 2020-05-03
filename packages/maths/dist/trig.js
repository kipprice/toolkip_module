"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const maths_1 = require("./maths");
//..........................................
//#region CONVERSIONS
/**
 * degressToRadians
 * --------------------------------------------------------------------------
 * Converts degrees to the equivalent radians measure=
 *
 */
function degreesToRadians(deg) {
    let result = ((Math.PI * deg) / 180);
    return result;
}
exports.degreesToRadians = degreesToRadians;
/**
 * radiansToDegrees
 * ----------------------------------------------------------------------------
 * converts radians over to the degree equivalent
 */
function radiansToDegrees(rad) {
    let result = (180 * rad) / Math.PI;
    return result;
}
exports.radiansToDegrees = radiansToDegrees;
//#endregion
//..........................................
/**
 * getEndPoint
 * --------------------------------------------------------------------------
 * Calculate where a particular vector will end, given the start point, distance, and angle
 *
 * @param 	startPoint 	where the vector originates
 * @param 	deg 		the degree of angle
 * @param 	distance	how far the vector should extend
 *
 */
function getEndPoint(startPoint, deg, distance) {
    let rad = degreesToRadians(deg);
    let result = {
        x: (Math.cos(rad) * distance) + startPoint.x,
        y: (Math.sin(rad) * distance) + startPoint.y
    };
    return result;
}
exports.getEndPoint = getEndPoint;
/**
 * getCentralPoint
 * ----------------------------------------------------------------------------
 * claculate the mid point between two specified points
 */
function getCentralPoint(elem) {
    return {
        x: elem.offsetLeft + (elem.offsetWidth / 2),
        y: elem.offsetTop + (elem.offsetWidth / 2)
    };
}
exports.getCentralPoint = getCentralPoint;
//#endregion
//#region CALCULATION FUNCTIONS
/**
 * getAngle
 * --------------------------------------------------------------------------
 * Finds the angle between two points
 *
 * @param {Object} start - The origin point of an angle
 * @param {Number} start.x - The x position of the origin point
 * @param {Number} start.y - The y position of the origin point
 * @param {Object} end - The destination point of an angle
 * @param {Number} end.x - The x position of the end point
 * @param {Number} end.y - The y position of the end point
 *
 * @return {Number} The angle (in degrees) between the two points
 */
function getAngle(start, end) {
    ;
    let dx;
    let dy;
    let q_sign;
    let q_ang;
    let angle;
    dx = (end.x - start.x);
    dy = (end.y - start.y);
    // Don't divide by zero
    if (dx === 0)
        return (dy < 0) ? 270 : 90;
    // Handle horizontals too
    if (dy === 0)
        return (dx < 0) ? 180 : 0;
    // Atan requires that all elements are positive
    q_sign = ((dx * dy) > 0) ? 1 : -1;
    q_ang = (dx < 0) ? Math.PI : 0;
    angle = Math.atan(Math.abs(dy) / Math.abs(dx));
    angle = ((angle * q_sign) + q_ang);
    return (angle * (180 / Math.PI));
}
exports.getAngle = getAngle;
;
/**
 * getDistance
 * --------------------------------------------------------------------------
 * Finds the distance between the two provided points
 *
 * @param 	start 	The first endpoint of the segment we are measuring
 * @param 	end 	The second enpoint of the segment we are measuring
 *
 * @return The distance between the two points
 */
function getDistance(start, end) {
    ;
    let distance;
    let dx;
    let dy;
    dx = (start.x - end.x);
    dy = (start.y - end.y);
    distance = Math.sqrt((dx * dx) + (dy * dy));
    return distance;
}
exports.getDistance = getDistance;
;
/**
 * calculatePolygonInternalAngle
 * --------------------------------------------------------------------------
 * calculate the internal angle for a given polygon
 *
 * @param 	numberOfSides 	The number of sides that the polygon has
 *
 * @returns the internal angle for this polygon, in radians
 */
function calculatePolygonInternalAngle(numberOfSides) {
    return maths_1.roundToPlace(degreesToRadians(360 / numberOfSides), 1000);
}
exports.calculatePolygonInternalAngle = calculatePolygonInternalAngle;
//#endregion
