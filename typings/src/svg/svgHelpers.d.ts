import { IElemDefinition } from "../htmlHelpers/_interfaces";
/**----------------------------------------------------------------------------
 * @file Functions that allow for easier creation of SVG elements
 * @author Kip Price
 * @version 1.0
 * @since 1.1
 * ----------------------------------------------------------------------------
 */
/**
 * Creates an SVG parent that can be added to dynamically
 *
 * @param {String} id      The ID for the SVG element created
 * @param {Number} width   The width at which the SVG should display {optional: 0}
 * @param {Number} height  The height at which the SVG should display {optional: 0}
 * @param {String} view    The viewBox parameter that should be set for the created element {optional: "0 0 0 0"}
 * @param {String} content The contents of the SVG that should displayed {optional: ""}
 *
 * @returns {SVGElement} The SVG element that was created
 */
export declare function createSVG(def: IElemDefinition): SVGElement;
/**
 * Creates a piece of an SVG drawing
 *
 * @param 	type	What type of SVG element we are drawing
 * @param 	attr 	An object of key-value pairs of attributes to set for this element
 *
 * @returns The element to be added to the SVG drawing
 */
export declare function createSVGElem(def: IElemDefinition): SVGElement;
