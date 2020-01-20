import { IStandardStyles } from './../styleHelpers/_interfaces';
import { Drawable } from "../drawable/drawable";
import { IPoint } from "../maths/interface";
import { IElemDefinition } from "../htmlHelpers/_interfaces";
import { StandardElement } from "../drawable/_interfaces";
/**----------------------------------------------------------------------------
 * @class   GenericDraggable
 * ----------------------------------------------------------------------------
 * Drawable element that also can be dragged around
 * @author  Kip Price
 * @version 1.0.0
 * ----------------------------------------------------------------------------
 */
export declare abstract class GenericDraggable extends Drawable {
    static currentDraggable: GenericDraggable;
    /** potential targets for this draggable */
    protected _targets: DraggableTarget[];
    /** the point at which we started dragging (or most recently updated to) */
    protected _startMousePoint: IPoint;
    /** the current mouse point position */
    protected _currentMousePoint: IPoint;
    /** track whether this draggable is currently dragging */
    protected _isDragging: boolean;
    protected _signifier: HTMLElement;
    /** size of the grid to snap to for this element */
    protected _gridSize: number;
    get gridSize(): number;
    set gridSize(data: number);
    /** styles used for the draggable */
    protected static _uncoloredStyles: IStandardStyles;
    /**
     * GenericDraggable
     * ----------------------------------------------------------------------------
     * Create a draggable
     * @param   obj     Definition of the element being created
     * @param   target  The target of
     */
    constructor(obj?: IElemDefinition, target?: StandardElement);
    protected _addDraggingSignifier(): void;
    /**
     * addTarget
     * ----------------------------------------------------------------------------
     * Add a new potential target of
     * @param target
     */
    addTarget(target: StandardElement): void;
    /**
     * _updateMousePoint
     * ----------------------------------------------------------------------------
     * Update the internal storage of the point
     * @param   event   The mouse event triggering this update
     */
    protected _updateMousePoint(event: MouseEvent): void;
    /**
     * _calculateDelta
     * ----------------------------------------------------------------------------
     * Determine the current delta based on differences between the current mouse
     * position & initial mouse position
     *
     * @returns
     */
    protected _calculateDelta(): IPoint;
    /**
     * _normalizeToGrid
     * ----------------------------------------------------------------------------
     * Normalize a value to fit inside of the grid params we have
     * @param   value   The value to normalize
     */
    protected _normalizeToGrid(value: number, gridSize: number): number;
    /**
     * _addEventListeners
     * ----------------------------------------------------------------------------
     * Add different listeners to handle the draggability of elements
     */
    protected abstract _addEventListeners(): void;
    /**
     * _createDraggableTarget
     * ----------------------------------------------------------------------------
     * Handle spinning up a new draggable target
     * @param   target - The HTML element
     * @returns the newly created draggable target
     */
    protected abstract _createDraggableTarget(target: StandardElement): DraggableTarget;
    /**
     * _onDragStart
     * ----------------------------------------------------------------------------
     * Handle dragging on the draggable
     * @param   event - The mouse event that is starting the drag
     */
    protected _onDragStart(event: MouseEvent): void;
    /**
     * _onMove
     * ----------------------------------------------------------------------------
     * Handle when the draggable is moved
     * @param   event   The event causing the move
     */
    protected _onMove(event: MouseEvent): void;
    /**
     * _onDrop
     * ----------------------------------------------------------------------------
     * Handle when this element is dropped
     * @param   event   The event causing the drop
     */
    protected _onDrop(event: Event): void;
    /**
     * _onRender
     * ----------------------------------------------------------------------------
     * Handle rendering the current position of the element
     */
    protected _onRender(): void;
}
/**----------------------------------------------------------------------------
 * @class   DraggableTarget
 * ----------------------------------------------------------------------------
 * Target for a draggable to be added to
 * @author  Kip Price
 * @version 1.0.0
 * ----------------------------------------------------------------------------
 */
export declare abstract class DraggableTarget extends Drawable {
    static currentDraggableTarget: DraggableTarget;
    /**
     * DraggableTarget
     * ----------------------------------------------------------------------------
     * Create the draggable target
     * @param   srcElem     The element to associate with this target
     */
    constructor(srcElem: StandardElement);
    /**
     * _createElements
     * ----------------------------------------------------------------------------
     * (Does nothing; can be overridden by child classes)
     */
    protected _createElements(): void;
    /**
     * _addEventListeners
     * ----------------------------------------------------------------------------
     * Add specific events for handling the drag target
     */
    protected abstract _addEventListeners(): void;
    /**
     * _onDragEnter
     * ----------------------------------------------------------------------------
     * Handle
     */
    protected _onDragEnter(event: Event): void;
    /**
     * _onDragLeave
     * ----------------------------------------------------------------------------
     * @param event
     */
    protected _onDragLeave(event: Event): void;
    /**
     * _onDrop
     * ----------------------------------------------------------------------------
     * @param event
     */
    protected _onDrop(event: Event): void;
}
