"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toolkip_drawable_1 = require("@kipprice/toolkip-drawable");
const toolkip_data_structures_1 = require("@kipprice/toolkip-data-structures");
const svgStyle_1 = require("../svgStyle");
const toolkip_style_helpers_1 = require("@kipprice/toolkip-style-helpers");
const toolkip_primitive_helpers_1 = require("@kipprice/toolkip-primitive-helpers");
const svgHelpers_1 = require("../svgHelpers");
/**----------------------------------------------------------------------------
 * @class   SVGElem
 * ----------------------------------------------------------------------------
 * Creates an element on an SVG Drawable
 * @version 1.1
 * @author  Kip Price
 * ----------------------------------------------------------------------------
 */
class _SVGElem extends toolkip_drawable_1._Drawable {
    //#endregion
    /**
     * Creates an SVG element
     * @param   attributes  The attributes to create this element with
     *
     */
    constructor(attributes, ...addlArgs) {
        super();
        //#region DELEGEATES
        /** keep track of the last listener ID used */
        this._lastListenerId = 0;
        // initialize the attributes if they weren't included
        if (!attributes) {
            attributes = {};
        }
        // initialize the style
        this._style = new svgStyle_1.SVGStyle(attributes.svgStyle);
        // send all arguments to the _setAttributes function
        this._attributes = this._setAttributes(attributes, ...addlArgs);
        // create the elements
        this._createElements(this._attributes);
        // handle updating the extreme points of this element
        this._updateExtremaAndNotifyListeners(this._attributes);
    }
    /** generate the next listener ID */
    get _nextListenerId() {
        this._lastListenerId += 1;
        return this._lastListenerId.toString();
    }
    /** add a new listener */
    addUpdateListener(listener, id) {
        if (!this._onUpdateListeners) {
            this._onUpdateListeners = new toolkip_data_structures_1.Collection();
        }
        if (!id) {
            id = this._nextListenerId;
        }
        this._onUpdateListeners.add(id, listener);
    }
    /** notify listeners of a change */
    _notifyUpdateListeners() {
        window.setTimeout(() => {
            if (!this._onUpdateListeners) {
                return;
            }
            if (!this.extrema) {
                return;
            }
            this.scale(1);
            this._onUpdateListeners.map((value) => {
                if (!value) {
                    return;
                }
                value();
            });
        }, 0);
    }
    //#endregion
    //#region PROPERTIES
    /** unique identifier for the element */
    get id() { return this._attributes.id; }
    set id(id) { this._attributes.id = id; }
    get style() {
        window.setTimeout(() => {
            this._style.assignStyle(this._elems.base);
        }, 0);
        return this._style;
    }
    get base() { return this._elems.base; }
    get preventScaling() { return this._preventScaling; }
    get extrema() { return this._extrema; }
    /**
     * _shouldSkipCreateElements
     *
     * Determine whether we should allow elements to be drawn as part of the
     * constructor.
     *
     * @returns True, since we always need attributes
     *
     */
    _shouldSkipCreateElements() {
        return true;
    }
    /**
     * _createElements
     *
     * Create the elements that make up this SVG Element
     *
     * @param   attributes  Attributes for this element
     *
     */
    _createElements(attributes) {
        if (!attributes) {
            throw new Error("no attributes provided for SVG Element");
        }
        // determine the type of the SVG element
        let type = attributes.type;
        delete attributes.type;
        // if a class was provided, use it
        let cls = attributes.cls || "";
        delete attributes.cls;
        // Throw an error if no data was provided
        if (!type) {
            throw new Error("no SVG element type provided");
        }
        let parent = attributes.parent;
        delete attributes.parent;
        // TODO: take full advantage of the create method
        let elem = svgHelpers_1.createSVGElem({ type: type, attr: attributes });
        if (cls) {
            toolkip_style_helpers_1.addClass(elem, cls);
        }
        this._elems = {};
        this._elems.base = elem;
        // Add to the appropriate parent
        if (parent) {
            parent.appendChild(elem);
        }
        // track that this element should be non-scaling
        this._preventScaling = attributes.unscalable;
    }
    /**
     * measureElement
     *
     * Measures an element in the SVG canvas
     * @param   element 	The element to measure
     * @returns The dimensions of the element, in SVG coordinates
     *
     */
    measureElement() {
        let box;
        let addedParent;
        //TODO: determine if we need to be smarter about this
        // Add our base element to the view if it doesn't have anything
        // if (!this.base.parentNode) {
        // 	document.body.appendChild(this.base);
        // 	addedParent = true;
        // }
        // Get the bounding box for element
        box = this._elems.base.getBBox();
        // If we had to add the base element to the document, remove it
        // if (addedParent) {
        // 	document.body.removeChild(this.base);
        // }
        // Build our return rectangle
        let rect = {
            x: box.x,
            y: box.y,
            w: box.width,
            h: box.height
        };
        return rect;
    }
    _updateExtremaAndNotifyListeners(attributes) {
        this._updateExtrema(attributes);
        this._notifyUpdateListeners();
    }
    scale(scaleAmt) {
        let box = this.measureElement();
        this.style.transform = toolkip_primitive_helpers_1.format("translate({0},{1}) scale({2}) translate({3},{4})", box.x + (box.w / 2), box.y + (box.h / 2), scaleAmt, -1 * (box.x + (box.w / 2)), -1 * (box.y + (box.h / 2)));
    }
}
exports._SVGElem = _SVGElem;
