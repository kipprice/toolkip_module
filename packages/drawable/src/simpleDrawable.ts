import { _Drawable } from './_drawable';
import { createElement, IElemDefinition } from '@kipprice/toolkip-createElements';
import { IDrawableElements } from './_interfaces';

/**----------------------------------------------------------------------------
 * @class	SimpleDrawable
 * ----------------------------------------------------------------------------
 * Very basic implementation of the Drawable class that contains just a 
 * single element.
 * @version 1.0.0
 * ----------------------------------------------------------------------------
 */
export class Drawable<
	P extends string = string, 
	E extends IDrawableElements = IDrawableElements
> extends _Drawable<P, E> {

	//.....................
	//#region PROPERTIES

	//#endregion
	//.....................

	/**
	 * Drawable
	 * ----------------------------------------------------------------------------
	 * create a simple Drawable element that renders whatever is passed into its
	 * constructor
	 * @param	baseElem		The details about the element we should draw
	 */
	constructor(baseElem: IElemDefinition<E>) { 
		super(); 
		
		if (baseElem) { 
			this._createBase(baseElem);
		}
	}

	/**
	 * _createElements
	 * ----------------------------------------------------------------------------
	 * Do nothing, since we will create the base element in the construtor
	 */
	protected _createElements(): void { }
}