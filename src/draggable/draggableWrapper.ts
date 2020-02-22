import { IDraggableOptions } from './_interfaces';
import { StandardElement } from "../shared";
import { ExistingHTML5Draggable } from "./existingDraggable";

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
    let drg: ExistingHTML5Draggable = new ExistingHTML5Draggable(elem, options.target);
    drg.overrideFunctions(options);
    drg.gridSize = options.gridSize || 1;

    // Return the element of the Draggable
    return drg.base;
}