"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const svgElement_1 = require("./svgElement");
/**----------------------------------------------------------------------------
 * @class   CircleElement
 * ----------------------------------------------------------------------------
 * @version 1.0
 * @author  Kip Price
 * ----------------------------------------------------------------------------
 */
class CircleElement extends svgElement_1._SVGElem {
    constructor(center, radius, attributes) {
        super(attributes, center, radius);
    }
    _setAttributes(attributes, center, radius) {
        attributes.type = "circle";
        attributes.cx = center.x;
        attributes.cy = center.y;
        attributes.r = radius;
        return attributes;
    }
    _updateExtrema(attributes) {
        this._extrema = this._extremaFromCenterPointAndRadius({ x: attributes.cx, y: attributes.cy }, attributes.r);
    }
    /**
     * _extremaFromCenterPointAndRadius
     *
     * helper function to calculate extrema from a central point and radius
     *
     */
    _extremaFromCenterPointAndRadius(center, radius) {
        let extrema = {
            max: { x: center.x + radius, y: center.y + radius },
            min: { x: center.x - radius, y: center.y - radius }
        };
        return extrema;
    }
}
exports.CircleElement = CircleElement;
