import { StandardElement } from "../shared";
import { _Drawable } from ".";
import { IDictionary } from "../objectHelpers";

export type DrawableElement = StandardElement | _Drawable;

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
export interface IDrawableElements extends IDictionary<DrawableElement> {
    base: StandardElement;
}