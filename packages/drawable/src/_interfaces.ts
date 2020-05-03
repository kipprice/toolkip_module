import { StandardElement } from '@kipprice/toolkip-shared-types';
import { _Drawable } from ".";
import { IKeyedElems } from '@kipprice/toolkip-create-elements';

/**
 * IDrawableElements
 * ----------------------------------------------------------------------------
 * Collection of elements that make up a Drawable
 */
export interface IDrawableElements extends IKeyedElems {
    base: StandardElement;
}