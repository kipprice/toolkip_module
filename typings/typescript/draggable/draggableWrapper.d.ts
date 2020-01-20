import { IDraggableOptions } from './_interfaces';
import { StandardElement } from "../drawable/_interfaces";
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
export default function makeDraggable(elem: HTMLElement, options: IDraggableOptions): StandardElement;
