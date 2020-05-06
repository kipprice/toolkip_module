"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pathExtension_1 = require("./pathExtension");
const toolkip_maths_1 = require("@kipprice/toolkip-maths");
/**----------------------------------------------------------------------------
 * @class	ArcElement
 * ----------------------------------------------------------------------------
 * Create an arc to render on an SVG canvas
 * @author	Kip Price
 * @version	2.0.0
 * ----------------------------------------------------------------------------
 */
class ArcElement extends pathExtension_1._PathExtensionElement {
    /**
     * ArcElement
     * ----------------------------------------------------------------------------
     * @param centerPt
     * @param radius
     * @param startDegree
     * @param endDegree
     * @param direction
     * @param attr
     */
    constructor(centerPt, radius, startDegree, endDegree, direction, attr) {
        super(null, attr, centerPt, radius, startDegree, endDegree, direction);
    }
    /**
     * _generatePoints
     * ----------------------------------------------------------------------------
     * Generate points for this particular arc
     * @param 	centerPt
     * @param 	radius
     * @param 	startDegree
     * @param 	endDegree
     * @param 	direction
     * @param 	noRadii
     *
     * @returns	The created set of points for the arc
     */
    _generatePoints(centerPt, radius, startDegree, endDegree, direction) {
        // generate some values that we'll need later
        let adjustedPoint = this._getAdjustedPoint(centerPt);
        let angleDiff = (endDegree - startDegree);
        // start point is nice and simple: grab the point on the circle where we should be rendering
        let start = this._calculatePolygonPoint(adjustedPoint, toolkip_maths_1.degreesToRadians(startDegree), radius);
        // end point is trickier; this needs to account for the arc attributes
        let end = this._calculatePolygonPoint(adjustedPoint, toolkip_maths_1.degreesToRadians(endDegree), radius);
        let endArc = {
            x: end.x,
            y: end.y,
            largeArc: (angleDiff > 180) ? 1 : 0,
            radius: { x: radius, y: radius },
            sweepFlag: direction,
            xRotation: 0
        };
        // return the points on the arc
        let out = [
            start,
            endArc
        ];
        // add the center point if we are a slice of a pie
        if (this._shouldShowRadii()) {
            out.push(centerPt);
        }
        return out;
    }
    /**
     * _getAdjustedPoint
     * ----------------------------------------------------------------------------
     * Adjust the center point by a stroke offset so we render correctly
     * @param 	centerPt 	The central point of the arc
     *
     * @returns	The adjusted point
     */
    _getAdjustedPoint(centerPt) {
        // adjust by the width of the stroke
        let adjust = this._style.strokeWidth * Math.sqrt(2) || 0;
        let adjustedPoint = {
            x: centerPt.x + adjust,
            y: centerPt.y + adjust
        };
        return adjustedPoint;
    }
    /**
     * _shouldShowRadii
     * ----------------------------------------------------------------------------
     * True if this should be rendered as a pie wedge, false otherwise
     * @returns	False
     */
    _shouldShowRadii() { return false; }
}
exports.ArcElement = ArcElement;
