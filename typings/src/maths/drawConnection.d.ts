import { IPoint } from './interface';
/**
 * arrangeRadially
 * ---------------------------------------------------------------------------
 * Arrange a series of elements around a central element, making sure there is enough room for each element
 *
 * @param 	centralELem 	the element to use as the center point
 * @param 	fringeElems 	the elements to arrange around the central element
 * @param 	minAngle 		the angle at which to start (in degrees)
 * @param 	maxAngle 		the angle at which to stop (in degrees)
 */
export declare function arrangeRadially(centralELem: HTMLElement, fringeElems: HTMLElement[], minAngle?: number, maxAngle?: number): void;
/**
 * drawLine
 * --------------------------------------------------------------------------
 * Draws a line between two points
 *
 * @param 	start       	The start point of the line
 * @param 	end         	The end point of the line
 * @param 	host        	The element to draw the line on
 * @param 	lbl       		If included, what to label the line
 * @param 	lblNoRotate 	If true, doesn't rotate the text to match the line angle
 *
 * @returns The line that was drawn
 */
export declare function drawLine(start: IPoint, end: IPoint, host?: HTMLElement, lbl?: string, lblNoRotate?: boolean): HTMLElement;
/**
 * updateLine
 * ---------------------------------------------------------------------------
 * Update an existing line to have a new end-point
 *
 * @param 	line	The line to update
 * @param 	end		The end point to use for the line
 *
 * @returns	The updated line
 */
export declare function updateLine(line: HTMLElement, end: IPoint): HTMLElement;
/**
 * connectElements
 * --------------------------------------------------------------------------
 * Draws a line between the two provided elements
 *
 * @param 	start_elem 	The element to start the line at
 * @param 	end_elem   	The element to end the line at
 *
 * @return 	The line that gets drawn
 */
export declare function connectElements(start_elem: HTMLElement, end_elem: HTMLElement, lbl?: string, lblNoRotate?: boolean): HTMLElement;
