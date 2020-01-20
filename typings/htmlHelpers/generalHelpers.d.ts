import { IPoint } from "../maths/_interfaces";
/**
 * removeSubclassFromAllElenents
 * ----------------------------------------------------------------------------
 * Allows you to easily remove a subclass from all elements that have a certain
 * main class. Useful for things like button selection
 *
 * @param   cls       The main class to find all elements of
 * @param   subcls    The sub class to remove from all of those elements
 * @param   exception If needed, a single element that should
 *                    not have its subclass removed.
 *
 */
export declare function removeSubclassFromAllElements(cls: string, subcls: string, exception?: HTMLElement): void;
/**
* isChildEventTarget
* ----------------------------------------------------------------------------
* Checks if a child of the current task is being targeted by the event
*
* @param   ev    The event that is being triggered
* @param   root  The parent to check for
*
* @returns True if the event is being triggered on a child element of the
*          root element, false otherwise
*
*/
export declare function isChildEventTarget(ev: Event, root: HTMLElement): boolean;
/**
 * isChild
 * ----------------------------------------------------------------------------
 * Checks if an element is a child of the provided parent element
 *
 * @param   root    The parent to check for
 * @param   child   The element to check for being a child of the root node
 * @param   levels  The maximum number of layers that the child can be
 *                  separated from its parent. Ignored if not set.
 *
 * @returns True if the child has the root as a parent
 *
 */
export declare function isChild(root: HTMLElement, child: HTMLElement): boolean;
/**
 * appendChildren
 * ----------------------------------------------------------------------------
 * Appends an arbitrary number of children to the specified parent node. Loops
 * through all members of the argument list to get the appropriate children
 * to add.
 *
 * @param   parent  The parent element to add children to
 * @param   kids    Any children that should be appended
 */
export declare function appendChildren(parent: HTMLElement, ...kids: HTMLElement[]): void;
/**
 * clearChildren
 * ----------------------------------------------------------------------------
 * remove all children from the specified parent element
 */
export declare function clearChildren(parent: HTMLElement): void;
/**
 * moveElemRelativePosition
 * ----------------------------------------------------------------------------
 * Moves an element a relative anount
 *
 * @param   elem      The element to move
 * @param   distance  The relative distance to move
 *
 */
export declare function moveElemRelativePosition(elem: HTMLElement, distance: IPoint): void;
/**
 * resetPageFocus
 * ----------------------------------------------------------------------------
 * Reset where current focus is to the top of the page
 *
 */
export declare function resetPageFocus(): void;
/**
 * removeElement
 * ----------------------------------------------------------------------------
 * Remove an element from the DOM
 * @param   elem    The element to remove
 *
 */
export declare function removeElement(elem: HTMLElement): void;
/**
 * select
 * ----------------------------------------------------------------------------
 * Selects the contents of an HTML element, whether an input or a
 * content-editable element.
 *
 * @param   htmlElem    The element to select the contents of
 *
 */
export declare function select(htmlElem: HTMLElement): void;
export declare const HTML_TAB = "&nbsp;&nbsp;&nbsp;&nbsp;";
/**
 * encodeForHTML
 * ----------------------------------------------------------------------------
 * Encode a string so that it can render appropriately in HTML contexts
 * @param   data    The data to encode
 * @returns The encoded data
 *
 */
export declare function encodeForHTML(data: string): string;
/**
 * decodeFromHTML
 * ----------------------------------------------------------------------------
 * From an HTML-renderable string, convert back to standard strings
 * @param   data    The string to unencode
 * @returns The decoded data
 */
export declare function decodeFromHTML(data: string): string;
/**
 * replaceElemWithElem
 * ----------------------------------------------------------------------------
 * replace a particular element with another in the DOM
 *
 * @param   elemToReplace   The element to remove
 * @param   replacement     The element to replace with
 */
export declare function replaceElemWithElem(elemToReplace: HTMLElement, replacement: HTMLElement): void;
/**
 * isVisible
 * ----------------------------------------------------------------------------
 * determine if a particular element is visible to the end user
 * @param   elem    The element to check
 * @returns True if the element is visible; false otherwise
 */
export declare function isVisible(elem: HTMLElement): boolean;
