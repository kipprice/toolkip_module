"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pathExtension_1 = require("./pathExtension");
/**----------------------------------------------------------------------------
 * @class	CurveElement
 * ----------------------------------------------------------------------------
 * Render a curve as an SVG element
 * @author	Kip Price
 * @version 1.0.0
 * ----------------------------------------------------------------------------
 */
class CurveElement extends pathExtension_1._PathExtensionElement {
    _generatePoints() {
        return [];
    }
}
exports.CurveElement = CurveElement;
