"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toolkip_drawable_1 = require("@kipprice/toolkip-drawable");
const toolkip_maths_1 = require("@kipprice/toolkip-maths");
const _interfaces_1 = require("./_interfaces");
const canvasGroup_1 = require("./canvasGroup");
const toolkip_object_helpers_1 = require("@kipprice/toolkip-object-helpers");
const toolkip_style_helpers_1 = require("@kipprice/toolkip-style-helpers");
/**----------------------------------------------------------------------------
 * @class HTML5Canvas
 * ----------------------------------------------------------------------------
 * class that represents a set of tools around the HTML5 canvas
 * @author	Kip Price
 * @version 1.1
 * ----------------------------------------------------------------------------
 */
class HTML5Canvas extends toolkip_drawable_1._Drawable {
    //#endregion
    //#region CONSTRUCTOR
    /**
     * Create a HTML5 canvas element
     *
     * @param	id			Unqiue ID to use for the canvas
     * @param	options		Options to create the canvas with
     *
     */
    constructor(id, options) {
        super();
        if (id) {
            this._id = id;
        }
        else {
            this._id = "canvas";
        }
        // initialize the layers property
        this._layers = [];
        this._needsInitialDimensions = true;
        this._reconcileOptions(options); // Pull in user options
        this._initializeRectangles(); // Initialize the viewing rectangles
        this._createElements(); // Create elements
        this._addEventListeners(); // Add all relevant event listeners
    }
    get relativeView() { return this._relativeView; }
    get zoomFactor() { return this._zoomFactor; }
    set zoomFactor(zoom) { this._zoomFactor = zoom; }
    get needsRedraw() { return this._needsRedraw; }
    set needsRedraw(value) { this._needsRedraw = value; }
    /** public getter for canvas element */
    get canvas() { return this._elems.base; }
    /** public getter for effects canvas */
    get effectCanvas() { return this._elems.effectCanvas; }
    get context() { return this._context; }
    get effectContext() { return this._effectContext; }
    get layers() { return this._layers; }
    set onPreRender(preRender) { this._onPreRender = preRender; }
    //#endregion
    //#region HANDLE INITIALIZATION
    /**
     * _reconcileOptions
     *
     * pull in default options
     *
     * @param	userOptions		The options to reconcile
     *
     */
    _reconcileOptions(userOptions) {
        if (!userOptions) {
            userOptions = {};
        }
        let defaults = this._createDefaultOptions();
        this._options = toolkip_object_helpers_1.reconcileOptions(userOptions, defaults);
    }
    /**
     * _createDefaultOptions
     *
     * set our default options
     *
     * @returns	The set of default options for canvases
     *
     */
    _createDefaultOptions() {
        let defaults = {
            RENDER_RATE: 30,
            ZOOM_DELTA: () => {
                let out = {
                    x: 0.03 * this._zoomFactor.x,
                    y: 0.03 * this._zoomFactor.y
                };
                return out;
            },
            SIZE: {
                width: 600,
                height: 450
            },
            MAX_ZOOM: {
                x: 15,
                y: 15
            },
            MIN_ZOOM: {
                x: 0.1,
                y: 0.1
            }
        };
        return defaults;
    }
    /**
     * _initializeRectangles
     *
     * create the rectangles that the canvas needs to care about
     *
     */
    _initializeRectangles() {
        // ABSOLUTE
        this._absoluteDimensions = {
            x: 0,
            y: 0,
            w: this._options.SIZE.width,
            h: this._options.SIZE.height
        };
        // RELATIVE
        this._relativeView = {
            x: 0,
            y: 0,
            w: this._options.SIZE.width,
            h: this._options.SIZE.height
        };
        // ZOOM SCALE
        this._zoomFactor = {
            x: 1,
            y: 1
        };
    }
    /**
     * _shouldSkipCreateElements
     *
     * Don't let the constructor create elements
     *
     */
    _shouldSkipCreateElements() { return true; }
    /**
     * _createElements
     *
     * create the canvas element
     *
     */
    _createElements() {
        // create the canvas elements
        this._elems = {
            base: this._createCanvas(),
            effectCanvas: this._createCanvas(true)
        };
        // create the contexts for each
        this._context = this._elems.base.getContext("2d");
        this._effectContext = this._elems.effectCanvas.getContext("2d");
    }
    /**
     * _createCanvas
     *
     * create an actual canvas element and assigns it to our element
     *
     * @param 	isForEffects 	If true, creates an effect canvas instead
     *
     * @returns	The canvas that is created
     *
     */
    _createCanvas(isForEffects) {
        let canvas;
        // Create a canvas of the right size
        canvas = document.createElement("canvas");
        canvas.setAttribute("width", this._options.SIZE.width.toString());
        canvas.setAttribute("height", this._options.SIZE.height.toString());
        // give the canvas the right class
        let cls = "canvas";
        if (isForEffects) {
            cls += " effects";
        }
        toolkip_style_helpers_1.addClass(canvas, cls);
        return canvas;
    }
    //#endregion
    //#region DRAWING COMMANDS
    /**
     * draw
     *
     * draws the canvas element
     *
     * @param	parent	The parent element to draw on
     *
     */
    draw(parent) {
        super.draw(parent);
        parent.appendChild(this._elems.effectCanvas);
        // flag that we need to redraw instead of calling it directly
        this._needsRedraw = true;
    }
    /**
     * clear
     *
     * clear the canvases
     *
     */
    clear() {
        this._context.clearRect(0, 0, this._options.SIZE.width, this._options.SIZE.height);
        this._effectContext.clearRect(0, 0, this._options.SIZE.width, this._options.SIZE.height);
    }
    /**
     * _drawEachElement
     *
     * loop through every element in the canvas
     *
     */
    _drawEachElement() {
        // first clear the canvas
        this.clear();
        // then loop through each of the layers in order
        let layer;
        for (layer of this._layers) {
            if (!layer) {
                continue;
            }
            layer.updateDimensions(this._relativeView);
            layer.draw();
        }
    }
    /**
     * _renderFrame
     *
     * make sure we actually draw something
     *
     */
    _renderFrame() {
        // Make sure we only do this kind of stuff if something changed
        if (this._needsRedraw) {
            if (this._onPreRender) {
                this._onPreRender();
            } // Call pre-render code
            this._drawEachElement(); // actually draw elements
            this._needsRedraw = false; // Set that we no longer need to redraw
        }
        // Add animation listeners
        window.requestAnimationFrame(() => { this._renderFrame(); });
    }
    //#endregion
    //#region ADD/REMOVE ELEMENTS
    /**
     * addElement
     *
     * add an element to the canvas
     *
     * @param	elem	The element to add to the canvas
     *
     */
    addElement(elem) {
        // grab the appropriate layer to add to (or create it if it doesn't yet exist)
        let layer = this._getOrCreateLayer(elem.layer);
        // Add the element to the appropriate layer
        layer.addElement(elem);
        // Update the absolute dimensions
        this._updateAbsoluteDimensionsFromElem(elem.dimensions);
        // Mark that we need to redraw
        this._needsRedraw = true;
    }
    /**
     * removeElement
     *
     * remove an element from our internal collection
     *
     * @param	id		The id of the element to remove
     *
     * @returns	True if the element was removed
     *
     */
    removeElement(id) {
        let success;
        // rely on the layers to remove their own elements
        let layer;
        for (layer of this._layers) {
            if (!layer) {
                continue;
            }
            success = layer.removeElement(id);
            if (success) {
                break;
            }
        }
        return success;
    }
    /**
     * _updateAbsoluteDimensionsFromElem
     *
     * Update how big the canvas is based on the elements that exist on the canvas
     *
     * @param	addedDimensions		The dimensions of the element we are adding
     *
     */
    // TODO: Does this need to exist?
    _updateAbsoluteDimensionsFromElem(addedDimensions) {
        // Check for x extrema changes
        if (this._needsInitialDimensions || addedDimensions.x < this._absoluteDimensions.x) {
            this._absoluteDimensions.x = addedDimensions.x;
        }
        if ((addedDimensions.x + addedDimensions.w) > (this._absoluteDimensions.x + this._absoluteDimensions.w)) {
            this._absoluteDimensions.w = ((addedDimensions.x + addedDimensions.w) - this._absoluteDimensions.x);
        }
        // Check for y extrema changes
        if (this._needsInitialDimensions || addedDimensions.y < this._absoluteDimensions.y) {
            this._absoluteDimensions.y = addedDimensions.y;
        }
        if ((addedDimensions.y + addedDimensions.h) > (this._absoluteDimensions.y + this._absoluteDimensions.h)) {
            this._absoluteDimensions.h = ((addedDimensions.y + addedDimensions.h) - this._absoluteDimensions.y);
        }
        this._needsInitialDimensions = false;
    }
    /**
     * _getOrCreateLayer
     *
     * find the existing layer or create it if it doesn't exist
     *
     * @param	layerIdx	The index of the layer
     *
     * @returns	The group for the layer
     *
     */
    _getOrCreateLayer(layerIdx) {
        let layer = this._layers[layerIdx];
        if (!layer) {
            layer = new canvasGroup_1.CanvasGroup("layer" + layerIdx);
            this._layers[layerIdx] = layer;
            layer.canvas = this;
        }
        return layer;
    }
    //#endregion
    //#region ZOOM HANDLING
    /**
     * _onMouseWheel
     *
     * handle the mousewheel event
     *
     * @param	event	The actual event triggered by the mousewheel
     *
     */
    _onMouseWheel(event) {
        let delta = event.deltaY;
        delta = (Math.abs(delta) / delta);
        this.zoom(delta);
    }
    /**
     * zoom
     *
     * actually zoom the canvas an appropriate amount
     *
     * @param	delta	The amount to zoom by
     *
     */
    zoom(delta) {
        // Get the standard zoom we should be applying
        let zoomDelta = this._options.ZOOM_DELTA();
        // how much has the zoom value changed?
        let zoomXDelta = this._zoomFactor.x + (delta * zoomDelta.x);
        zoomXDelta = toolkip_maths_1.normalizeValue(zoomXDelta, this._options.MIN_ZOOM.x, this._options.MAX_ZOOM.x);
        let zoomYDelta = this._zoomFactor.y + (delta * zoomDelta.y);
        zoomYDelta = toolkip_maths_1.normalizeValue(zoomYDelta, this._options.MIN_ZOOM.y, this._options.MAX_ZOOM.y);
        // The actual width is equal to:
        //	physical dimension * (1 / zoom value)
        let physicalDim = this._options.SIZE;
        let newWidth = toolkip_maths_1.roundToPlace(physicalDim.width * (1 / zoomXDelta), 10);
        this._zoomFactor.x = zoomXDelta;
        let newHeight = toolkip_maths_1.roundToPlace(physicalDim.height * (1 / zoomYDelta), 10);
        this._zoomFactor.y = zoomYDelta;
        // Now calculate how different that is from the current dimensions
        let widthDelta = newWidth - this._relativeView.w;
        let heightDelta = newHeight - this._relativeView.h;
        // Create the new view based on the appropriate deltas
        let newView = {
            x: this._relativeView.x - (widthDelta / 2),
            y: this._relativeView.y - (heightDelta / 2),
            w: this._relativeView.w + widthDelta,
            h: this._relativeView.h + heightDelta
        };
        this._relativeView = newView;
        this._needsRedraw = true;
    }
    /**
     * changeView
     *
     * update the view being displayed on the canvas
     *
     * @param	newDisplay	The dimensions of the new view
     *
     */
    changeView(newDisplay) {
        this._relativeView = newDisplay;
    }
    //#endregion
    //#region PAN HANDLING
    /**
     * _onDrag
     *
     * move the canvas around via a mouse drag
     *
     * @param	delta	The amount the mouse has dragged
     *
     */
    _onDrag(delta) {
        if (!delta) {
            return;
        }
        let newCorner = this._calculateNewCornerFromDelta(delta);
        this.pan(newCorner);
    }
    /**
     * _calculateNewCornerFromDelta
     *
     * take zoom into account when calculating the new corner of the canvas
     *
     * @param	delta	The amount that has been dragged
     *
     * @returns	The new corner for the canvas
     *
     */
    _calculateNewCornerFromDelta(delta) {
        let newCorner = {
            x: this._relativeView.x - (delta.x / this._zoomFactor.x),
            y: this._relativeView.y - (delta.y / this._zoomFactor.y)
        };
        return newCorner;
    }
    /**
     * pan
     *
     * handle a pan event
     *
     * @param	cornerPoint		The new corner for the canvas
     *
     */
    pan(cornerPoint) {
        this._relativeView.x = cornerPoint.x;
        this._relativeView.y = cornerPoint.y;
        this._needsRedraw = true;
    }
    //#endregion
    //#region EVENT HANDLING
    /**
     * _addEventListeners
     *
     * add all event listeners for the canvas itself
     *
     */
    _addEventListeners() {
        // Add zoom listeners
        window.addEventListener("mousewheel", (event) => {
            this._onMouseWheel(event);
        });
        // Add pan listeners
        window.addEventListener("mousedown", (event) => {
            this._elems.base.style.cursor = "-webkit-grabbing";
            this._startDragPoint = {
                x: event.screenX,
                y: event.screenY
            };
        });
        window.addEventListener("mousemove", (event) => {
            if (!this._startDragPoint) {
                return;
            }
            this._deltaDragPoint = {
                x: event.screenX - this._startDragPoint.x,
                y: event.screenY - this._startDragPoint.y
            };
            this._startDragPoint = {
                x: event.screenX,
                y: event.screenY
            };
            this._onDrag(this._deltaDragPoint);
        });
        window.addEventListener("mouseup", () => {
            this._startDragPoint = null;
            this._deltaDragPoint = {
                x: 0,
                y: 0
            };
            this._elems.base.style.cursor = "-webkit-grab";
        });
        this._elems.base.addEventListener("click", (e) => {
            let pt = {
                x: e.pageX,
                y: e.pageY
            };
            this._onClick(e, pt);
        });
        this._elems.base.addEventListener("mousemove", (e) => {
            let pt = {
                x: e.pageX,
                y: e.pageY
            };
            this._onHover(e, pt);
        });
        // Add animation listeners
        window.requestAnimationFrame(() => {
            this._renderFrame();
        });
    }
    /**
     * _onClick
     *
     * handle clicks on the canvas
     *
     * @param	e		The event itself of the mouse click
     * @param	point	The point that was clicked
     *
     */
    _onClick(e, point) {
        this._handleEvent(_interfaces_1.EventTypeEnum.CLICK, point, e);
    }
    /**
     * _onHover
     *
     * handle hovering over elements on the canvas
     *
     * @param	e		The actual mouseover event
     * @param	point	The point that's being hovered over
     *
     */
    _onHover(e, point) {
        this._handleEvent(_interfaces_1.EventTypeEnum.HOVER, point, e);
    }
    /**
     * _handleEvent
     *
     * handle a general event
     *
     * @param	eventType	The type of event being handled
     * @param	point		The point this event applies to
     * @param	e			The actual event data
     *
     */
    _handleEvent(eventType, point, e) {
        //let relativePt: IPoint = this.convertPhysicalPointToRelativePoint(point);
        let layer;
        for (layer of this._layers) {
            if (!layer) {
                continue;
            }
            layer.handleEvent(eventType, point, e);
        }
    }
    //#endregion
    //#region POINT CONVERSION FUNCTIONS
    /**
     * convertRelativePointToAbsolutePoint
     *
     * convert a point from our relative canvas frame (e.g. visible frame) and
     * the physical space
     *
     * @param	relativePt	The point to convert
     *
     * @returns	The converted point
     *
     */
    convertRelativePointToPhysicalPoint(relativePt) {
        let out;
        // Grab dimensions of the canvas
        // TODO: make more versatile
        let canvasLeft = this._elems.base.offsetLeft;
        let canvasTop = this._elems.base.offsetTop;
        let canvasWidth = this._elems.base.offsetWidth;
        let canvasHeight = this._elems.base.offsetHeight;
        let x = (((relativePt.x - this._relativeView.x) * canvasWidth) / this._relativeView.w) + canvasLeft;
        let y = (((relativePt.y - this._relativeView.y) * canvasHeight) / this._relativeView.h) + canvasTop;
        out = {
            x: x,
            y: y
        };
        return out;
    }
    /**
     * convertPhysicalPointToRelativePoint
     *
     * convert a physical point to one within the visible canvas frame
     *
     * @param	physicalPt	The point to convert
     *
     * @returns	The converted relative point
     *
     */
    convertPhysicalPointToRelativePoint(physicalPt) {
        let out;
        // Grab dimensions of the canvas
        // TODO: make more versatile
        let canvasLeft = this._elems.base.offsetLeft;
        let canvasTop = this._elems.base.offsetTop;
        let canvasWidth = this._elems.base.offsetWidth;
        let canvasHeight = this._elems.base.offsetHeight;
        // convert each aspect of the point
        let x = (((physicalPt.x - canvasLeft) * this._relativeView.w) / canvasWidth) + this._relativeView.x;
        let y = (((physicalPt.y - canvasTop) * this._relativeView.h) / canvasHeight) + this._relativeView.y;
        out = {
            x: x,
            y: y
        };
        return out;
    }
    /**
     * convertAbsolutePointToRelativePoint
     *
     * convert a point from absolute position to a visible point
     *
     */
    convertAbsolutePointToRelativePoint(absolutePt) {
        let out;
        // absolute position may exist outside of vsiible rect, but will be visible at some point in the canvas
        out = {
            x: toolkip_maths_1.roundToPlace((absolutePt.x - this._relativeView.x) * this._zoomFactor.x, 10),
            y: toolkip_maths_1.roundToPlace((absolutePt.y - this._relativeView.y) * this._zoomFactor.y, 10)
        };
        return out;
    }
    /**
     * convertRelativePointToAbsolutePoint
     *
     * convert a point from a visible point to an absolute point
     *
     * @param	relativePt	The point in relative dimensions
     *
     * @returns	THe converted absolute point
     *
     */
    convertRelativePointToAbsolutePoint(relativePt) {
        let out;
        out = {
            x: toolkip_maths_1.roundToPlace(((relativePt.x / this._zoomFactor.x) + this._relativeView.x), 10),
            y: toolkip_maths_1.roundToPlace(((relativePt.y / this._zoomFactor.y) + this._relativeView.y), 10)
        };
        return out;
    }
    /**
     * convertAbsoluteRectToRelativeRect
     *
     * Turn a set of absolute dimensions to their relative counterpart
     *
     * @param 	absoluteRect 	The absolute rect to convert to relative dimensions
     *
     * @returns	The converted rectangle
     *
     */
    convertAbsoluteRectToRelativeRect(absoluteRect) {
        // calculate the top left corner
        let leftTopCorner = {
            x: absoluteRect.x,
            y: absoluteRect.y
        };
        let relLeftTopCorner = this.convertAbsolutePointToRelativePoint(leftTopCorner);
        // calculate the bottom-right corner
        let rightBottomCorner = {
            x: absoluteRect.x + absoluteRect.w,
            y: absoluteRect.y + absoluteRect.h
        };
        let relRightBottomCorner = this.convertAbsolutePointToRelativePoint(rightBottomCorner);
        // return a rect based on the corners we calculated
        return {
            x: relLeftTopCorner.x,
            y: relLeftTopCorner.y,
            w: relRightBottomCorner.x - relLeftTopCorner.x,
            h: relRightBottomCorner.y - relLeftTopCorner.y
        };
    }
    //#endregion
    //#region HELPERS
    /**
     * debugRelativeDimensions
     *
     * debug the current view of the canvas
     *
     */
    debugRelativeDimensions() {
        console.log("CANVAS DIMENSIONS:");
        console.log(Math.round(this.relativeView.x) + ", " + Math.round(this.relativeView.y));
        console.log(Math.round(this.relativeView.w) + " x " + Math.round(this.relativeView.h));
    }
}
exports.HTML5Canvas = HTML5Canvas;
