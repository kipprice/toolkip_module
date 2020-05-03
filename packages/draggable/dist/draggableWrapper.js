"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const existingDraggable_1 = require("./existingDraggable");
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
function makeDraggable(elem, options) {
    // Behind the scenes, we create a draggable to get this
    let drg = new existingDraggable_1.ExistingHTML5Draggable(elem, options.target);
    drg.overrideFunctions(options);
    drg.gridSize = options.gridSize || 1;
    // Return the element of the Draggable
    return drg.base;
}
exports.makeDraggable = makeDraggable;
