"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toolkip_style_helpers_1 = require("@kipprice/toolkip-style-helpers");
const toolkip_drawable_1 = require("@kipprice/toolkip-drawable");
const toolkip_html_helpers_1 = require("@kipprice/toolkip-html-helpers");
const toolkip_create_elements_1 = require("@kipprice/toolkip-create-elements");
/**----------------------------------------------------------------------------
 * @class   GenericDraggable
 * ----------------------------------------------------------------------------
 * Drawable element that also can be dragged around
 * @author  Kip Price
 * @version 1.0.0
 * ----------------------------------------------------------------------------
 */
class _GenericDraggable extends toolkip_drawable_1._Drawable {
    //#endregion
    //...............
    //.................................
    //#region INITIALIZE THE DRAGGABLE
    /**
     * GenericDraggable
     * ----------------------------------------------------------------------------
     * Create a draggable
     * @param   obj     Definition of the element being created
     * @param   target  The target of
     */
    constructor(target) {
        super();
        this._targets = [];
        this.addTarget(target);
        this._onRender();
        if (this._elems.base) {
            this._addEventListeners();
            toolkip_style_helpers_1.addClass(this._elems.base, "draggable");
        }
    }
    get gridSize() { return this._gridSize; }
    set gridSize(data) { this._gridSize = data; }
    _addDraggingSignifier() {
        this._signifier = toolkip_create_elements_1.createElement({
            cls: "dragSignifier",
            children: [
                { cls: "dot" },
                { cls: "dot" },
                { cls: "dot" },
                { cls: "dot" },
                { cls: "dot" },
                { cls: "dot" },
                { cls: "dot" },
                { cls: "dot" },
                { cls: "dot" },
            ],
            parent: this._elems.base,
        });
    }
    /**
     * addTarget
     * ----------------------------------------------------------------------------
     * Add a new potential target of
     * @param target
     */
    addTarget(target) {
        if (!target) {
            return;
        }
        let draggableTarget = this._createDraggableTarget(target);
        this._targets.push(draggableTarget);
    }
    //#endregion
    //.................................
    //......................................
    //#region HELPERS TO TRACK MOUSE SHIFTS
    /**
     * _updateMousePoint
     * ----------------------------------------------------------------------------
     * Update the internal storage of the point
     * @param   event   The mouse event triggering this update
     */
    _updateMousePoint(event) {
        // update the current point
        this._currentMousePoint = {
            x: event.clientX,
            y: event.clientY
        };
        // If we don't have a start point, do it now
        if (!this._startMousePoint) {
            this._startMousePoint = this._currentMousePoint;
        }
    }
    /**
     * _calculateDelta
     * ----------------------------------------------------------------------------
     * Determine the current delta based on differences between the current mouse
     * position & initial mouse position
     *
     * @returns
     */
    _calculateDelta() {
        // return early if we don't have enough data
        if (!this._currentMousePoint) {
            return null;
        }
        let delta = {
            x: this._currentMousePoint.x - this._startMousePoint.x,
            y: this._currentMousePoint.y - this._startMousePoint.y
        };
        // snap to a grid if we ought to
        if (this._gridSize > 1) {
            delta.x = this._normalizeToGrid(delta.x, this.gridSize);
            delta.y = this._normalizeToGrid(delta.y, this.gridSize);
        }
        return delta;
    }
    /**
     * _normalizeToGrid
     * ----------------------------------------------------------------------------
     * Normalize a value to fit inside of the grid params we have
     * @param   value   The value to normalize
     */
    _normalizeToGrid(value, gridSize) {
        let absValue = Math.abs(value);
        let val = Math.floor(absValue / gridSize) * gridSize;
        if ((absValue % gridSize) > (gridSize / 2)) {
            val += gridSize;
        }
        if (value < 0) {
            val *= -1;
        }
        return val;
    }
    //#endregion
    //........................................
    //..............................
    //#region OVERRIDABLE FUNCTIONS
    /**
     * _onDragStart
     * ----------------------------------------------------------------------------
     * Handle dragging on the draggable
     * @param   event - The mouse event that is starting the drag
     */
    _onDragStart(event) {
        this._isDragging = true;
        _GenericDraggable.currentDraggable = this;
        toolkip_style_helpers_1.addClass(this._elems.base, "dragging");
        for (let target of this._targets) {
            toolkip_style_helpers_1.addClass(target.base, "draggingOver");
        }
        this._updateMousePoint(event);
    }
    /**
     * _onMove
     * ----------------------------------------------------------------------------
     * Handle when the draggable is moved
     * @param   event   The event causing the move
     */
    _onMove(event) {
        if (!this._isDragging) {
            return;
        }
        this._updateMousePoint(event);
    }
    /**
     * _onDrop
     * ----------------------------------------------------------------------------
     * Handle when this element is dropped
     * @param   event   The event causing the drop
     */
    _onDrop(event) {
        if (!this._isDragging) {
            return;
        }
        if (_DraggableTarget.currentDraggableTarget) {
            _GenericDraggable.currentDraggable = null;
            this._startMousePoint = null;
            this._currentMousePoint = null;
        }
        this._isDragging = false;
        toolkip_style_helpers_1.removeClass(this._elems.base, "dragging");
        for (let target of this._targets) {
            toolkip_style_helpers_1.removeClass(target.base, "draggingOver");
        }
    }
    /**
     * _onRender
     * ----------------------------------------------------------------------------
     * Handle rendering the current position of the element
     */
    _onRender() {
        window.requestAnimationFrame(() => {
            this._onRender();
        });
        if (!this._elems.base) {
            return;
        }
        let delta = this._calculateDelta();
        if (!delta) {
            return;
        }
        toolkip_html_helpers_1.moveElemRelativePosition(this.base, delta);
        // reset the point
        this._startMousePoint.x += delta.x;
        this._startMousePoint.y += delta.y;
    }
}
exports._GenericDraggable = _GenericDraggable;
//#endregion
//...................
//...............
//#region STYLES
/** styles used for the draggable */
_GenericDraggable._uncoloredStyles = {
    ".draggingOver": {
        cursor: "-webkit-grabbing !important",
    },
    ".draggable": {
        position: "absolute !important",
        cursor: "-webkit-grab",
        transition: "all ease-in-out .03s",
        nested: {
            "div": {
                cursor: "-webkit-grab"
            },
            "&.grabbing": {
                cursor: "-webkit-grabbing",
                nested: {
                    "div": {
                        cursor: "-webkit-grabbing"
                    }
                }
            },
            "&.dragging": {
                boxShadow: "5px 5px 20px 10px rgba(0,0,0,.2) !important",
                zIndex: "100",
                cursor: "-webkit-grabbing",
                opacity: "1",
                transformOrigin: "50% 50%",
                transform: "rotate(0deg)"
            },
            ".dragSignifier": {
                display: "flex",
                position: "absolute",
                left: "5px",
                top: "5px",
                width: "19px",
                flexWrap: "wrap",
                opacity: "0.5",
                nested: {
                    "&:hover": {
                        opacity: "1"
                    },
                    ".mobile &": {
                        display: "none"
                    },
                    ".dot": {
                        borderRadius: "50%",
                        width: "3px",
                        height: "3px",
                        margin: "1px",
                        backgroundColor: "rgba(0,0,0,.3)",
                        flexShrink: "0",
                    }
                }
            }
        }
    },
    ".droppable": {
        cursor: "-webkit-dragging"
    }
};
/**----------------------------------------------------------------------------
 * @class   _DraggableTarget
 * ----------------------------------------------------------------------------
 * Target for a draggable to be added to
 * @author  Kip Price
 * @version 1.0.0
 * ----------------------------------------------------------------------------
 */
