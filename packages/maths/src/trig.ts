import { IPoint } from '@kipprice/toolkip-shared'
import { roundToPlace } from './maths';

//..........................................
//#region CONVERSIONS

/**
 * degressToRadians
 * --------------------------------------------------------------------------
 * Converts degrees to the equivalent radians measure=
 * 
 */
export function degreesToRadians(deg: number): number {
	let result: number = ((Math.PI * deg) / 180);
	return result;
}

/**
 * radiansToDegrees
 * ----------------------------------------------------------------------------
 * converts radians over to the degree equivalent
 */
export function radiansToDegrees(rad: number): number {
	let result: number = (180 * rad) / Math.PI;
	return result;
}

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
export function getEndPoint(startPoint: IPoint, deg: number, distance: number): IPoint {
	let rad: number = degreesToRadians(deg);
	let result: IPoint = {
		x: (Math.cos(rad) * distance) + startPoint.x,
		y: (Math.sin(rad) * distance) + startPoint.y
	};

	return result;
}

/**
 * getCentralPoint
 * ----------------------------------------------------------------------------
 * claculate the mid point between two specified points
 */
export function getCentralPoint(elem: HTMLElement): IPoint {
	return {
		x: elem.offsetLeft + (elem.offsetWidth / 2),
		y: elem.offsetTop + (elem.offsetWidth / 2)
	};
}
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
export function getAngle(start: IPoint, end: IPoint): number {
	;
	let dx: number;
	let dy: number;
	let q_sign: number;
	let q_ang: number;
	let angle: number;

	dx = (end.x - start.x);
	dy = (end.y - start.y);

	// Don't divide by zero
	if (dx === 0) return (dy < 0) ? 270 : 90;

	// Handle horizontals too
	if (dy === 0) return (dx < 0) ? 180 : 0;

	// Atan requires that all elements are positive
	q_sign = ((dx * dy) > 0) ? 1 : -1;
	q_ang = (dx < 0) ? Math.PI : 0;


	angle = Math.atan(Math.abs(dy) / Math.abs(dx));
	angle = ((angle * q_sign) + q_ang);

	return (angle * (180 / Math.PI));
};

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
export function getDistance(start: IPoint, end: IPoint): number {
	;
	let distance: number;
	let dx: number;
	let dy: number;

	dx = (start.x - end.x);
	dy = (start.y - end.y);

	distance = Math.sqrt((dx * dx) + (dy * dy));
	return distance;
};

/**
 * calculatePolygonInternalAngle
 * --------------------------------------------------------------------------
 * calculate the internal angle for a given polygon
 * 
 * @param 	numberOfSides 	The number of sides that the polygon has
 * 
 * @returns the internal angle for this polygon, in radians
 */
export function calculatePolygonInternalAngle(numberOfSides: number): number {
	return roundToPlace(degreesToRadians(360 / numberOfSides), 1000);
}
//#endregion