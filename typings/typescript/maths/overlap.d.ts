import { IBasicRect } from './interface';
import { SortOrderEnum } from '../objectHelpers/_interfaces';
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
export declare function doElementsOverlap(elem1: HTMLElement, elem2: HTMLElement): boolean;
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
export declare function doRectsOverlap(rect1: IBasicRect | ClientRect | SVGRect, rect2: IBasicRect | ClientRect | SVGRect): boolean;
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
export declare function doBasicRectsOverlap(rect1: IBasicRect, rect2: IBasicRect): boolean;
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
export declare function findBasicRectIntersection(rect1: IBasicRect, rect2: IBasicRect): IBasicRect;
export declare function compareLeftPosition(elemA: HTMLElement, elemB: HTMLElement): SortOrderEnum;
export declare function getLeftMost(...elems: HTMLElement[]): HTMLElement;
export declare function compareRightPosition(elemA: HTMLElement, elemB: HTMLElement): SortOrderEnum;
export declare function getRightMost(...elems: HTMLElement[]): HTMLElement;
export declare function compareTopPosition(elemA: HTMLElement, elemB: HTMLElement): SortOrderEnum;
export declare function getTopMost(...elems: HTMLElement[]): HTMLElement;
export declare function compareBottomPosition(elemA: HTMLElement, elemB: HTMLElement): SortOrderEnum;
export declare function getBottomMost(...elems: HTMLElement[]): HTMLElement;
