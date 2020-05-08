import { IPoint } from '@toolkip/shared-types';


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
