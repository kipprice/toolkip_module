export declare type StandardElement = HTMLElement | SVGElement;
export declare type DrawableElement = StandardElement | IDrawable;
/**
 * IDrawable
 * ----------------------------------------------------------------------------
 * The core pieecs that are required by our Drawable
 */
export interface IDrawable {
    draw(parent?: DrawableElement): void;
    erase(): void;
}
/**
 * IDrawableElements
 * ----------------------------------------------------------------------------
 * Collection of elements that make up a Drawable
 */
export interface IDrawableElements {
    /** the lowest level element of this Drawable */
    base: StandardElement;
    /** any additional elements */
    [key: string]: DrawableElement | DrawableElement[];
}
