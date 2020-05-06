"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const polygon_1 = require("./polygon");
const toolkip_maths_1 = require("@kipprice/toolkip-maths");
/**----------------------------------------------------------------------------
 * @class	StarElement
 * ----------------------------------------------------------------------------
 * @version 1.0
 * @author	Kip Price
 * ----------------------------------------------------------------------------
 */
class StarElement extends polygon_1.PolygonElement {
    constructor(centerPt, numberOfPoints, radius, innerRadius, attr) {
        super(centerPt, numberOfPoints, radius, attr, innerRadius);
    }
    _generatePoints(centerPt, numberOfPoints, radius, innerRadius) {
        let curAngle = 0;
        let intAngle = (toolkip_maths_1.calculatePolygonInternalAngle(numberOfPoints) / 2);
        let points = [];
        for (let i = 0; i < numberOfPoints; i += 1) {
            let pt;
            // Outer point
            pt = this._calculatePolygonPoint(centerPt, curAngle, radius);
            curAngle += intAngle;
            points.push(pt);
            // Inner point
            pt = this._calculatePolygonPoint(centerPt, curAngle, innerRadius);
            curAngle += intAngle;
            points.push(pt);
        }
        return points;
    }
}
exports.StarElement = StarElement;
