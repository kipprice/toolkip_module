import { GenericDraggable, DraggableTarget } from "./draggable";
import { StandardElement } from "../drawable/_interfaces";
/**----------------------------------------------------------------------------
 * @class   HTML5Draggable
 * ----------------------------------------------------------------------------
 * Use HTML5 drag events to allow for dragging
 * @author  Kip Price
 * @version 1.0.0
 * ----------------------------------------------------------------------------
 */
export declare class HTML5Draggable extends GenericDraggable {
    /**
     * _createElements
     * ----------------------------------------------------------------------------
     * Applies the draggable attribute to the associated elements
     */
    protected _createElements(): void;
    /**
     * _createDraggableTarget
     * ----------------------------------------------------------------------------
     * Creates a new target for this draggable
     * @param   elem    The element to associate with the target
     *
     * @returns The created draggable target
     */
    protected _createDraggableTarget(elem: StandardElement): HTML5DragTarget;
    protected _addEventListeners(): void;
    protected _onDragStart(event: DragEvent): void;
    protected _onMove(event: DragEvent): void;
    protected _onDrop(event: DragEvent): void;
}
/**----------------------------------------------------------------------------
 * @class   HTML5DragTarget
 * ----------------------------------------------------------------------------
 * Use HTML5 drag events to allow for
 * @author  Kip Price
 * @version 1.0.0
 * ----------------------------------------------------------------------------
 */
export declare class HTML5DragTarget extends DraggableTarget {
    protected _addEventListeners(): void;
    protected _onDragEnter(event: DragEvent): void;
    protected _onDrop(event: DragEvent): void;
    protected _onDragLeave(event: DragEvent): void;
}
