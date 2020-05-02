import { IPoint } from '../shared';
import { degreesToRadians, getEndPoint, getDistance, getAngle } from './trig';
import { createSimpleElement, IClassDefinition } from '../createElements';
import { globalOffsetLeft, globalOffsetTop, findCommonParent } from '../htmlHelpers/elementPositioning';
import { StyleLibrary } from '../styleLibraries/styleLibrary';
import { TypedClassDefinition } from '../styleHelpers';

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
export function arrangeRadially(centralELem: HTMLElement, fringeElems: HTMLElement[], minAngle?: number, maxAngle?: number): void {

	// The calculation for this needs to be as follows:
	//		1. Each element gets an angle assigned
	// 		2. each element has its dimensions determined, then the distance of circle that would be neede to fit all X

	// set defaults for angles
	minAngle = minAngle || 0;
	maxAngle = maxAngle || 360;
	let availableAngle: number = maxAngle - minAngle;
	let deltaAngle: number = availableAngle / fringeElems.length;

	let maxDistance: number = 0;

	let centralPoint: IPoint = {
		x: centralELem.offsetWidth / 2,
		y: centralELem.offsetHeight / 2
	};

	let elem: HTMLElement;

	// First calculate the max distance we need to move elements away
	for (elem of fringeElems) {
		let elemRadius: number = Math.max(elem.offsetWidth, elem.offsetHeight);
		let centralAngle: number = availableAngle / fringeElems.length;
		let internalAngle: number = 180 - centralAngle;
		let appropriateDistance: number = (elemRadius * Math.sin(degreesToRadians(internalAngle))) / Math.sin(degreesToRadians(centralAngle));

		if (appropriateDistance > maxDistance) {
			maxDistance = appropriateDistance;
		}
	}

	// actually position the elements
	let i: number;
	for (i = 0; i < fringeElems.length; i += 1) {
		let pt: IPoint = getEndPoint(
			centralPoint,
			minAngle + (deltaAngle * i),
			maxDistance
		);

		console.log(pt);

		elem = fringeElems[i];
		elem.style.left = (pt.x - (elem.offsetWidth / 2)) + "px";
		elem.style.top = (pt.y - (elem.offsetHeight / 2)) + "px";
	}


}
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
export function drawLine(start: IPoint, end: IPoint, host?: HTMLElement, lbl?: string, lblNoRotate?: boolean): HTMLElement {
	;
	let angle: number;
	let distance: number;
	let div: HTMLElement;
	let lblElem: HTMLElement;

	distance = getDistance(start, end);
	angle = getAngle(start, end);

	// Create a CSS class that can be overridden for general options
	const cls = {
		position: "absolute",
		height: "1px",
		transformOrigin: "0px 0px"
	};

	StyleLibrary.add("trigDrawing", { ".angledLine" : cls });

	// Create the div and give it minimal styling to show the line
	div = createSimpleElement("", "angledLine");
	div.style.left = start.x + "px";
	div.style.top = start.y + "px";

	// Approriately assign the size of the element
	div.style.width = distance + "px";

	// Rotate to our specified degree
	div.style.transform = "rotate(" + angle + "deg)";

	// Add to the specified parent element
	if (host) { host.appendChild(div); }

	// If there is also a label, create that
	if (lbl) {
		lblElem = createSimpleElement("", "lbl", lbl);
		if (lblNoRotate) {
			lblElem.style.transform = "rotate(" + (-1 * angle) + "deg)";
			lblElem.style.transformOrigin = "(0, 0)";
		}
		div.appendChild(lblElem);
	}
	return div;
};

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
export function updateLine(line: HTMLElement, end: IPoint): HTMLElement {
	let start: IPoint = {
		x: parseInt(line.style.left),
		y: parseInt(line.style.top)
	};

	let distance = getDistance(start, end);
	let angle = getAngle(start, end);

	line.style.width = distance + "px",
	line.style.transform = "rotate(" + angle + "deg)";

	return line;
}

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
export function connectElements(start_elem: HTMLElement, end_elem: HTMLElement, lbl?: string, lblNoRotate?: boolean): HTMLElement {
	;
	let start_point: IPoint;
	let end_point: IPoint;
	let x_1: number;
	let x_2: number;
	let y_1: number;
	let y_2: number;
	let parent: HTMLElement;

	// Set our parent to use when calculating the global offsets
	parent = findCommonParent(start_elem, end_elem);

	// Set the values to be the center of each element
	x_1 = globalOffsetLeft(start_elem, parent) + (start_elem.offsetWidth / 2);
	x_2 = globalOffsetLeft(end_elem, parent) + (end_elem.offsetWidth / 2);
	y_1 = globalOffsetTop(start_elem, parent) + (start_elem.offsetHeight / 2);
	y_2 = globalOffsetTop(end_elem, parent) + (end_elem.offsetHeight / 2);

	// Create the objects for these points
	start_point = { x: x_1, y: y_1 };
	end_point = { x: x_2, y: y_2 };

	return drawLine(start_point, end_point, parent, lbl, lblNoRotate);
};