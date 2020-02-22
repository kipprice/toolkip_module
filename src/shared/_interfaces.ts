export type StandardElement = HTMLElement | SVGElement;

/**
 * @interface 	IPoint
 * ---------------------------------------------------------------------------
 * Defines a basic point in space
 */
export interface IPoint {
	x: number;
	y: number;
	z?: number;
}