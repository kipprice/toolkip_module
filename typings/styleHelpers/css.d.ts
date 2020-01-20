import { DrawableElement } from '../drawable/_interfaces';
import { Drawable } from '../drawable/drawable';
import { IClassDefinition } from '../htmlHelpers/_interfaces';
import { IKeyValPair } from '../objectHelpers/_interfaces';
/**
 * addClass
 * ----------------------------------------------------------------------------
 * Allows a user to safely add a CSS class to an element's existing list of CSS classes
 * @param {HTMLElement}   elem      The element that should have its class updated
 * @param {string}        newClass  The class to add the element
 *
 */
export declare function addClass(elem: DrawableElement, newClass: string): void;
/**
 * removeClass
 * ----------------------------------------------------------------------------
 * Allows a user to safely remove a CSS class to an element's existing list of CSS classes
 * @param {HTMLElement} elem      The element that should have its class updated
 * @param {string}      newClass  The class to remove from the element
 *
 */
export declare function removeClass(elem: DrawableElement, oldClass: string): void;
/**
 * hasClass
 * ----------------------------------------------------------------------------
 * Checks whether a provided HTML element has a CSS class applied
 * @param  {HTMLElement}  elem  The element to check
 * @param  {String}       cls   The CSS class to check for
 * @return {Boolean}            True if the element has the CSS class applied; false otherwise
 *
 */
export declare function hasClass(elem: HTMLElement | Drawable, cls: string): boolean;
/**
 * setProperty
 * ----------------------------------------------------------------------------
 * Sets the CSS definition for a given class and attribute.
 *
 * @param {string} cls   - The class to change
 * @param {string} item  - The attribute within the class to update
 * @param {string} val   - The new value to set the attribute to
 * @param {bool} force   - If true, will create the CSS attribute even if it doesn't exist
 *
 * @return {bool} True if the CSS was successfully set, false otherwise
 */
export declare function setProperty(cls: string, item: string, val: string, force?: boolean): boolean;
/**
 * getProperty
 * ----------------------------------------------------------------------------
 * Grabs the value of a given CSS class's attribute
 *
 * @param {string} cls  - The CSS class to look within
 * @param {string} item - The attribute we want to grab the value for
 *
 * @return {string} The value of that particular CSS class's attribute
 */
export declare function getProperty(cls: any, item: any): string;
/**
 * oldCreateClass
 * ----------------------------------------------------------------------------
 * @deprecated
 * Creates a CSS class and adds it to the style of the document
 * @param  {string}      selector   CSS selector to use to define what elements get this style
 * @param  {any}         attr       Array of css attributes that should be applied to the class
 * @param  {boolean}     [noAppend] True if we shouldn't actually add the class to the documment yet
 * @return {HTMLElement}            The CSS style tag that was created
 */
export declare function oldCreateClass(selector: string, attr: IClassDefinition | IKeyValPair<string>[], noAppend?: boolean): HTMLElement;
/**
 * getComputedStyle
 * ----------------------------------------------------------------------------
 * Gets the computed style of a given element
 *
 * @param {HTMLElement} elem - The element we are getting the style of
 * @param {string} attr - If passed in, the attribute to grab from the element's style
 *
 * @return {string} Either the particular value for the passed in attribute, or the whole style array.
 */
export declare function getComputedStyle(elem: Drawable | HTMLElement, attr: string): CSSStyleDeclaration | string;
/** adds a generic hidden class to the document */
export declare function addHiddenClass(): void;
/** Adds the "unselectable" class definition to the document */
export declare function addUnselectableClass(): HTMLStyleElement;
