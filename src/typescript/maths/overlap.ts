import { IBasicRect } from './interface';
import { toBasicRect } from './rectConversion';
import { globalOffsetLeft, globalOffsetTop } from '../htmlHelpers/elementPositioning';
import { SortOrderEnum } from '../objectHelpers/_interfaces';

//...........................
//#region OVERLAP FUNCTIONS

/**
 * doElementsOverlap
 * --------------------------------------------------------------------------
 * Checks if two given elements overlap
 * 
 * @param 	elem1 	The first element to check
 * @param 	elem2 	The second element to check
 * 
 * @returns True if the elements overlap, false otherwise
 */
export function doElementsOverlap(elem1: HTMLElement, elem2: HTMLElement): boolean {
	;
	let rect1: ClientRect
	let rect2: ClientRect;

	rect1 = elem1.getBoundingClientRect();
	rect2 = elem2.getBoundingClientRect();

	return doRectsOverlap(rect1, rect2);
};

/**
 * doRectsOverlap
 * --------------------------------------------------------------------------
 * Checks if two rectangles overlap at all
 * 
 * @param 	rect1 	The first rectangle to check
 * @param 	rect2 	The second rectangle to check
 * 
 * @returns True if there is any overlap between the rectangles
 */
export function doRectsOverlap(rect1: IBasicRect | ClientRect | SVGRect, rect2: IBasicRect | ClientRect | SVGRect): boolean {
	let r1: IBasicRect = toBasicRect(rect1);
	let r2: IBasicRect = toBasicRect(rect2);

	return false;
}

/**--------------------------------------------------------------------------
 * doBasicRectsOverlap
 * --------------------------------------------------------------------------
 * detect if two rectangles overlap 
 * 
 * @param 	rect1	the first rectangle to compare
 * @param 	rect2	the second rectangle to compare
 * 
 * @returns true if the two rectangles do overlap
 * --------------------------------------------------------------------------
 */
export function doBasicRectsOverlap(rect1: IBasicRect, rect2: IBasicRect): boolean {
	let x_overlap: boolean;
	let y_overlap: boolean;
	if (rect1.x >= rect2.x && rect1.x <= (rect2.w + rect2.x)) { x_overlap = true; }
	if (rect2.x >= rect1.x && rect2.x <= (rect1.w + rect1.x)) { x_overlap = true; }

	if (rect1.y >= rect2.y && rect1.y <= (rect2.h + rect2.y)) { y_overlap = true; }
	if (rect2.y >= rect1.y && rect2.y <= (rect1.h + rect1.y)) { y_overlap = true; }

	return (x_overlap && y_overlap);
}
//#endregion

//#region INTERSECTION FUNCTIONS

/**--------------------------------------------------------------------------
 * findBasicRectIntersection
 * --------------------------------------------------------------------------
 * calculate the overlap section for 2 given basic rectangles 
 * 
 * @param rect1 - the first rectangle to check
 * @param rect2 - the second rectangle to check
 * 
 * @returns The rectangle of overlap
 * --------------------------------------------------------------------------
 */
export function findBasicRectIntersection(rect1: IBasicRect, rect2: IBasicRect): IBasicRect {
	let out: IBasicRect;

	let min_x = Math.max(rect1.x, rect2.x);
	let max_x = Math.min(rect1.x + rect1.w, rect2.x + rect2.w);

	let min_y = Math.max(rect1.y, rect2.y);
	let max_y = Math.min(rect1.y + rect1.h, rect2.y + rect2.h);

	out = {
		x: min_x,
		y: min_y,
		w: (max_x - min_x),
		h: (max_y - min_y)
	};

	return out;
}

//#endregion

//#region RELATIVE POSITIONS

export function compareLeftPosition(elemA: HTMLElement, elemB: HTMLElement): SortOrderEnum {
	return _comparePosition(
		globalOffsetLeft(elemA),
		globalOffsetLeft(elemB)
	);
}

export function getLeftMost(...elems: HTMLElement[]): HTMLElement {
	return elems.sort(compareLeftPosition)[0];
}

export function compareRightPosition(elemA: HTMLElement, elemB: HTMLElement): SortOrderEnum {
	return _comparePosition(
		-1 * (globalOffsetLeft(elemA) + elemA.offsetWidth),
		-1 * (globalOffsetLeft(elemB) + elemB.offsetWidth)
	);
}

export function getRightMost(...elems: HTMLElement[]): HTMLElement {
	return elems.sort(compareRightPosition)[0];
}

export function compareTopPosition(elemA: HTMLElement, elemB: HTMLElement): SortOrderEnum {
	return _comparePosition(
		globalOffsetTop(elemA),
		globalOffsetTop(elemB)
	);
}

export function getTopMost(...elems: HTMLElement[]): HTMLElement {
	return elems.sort(compareTopPosition)[0];
}

export function compareBottomPosition(elemA: HTMLElement, elemB: HTMLElement): SortOrderEnum {
	return _comparePosition(
		-1 * (globalOffsetTop(elemA) + elemA.offsetHeight),
		-1 * (globalOffsetTop(elemB) + elemB.offsetHeight)
	);
}

export function getBottomMost(...elems: HTMLElement[]): HTMLElement {
	return elems.sort(compareBottomPosition)[0];
}

function _comparePosition(posA: number, posB: number): SortOrderEnum {
	if (posA < posB) { return SortOrderEnum.CORRECT_ORDER; }
	if (posA > posB) { return SortOrderEnum.INCORRECT_ORDER; }
	return SortOrderEnum.SAME;
}
	//#endregion

