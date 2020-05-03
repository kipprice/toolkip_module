"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const draggable_1 = require("./draggable");
const toolkip_style_helpers_1 = require("@kipprice/toolkip-style-helpers");
/**----------------------------------------------------------------------------
 * @class   ClassicDraggable
 * ----------------------------------------------------------------------------
 * Create a draggable that listens to standard mouse events to be able to
 * accommodate drag and drop
 * @author  Kip Price
 * @version 1.0.0
 * ----------------------------------------------------------------------------
 */
class ClassicDraggable extends draggable_1._GenericDraggable {
    /**
     * _createElements
     * ----------------------------------------------------------------------------
     * (Does nothing; can be overidden by child classes)
     */
    _createElements() {
        toolkip_style_helpers_1.addClass(this._elems.base, "draggable");
        this._addEventListeners();
        this._addDraggingSignifier();
    }
    /**
     * _onDrop
     * ----------------------------------------------------------------------------
     * Defalut behavior for a draggable is to attach to the associated target
     * @param   event   The mouse event triggering the drop
     */
    _onDrop(event) {
        if (!this._isDragging) {
            return;
        }
        super._onDrop(event);
        // update the style of the element
        toolkip_style_helpers_1.removeClass(this._elems.base, "dragging");
    }
    /**
     * _addEventListeners
     * ----------------------------------------------------------------------------
     * Add any event listeners needed for this classic draggable
     */
    _addEventListeners() {
        this.addEventListener("mousedown", (e) => {
            if ((e.target !== this._elems.base) &&
                (e.target !== this._signifier)) {
                return;
            }
            this._onDragStart(e);
            e.preventDefault();
        });
        window.addEventListener("mousemove", (e) => {
            this._onMove(e);
        });
        window.addEventListener("mouseup", (e) => {
            this._onDrop(e);
        });
        window.addEventListener("mouseout", (e) => {
            //this._onDrop(e);
        });
    }
    /**
     * _createDraggableTarget
     * ----------------------------------------------------------------------------
     * Create a target element for this draggable
     * @param   target  The element to link to the created target
     *
     * @returns The created target
     */
    _createDraggableTarget(target) {
        return new ClassicDraggableTarget(target);
    }
}
exports.ClassicDraggable = ClassicDraggable;
/**----------------------------------------------------------------------------
 * @class   ClassicDraggableTarget
 * ----------------------------------------------------------------------------
 * Creates a target that can receive classic draggable events
 * @author  Kip Price
 * @version 1.0.0
 * ----------------------------------------------------------------------------
 */
class ClassicDraggableTarget extends draggable_1._DraggableTarget {
    /**
     * _addEventListeners
     * ----------------------------------------------------------------------------
     * Add event listeners to the target
     */
    _addEventListeners() {
        this.addEventListener("mouseup", (e) => {
            if (!draggable_1._GenericDraggable.currentDraggable) {
                return;
            }
            this._onDrop(e);
        });
        this.addEventListener("mouseover", (e) => {
            this._onDragEnter(e);
        });
        this.addEventListener("mouseout", (e) => {
            this._onDragLeave(e);
        });
    }
}
exports.ClassicDraggableTarget = ClassicDraggableTarget;
