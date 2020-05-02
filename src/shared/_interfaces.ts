export type StandardElement = HTMLElement | SVGElement;

/**
 * IPoint
 * ---------------------------------------------------------------------------
 * Defines a basic point in space
 */
export interface IPoint {
	x: number;
	y: number;
	z?: number;
}