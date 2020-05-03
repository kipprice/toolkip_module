"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const draggable_1 = require("./draggable");
const toolkip_style_helpers_1 = require("@kipprice/toolkip-style-helpers");
const toolkip_create_elements_1 = require("@kipprice/toolkip-create-elements");
/**----------------------------------------------------------------------------
 * @class   HTML5Draggable
 * ----------------------------------------------------------------------------
 * Use HTML5 drag events to allow for dragging
 * @author  Kip Price
 * @version 1.0.0
 * ----------------------------------------------------------------------------
 */
class HTML5Draggable extends draggable_1._GenericDraggable {
    /**
     * _createElements
     * ----------------------------------------------------------------------------
     * Applies the draggable attribute to the associated elements
     */
    _createElements() {
        this._elems.base.setAttribute("draggable", "true");
        toolkip_style_helpers_1.addClass(this._elems.base, "draggable");
        this._addEventListeners();
        this._elems.blank = toolkip_create_elements_1.createElement({
            type: "canvas",
            attr: {
                width: "1px",
                height: '1px"'
            },
            cls: "blank",
            parent: document.body
        });
    }
    /**
     * _createDraggableTarget
     * ----------------------------------------------------------------------------
     * Creates a new target for this draggable
     * @param   elem    The element to associate with the target
     *
     * @returns The created draggable target
     */
    _createDraggableTarget(elem) {
        return new HTML5DragTarget(elem);
    }
    _addEventListeners() {
        this.base.addEventListener("dragstart", (e) => { this._onDragStart(e); });
        this.base.addEventListener('drag', (e) => { this._onMove(e); });
        this.base.addEventListener("dragend", (e) => { this._onDrop(e); });
    }
    _onDragStart(event) {
        super._onDragStart(event);
        event.dataTransfer.setDragImage(this._elems.blank, 0, 0);
        // update the element to be low opacity
        window.setTimeout(() => {
            toolkip_style_helpers_1.addClass(this._elems.base, "dragging");
        }, 50);
    }
    _onMove(event) {
        if (event.buttons === 0) {
            return;
        }
        super._onMove(event);
    }
    _onDrop(event) {
        super._onDrop(event);
        // update the style of the element
        toolkip_style_helpers_1.removeClass(this._elems.base, "dragging");
    }
}
exports.HTML5Draggable = HTML5Draggable;
/**----------------------------------------------------------------------------
 * @class   HTML5DragTarget
 * ----------------------------------------------------------------------------
 * Use HTML5 drag events to allow for
 * @author  Kip Price
 * @version 1.0.0
 * ----------------------------------------------------------------------------
 */
class HTML5DragTarget extends draggable_1._DraggableTarget {
    _addEventListeners() {
        this.base.addEventListener("dragover", (e) => { this._onDragEnter(e); });
        this.base.addEventListener("dragexit", (e) => { this._onDragLeave(e); });
        this.base.addEventListener("drop", (e) => { this._onDrop(e); });
    }
    _onDragEnter(event) {
        event.preventDefault();
        super._onDragEnter(event);
    }
    _onDrop(event) {
        event.preventDefault();
        super._onDrop(event);
    }
    _onDragLeave(event) {
        event.preventDefault();
        super._onDragLeave(event);
    }
}
exports.HTML5DragTarget = HTML5DragTarget;
