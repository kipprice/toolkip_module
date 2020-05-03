"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const canvasElement_1 = require("./canvasElement");
const _interfaces_1 = require("./_interfaces");
/**----------------------------------------------------------------------------
 * @class	TextElement
 * ----------------------------------------------------------------------------
 * Draw text on a canvas
 * @author	Kip Price
 * @version 1.0.0
 * ----------------------------------------------------------------------------
 */
class TextElement extends canvasElement_1._CanvasElement {
    /**
     * create the text element
     * @param	id		Unique identifier for the element
     * @param	text	The text to display for the element
     * @param	point	The top-left point for the text
     *
     */
    constructor(id, text, point) {
        super(id);
        //#region PROPERTIES
        /** what type of element this is */
        this._type = _interfaces_1.ElementType.Text;
        this._text = text;
        this._dimensions = {
            x: point.x,
            y: point.y,
            w: 10,
            h: 10 // Same for height
        };
        this._initializeRects();
        this._addStyleChangeListener();
    }
    get type() { return _interfaces_1.ElementType.Text; }
    set text(txt) { this._text = txt; }
    set fixed(fixed) { this._fixed = fixed; }
    //#endregion
    /**
     * _setCanvas
     *
     * handle the canvas being assigned to this element
     * @param	canvas	The
     *
     */
    _setCanvas(canvas) {
        super._setCanvas(canvas);
        this._calculateTextMetrics();
    }
    /**
     * _addStyleChangeListener
     *
     * Handle when the style changes for this element
     *
     */
    _addStyleChangeListener() {
        this._style.addStyleChangeListener(_interfaces_1.StyleChangeEnum.FONT_SIZE, () => {
            this._dimensions.h = this._style.fontSize;
        });
    }
    /**
     * _calculateTextMetrics
     *
     * determine how big the text should be
     *
     */
    _calculateTextMetrics() {
        if (!this._canvas) {
            return;
        }
        let context = this._canvas.context;
        this._applyStyle(context);
        let metrics = context.measureText(this._text);
        this._restoreStyle(context);
        // Set the real measurements
        this._dimensions.w = metrics.width;
        this._dimensions.h = this.style.fontSize;
        // set the display dimensions to be this statically
        this._displayDimensions.w = metrics.width;
        this._displayDimensions.h = this.style.fontSize;
    }
    /**
     * _onDraw
     *
     * draw the text element on the canvas
     * @param	context		The canvas upon which to render
     *
     */
    _onDraw(context) {
        // draw the actual text of the element
        context.fillText(this._text, this._displayDimensions.x, this._displayDimensions.y + (this._fixed ? this._dimensions.h : this._displayDimensions.h));
        // consider the display dimensions the same as the original calculation
        this._displayDimensions.w = this._dimensions.w;
        this._displayDimensions.h = this._dimensions.h;
    }
    /**
     * _cloneForEffect
     *
     * clone a text effect
     * @param	id	The identifier to use for the cloned element
     * @returns	The cloned text element
     *
     */
    _cloneForEffect(id) {
        let pt = {
            x: this._dimensions.x,
            y: this._dimensions.y
        };
        let out = new TextElement(id, this._text, pt);
        return out;
    }
}
exports.TextElement = TextElement;
