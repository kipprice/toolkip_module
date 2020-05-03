import { StandardElement } from "../shared";
import { _Drawable } from ".";
import { IKeyedElems } from "../createElements/_interfaces";

/**
 * IDrawableElements
 * ----------------------------------------------------------------------------
 * Collection of elements that make up a Drawable
 */
export interface IDrawableElements extends IKeyedElems {
    base: StandardElement;
}