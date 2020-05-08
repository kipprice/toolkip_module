export type StandardElement = HTMLElement | SVGElement;

/**
 * IDrawable
 * ----------------------------------------------------------------------------
 * The core pieecs that are required by our Drawable
 */
export interface IDrawable {
    draw(parent?: DrawableElement): void;
    erase(): void;
    base: StandardElement;
}

export type DrawableElement = StandardElement | IDrawable;

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