class _DraggableTarget extends toolkip_drawable_1._Drawable {
    //#endregion
    //...........................
    //....................................
    //#region CONSTRUCT DRAGGABLE TARGET
    /**
     * DraggableTarget
     * ----------------------------------------------------------------------------
     * Create the draggable target
     * @param   srcElem     The element to associate with this target
     */
    constructor(srcElem) {
        super();
        this._elems.base = srcElem;
        this._addEventListeners();
        toolkip_style_helpers_1.addClass(this._elems.base, "droppable");
    }
    /**
     * _createElements
     * ----------------------------------------------------------------------------
     * (Does nothing; can be overridden by child classes)
     */
    _createElements() { }
    //#endregion
    //..........................................
    //..............................
    //#region OVERRIDABLE FUNCTIONS
    /**
     * _onDragEnter
     * ----------------------------------------------------------------------------
     * Handle
     */
    _onDragEnter(event) {
        _DraggableTarget.currentDraggableTarget = this;
    }
    /**
     * _onDragLeave
     * ----------------------------------------------------------------------------
     * @param event
     */
    _onDragLeave(event) {
        if (_DraggableTarget.currentDraggableTarget !== this) {
            return;
        }
        _DraggableTarget.currentDraggableTarget = null;
    }
    /**
     * _onDrop
     * ----------------------------------------------------------------------------
     * @param event
     */
    _onDrop(event) {
        if (_GenericDraggable.currentDraggable) {
            _DraggableTarget.currentDraggableTarget.base.appendChild(_GenericDraggable.currentDraggable.base);
        }
    }
}
exports._DraggableTarget = _DraggableTarget;
