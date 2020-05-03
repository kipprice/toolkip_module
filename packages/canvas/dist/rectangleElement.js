"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const canvasElement_1 = require("./canvasElement");
const _interfaces_1 = require("./_interfaces");
const toolkip_object_helpers_1 = require("@kipprice/toolkip-object-helpers");
/**----------------------------------------------------------------------------
 * @class   RectangleElement
 * ----------------------------------------------------------------------------
 * Create a rectangle on the canvas
 * @author  Kip Price
 * @version 1.0.0
 * ----------------------------------------------------------------------------
 */
class RectangleElement extends canvasElement_1._CanvasElement {
    //#endregion
    /**
     *  create a rectangle element
     * @param   id          unique ID for the rectangle
     * @param   dimensions  the size of the rectangle (in canvas coordinates)
     *
     */
    constructor(id, dimensions) {
        super(id);
        //#region PROPERTIES
        /** type of this element */
        this._type = _interfaces_1.ElementType.Rectangle;
        /** what border radius should be used (if any) for this rectangle */
        this._borderRadius = 0;
        this._dimensions = dimensions;
        this._initializeRects();
    }
    get type() { return _interfaces_1.ElementType.Rectangle; }
    set borderRadius(bRad) { this._borderRadius = bRad; }
    /**
     * _onDraw
     *
     * actually draw the rectangle
     * @param   context     Context in which to draw this element
     *
     */
    _onDraw(context) {
        if (this._borderRadius === 0) {
            this._unroundedRect(context);
        }
        else {
            this._roundedRect(context);
        }
    }
    /**
     * _unroundedRect
     *
     * Draw a plain unrounded rectangle
     * @param   context     The context in which to render this element
     *
     */
    _unroundedRect(context) {
        context.fillRect(// Create the actual rectangle
        this._displayDimensions.x, // ...
        this._displayDimensions.y, // ...
        this._displayDimensions.w, // ...
        this._displayDimensions.h // ...
        ); // ...
    }
    /**
     * _roundedRect
     *
     * Draw a rectangle with rounded corners
     * @param   context     The context in which to draw this rectangle
     *
     */
    _roundedRect(context) {
        context.beginPath();
        let dim = this._displayDimensions;
        let radius = this._displayBorderRadius;
        // top straight line
        context.moveTo(dim.x + radius.x, dim.y);
        context.lineTo(dim.x + dim.w - radius.x, dim.y);
        // top right rounded corner
        context.quadraticCurveTo(dim.x + dim.w, dim.y, dim.x + dim.w, dim.y + radius.y);
        // right vertical side
        context.lineTo(dim.x + dim.w, dim.y + dim.h - radius.y);
        // bottom right rounded corner
        context.quadraticCurveTo(dim.x + dim.w, dim.y + dim.h, dim.x + dim.w - radius.x, dim.y + dim.h);
        // bottom straight line
        context.lineTo(dim.x + radius.x, dim.y + dim.h);
        // bottom left rounded corner
        context.quadraticCurveTo(dim.x, dim.y + dim.h, dim.x, dim.y + dim.h - radius.y);
        // left straight line
        context.lineTo(dim.x, dim.y + radius.y);
        // top left rounded corner
        context.quadraticCurveTo(dim.x, dim.y, dim.x + radius.x, dim.y);
        context.closePath();
        context.fill();
    }
    /**
     * updateDimensions
     *
     * Update our rectangle's dimensions
     * @param   canvasDimensions    The dimensions of the canvas as a whole
     *
     */
    updateDimensions(canvasDimensions) {
        super.updateDimensions(canvasDimensions);
        this._displayBorderRadius = {
            x: this._borderRadius * this._canvas.zoomFactor.x,
            y: this._borderRadius * this._canvas.zoomFactor.y
        };
    }
    /**
     * _cloneForEffect
     *
     * clone an element for an effect to be applied
     * @param   id  Unique identifier for the cloned element
     * @returns The cloned rectangle
     *
     */
    _cloneForEffect(id) {
        let dim = toolkip_object_helpers_1.cloneRect(this._dimensions);
        let clone = new RectangleElement(id, dim);
        return clone;
    }
}
exports.RectangleElement = RectangleElement;
