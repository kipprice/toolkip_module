import { Stylable } from '../stylable/stylable';
import { IElemDefinition } from '../htmlHelpers/_interfaces';
import { IDrawable, IDrawableElements, StandardElement } from './_interfaces';
/**----------------------------------------------------------------------------
 * @class Drawable
 * ----------------------------------------------------------------------------
 * Creates a client-side representation of a particular DOM element
 * @author	Kip Price
 * @version	2.0.0
 * ----------------------------------------------------------------------------
 */
export default abstract class Drawable extends Stylable implements IDrawable {
    /** unique ID for this particular Drawable */
    protected _id: string;
    /** elements that make up this Drawable */
    protected _elems: IDrawableElements;
    /** expose the base element externally for anyone who needs it */
    get base(): StandardElement;
    /** the parent element upon which this Drawable will be added */
    protected _parent: StandardElement;
    /**
     * Drawable
     * ----------------------------------------------------------------------------
     * Create a Drawable element
     * @param	baseElemTemplate	If provided, the template upon which to create the base element
     */
    constructor(baseElemTemplate?: IElemDefinition);
    /**
     * _registerMediaListener
     * ----------------------------------------------------------------------------
     * Replace the stylable default registerMediaListener to try to apply first to
     * our base element, then the document as a whole
     */
    protected _registerMediaListener(matchQuery: string, classToApply: string): void;
    /**
     * _createElements
     * ----------------------------------------------------------------------------
     * Function that will be overridden by child classes when they are creating
     * the elements that make up a Drawable
     */
    protected abstract _createElements(...args: any[]): void;
    /**
     * _shouldSkipCreateElements
     * ----------------------------------------------------------------------------
     * Function to determine whether we should skip the createElements. Useful in
     * cases where data needs to be present in the class before elements can be
     * created.
     *
     * @returns	True if we shouldn't create elements
     */
    protected _shouldSkipCreateElements(): boolean;
    /**
     * draw
     * ----------------------------------------------------------------------------
     * Draws the element of this Drawable & all children + siblings
     * @param 	parent  	The element this Drawable should be added to
     * @param 	force 		True if we need to remove & redraw this element
     */
    draw(parent?: StandardElement, force?: boolean): void;
    /**
     * _drawBase
     * ----------------------------------------------------------------------------
     * Draws a Drawable or HTML Element
     * @param	force	If true, erases and redraws the base element
     */
    protected _drawBase(force?: boolean): void;
    /**
     * erase
     * ----------------------------------------------------------------------------
     * Remove this drawable from the canvas
     */
    erase(): void;
    /**
     * _refresh
     * ----------------------------------------------------------------------------
     * Overridable function that refreshes the UI of this Drawable. Does not
     * guarantee that the element has been drawn.
     */
    protected _refresh(): void;
    /**
     * _afterDraw
     * ----------------------------------------------------------------------------
     * @override
     * Overridable function to make sure we can adjust sizes should we need to
     */
    protected _afterDraw(): void;
    /**
     * _onResize
     * ----------------------------------------------------------------------------
     * Overridable function to adjust when the screen resizes
     */
    protected _onResize(): void;
    /**
     * addEventListener
     * ----------------------------------------------------------------------------
     * Helper to add event listeners to the base element
     * @param	type		Type of event to listen to
     * @param	listener	The listener to apply upon this event
     */
    addEventListener(type: keyof WindowEventMap, listener: Function): void;
}
