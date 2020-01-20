import { IPoint, IBasicRect } from './_interfaces';
/**
 * clientRectToShape
 * --------------------------------------------------------------------------
 * Converts a Client Rect to a basic shape
 *
 * @param 	rect 	The rectangle to convert
 *
 * @returns The array of points that make up this shape
 */
export declare function clientRectToShape(rect: ClientRect): IPoint[];
/**
 * svgRectToShape
 * --------------------------------------------------------------------------
 * Converts a SVG Rect to a basic shape
 *
 * @param 	rect 	The rectangle to convert
 *
 * @returns The array of points that make up this shape
 */
export declare function svgRectToShape(rect: SVGRect): IPoint[];
/**
 * svgRectToBasicRect
 * --------------------------------------------------------------------------
 * Convert a SVG rectangle to a basic rectangle
 *
 * @param 	rect 	The rectangle to convert
 *
 * @returns The resulting IBasicRect representation of the passed in rect
 */
export declare function svgRectToBasicRect(rect: SVGRect): IBasicRect;
/**
 * clientRectToBasicRect
 * --------------------------------------------------------------------------
 * Convert a client rectangle to a basic rectangle
 *
 * @param 	rect 	The rectangle to convert
 *
 * @returns The resulting IBasicRect representation of the passed in rect
 */
export declare function clientRectToBasicRect(rect: ClientRect): IBasicRect;
/**
 * toBasicRect
 * --------------------------------------------------------------------------
 * Converts any supported rectangle to a basic rectangle
 *
 * @param 	rect 	The rectangle to convert
 *
 * @returns The basic rect version of this client / svg rect
 */
export declare function toBasicRect(rect: IBasicRect | ClientRect | SVGRect): IBasicRect;
