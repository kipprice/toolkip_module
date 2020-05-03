"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const canvasElement_1 = require("./canvasElement");
const toolkip_data_structures_1 = require("@kipprice/toolkip-data-structures");
const _interfaces_1 = require("./_interfaces");
const toolkip_maths_1 = require("@kipprice/toolkip-maths");
const toolkip_object_helpers_1 = require("@kipprice/toolkip-object-helpers");
/**----------------------------------------------------------------------------
 * @class	CanvasGroup
 * ----------------------------------------------------------------------------
 * class that stores collections of other canvas elements
 * @author	Kip Price
 * @version	1.0.0
 * ----------------------------------------------------------------------------
 */
class CanvasGroup extends canvasElement_1._CanvasElement {
    //#endregion
    /**
     * CanvasGroup
     * ----------------------------------------------------------------------------
     * create a group element that joins other elements together
     *
     * @param	id			The unique ID for the element
     * @param	refPoint	The reference point to use
     *
     */
    constructor(id, refPoint) {
        super(id);
        /** if true, scales with the rest of the canvas */
        this._respondToScale = false;
        this._elements = new toolkip_data_structures_1.Collection();
        if (refPoint) {
            this._referencePoint = {
                x: refPoint.x,
                y: refPoint.y
            };
        }
        else {
            this._referencePoint = {
                x: 0,
                y: 0
            };
        }
        this._initializeRects();
    }
    /** the type of element this is */
    get type() { return _interfaces_1.ElementType.Group; }
    set referencePoint(refPt) {
        this.adjustDimensions({
            x: (refPt.x - this._referencePoint.x),
            y: (refPt.y - this._referencePoint.y)
        });
    }
    /**
     * isHoverTarget
     * ----------------------------------------------------------------------------
     * groups handle whether they are a hover target a little differently
     *
     * @returns	True if this element is a target for hover
     */
    get isHoverTarget() {
        let isHoverTarget = false;
        this._elements.map((elem) => {
            if (elem.isHoverTarget) {
                isHoverTarget = true;
                return;
            }
        });
        return isHoverTarget;
    }
    /**
     * _initializeRects
     * ----------------------------------------------------------------------------
     * handle the initial rects needed by the group
     */
    _initializeRects() {
        this._dimensions = {
            x: this._referencePoint.x,
            y: this._referencePoint.y,
            w: 0,
            h: 0
        };
        this._needsInitialDimensions = true;
        super._initializeRects();
    }
    /**
     * _onDraw
     * ----------------------------------------------------------------------------
     * handle drawing the group
     *
     * @param	context		The context upon which to draw this element
     *
     */
    _onDraw(context) {
        // draw the elements relative to the group
        this._elements.map((elem) => {
            elem.draw();
        });
    }
    /**
     * updateDimensions
     * ----------------------------------------------------------------------------
     * update the space occupied by this group
     *
     * @param	visibleWindow	The visible view into the canvas
     *
     */
    updateDimensions(visibleWindow) {
        super.updateDimensions(visibleWindow);
        // No need to update if elems will be offscreen
        if (this._isOffScreen) {
            return;
        }
        // Add to each of the elements
        let elem;
        this._elements.map((elem) => {
            elem.updateDimensions(visibleWindow);
        });
    }
    /**
     * addElement
     * ----------------------------------------------------------------------------
     * add an element to this group
     *
     * @param	The element to add to the group
     *
     */
    addElement(elem) {
        // Make sure each element is appropriately shifted
        elem.adjustDimensions(this._referencePoint);
        // Add the element to our internal array, and ensure it has a way to get back to us
        this._elements.add(elem.id, elem);
        elem.parent = this;
        // If we have a canvas assigned, also add it to this element
        if (this._canvas) {
            elem.canvas = this._canvas;
            this._canvas.needsRedraw = true;
        }
        // make sure we know how big this group is
        this._updateInternalDimensionsFromElement(elem);
    }
    /**
     * _updateInternalDinensionsFromElement
     * ----------------------------------------------------------------------------
     * make sure our internal dimensions match what our elements
     *
     * @param	elem	THe element we're adding to update dimensions for
     *
     */
    _updateInternalDimensionsFromElement(elem) {
        let relDim = {
            x: this._dimensions.x,
            y: this._dimensions.y,
            w: this._dimensions.w,
            h: this._dimensions.h
        };
        // Check if x extrema need updated
        if (elem.dimensions.x < relDim.x) {
            relDim.x = elem.dimensions.x;
        }
        if ((elem.dimensions.x + elem.dimensions.w) > (relDim.x + relDim.w)) {
            relDim.w = ((elem.dimensions.x + elem.dimensions.w) - relDim.x);
        }
        // Check if y extrema need updated
        if (elem.dimensions.y < relDim.y) {
            relDim.y = elem.dimensions.y;
        }
        if ((elem.dimensions.y + elem.dimensions.h) > (relDim.y + relDim.h)) {
            relDim.h = ((elem.dimensions.y + elem.dimensions.h) - relDim.y);
        }
        // Update the real dimensions
        this._dimensions = {
            x: relDim.x,
            y: relDim.y,
            w: relDim.w,
            h: relDim.h
        };
        // Don't set these dimensions as default again
        this._needsInitialDimensions = false;
    }
    /**
     * handleEvent
     *
     * groups need some special handling since they need to pass on their events
     *
     * @param	eventType
     * @param	pt			The point
     * @param	e			The actual event we are handling
     *
     */
    handleEvent(eventType, pt, e) {
        // Run any event-handling that directly applies to me
        super.handleEvent(eventType, pt, e);
        // Quit if there's no point specified
        if (!pt) {
            return;
        }
        // clear any hover effects that may be happening
        if ((eventType === _interfaces_1.EventTypeEnum.LEAVE) || (eventType === _interfaces_1.EventTypeEnum.HOVER)) {
            this._clearHover(pt, e);
        }
        // Find the affected elements
        let elems = this._findElementsAtPoint(pt);
        // Loop through affected elements to apply the event to them
        let elem;
        for (elem of elems) {
            elem.handleEvent(eventType, pt, e);
        }
        // TODO: apply a group event to all child elements
    }
    /**
     * _clearHover
     *
     * clear hover styles that may have been applied already
     *
     */
    _clearHover(relativePoint, e) {
        // loop through all of our elements and apply the unhover class
        this._elements.map((el) => {
            if (!el.isHoverTarget) {
                return;
            }
            el.leave(relativePoint, e);
        });
    }
    /** find the elements that are located at the provided point */
    _findElementsAtPoint(pt) {
        let out = [];
        this._elements.map((elem) => {
            if (elem.isOffScreen) {
                return;
            }
            // if the point is contained, consider it an 
            if (!toolkip_maths_1.isPointContained(pt, elem.displayDimensions)) {
                return;
            }
            // If the event happened at this element, add it to the array
            out.push(elem);
        });
        return out;
    }
    /** remove elements from layers */
    removeElement(id) {
        let tmp = this._elements.remove(id);
        if (!tmp) {
            return false;
        }
        this._canvas.needsRedraw = true;
        return true;
    }
    // cloning a group requires cloning its innards
    _cloneForEffect(id) {
        let refPt = toolkip_object_helpers_1.clonePoint(this._referencePoint);
        let clonedGrp = new CanvasGroup(id);
        // Loop through children & clone
        this._elements.map((elem) => {
            let clone = elem._cloneForEffect(elem.id + "|e");
            clonedGrp.addElement(clone);
        });
        return clonedGrp;
    }
    /**
     * _scale
     *
     * groups scale by each of their parts scaling
     *
     * @param	scaleAmt	The amount to scale by
     *
     */
    _scale(scaleAmt) {
        if (!this._isEffect) {
            return;
        }
        this._elements.map((elem) => {
            elem._scale(scaleAmt);
        });
        return;
    }
    /**
     * adjustDimensions
     *
     * adjust the dimensions of this group + its children
     *
     * @param	adjustPt	The point we're adjusting to
     *
     */
    adjustDimensions(adjustPt) {
        super.adjustDimensions(adjustPt);
        this._referencePoint.x += adjustPt.x;
        this._referencePoint.y += adjustPt.y;
        this._elements.map((elem) => {
            elem.adjustDimensions(adjustPt);
        });
    }
    /**
     * _setCanvas
     *
     * Set our internal canvas
     *
     * @param 	canvas	The canvas to set internally
     *
     */
    _setCanvas(canvas) {
        super._setCanvas(canvas);
        this._elements.map((elem) => {
            elem.canvas = this._canvas;
            this._updateInternalDimensionsFromElement(elem);
        });
    }
}
exports.CanvasGroup = CanvasGroup;
