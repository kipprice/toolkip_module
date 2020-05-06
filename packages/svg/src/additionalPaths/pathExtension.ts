import { PathElement } from '../elements/pathElement';
import { IPathSVGAttributes, IPathPoint } from '../_interfaces';

/**----------------------------------------------------------------------------
 * @class	_PathExtensionElement
 * ----------------------------------------------------------------------------
 * @author	Kip Price
 * @version 1.0.0
 * ----------------------------------------------------------------------------
 */
export abstract class _PathExtensionElement extends PathElement {

	/**
	 * _setAttributes
	 * ----------------------------------------------------------------------------
	 * Add a hook to allow child elements to generate their own set of points
	 * @param 	attr 		Attributes for the SVG element
	 * @param 	addlArgs 	Anything else this particular path cares about
	 */
	protected _setAttributes(attr: IPathSVGAttributes, ...addlArgs: any[]): IPathSVGAttributes {

		let pts = this._generatePoints.apply(this, addlArgs);
		return super._setAttributes(attr, pts);
	}

	/**
	 * _generatePoints [ABSTRACT]
	 * ----------------------------------------------------------------------------
	 * Overridable function for implementations to create the appropriate set of 
	 * points for its particular needs
	 * 
	 * @param	addlArgs	Any additional elements needed by this class
	 * 
	 * @returns	The points to render for this path
	 */
	protected abstract _generatePoints(...addlArgs: any[]): IPathPoint[];
}