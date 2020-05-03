"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const canvasElement_1 = require("./canvasElement");
const toolkip_maths_1 = require("@kipprice/toolkip-maths");
const _interfaces_1 = require("./_interfaces");
const toolkip_object_helpers_1 = require("@kipprice/toolkip-object-helpers");
class PathElement extends canvasElement_1._CanvasElement {
    constructor(id, points) {
        super(id);
        this._initializeRects();
        if (points) {
            this._points = points;
            this._updateExtremaFromPoints();
        }
        else {
            this._points = [];
        }
    }
    get type() { return _interfaces_1.ElementType.Path; }
    /** create an empty dimensions rect */
    _initializeRects() {
        this._dimensions = {
            x: 0,
            y: 0,
            w: 0,
            h: 0
        };
        super._initializeRects();
        this._needsInitialDimensions = true;
    }
    /** add a new point to this path */
    addPoint(point) {
        this._points.push(point);
        // Update extrema
        this._updateExtremaFromPoint(point);
    }
    /** loop through and update extremas based on all points */
    _updateExtremaFromPoints() {
        let point;
        for (point of this._points) {
            this._updateExtremaFromPoint(point);
        }
    }
    /** check if extrema need to be updated for a single point */
    _updateExtremaFromPoint(point) {
        // Check for x extremes
        if (this._needsInitialDimensions || point.x < this._dimensions.x) {
            this._dimensions.x = point.x;
        }
        else if (point.x > (this._dimensions.x + this._dimensions.w)) {
            this._dimensions.w = (point.x - this._dimensions.x);
        }
        // Check for y extremes
        if (this._needsInitialDimensions || point.y < this._dimensions.y) {
            this._dimensions.y = point.y;
        }
        else if (point.y > (this._dimensions.y + this._dimensions.h)) {
            this._dimensions.h = (point.y - this._dimensions.y);
        }
        this._needsInitialDimensions = false;
    }
    /** actually create the path on the canvas */
    _onDraw(context) {
        context.beginPath();
        // Add each point
        let point;
        for (point of this._displayPoints) {
            context.lineTo(point.x, point.y); //TODO: [future] add curves and arcs as well
        }
        context.closePath();
        context.fill();
    }
    /**  */
    updateDimensions(canvasDimensions) {
        super.updateDimensions(canvasDimensions);
        // We need to update each of our points
        this._displayPoints = [];
        let point;
        for (point of this._points) {
            //let displayPoint: IPoint = this._canvas.convertAbsolutePointToRelativePoint(point);
            let displayPoint = {
                x: (point.x - canvasDimensions.x) * this._canvas.zoomFactor.x,
                y: (point.y - canvasDimensions.y) * this._canvas.zoomFactor.y
            };
            this._displayPoints.push(displayPoint);
        }
    }
    adjustDimensions(adjustPt) {
        if (this._isEffect) {
            return;
        }
        super.adjustDimensions(adjustPt);
        let point;
        for (point of this._points) {
            point.x += adjustPt.x;
            point.y += adjustPt.y;
        }
    }
    /** clone in order to be able to apply various effects */
    _cloneForEffect(id) {
        let out = new PathElement(id, toolkip_object_helpers_1.clonePointArray(this._points));
        return out;
    }
    _scale(scaleAmt) {
        if (!this._isEffect) {
            return;
        }
        // calculate the central point (defined as the center of each extrema)
        let center = {
            x: this._dimensions.x + (this._dimensions.w / 2),
            y: this._dimensions.y + (this._dimensions.h / 2)
        };
        // Scale each point to be some amount further from the center
        let pt;
        let tmpPoints = [];
        for (pt of this._points) {
            let tmpPt = this._scalePoint(pt, center, scaleAmt);
            tmpPoints.push(tmpPt);
        }
        // set our points array to the new points array
        this._points = tmpPoints;
        this._updateExtremaFromPoints();
    }
    _scalePoint(pt, center, scaleAmt) {
        let angle = toolkip_maths_1.getAngle(center, pt);
        let distance = toolkip_maths_1.getDistance(center, pt);
        let newDistance = distance * scaleAmt;
        let newPt = toolkip_maths_1.getEndPoint(center, angle, newDistance);
        return newPt;
    }
}
exports.PathElement = PathElement;
