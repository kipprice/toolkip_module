"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _interfaces_1 = require("./_interfaces");
const canvasStyle_1 = require("./canvasStyle");
const toolkip_maths_1 = require("@kipprice/toolkip-maths");
/**----------------------------------------------------------------------------
 * @class CanvasElement
 * ----------------------------------------------------------------------------
 * create a canvas element
 * @version 1.1
 * @author	Kip Price
 * ----------------------------------------------------------------------------
 */
class _CanvasElement {
    //#endregion
    /**
     * create a canvas element
     *
     * @param	id			The unique ID for this
     * @param 	isEffect 	If true, treats this element as an effect
     *
     */
    constructor(id, isEffect) {
        /** layer at which the element should appear. Defaults to 1 */
        this._layer = 1;
        this._id = id;
        this._isEffect = isEffect;
        this._eventFunctions = [];
        this._style = new canvasStyle_1.CanvasElementStyle();
    }
    get id() { return this._id; }
    set canvas(canvas) { this._setCanvas(canvas); }
    set parent(grp) { this._parent = grp; }
    get style() { return this._style; }
    set style(s) { this._style = s; }
    get layer() { return this._layer; }
    set layer(layer) { this._layer = layer; }
    get isOffScreen() { return this._isOffScreen; }
    get dimensions() { return this._dimensions; }
    set dimensions(dim) { this._setDimensions(dim); }
    get displayDimensions() { return this._displayDimensions; }
    get isHoverTarget() { return this._isHoverTarget; }
    set isHoverTarget(value) { this._isHoverTarget = value; }
    get isHidden() { return this._isHidden; }
    /**
     * _initializeRects
     *
     * create the initial display rectangle
     *
     */
    _initializeRects() {
        this._displayDimensions = {
            x: this._dimensions.x,
            y: this._dimensions.y,
            w: this._dimensions.w,
            h: this._dimensions.h
        };
    }
    /**
     * _applyStyle
     *
     * update the context to use this element's style
     *
     * @param	context		The Canvas context to draw on
     *
     */
    _applyStyle(context) {
        this._style.setStyle(context);
    }
    /**
     * _restoreStyle
     *
     * set the context style back to what it originally was
     *
     * @param	context
     *
     */
    _restoreStyle(context) {
        this._style.restoreStyle(context);
    }
    /**
     * transform
     *
     * handle a temporary transform for the element
     *
     * @param 	transformDetails
     *
     */
    transform(transformDetails) {
        // we need a canvas object to have been assigned
        if (!this._parent) {
            return;
        }
        // create a clone of this element
        let clone = this._cloneForEffect(this.id + "|e");
        clone._isEffect = true;
        clone._layer = this._layer;
        clone.style = this._cloneStyle();
        // apply the appropriate transformations to that element
        if (transformDetails.color) {
            clone._style.fillColor = transformDetails.color;
        }
        // apply the scale transformation
        if (transformDetails.scale) {
            clone._scale(transformDetails.scale);
        }
        // add the cloned element to the same layer we're on
        this._parent.addElement(clone);
    }
    /**
     * _cloneStyle
     *
     * copy style from one elem for use in another
     *
     * @returns
     *
     */
    _cloneStyle() {
        return new canvasStyle_1.CanvasElementStyle(this._style);
    }
    /**
     * _scale
     *
     * standard scale algorithm
     * @param	scaleAmt
     *
     * */
    _scale(scaleAmt) {
        // This is only allowed for effect elements
        if (!this._isEffect) {
            return;
        }
        // calculate the width offset and value
        let newWidth = scaleAmt * this._dimensions.w;
        let xOffset = (newWidth - this._dimensions.w) / 2;
        // calculate the height offset and value
        let newHeight = scaleAmt * this._dimensions.h;
        let yOffset = (newHeight - this._dimensions.h) / 2;
        // update the dimensions to be appropriate for this scaling element
        this._dimensions = {
            x: this._dimensions.x - xOffset,
            y: this._dimensions.y - yOffset,
            w: newWidth,
            h: newHeight
        };
    }
    /**
     * updateDimensions
     *
     * update the internal dimensions of the element
     * @param	canvasDimensions
     *
     */
    updateDimensions(canvasDimensions) {
        this._displayDimensions = this._canvas.convertAbsoluteRectToRelativeRect(this._dimensions);
        // Update our tracking variable to determine whether 
        // we should be showing this element
        this._setIsOffScreen(canvasDimensions);
    }
    /**
     * adjustDimensions
     *
     * shift the dimensions of the element based on the reference point
     * @param	adjustPt
     *
     * */
    adjustDimensions(adjustPt) {
        if (this._isEffect) {
            return;
        }
        this._dimensions.x += adjustPt.x;
        this._dimensions.y += adjustPt.y;
    }
    /**
     * draw
     *
     * abstract method that each child element will implement
     *
     */
    draw() {
        // Don't do anything if we're offscreen or don't have a canvas
        if (this._isOffScreen) {
            return;
        }
        if (!this._canvas) {
            return;
        }
        if (this._isHidden) {
            return;
        }
        // Get the context from the canvas, as appropriate for this particular element
        let context;
        if (!this._isEffect) {
            context = this._canvas.context;
        }
        else {
            context = this._canvas.effectContext;
        }
        this._applyStyle(context); // Set the appropriate style
        this._onDraw(context); // Call on the child class to draw their specific stuff
        this._restoreStyle(context); // Restore original style
        this._isDrawn = true;
    }
    /**
     * _setIsOffScreen
     *
     * determine whether this element is off screen
     * @param	canvasDimensions
     *
     * */
    _setIsOffScreen(canvasDimensions) {
        this._isOffScreen = !toolkip_maths_1.doBasicRectsOverlap(canvasDimensions, this._dimensions);
    }
    /**
     * _setDimensions
     *
     * allow outsiders to update the internal set of dimensions for this element
     * @param	dim
     *
     */
    _setDimensions(dim) {
        this._dimensions = dim;
        if (this._canvas) {
            this._canvas.needsRedraw = true;
        }
    }
    /**
     * _setCanvas
     *
     * Set our internal canvas
     * @param canvas
     *
     */
    _setCanvas(canvas) {
        this._canvas = canvas;
    }
    //#endregion
    //#region EVENT HANDLING FOR CANVAS ELEMENTS
    /** collect event listeners */
    addEventListener(eventType, eventFunc) {
        let list = this._eventFunctions[eventType];
        if (!list) {
            list = [];
            this._eventFunctions[eventType] = list;
        }
        list.push(eventFunc);
    }
    /** handle click events */
    click(pt, e) {
        this.handleEvent(_interfaces_1.EventTypeEnum.CLICK, pt, e);
    }
    /** handle double clicks */
    doubleClick(pt, e) {
        this.handleEvent(_interfaces_1.EventTypeEnum.DBL_CLICK, pt, e);
    }
    /** handle the right click */
    rightClick(pt, e) {
        this.handleEvent(_interfaces_1.EventTypeEnum.R_CLICK, pt, e);
    }
    /** handle when the mouse enters the element */
    hover(pt, e) {
        this.handleEvent(_interfaces_1.EventTypeEnum.HOVER, pt, e);
    }
    /** handle when the mouse leaves the element */
    leave(pt, e) {
        this.handleEvent(_interfaces_1.EventTypeEnum.LEAVE, pt, e);
    }
    /** handle the keypress event */
    keyPress(pt, e) {
        this.handleEvent(_interfaces_1.EventTypeEnum.KEY_PRESS, pt, e);
    }
    /** handle the focus event */
    focus(pt, e) {
        this.handleEvent(_interfaces_1.EventTypeEnum.FOCUS, pt, e);
    }
    /** handle the blur event */
    blur(pt, e) {
        this.handleEvent(_interfaces_1.EventTypeEnum.BLUR, pt, e);
    }
    /**
     * handleEvent
     *
     * generic handler for all events
     *
     */
    handleEvent(eventType, pt, e) {
        // Make sure we apply properties regardless of whether there are additional handlers
        if ((eventType === _interfaces_1.EventTypeEnum.BLUR) || (eventType === _interfaces_1.EventTypeEnum.LEAVE)) {
            if (this._parent) {
                this._parent.removeElement(this.id + "|e");
            }
            this._isHoverTarget = false;
        }
        else if (eventType === _interfaces_1.EventTypeEnum.HOVER) {
            this._isHoverTarget = true;
        }
        // Add the event to the list
        let list = this._eventFunctions[eventType];
        if (!list) {
            return;
        }
        // handle all of the callbacks
        let func;
        for (func of list) {
            func(pt, e);
        }
        // If we have a canvas, tell it to redraw
        if (!this._canvas) {
            this._canvas.needsRedraw = true;
        }
    }
    //#endregion
    //#region HIDE AND SHOW THE ELEMENT
    /**
     * swapVisibilty
     *
     * Change whether this element is hidden or shown
     *
     */
    swapVisibility() {
        if (this._isHidden) {
            this.show();
        }
        else {
            this.hide();
        }
    }
    /**
     * hide
     *
     * Hide this element
     *
     */
    hide() {
        if (this._isHidden) {
            return;
        }
        this._isHidden = true;
        this._canvas.needsRedraw = true;
    }
    /**
     * show
     *
     * Show this element if it was hidden
     *
     */
    show() {
        if (!this._isHidden) {
            return;
        }
        this._isHidden = false;
        this._canvas.needsRedraw = true;
    }
    //#endregion
    //#region DEBUGGING FUNCTIONS
    /**
     * _debugDimensions
     *
     * display dimensions for debugging purposes
     *
     */
    _debugDimensions() {
        console.log("CANVAS ELEM: " + this._id);
        console.log("x: " + Math.round(this._displayDimensions.x) + " (from " + this._dimensions.x + ")");
        console.log("y: " + Math.round(this._displayDimensions.y) + " (from " + this._dimensions.y + ")");
        console.log("w: " + Math.round(this._displayDimensions.w) + " (from " + this._dimensions.w + ")");
        console.log("h: " + Math.round(this._displayDimensions.h) + " (from " + this._dimensions.h + ")");
        console.log("\nparent: " + (this._parent ? this._parent.id : "none"));
        console.log("===\n");
        if (this._canvas) {
            this._canvas.debugRelativeDimensions();
        }
        console.log("offscreen? " + this._isOffScreen);
        console.log("--------------------\n\n");
    }
    /**
     * debugDimensions
     *
     * public function for debugging purposes
     *
     */
    debugDimensions() {
        this._debugDimensions();
    }
}
exports._CanvasElement = _CanvasElement;
