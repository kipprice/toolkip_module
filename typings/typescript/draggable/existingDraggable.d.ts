import { IDraggableOptions, OnMoveFunction } from './_interfaces';
import { ClassicDraggable } from "./classicDraggable";
import { StandardElement } from "../drawable/_interfaces";
import { HTML5Draggable } from "./html5Draggable";
/**----------------------------------------------------------------------------
 * @class   ExistingClassicDraggable
 * ----------------------------------------------------------------------------
 * Create a draggable out of an already-existing element
 * @author  Kip Price
 * @version 1.5.0
 * ----------------------------------------------------------------------------
 */
export declare class ExistingClassicDraggable extends ClassicDraggable {
    protected _overrideFunctions: {
        move?: OnMoveFunction;
    };
    /**
     * ExistingClassicDraggable
     * ----------------------------------------------------------------------------
     * Turn an existing element into a draggable that supports classic mouse events
     * @param   elem        The element to use for this element
     * @param   target      The target for the element
     */
    constructor(elem: StandardElement, target?: StandardElement);
    overrideFunctions(handlers: IDraggableOptions): void;
    protected _onMove(event: DragEvent): void;
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
export declare class ExistingHTML5Draggable extends HTML5Draggable {
    protected _overrideFunctions: {
        move?: OnMoveFunction;
    };
    /**
     * ExistingHTML5Draggable
     * ----------------------------------------------------------------------------
     * Turn an existing element into a draggable that supports HTML5 events
     * @param   elem        The element to use for this element
     * @param   target      The target for the element
     */
    constructor(elem: StandardElement, target?: StandardElement);
    overrideFunctions(handlers: IDraggableOptions): void;
    protected _onMove(event: DragEvent): void;
}
