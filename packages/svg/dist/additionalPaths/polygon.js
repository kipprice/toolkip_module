"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pathExtension_1 = require("./pathExtension");
const maths_1 = require("../../../maths");
/**----------------------------------------------------------------------------
 * @class	PolygonElement
 * ----------------------------------------------------------------------------
 * @author	Kip Price
 * @version	1.0
 * ----------------------------------------------------------------------------
 */
class PolygonElement extends pathExtension_1._PathExtensionElement {
    constructor(centerPt, sides, radius, attr, innerRadius) {
        super(null, attr, centerPt, sides, radius, innerRadius);
    }
    _generatePoints(centerPt, sides, radius, innerRadius) {
        // Generate the point list for the polygon
        let points = [];
        let curAngle = 0;
        let intAngle = maths_1.calculatePolygonInternalAngle(sides);
        for (let i = 0; i < sides; i += 1) {
            let pt = this._calculatePolygonPoint(centerPt, curAngle, radius);
            curAngle += intAngle;
            points.push(pt);
        }
        return points;
    }
}
exports.PolygonElement = PolygonElement;
