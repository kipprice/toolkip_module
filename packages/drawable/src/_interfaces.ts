import { StandardElement } from '@toolkip/shared-types';
import { _Drawable } from ".";
import { IKeyedElems } from '@toolkip/create-elements';

/**
 * IDrawableElements
 * ----------------------------------------------------------------------------
 * Collection of elements that make up a Drawable
 */
export interface IDrawableElements extends IKeyedElems {
    base: StandardElement;
}