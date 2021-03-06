import { IStandardStyles, removeClass, addClass } from '@toolkip/style-helpers';
import { _Drawable } from '@toolkip/drawable';
import { StandardElement, IPoint } from '@toolkip/shared-types';
import { moveElemRelativePosition } from '@toolkip/html-helpers';
import { createElement } from '@toolkip/create-elements';

/**----------------------------------------------------------------------------
 * @class   GenericDraggable
 * ----------------------------------------------------------------------------
 * Drawable element that also can be dragged around
 * @author  Kip Price
 * @version 1.0.0
 * ----------------------------------------------------------------------------
 */
export abstract class _GenericDraggable extends _Drawable {

    //..........................
    //#region STATIC PROPERTIES
    public static currentDraggable: _GenericDraggable;
    //#endregion
    //..........................

    //...................
    //#region PROPERTIES

    /** potential targets for this draggable */
    protected _targets: _DraggableTarget[];

    /** the point at which we started dragging (or most recently updated to) */
    protected _startMousePoint: IPoint;

    /** the current mouse point position */
    protected _currentMousePoint: IPoint;

    /** track whether this draggable is currently dragging */
    protected _isDragging: boolean;

    protected _signifier: HTMLElement;

    /** size of the grid to snap to for this element */
    protected _gridSize: number;
    public get gridSize(): number { return this._gridSize; }
    public set gridSize(data: number) { this._gridSize = data; }

    //#endregion
    //...................

    //...............
    //#region STYLES

    /** styles used for the draggable */
    protected static _uncoloredStyles: IStandardStyles = {
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
    }
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
    constructor(target?: StandardElement) {
        super();
        this._targets = [];
        this.addTarget(target);
        this._onRender();


        if (this._elems.base) {
            this._addEventListeners();
            addClass(this._elems.base, "draggable");
        }

    }

    protected _addDraggingSignifier(): void {
        this._signifier = createElement({
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
    public addTarget(target: StandardElement): void {
        if (!target) { return; }
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
    protected _updateMousePoint(event: MouseEvent): void {

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
    protected _calculateDelta(): IPoint {
        // return early if we don't have enough data
        if (!this._currentMousePoint) { return null; }

        let delta: IPoint = {
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
    protected _normalizeToGrid(value: number, gridSize: number): number {
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
    //......................................

    //........................................
    //#region ABSTRACT FUNCTIONS TO IMPLEMENT

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
    protected abstract _createDraggableTarget(target: StandardElement): _DraggableTarget;
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
    protected _onDragStart(event: MouseEvent): void {
        this._isDragging = true;
        _GenericDraggable.currentDraggable = this;
        addClass(this._elems.base, "dragging");
        for (let target of this._targets) {
            addClass(target.base, "draggingOver");
        }
        this._updateMousePoint(event);
    }

    /**
     * _onMove
     * ----------------------------------------------------------------------------
     * Handle when the draggable is moved
     * @param   event   The event causing the move 
     */
    protected _onMove(event: MouseEvent): void {
        if (!this._isDragging) { return; }

        this._updateMousePoint(event);
    }

    /**
     * _onDrop
     * ----------------------------------------------------------------------------
     * Handle when this element is dropped
     * @param   event   The event causing the drop
     */
    protected _onDrop(event: Event): void {
        if (!this._isDragging) { return; }

        if (_DraggableTarget.currentDraggableTarget) {
            _GenericDraggable.currentDraggable = null;
            this._startMousePoint = null;
            this._currentMousePoint = null;
        }
        this._isDragging = false;
        removeClass(this._elems.base, "dragging");
        for (let target of this._targets) {
            removeClass(target.base, "draggingOver");
        }
    }

    /**
     * _onRender
     * ----------------------------------------------------------------------------
     * Handle rendering the current position of the element
     */
    protected _onRender(): void {
        window.requestAnimationFrame(() => {
            this._onRender();
        });

        if (!this._elems.base) { return; }

        let delta: IPoint = this._calculateDelta();
        if (!delta) { return; }

        moveElemRelativePosition(this.base as HTMLElement, delta);

        // reset the point
        this._startMousePoint.x += delta.x;
        this._startMousePoint.y += delta.y;
    }
    //#endregion
    //..............................
}

/**----------------------------------------------------------------------------
 * @class   _DraggableTarget
 * ----------------------------------------------------------------------------
 * Target for a draggable to be added to
 * @author  Kip Price
 * @version 1.0.0
 * ----------------------------------------------------------------------------
 */
export abstract class _DraggableTarget extends _Drawable {

    //...........................
    //#region STATIC PROPERTIES
    public static currentDraggableTarget: _DraggableTarget;
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
    constructor(srcElem: StandardElement) {
        super();
        this._elems.base = srcElem;
        this._addEventListeners();
        addClass(this._elems.base, "droppable");
    }

    /**
     * _createElements
     * ----------------------------------------------------------------------------
     * (Does nothing; can be overridden by child classes)
     */
    protected _createElements(): void { }
    //#endregion
    //....................................


    //..........................................
    //#region ABSTRACT FUNCTIONS TO IMPLEMENT

    /**
     * _addEventListeners
     * ----------------------------------------------------------------------------
     * Add specific events for handling the drag target
     */
    protected abstract _addEventListeners(): void;

    //#endregion
    //..........................................


    //..............................
    //#region OVERRIDABLE FUNCTIONS

    /**
     * _onDragEnter
     * ----------------------------------------------------------------------------
     * Handle 
     */
    protected _onDragEnter(event: Event): void {
        _DraggableTarget.currentDraggableTarget = this;
    }

    /**
     * _onDragLeave
     * ----------------------------------------------------------------------------
     * @param event 
     */
    protected _onDragLeave(event: Event): void {
        if (_DraggableTarget.currentDraggableTarget !== this) { return; }
        _DraggableTarget.currentDraggableTarget = null;
    }

    /**
     * _onDrop
     * ----------------------------------------------------------------------------
     * @param event 
     */
    protected _onDrop(event: Event): void {
        if (_GenericDraggable.currentDraggable) {
            _DraggableTarget.currentDraggableTarget.base.appendChild(_GenericDraggable.currentDraggable.base);
        }
    }

    //#endregion
    //..............................
}
