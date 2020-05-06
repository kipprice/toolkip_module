"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pathElement_1 = require("../elements/pathElement");
/**----------------------------------------------------------------------------
 * @class	_PathExtensionElement
 * ----------------------------------------------------------------------------
 * @author	Kip Price
 * @version 1.0.0
 * ----------------------------------------------------------------------------
 */
class _PathExtensionElement extends pathElement_1.PathElement {
    /**
     * _setAttributes
     * ----------------------------------------------------------------------------
     * Add a hook to allow child elements to generate their own set of points
     * @param 	attr 		Attributes for the SVG element
     * @param 	addlArgs 	Anything else this particular path cares about
     */
    _setAttributes(attr, ...addlArgs) {
        let pts = this._generatePoints.apply(this, addlArgs);
        return super._setAttributes(attr, pts);
    }
}
exports._PathExtensionElement = _PathExtensionElement;
