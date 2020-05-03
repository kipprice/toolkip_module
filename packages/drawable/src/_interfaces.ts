import { StandardElement } from '@kipprice/toolkip-shared";
import { _Drawable } from ".";
import { IKeyedElems } from '@kipprice/toolkip-createElements/_interfaces";

/**
 * IDrawableElements
 * ----------------------------------------------------------------------------
 * Collection of elements that make up a Drawable
 */
export interface IDrawableElements extends IKeyedElems {
    base: StandardElement;
}