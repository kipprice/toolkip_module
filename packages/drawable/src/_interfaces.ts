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

// export additional functions that are commonly used within the context of drawables so
// importers don't always need to also import for these functions
export * from '@toolkip/style-helpers';
export { IDrawable, DrawableElement, isDrawableElement, isDrawable } from '@toolkip/shared-types';