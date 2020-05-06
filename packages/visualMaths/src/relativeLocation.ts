import { globalOffsetLeft, globalOffsetTop } from '@kipprice/toolkip-html-helpers';
import { SortOrderEnum } from '@kipprice/toolkip-comparable';

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