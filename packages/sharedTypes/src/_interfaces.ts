export type Primitive = boolean | undefined | null | number | string;

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

/** allow duck typing for classes that allow updating */
export interface IUpdatable {
	update(...args: any[]): void;
}

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

export type FalsyTypes = undefined | null | '' | 0;