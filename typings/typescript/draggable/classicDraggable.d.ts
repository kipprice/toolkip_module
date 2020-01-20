import { GenericDraggable, DraggableTarget } from "./draggable";
import { StandardElement } from "../drawable/_interfaces";
/**----------------------------------------------------------------------------
 * @class   ClassicDraggable
 * ----------------------------------------------------------------------------
 * Create a draggable that listens to standard mouse events to be able to
 * accommodate drag and drop
 * @author  Kip Price
 * @version 1.0.0
 * ----------------------------------------------------------------------------
 */
export declare class ClassicDraggable extends GenericDraggable {
    /**
     * _createElements
     * ----------------------------------------------------------------------------
     * (Does nothing; can be overidden by child classes)
     */
    protected _createElements(): void;
    /**
     * _onDrop
     * ----------------------------------------------------------------------------
     * Defalut behavior for a draggable is to attach to the associated target
     * @param   event   The mouse event triggering the drop
     */
    protected _onDrop(event: MouseEvent): void;
    /**
     * _addEventListeners
     * ----------------------------------------------------------------------------
     * Add any event listeners needed for this classic draggable
     */
    protected _addEventListeners(): void;
    /**
     * _createDraggableTarget
     * ----------------------------------------------------------------------------
     * Create a target element for this draggable
     * @param   target  The element to link to the created target
     *
     * @returns The created target
     */
    protected _createDraggableTarget(target: StandardElement): ClassicDraggableTarget;
}
/**----------------------------------------------------------------------------
 * @class   ClassicDraggableTarget
 * ----------------------------------------------------------------------------
 * Creates a target that can receive classic draggable events
 * @author  Kip Price
 * @version 1.0.0
 * ----------------------------------------------------------------------------
 */
export declare class ClassicDraggableTarget extends DraggableTarget {
    /**
     * _addEventListeners
     * ----------------------------------------------------------------------------
     * Add event listeners to the target
     */
    protected _addEventListeners(): void;
}
