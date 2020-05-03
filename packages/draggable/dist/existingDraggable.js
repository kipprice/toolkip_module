"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classicDraggable_1 = require("./classicDraggable");
const html5Draggable_1 = require("./html5Draggable");
// TODO: finish mapping over from the old make draggable function
/**----------------------------------------------------------------------------
 * @class   ExistingClassicDraggable
 * ----------------------------------------------------------------------------
 * Create a draggable out of an already-existing element
 * @author  Kip Price
 * @version 1.5.0
 * ----------------------------------------------------------------------------
 */
class ExistingClassicDraggable extends classicDraggable_1.ClassicDraggable {
    //#endregion
    //.....................
    /**
     * ExistingClassicDraggable
     * ----------------------------------------------------------------------------
     * Turn an existing element into a draggable that supports classic mouse events
     * @param   elem        The element to use for this element
     * @param   target      The target for the element
     */
    constructor(elem, target) {
        super(target);
        this._elems.base = elem;
        this._addEventListeners();
    }
    overrideFunctions(handlers) {
        if (handlers.onMove) {
            this._overrideFunctions.move = handlers.onMove;
        }
    }
    _onMove(event) {
        super._onMove(event);
        if (!this._overrideFunctions.move) {
            return;
        }
        let delta = this._calculateDelta();
        this._overrideFunctions.move(delta);
    }
}
exports.ExistingClassicDraggable = ExistingClassicDraggable;
/**----------------------------------------------------------------------------
 * @class   ExistingHTML5Draggable
 * ----------------------------------------------------------------------------
 * Create a draggable that uses HTML5 elements out of an already existing
 * element
 * @author  Kip Price
 * @version 1.5.0
 * ----------------------------------------------------------------------------
 */
class ExistingHTML5Draggable extends html5Draggable_1.HTML5Draggable {
    /**
     * ExistingHTML5Draggable
     * ----------------------------------------------------------------------------
     * Turn an existing element into a draggable that supports HTML5 events
     * @param   elem        The element to use for this element
     * @param   target      The target for the element
     */
    constructor(elem, target) {
        super(target);
        this._elems.base = elem;
        this._addEventListeners();
    }
    overrideFunctions(handlers) {
        if (handlers.onMove) {
            this._overrideFunctions.move = handlers.onMove;
        }
    }
    _onMove(event) {
        super._onMove(event);
        if (!this._overrideFunctions.move) {
            return;
        }
        let delta = this._calculateDelta();
        this._overrideFunctions.move(delta);
    }
}
exports.ExistingHTML5Draggable = ExistingHTML5Draggable;
