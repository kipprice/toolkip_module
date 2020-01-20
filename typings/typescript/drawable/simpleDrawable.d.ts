import { IElemDefinition } from '../htmlHelpers/_interfaces';
import { Drawable } from './drawable';
/**----------------------------------------------------------------------------
 * @class	SimpleDrawable
 * ----------------------------------------------------------------------------
 * Very basic implementation of the Drawable class that contains just a
 * single element.
 * @version 1.0.0
 * ----------------------------------------------------------------------------
 */
export default class SimpleDrawable extends Drawable {
    /** Simple Drawables only have a base element */
    protected _elems: {
        base: HTMLElement;
    };
    /**
     * SimpleDrawable
     * ----------------------------------------------------------------------------
     * create a simple Drawable element
     * @param	obj		The details about the element we should draw
     */
    constructor(obj: IElemDefinition);
    /**
     * _createElements
     * ----------------------------------------------------------------------------
     * Do nothing, since we will create the base element in the construtor
     */
    protected _createElements(): void;
}
