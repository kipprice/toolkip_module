import { ArcElement } from "./arc";

/**----------------------------------------------------------------------------
 * @class	PieSliceElement
 * ----------------------------------------------------------------------------
 * Create a slice of a pie
 * @author	Kip Price
 * @version 1.0.0
 * ----------------------------------------------------------------------------
 */
export class PieSliceElement extends ArcElement {

	/**
	 * _shouldShowRadii
	 * ----------------------------------------------------------------------------
	 * True if this should be rendered as a pie wedge, false otherwise
	 * @returns	True
	 */
	protected _shouldShowRadii(): boolean { return true; }
}