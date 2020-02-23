import { IElemDefinition } from '../htmlHelpers/_interfaces';
import { _Drawable } from './_drawable';
import { createElement } from '../htmlHelpers';

/**----------------------------------------------------------------------------
 * @class	SimpleDrawable
 * ----------------------------------------------------------------------------
 * Very basic implementation of the Drawable class that contains just a 
 * single element.
 * @version 1.0.0
 * ----------------------------------------------------------------------------
 */
export class Drawable extends _Drawable {

	//.....................
	//#region PROPERTIES

	/** Simple Drawables only have a base element */
	protected _elems: {
		base: HTMLElement;
	}

	//#endregion
	//.....................

	/**
	 * Drawable
	 * ----------------------------------------------------------------------------
	 * create a simple Drawable element that renders whatever is passed into its
	 * constructor
	 * @param	baseElem		The details about the element we should draw
	 */
	constructor(baseElem: IElemDefinition) { 
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