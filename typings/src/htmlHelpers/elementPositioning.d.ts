import { IPoint } from "../maths/interface";
import { StandardElement } from "../drawable/_interfaces";
/**
 * GlobalOffsetLeft
 * ----------------------------------------------------------------------------
 * Gets the offset left of this element in reference to the entire page
 *
 * @param   elem    The element to get the offset of
 * @param   parent  The parent element to use as the reference. If not
 *                  included, it uses the document.body as the reference
 *
 * @returns The global offset of the elememt from the left of the page (or
 *          parent, if included)
 *
 */
export declare function globalOffsetLeft(elem: HTMLElement, parent?: HTMLElement, useStandardParent?: boolean): number;
/**
 * GlobalOffsetTop
 * ----------------------------------------------------------------------------
 * Gets the offset top of this element in reference to the entire page
 *
 * @param   elem   The element to get the offset of
 * @param   parent The parent element to use as the reference. If not
 *                 included, it uses the document.body as the reference
 *
 * @returns The global offset of the elememt from the top of the page (or
 *          parent, if included)
 *
 */
export declare function globalOffsetTop(elem: HTMLElement, parent?: HTMLElement, useStandardParent?: boolean): number;
/**
 * GlobalOffsets
 * ----------------------------------------------------------------------------
 * Gets both the left and top offset
 *
 * @param   elem    The element to get the offsets for
 * @param   parent  The element to use as the reference frame
 *
 * @returns Object with the keys "left" and "top"
 *
 */
export declare function globalOffsets(elem: HTMLElement, parent?: HTMLElement, useStandardParent?: boolean): {
    left: number;
    top: number;
};
/**
 * getScrollPosition
 * ----------------------------------------------------------------------------
 * Determines how far we have scrolled down the page
 *
 * @returns The point of the current scroll position
 *
 */
export declare function getScrollPosition(): IPoint;
/**
 * measureElement
 * ----------------------------------------------------------------------------
 * Measures how large an element is when rendered on the document
 * @param     elem    The element to measure
 * @param     parent  The parent element to render this within
 * @returns   The client rect for the element
 *
 */
export declare function measureElement(elem: HTMLElement, parent?: HTMLElement): ClientRect;
/**
 * findCommonParent
 * ----------------------------------------------------------------------------
 * Finds the closest shared parent between two arbitrary elements
 *
 * @param   elem_a    The first element to find the shared parent for
 * @param   elem_b    The second element to find the shared parent for
 *
 * @returns The closest shared parent, or undefined if it doesn't exist or
 *          an error occurred.
 *
 */
export declare function findCommonParent(elem_a: HTMLElement, elem_b: HTMLElement): HTMLElement;
/**
 * moveRelToElement
 * ----------------------------------------------------------------------------
 * Moves a given element to a position relative to the reference element.
 *
 * This is for cases where you have two elements with different parents, and
 * you want to specify that element A is some number of pixels in some
 * direction compared to element B.
 *
 * @param   elem    The element to move
 * @param   ref     The element to use as the reference element
 * @param   x       The x offset to give this element, relative to the reference
 * @param   y       The y offset to give this element, relative to the reference
 * @param   no_move If set to false, only returns the offset_x and offset_y that
 *                  the element would have to be moved {optional}
 *
 * @returns An object containing the keys x and y, set to the offset applied to the element.
 *
 */
export declare function moveRelToElem(elem: HTMLElement, ref: HTMLElement, x?: number, y?: number, no_move?: boolean): {
    x: number;
    y: number;
};
export declare function isInDOM(elem: StandardElement): boolean;
