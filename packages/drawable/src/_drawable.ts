import { _Stylable } from '@toolkip/stylable';
import { createElement, IElemDefinition } from '@toolkip/create-elements';
import { IDrawableElements } from '.';
import { StandardElement, IDrawable } from '@toolkip/shared-types';
import { registerStandardMediaQueries } from '@toolkip/media-queries';

/**----------------------------------------------------------------------------
 * @class Drawable
 * ----------------------------------------------------------------------------
 * Creates a client-side representation of a particular DOM element
 * @author	Kip Price
 * @version	2.0.0
 * ----------------------------------------------------------------------------
 */
export abstract class _Drawable<
	Placeholders extends string = string,
	Elems extends IDrawableElements = IDrawableElements,
	Options extends any = any
> extends _Stylable<Placeholders> implements IDrawable {

	//.....................
	//#region PROPERTIES

	/** unique ID for this particular Drawable */
	protected _id: string;

	/** elements that make up this Drawable */
	protected _elems: Elems;

	/** expose the base element externally for anyone who needs it */
	public get base(): StandardElement { return this._elems.base; }

	/** the parent element upon which this Drawable will be added */
	protected _parent: StandardElement;

	//#endregion
	//..................

	/**
	 * Drawable
	 * ----------------------------------------------------------------------------
	 * Create a Drawable element
	 * @param	baseElemTemplate	If provided, the template upon which to create the base element
	 */
	constructor(createElemOpts?: Options) {

		// Initialize both the stylable parts of this and the 
		super();
		this._addClassName("Drawable");
		this._registerMediaListeners();

		// initialize our elements
		this._elems = {} as Elems;
		
		// check that we have enough data to create elements
		if (this._shouldSkipCreateElements()) { return; }

		// actually create the elements associated with this class
		this._createElements(createElemOpts || {} as Options);
		this._registerMediaListeners(true);
	}


	/**
	 * _registerMediaListener
	 * ----------------------------------------------------------------------------
	 * Replace the stylable default registerMediaListener to try to apply first to 
	 * our base element, then the document as a whole
	 */
	protected _registerMediaListeners(baseOnly?: boolean): void {
		if (this._elems?.base) { registerStandardMediaQueries(this._elems.base); }
		if (baseOnly) { return; }

		registerStandardMediaQueries();
	}

	/**
	 * _createElements
	 * ----------------------------------------------------------------------------
	 * Function that will be overridden by child classes when they are creating
	 * the elements that make up a Drawable
	 */
	protected abstract _createElements(opts?: Options, ...args: any[]): void;

	/**
	 * _createBase
	 * ----------------------------------------------------------------------------
	 * wrapper around this._createElement; sets the root level key to "base" if not
	 * provided.
	 */
	protected _createBase(elemDefinition: IElemDefinition<Elems>): StandardElement {
		// ensure that we always have our base element
		if (!elemDefinition.key) { elemDefinition.key = "base" };
		return this._createElement(elemDefinition);
	}

	/**
	 * _createElement
	 * ----------------------------------------------------------------------------
	 * wrapper around createElement; automatically includes the elements linked
	 * to this Drawable
	 */
	protected _createElement(elemDefinition: IElemDefinition<Elems>): StandardElement {
		return createElement<Elems>(elemDefinition, this._elems);
	}

	/**
	 * draw
	 * ----------------------------------------------------------------------------
	 * Draws the element of this Drawable & all children + siblings
	 * @param 	parent  	The element this Drawable should be added to
	 * @param 	force 		True if we need to remove & redraw this element
	 */
	public draw(parent?: StandardElement, force?: boolean): void {

		// Quit if we don't have anything to draw
		if (!this._elems || !this._elems.base) { return; }

		// Refresh our contents
		this._refresh();

		// Save off this parent & quit if there is no parent
		this._parent = parent || this._parent;
		if (!this._parent) { return; }

		// Draw the base element
		this._drawBase(force);

		// Make sure we have a touchpoint for refreshing after the draw step
		this._afterDraw();
	};

	/**
	 * _drawBase
	 * ----------------------------------------------------------------------------
	 * Draws a Drawable or HTML Element
	 * @param	force	If true, erases and redraws the base element
	 */
	protected _drawBase(force?: boolean): void {

		// grab the base helper
		let base: StandardElement = this._elems.base;

		// If we are redrawing or have never drawn the element, do so
		if (force || (!base.parentNode)) {

			// Remove first from the parent if we need to
			if (force && base.parentNode) {
				base.parentNode.removeChild(base);
			}

			// If there's no parent, quit
			if (!this._parent) { return; }

			// Add back to the parent
			this._parent.appendChild(base);
		}
	}

	/**
	 * erase
	 * ----------------------------------------------------------------------------
	 * Remove this drawable from the canvas
	 */
	public erase() {
		let base: StandardElement = this._elems.base;
		if (!base || !base.parentNode) { return; }
		base.parentNode.removeChild(base);
	};

	//..........................................
	//#region METHODS DESIGNED FOR OVERRIDING
	
	/**
	 * _shouldSkipCreateElements
	 * ----------------------------------------------------------------------------
	 * Function to determine whether we should skip the createElements. Useful in
	 * cases where data needs to be present in the class before elements can be 
	 * created.
	 * 
	 * @returns	True if we shouldn't create elements
	 */
	protected _shouldSkipCreateElements(): boolean { return false; }

	/**
	 * _refresh
	 * ----------------------------------------------------------------------------
	 * Overridable function that refreshes the UI of this Drawable. Does not 
	 * guarantee that the element has been drawn.
	 */
	protected _refresh(): void { };

	/**
	 * _afterDraw
	 * ----------------------------------------------------------------------------
	 * @override
	 * Overridable function to make sure we can adjust sizes should we need to
	 */
	protected _afterDraw(): void { };


	/**
	 * _onResize
	 * ----------------------------------------------------------------------------
	 * Overridable function to adjust when the screen resizes
	 */
	protected _onResize(): void { };
	
	//#endregion
	//..........................................

	/**
	 * addEventListener
	 * ----------------------------------------------------------------------------
	 * Helper to add event listeners to the base element
	 * @param	type		Type of event to listen to
	 * @param	listener	The listener to apply upon this event
	 */
	public addEventListener(type: keyof WindowEventMap, listener: Function): void {
		this._elems.base.addEventListener(type, listener as EventListenerOrEventListenerObject);
	}

	/**
     * overridePlaceholder
     * ----------------------------------------------------------------------------
     * replace all instancaes of the specified placeholder with the provided value
     * only for this particular instance 
     */
    public overridePlaceholder(placeholderName: Placeholders, placeholderValue: any): void {
        super.overridePlaceholder(
			placeholderName, 
			placeholderValue, 
			this._elems.base
		)
    }

}