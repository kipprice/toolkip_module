import { IDraggableOptions, OnDragEnterFunction, OnDragLeaveFunction, OnMoveFunction, OnDropFunction } from './_interfaces';
import { ClassicDraggable } from "./classicDraggable";
import { StandardElement } from "../shared";
import { HTML5Draggable } from "./html5Draggable";

// TODO: finish mapping over from the old make draggable function
/**----------------------------------------------------------------------------
 * @class   ExistingClassicDraggable
 * ----------------------------------------------------------------------------
 * Create a draggable out of an already-existing element
 * @author  Kip Price
 * @version 1.5.0
 * ----------------------------------------------------------------------------
 */
export class ExistingClassicDraggable extends ClassicDraggable {

    //.....................
    //#region PROPERTIES
    
    protected _overrideFunctions: {
        move?: OnMoveFunction
    }
    
    //#endregion
    //.....................
    /**
     * ExistingClassicDraggable
     * ----------------------------------------------------------------------------
     * Turn an existing element into a draggable that supports classic mouse events
     * @param   elem        The element to use for this element
     * @param   target      The target for the element
     */
    constructor(elem: StandardElement, target?: StandardElement) {
        super(target);
        this._elems.base = elem;

        this._addEventListeners();
    }

    public overrideFunctions(handlers: IDraggableOptions) {
        if (handlers.onMove) {
            this._overrideFunctions.move = handlers.onMove;
        }
    }

    protected _onMove(event: DragEvent) {
        super._onMove(event);
        if (!this._overrideFunctions.move) { return; }

        let delta = this._calculateDelta();
        this._overrideFunctions.move(delta)
    }

}

/**----------------------------------------------------------------------------
 * @class   ExistingHTML5Draggable
 * ----------------------------------------------------------------------------
 * Create a draggable that uses HTML5 elements out of an already existing 
 * element
 * @author  Kip Price
 * @version 1.5.0
 * ----------------------------------------------------------------------------
 */
export class ExistingHTML5Draggable extends HTML5Draggable {

    protected _overrideFunctions: {
        move?: OnMoveFunction;
    }

    /**
     * ExistingHTML5Draggable
     * ----------------------------------------------------------------------------
     * Turn an existing element into a draggable that supports HTML5 events
     * @param   elem        The element to use for this element
     * @param   target      The target for the element
     */
    constructor(elem: StandardElement, target?: StandardElement) {
        super(target);
        this._elems.base = elem;

        this._addEventListeners();
    }

    public overrideFunctions(handlers: IDraggableOptions) {
        if (handlers.onMove) {
            this._overrideFunctions.move = handlers.onMove;
        }
    }

    protected _onMove(event: DragEvent) {
        super._onMove(event);
        if (!this._overrideFunctions.move) { return; }

        let delta = this._calculateDelta();
        this._overrideFunctions.move(delta);
    }

}