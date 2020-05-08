import { IPoint } from '@toolkip/shared-types';

/**---------------------------------------------------------------------------
 * @interface 	IBasicRect
 * ---------------------------------------------------------------------------
 * Defines basic parameters for a rectangle
 * ---------------------------------------------------------------------------
 */
export interface IBasicRect {
	x: number; /** X-value of the rectangle @type {number} */
	y: number; /** Y-Value of the rectangle @type {number} */
	w: number; /** Width of the rectangle @type {number} */
	h: number; /** Height of the rectangle @type {number} */
}

/**---------------------------------------------------------------------------
 * @type 		IExtrema
 * ---------------------------------------------------------------------------
 * Interface that stores a max point and a min point
 * ---------------------------------------------------------------------------
 */
export type IExtrema = IGenericExtrema<IPoint>;

/**---------------------------------------------------------------------------
 * @interface 	IGenericExtrema
 * ---------------------------------------------------------------------------
 * Handle any type of extreema
 * ---------------------------------------------------------------------------
 */
export interface IGenericExtrema<T> {
	max: T,
	min: T
};

/**---------------------------------------------------------------------------
 * @interface 	IVector
 * ---------------------------------------------------------------------------
 * Keeps track of a vector definition
 * ---------------------------------------------------------------------------
 */
export interface IVector {
	startPoint: IPoint;
	endPoint: IPoint;
	distance: number;
	angleInDegrees: number;
}