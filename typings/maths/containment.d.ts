import { IPoint, IBasicRect } from './_interfaces';
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
export declare function isWithin(val: number, min: number, max: number, non_inclusive?: boolean): boolean;
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
export declare function isPointContained(pt: IPoint, rect: ClientRect | SVGRect | IBasicRect): boolean;
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
export declare function isRectContained(rect: IBasicRect | ClientRect | SVGRect, container: IBasicRect | ClientRect | SVGRect): boolean;
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
export declare function isElementContained(elem: HTMLElement, container: HTMLElement): boolean;
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
export declare function isShapeContained(shape: IPoint[], bounds: ClientRect | SVGRect): boolean;
