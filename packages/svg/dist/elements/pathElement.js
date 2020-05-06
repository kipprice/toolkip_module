"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const svgElement_1 = require("./svgElement");
const shared_1 = require("../../../shared");
const toolkip_object_helpers_1 = require("@kipprice/toolkip-object-helpers");
const toolkip_maths_1 = require("@kipprice/toolkip-maths");
/**----------------------------------------------------------------------------
 * @class   PathElement
 * ----------------------------------------------------------------------------
 * @version 1.0
 * @author  Kip Price
 * ----------------------------------------------------------------------------
 */
class PathElement extends svgElement_1._SVGElem {
    //#endregion
    constructor(points, attr, ...addlArgs) {
        if (points) {
            addlArgs.splice(0, 0, points);
        }
        super(attr, ...addlArgs);
    }
    /**
     * _setAttributes
     *
     * Make sure the attributes are updated for a path
     * @param 	attributes 	The attriutes to update
     * @param 	points 		Points for the path
     *
     */
    _setAttributes(attributes, points) {
        attributes.type = "path";
        attributes.d = "";
        this._points = points || [];
        return attributes;
    }
    /**
     * _createElements
     *
     * Create elements for this path
     *
     */
    _createElements() {
        let path = this._startPath(this._attributes);
        let firstPt = true;
        let points = this._points;
        for (let pathPt of points) {
            if (firstPt) {
                this.moveTo(pathPt);
                firstPt = false;
            }
            else if (_isCurvePoint(pathPt)) {
                this.curveTo(pathPt);
            }
            else if (_isArcPoint(pathPt)) {
                this.arcTo(pathPt);
            }
            else {
                this.lineTo(pathPt);
            }
        }
        if (!this._attributes.noFinish) {
            this.closePath();
        }
        else {
            this.finishPathWithoutClosing();
        }
    }
    //#region HANDLE EXTREMA
    /**
     * _updateExtrema
     *
     * Make sure we know the extrema of this path
     *
     */
    _updateExtrema() {
        this._extrema = {
            max: null,
            min: null
        };
        for (let pathPt of this._points) {
            this._updateExtremaFromPoint(pathPt);
        }
    }
    /**
     * _updateExtremaFromPoint
     *
     * Make sure our extrema are up to date
     * @param 	pt	The point that may potentially update our extrema
     *
     */
    _updateExtremaFromPoint(pt) {
        // handle the base case
        if (!this._extrema.max || !this._extrema.min) {
            this._extrema.max = toolkip_object_helpers_1.cloneObject(pt);
            this._extrema.min = toolkip_object_helpers_1.cloneObject(pt);
            return;
        }
        // if we're more extreme than the extrema, update
        if (pt.x < this._extrema.min.x) {
            this._extrema.min.x = pt.x;
        }
        if (pt.y < this._extrema.min.y) {
            this._extrema.min.y = pt.y;
        }
        if (pt.x > this._extrema.max.x) {
            this._extrema.max.x = pt.x;
        }
        if (pt.y > this._extrema.max.y) {
            this._extrema.max.y = pt.y;
        }
    }
    //#endregion
    /**
     * _checkForCurrentPath
     *
     * Verify that we have a current path
     *
     */
    _checkForCurrentPath() {
        if (!this._elems.base) {
            throw new Error("no path started");
        }
    }
    /**
     * _constructPathAttribute
     *
     * Create the atribute to set the path
     * @param 	prefix 	The type of action being created
     * @param 	point 	The point to add
     * @returns	The appropriate path string
     *
     */
    _constructPathAttribute(prefix, point) {
        let out = "";
        out = prefix + this._pointToAttributeString(point) + "\n";
        return out;
    }
    /**
     * _pointToAttribute
     *
     * Turn a point into a string recgnizable as a point in the path attribute
     * @param 	point 	The point to convert
     * @returns	The created string
     *
     */
    _pointToAttributeString(point) {
        let out = point.x + " " + point.y;
        return out;
    }
    /**
     * _addToPathAttribute
     *
     * @param 	suffix 	What to add to the atribute string
     * @returns	True if we were able to add the string
     *
     */
    _addToPathAttribute(suffix) {
        this._checkForCurrentPath();
        let d = this._elems.base.getAttribute("d") || "";
        d += suffix;
        this._elems.base.setAttribute("d", d);
        return true;
    }
    /**
     * _startPath
     *
     * @param attr
     *
     */
    _startPath(attr) {
        super._createElements(this._attributes);
        return this._elems.base;
    }
    /**
     * lineTo
     * ----------------------------------------------------------------------------
     * @param	point	The point to draw a line to
     */
    lineTo(point) {
        this._checkForCurrentPath();
        this._addToPathAttribute(this._constructPathAttribute("L", point));
    }
    /**
     * moveTo
     * ----------------------------------------------------------------------------
     * @param 	point
     */
    moveTo(point) {
        this._checkForCurrentPath();
        this._addToPathAttribute(this._constructPathAttribute("M", point));
    }
    /**
     * curveTo
     * ----------------------------------------------------------------------------
     * Create a curve from the current position to the specified curve point
     * @param	point 	Point to end the curve at
     */
    curveTo(point) {
        this._checkForCurrentPath();
        let d;
        d = "C" + this._pointToAttributeString(point.controls[0]) + ", ";
        d += this._pointToAttributeString(point.controls[1]) + ", ";
        d += this._pointToAttributeString(point) + "\n";
        this._addToPathAttribute(d);
    }
    /**
     * arcTo
     * ----------------------------------------------------------------------------
     * Create an arc from the current position to the specified arc point
     * @param 	point 	Point to end the arc at
     */
    arcTo(point) {
        let d;
        d = "A" + this._pointToAttributeString(point.radius) + " ";
        d += point.xRotation + " " + point.largeArc + " " + point.sweepFlag + " ";
        d += this._pointToAttributeString(point) + "\n";
        this._addToPathAttribute(d);
    }
    /**
     * closePath
     * ----------------------------------------------------------------------------
     * closes the path so it creates an enclosed space
     */
    closePath() {
        this._addToPathAttribute(" Z");
        this.finishPathWithoutClosing();
    }
    /**
     * finishPathWithoutClosing
     * ----------------------------------------------------------------------------
     * indicates the path is finished without closing the path
     */
    finishPathWithoutClosing() {
    }
    /**
     * _calculatePolygonPoint
     *
     * helper function to calculate a polygon's point at a certain angle
     *
     */
    _calculatePolygonPoint(centerPt, currentAngle, radius) {
        let out = {
            x: centerPt.x + toolkip_maths_1.roundToPlace(Math.sin(currentAngle) * radius, 10),
            y: centerPt.y + toolkip_maths_1.roundToPlace(-1 * Math.cos(currentAngle) * radius, 10)
        };
        return out;
    }
}
exports.PathElement = PathElement;
//..........................................
//#region HELPER FUNCTIONS
function _isCurvePoint(pt) {
    return (!!pt.controls);
}
function _isArcPoint(pt) {
    return !shared_1.isNullOrUndefined(pt.radius);
}
//#endregion
//..........................................
