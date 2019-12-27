import { StandardElement } from "../drawable/_interfaces";
import { ExistingHTML5Draggable } from "./existingDraggable";
import { IPoint } from "../maths/interface";


/**
 * makeDraggable
 * ----------------------------------------------------------------------------
 * Makes a particular element draggable
 * 
 * @param 	elem         	The element to make draggable
 * @param 	target       	The drop-target of the draggable
 * @param 	non_standard 	True if we should use non-standard events
 * 
 * @returns	HTML element that respects drag events
 * 
 */
export function makeDraggable(elem: HTMLElement, options: IDraggableOptions): StandardElement {

    // Behind the scenes, we create a draggable to get this
    let drg: ExistingHTML5Draggable = new ExistingHTML5Draggable(elem, options.target, options.isNonStandard);
    drg.overrideFunctions(options);
    drg.gridSize = options.gridSize || 1;

    // Return the element of the Draggable
    return drg.base;
}

//..........................................
//#region TYPES AND INTERFACES

export interface OnDragEnterFunction {
    (target: HTMLElement, e: Event): void;
}

export interface OnDragLeaveFunction {
    (target: HTMLElement, e: Event): void;
}

export interface OnDropFunction {
    (target: HTMLElement, e: Event): void;
}

export interface OnMoveFunction {
    (delta: IPoint): void;
}

export enum DraggableFunctions {
    DragEnter,
    DragLeave,
    Drop,
    Move
}

/**
 * IDraggableHandlers
 * 
 * Keep track of handlers for draggable elements
 * 
 */
export interface IDraggableHandlers {
    /** what to do when we start dragging over the target */
    onDragEnter?: OnDragEnterFunction;

    /** what to do when we stop dragging over the target */
    onDragLeave?: OnDragLeaveFunction;

    /** what to do when the element is dropped */
    onDrop?: OnDropFunction;

    /** wwhat to do when the element is moved */
    onMove?: OnMoveFunction;
}

/**
 * IDraggableOptions
 * 
 * Keep track of options for the draggable element
 * 
 */
export interface IDraggableOptions extends IDraggableHandlers {
    /** what element is considered the target of this function */
    target?: HTMLElement;

    /** keep track of whether we're using HTML5 events for dragging/dropping */
    isNonStandard?: boolean;

    /** allow this element to be snapped to a grid */
    gridSize?: number;
}

/** functions that can be used for a draggable element */
export type DraggableFunction = OnDragEnterFunction | OnDragLeaveFunction | OnDropFunction | OnMoveFunction;


//#endregion
//..........................................