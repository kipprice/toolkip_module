"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const arc_1 = require("./arc");
/**----------------------------------------------------------------------------
 * @class	PieSliceElement
 * ----------------------------------------------------------------------------
 * Create a slice of a pie
 * @author	Kip Price
 * @version 1.0.0
 * ----------------------------------------------------------------------------
 */
class PieSliceElement extends arc_1.ArcElement {
    /**
     * _shouldShowRadii
     * ----------------------------------------------------------------------------
     * True if this should be rendered as a pie wedge, false otherwise
     * @returns	True
     */
    _shouldShowRadii() { return true; }
}
exports.PieSliceElement = PieSliceElement;
