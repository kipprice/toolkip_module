import { IPoint } from './interface';
/**
 * degressToRadians
 * --------------------------------------------------------------------------
 * Converts degrees to the equivalent radians measure=
 *
 */
export declare function degreesToRadians(deg: number): number;
/**
 * radiansToDegrees
 * ----------------------------------------------------------------------------
 * converts radians over to the degree equivalent
 */
export declare function radiansToDegrees(rad: number): number;
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
export declare function getEndPoint(startPoint: IPoint, deg: number, distance: number): IPoint;
/**
 * getCentralPoint
 * ----------------------------------------------------------------------------
 * claculate the mid point between two specified points
 */
export declare function getCentralPoint(elem: HTMLElement): IPoint;
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
export declare function getAngle(start: IPoint, end: IPoint): number;
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
export declare function getDistance(start: IPoint, end: IPoint): number;
/**
 * calculatePolygonInternalAngle
 * --------------------------------------------------------------------------
 * calculate the internal angle for a given polygon
 *
 * @param 	numberOfSides 	The number of sides that the polygon has
 *
 * @returns the internal angle for this polygon, in radians
 */
export declare function calculatePolygonInternalAngle(numberOfSides: number): number;
