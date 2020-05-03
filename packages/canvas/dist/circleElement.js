"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const canvasElement_1 = require("./canvasElement");
const _interfaces_1 = require("./_interfaces");
const toolkip_object_helpers_1 = require("@kipprice/toolkip-object-helpers");
const toolkip_shared_types_1 = require("@kipprice/toolkip-shared-types");
class CircleElement extends canvasElement_1._CanvasElement {
    constructor(id, center, temp) {
        super(id);
        let radius;
        if (toolkip_shared_types_1.isNumber(temp)) {
            radius = {
                x: temp,
                y: temp
            };
        }
        else {
            radius = temp;
        }
        this._dimensions = {
            x: center.x - radius.x,
            y: center.y - radius.y,
            w: radius.x * 2,
            h: radius.y * 2
        };
        this._center = center;
        this._radius = radius;
        this._initializeRects();
    }
    get type() { return _interfaces_1.ElementType.Circle; }
    _onDraw(context) {
        // TODO: HANDLE SCALING IF NEED BE
        // draw the actual text of the element
        context.beginPath();
        context.arc(this._displayDimensions.x + this._displayRadius.x, this._displayDimensions.y + this._displayRadius.y, this._displayRadius.x, 0, 2 * Math.PI);
        context.fill();
        // return style to norm
        this._restoreStyle(context);
    }
    /** change the dimensions based on a pan / zoom change on the canvas */
    updateDimensions(canvasDimensions) {
        super.updateDimensions(canvasDimensions);
        this._displayRadius = {
            x: this._radius.x * this._canvas.zoomFactor.x,
            y: this._radius.y * this._canvas.zoomFactor.y
        };
    }
    /** override default dimensions for circle specific dimensions */
    _debugDimensions() {
        console.log("CIRCLE:");
        console.log("center pt: " + Math.round(this._displayDimensions.x + this._displayRadius.x) + ", " + Math.round(this._displayDimensions.y + this._displayRadius.y));
        console.log("radius: " + Math.round(this._displayRadius.x));
        this._canvas.debugRelativeDimensions();
    }
    /** create a clone to be used in effect calculations */
    _cloneForEffect(id) {
        // clone relevant data 
        let center = {
            x: this._dimensions.x + this._radius.x,
            y: this._dimensions.y + this._radius.y
        };
        let radius = toolkip_object_helpers_1.clonePoint(this._radius);
        let elem = new CircleElement(id, center, radius);
        return elem;
    }
    /** allow effect elements to be resized */
    _scale(scaleAmt) {
        if (!this._isEffect) {
            return;
        }
        super._scale(scaleAmt);
        // Update this radius
        this._radius = {
            x: this._radius.x * scaleAmt,
            y: this._radius.y * scaleAmt
        };
    }
}
exports.CircleElement = CircleElement;
