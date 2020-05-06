"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toolkip_drawable_1 = require("@kipprice/toolkip-drawable");
const toolkip_object_helpers_1 = require("@kipprice/toolkip-object-helpers");
const svgHelpers_1 = require("./svgHelpers");
const groupElement_1 = require("./elements/groupElement");
const svgDefinitions_1 = require("./svgDefinitions");
const toolkip_draggable_1 = require("@kipprice/toolkip-draggable");
/**----------------------------------------------------------------------------
 * @class 	SVGDrawable
 * ----------------------------------------------------------------------------
 * Create a drawable SVG canvas
 * @author	Kip Price
 * @version 1.1.0
 * ----------------------------------------------------------------------------
 */
class SVGDrawable extends toolkip_drawable_1._Drawable {
    //#endregion
    /**
     * Constructs a basic SVG canvas
     * @param 	id     The ID of the canvas
     * @param 	bounds The real-world (e.g. in window) bounds of the canvas
     * @param 	opts   Any options that should be applied to the canvas
     *
     */
    constructor(bounds, opts) {
        super();
        this._bounds = bounds || { x: 0, y: 0, w: 0, h: 0 };
        // Initialize the default maxima / minima
        this._initializeInternalSizing();
        // Reconcile options
        let defaults = this._createDefaultOptions();
        this._options = toolkip_object_helpers_1.reconcileOptions(opts, defaults);
        // create elements needed by this drawable
        this._createElements();
        // Add event listeners
        this._addEventListeners();
    }
    get view() {
        window.setTimeout(() => { this._verifyViewMeetsAspectRatio(); }, 0);
        return this._view;
    }
    set view(rect) {
        this._view.x = rect.x;
        this._view.y = rect.y;
        this._view.w = rect.w;
        this._view.h = rect.h;
    }
    get options() { return this._options; }
    /** styles for the SVG element */
    get style() { return this._group.style; }
    _shouldSkipCreateElements() { return true; }
    /**
     * _initializeInternalSizing
     * ----------------------------------------------------------------------------
     * Make sure we have default values for extrema
     *
     */
    _initializeInternalSizing() {
        this._extrema = {
            min: {
                x: 1000000,
                y: 1000000
            },
            max: {
                x: 0,
                y: 0
            }
        };
        // Initialize the viewport
        this._view = {
            x: 0,
            y: 0,
            w: 0,
            h: 0
        };
    }
    /**
     * _createDefaultOptions
     * ----------------------------------------------------------------------------
     * Get the set of default options
     * @returns	The created default options
     *
     */
    _createDefaultOptions() {
        let defaults = {
            gutter: 2,
            auto_resize: true,
            zoom_x: 0.08,
            zoom_y: 0.08,
            pan_x: true,
            pan_y: true,
            prevent_events: false
        };
        return defaults;
    }
    /**
     * _createElements
     * ----------------------------------------------------------------------------
     * Create the elements needed for this SVG drawable
     *
     */
    _createElements() {
        // Create the base element
        this._elems.base = svgHelpers_1.createSVG({
            id: this._id,
            attr: {
                width: this._bounds.w,
                height: this._bounds.h
            }
        });
        // Create the definitions element
        let defs = new svgDefinitions_1.SVGDefinitionsElement();
        this._elems.definitions = defs.base;
        this._elems.base.appendChild(this._elems.definitions);
        // add the group that contains everything
        this._group = new groupElement_1.GroupElement({ parent: this._elems.base });
        this._elems.coreGroup = this._group.base;
        this._elems.base.appendChild(this._group.base);
    }
    //#region EVENT HANDLING
    /**
     * _addEventListeners
     * ----------------------------------------------------------------------------
     * Adds the relevant event listeners for the SVG object
     *
     */
    _addEventListeners() {
        // don't listen for events if asked not to
        if (this._options.prevent_events) {
            return;
        }
        // Add the wheel listener to the SVG element
        this.base.addEventListener("wheel", (e) => {
            let delta = e.deltaY;
            delta = (delta > 0) ? 1 : -1;
            this._onZoom(delta);
        });
        // Add the drag listeners
        toolkip_draggable_1.makeDraggable(this.base, {
            target: document.body,
            onMove: (delta) => {
                this._onPan(delta);
            },
            isNonStandard: true
        });
    }
    /**
     * _onZoom
     *
     * handle zooming in & out
     * @param	direction	If positive, zooms in. If negative, zooms out
     *
     */
    _onZoom(direction) {
        let xAmt = this._options.zoom_x * direction;
        let yAmt = this._options.zoom_y * direction;
        let xUnit = this._view.w * xAmt;
        let yUnit = this._view.h * yAmt;
        // Resize appropriately in the x-dimension
        if (this._options.zoom_x) {
            this._view.x -= xUnit;
            this._view.w += (2 * xUnit);
        }
        // Resive appropriately in the y-dimension
        if (this._options.zoom_y) {
            this._view.y -= yUnit;
            this._view.h += (2 * yUnit);
        }
        // refresh the viewbox attribute
        this.generateViewboxAttribute(true);
    }
    /**
     * _onPan
     *
     * handle panning the SVG canvas
     * @param	delta	The amount to pan by
     *
     */
    _onPan(delta) {
        if (this._options.pan_x) {
            this._view.x -= (this.calculateSVGWidth(delta.x));
        }
        if (this._options.pan_y) {
            this._view.y -= (this.calculateSVGHeight(delta.y));
        }
        // Update the view box
        this.generateViewboxAttribute(true);
    }
    //#endregion
    //#region WIDTH AND HEIGHT CALCULATION
    /**
     * Sets the real-world width of the canvas
     * @param 	w 	The width to set
     *
     */
    set width(w) {
        this._bounds.w = w;
        this._elems.base.setAttribute("width", w.toString());
    }
    /**
     * Sets the real-world height of the canvas
     * @param 	h 	The height to set
     *
     */
    set height(h) {
        this._bounds.h = h;
        this._elems.base.setAttribute("height", h.toString());
    }
    /**
     * generateViewboxAttribute
     *
     * Create a string that can be used in the viewbox attribute for the SVG
     * @param  	set		True if we should also set the attribute after generating it
     * @returns The viewbox attribute for the current view
     *
     */
    generateViewboxAttribute(set) {
        let v_box = "";
        // Make sure we have no negative widths or heights
        if (this._view.w < 0) {
            this._view.w = 0;
        }
        if (this._view.h < 0) {
            this._view.h = 0;
        }
        // Generate the view box string
        v_box = this._view.x + " " + this._view.y + " " + this._view.w + " " + this._view.h;
        // Set the attribute if requested
        if (set) {
            this.base.setAttribute("viewbox", v_box);
            this.base.setAttribute("viewBox", v_box);
        }
        // Return the viewbox value
        return v_box;
    }
    /**
     * _calculateView
     *
     * Calculate what the view of the SVG should be, based on the extrema
     * @returns True if the extrema were appropriately calculated
     *
     */
    _calculateView() {
        // Update to the extrema
        this._view.x = this._extrema.min.x - this._options.gutter;
        this._view.y = this._extrema.min.y - this._options.gutter;
        this._view.w = (this._extrema.max.x - this._extrema.min.x) + (2 * this._options.gutter);
        this._view.h = (this._extrema.max.y - this._extrema.min.y) + (2 * this._options.gutter);
        // check that this meets the expected dimensions
        this._verifyViewMeetsAspectRatio();
        // refresh the viewbox attribute
        this.generateViewboxAttribute(true);
        // Return that we successfully updated the view
        return true;
    }
    _verifyViewMeetsAspectRatio() {
        let expectedRatio = this._bounds.w / this._bounds.h;
        let currentRatio = this._view.w / this._view.h;
        if (currentRatio < expectedRatio) {
            this._view.w = this._view.h * expectedRatio;
        }
        else if (currentRatio > expectedRatio) {
            this._view.h = this._view.w / expectedRatio;
        }
    }
    /**
     * _updateExtrema
     *
     * Updates the extreme points of this SVG element after adding an element
     * @param 	extrema 	The extrema of the element just added
     *
     */
    _updateExtrema(extrema) {
        // Update the minima if appropriate
        if (extrema.min.x < this._extrema.min.x) {
            this._extrema.min.x = extrema.min.x;
        }
        if (extrema.min.y < this._extrema.min.y) {
            this._extrema.min.y = extrema.min.y;
        }
        // Update the maxima is appropriate
        if (extrema.max.x > this._extrema.max.x) {
            this._extrema.max.x = extrema.max.x;
        }
        if (extrema.max.y > this._extrema.max.y) {
            this._extrema.max.y = extrema.max.y;
        }
        if (this._options.auto_resize) {
            this._calculateView();
        }
    }
    //#endregion
    //#region CONVERSIONS
    /**
     * calculateSVGCoordinates
     *
     * Calculates the SVG coordinates from real coordinates
     * @param   pt	The real coordinates to convert
     * @returns The SVG coordinates for this real point
     *
     */
    calculateSVGCoordinates(pt) {
        return this._convertCoordinates(pt, this._view, this._bounds);
    }
    /**
     * calculateScreenCoordinates
     *
     * Calculate the real coordinates from SVG coordinates
     * @param 	pt 	The point to convert to real coordinates
     * @returns	The real coordinates for this SVG point
     *
     */
    calculateScreenCoordinates(pt) {
        let outPt = this._convertCoordinates(pt, this._bounds, this._view);
        return outPt;
    }
    /**
     * _convertCoordinates
     *
     * Convert one set of coordinates to another
     * @param	pt			The point to convert
     * @param	numerator	The ratio to consider the numerator
     * @param	denominator	The ratio to consider the denominator
     * @returns	The converted point
     *
     */
    _convertCoordinates(pt, numerator, denominator) {
        let out;
        let x_ratio = (numerator.w / denominator.w);
        let y_ratio = (numerator.h / denominator.h);
        out = {
            x: (x_ratio * (pt.x - denominator.x)) + numerator.x,
            y: (y_ratio * (pt.y - denominator.y)) + numerator.y
        };
        return out;
    }
    /**
     * _convertDistance
     *
     *
     *
     */
    _convertDistance(measure, numerator, denominator) {
        let ratio = numerator / denominator;
        return (measure * ratio);
    }
    /**
     * calculateSVGWidth
     *
     * Calculate how wide something is in SVG coordinates when measured in real
     * coordinates.
     *
     * @param	width	The width to convert
     *
     * @returns	The SVG equivalent of the width
     *
     */
    calculateSVGWidth(width) {
        return this._convertDistance(width, this._view.w, this._bounds.w);
    }
    /**
     * calculateSVGHeight
     *
     * Calculate how high something is in SVG coordinates from the real
     * measurement.
     *
     * @param	height	The height to convert
     *
     * @returns	The converted height
     *
     */
    calculateSVGHeight(height) {
        return this._convertDistance(height, this._view.h, this._bounds.h);
    }
    calculateScreenWidth(width) {
        return this._convertDistance(width, this._bounds.w, this._view.w);
    }
    calculateScreenHeight(height) {
        return this._convertDistance(height, this._bounds.h, this._view.h);
    }
    //#endregion
    //#region ADD CHILDREN
    /**
     * addPath
     * ----------------------------------------------------------------------------
     * Add a path to our SVG canvas
     * @param 	points 	The points in the path to add
     * @param 	noFinish 	True if this path should be left unfinished
     * @param 	attr 		Any attributes that should be set for the path
     *
     * @returns	The created PathElement
     */
    addPath(points, noFinish, attr) {
        let path = this._group.addPath(points, noFinish, attr);
        this._addElementListener(path);
        return path;
    }
    /**
     * addRectangle
     * ----------------------------------------------------------------------------
     * Add a rectangle to our SVG canvas
     * @param 	x 		X coordinate for the rect
     * @param 	y 		y coordinate for the rect
     * @param 	width 	Width for the rect
     * @param 	height 	Height for the rect
     * @param 	attr 	Any attributes that should be set for the rect
     *
     * @returns	The created rectangle
     */
    addRectangle(x, y, width, height, attr) {
        let rect = this._group.addRectangle(x, y, width, height, attr);
        this._addElementListener(rect);
        return rect;
    }
    /**
     * addCircle
     * ----------------------------------------------------------------------------
     * Add a circle to our SVG canvas
     * @param 	centerPt	Central point for the circle
     * @param 	radius		Radius for the circle
     * @param 	attr		Any attributes that should be set for the circle
     *
     * @returns	The created circle
     */
    addCircle(centerPt, radius, attr) {
        let circle = this._group.addCircle(centerPt, radius, attr);
        this._addElementListener(circle);
        return circle;
    }
    /**
     * addPerfectArc
     * ----------------------------------------------------------------------------
     * Add an arc to our SVG canvas
     * @param centerPt
     * @param radius
     * @param startDeg
     * @param endDeg
     * @param direction
     * @param attr
     *
     * @returns	The created arc
     */
    addPerfectArc(centerPt, radius, startDeg, endDeg, direction, attr) {
        let arc = this._group.addPerfectArc(centerPt, radius, startDeg, endDeg, direction, attr);
        this._addElementListener(arc);
        return arc;
    }
    /**
     * addPieSlice
     * ----------------------------------------------------------------------------
     * @param centerPt
     * @param radius
     * @param startDeg
     * @param endDeg
     * @param direction
     * @param attr
     *
     * @returns	The created pie slice
     */
    addPieSlice(centerPt, radius, startDeg, endDeg, direction, attr) {
        let pieSlice = this._group.addPieSlice(centerPt, radius, startDeg, endDeg, direction, attr);
        this._addElementListener(pieSlice);
        return pieSlice;
    }
    /**
     * addRegularPolygon
     * ----------------------------------------------------------------------------
     * Add a multi-sided polygon to our SVG canvas
     * @param 	centerPt 	Central point for the shape
     * @param 	sides 		Number of sides for the polygon
     * @param 	radius 		Radius for the polygon
     * @param 	attr 		Any attributes that should be set for the circle
     *
     * @returns	The created polygon
     */
    addRegularPolygon(centerPt, sides, radius, attr) {
        let polygon = this._group.addRegularPolygon(centerPt, sides, radius, attr);
        this._addElementListener(polygon);
        return polygon;
    }
    addRegularStar(centerPt, numberOfPoints, radius, innerRadius, attr) {
        let star = this._group.addRegularStar(centerPt, numberOfPoints, radius, innerRadius, attr);
        this._addElementListener(star);
        return star;
    }
    addText(text, point, originPt, attr) {
        let txt = this._group.addText(text, point, originPt, attr);
        this._addElementListener(txt);
        return txt;
    }
    addFlowableText(text, bounds, attr) {
        let txt = this._group.addFlowableText(text, bounds, attr);
        this._addElementListener(txt);
        return txt;
    }
    addGroup(attr) {
        let group = this._group.addGroup(attr);
        this._addElementListener(group);
        return group;
    }
    addShape(shapeType, scale, centerPt, attr) {
        let shape = this._group.addShape(shapeType, scale, centerPt, attr);
        this._addElementListener(shape);
        return shape;
    }
    _addElementListener(elem) {
        elem.addUpdateListener(() => {
            this._updateExtrema(elem.extrema);
        });
    }
    //#endregion
    /**
     * _convertPointsToPathPoints
     * ----------------------------------------------------------------------------
     * Helper function to turn an array of IPoint elements to IPathPoint elements
     * @param   points 	The points to convert
     * @param   scale  	The scale that should be applied to the IPoint before turning into a IPathPoint
     * @returns Array of scaled IPathPoints
     */
    _convertPointsToPathPoints(points, scale) {
        if (!scale) {
            scale = 1;
        }
        let pathPoints = [];
        // Loop through each of the points
        for (let pt of points) {
            pt.x *= scale; // Scale the x dimension
            pt.y *= scale; // Scale the y dimension
            pathPoints.push(pt);
        }
        return pathPoints;
    }
    //
    /**
     * rotateElement
     *
     * Rotates an element around a particular point
     * @param   elem         The element to rotate
     * @param   degree       How many degrees to rotate the element
     * @param   rotateAround What point to rotate around
     * @returns The rotated SVG Element
     *
     */
    rotateElement(elem, degree, rotateAround) {
        let box;
        // If we don't have a point around which to rotate, set it to be the center of the element
        if (!rotateAround) {
            box = elem.measureElement();
            rotateAround = {
                x: box.x + (box.w / 2),
                y: box.y + (box.h / 2)
            };
        }
        elem.base.setAttribute("transform", "rotate(" + degree + ", " + rotateAround.x + ", " + rotateAround.y + ")");
        return elem;
    }
    /**
     * clear
     *
     * Clear everything off the canvas
     *
     */
    clear() {
        this._group.clear();
    }
}
exports.SVGDrawable = SVGDrawable;
