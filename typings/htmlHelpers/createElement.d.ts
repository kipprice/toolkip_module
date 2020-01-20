import { IClasses, IAttributes, IChildren, IElemDefinition, IKeyedElems, ICreateElementFunc } from "./_interfaces";
/**
 * createSimpleElement
 * ----------------------------------------------------------------------------
 * Creates a div element with the provided id, class, content, and attributes.
 *
 * @param {string} id - The ID to assign the element {optional}
 * @param {string} cls - The class to assign the element {optional}
 * @param {string} content - What to include as the contents of the div {optional}
 * @param {arr} attr - An array of key-value pairs that sets all other attributes for the element
 *
 * @return {HTMLElement} The created element, with all specified parameters included.
 *
 */
export declare function createSimpleElement(id?: string, cls?: string | IClasses, content?: string, attr?: IAttributes, children?: IChildren, parent?: HTMLElement): HTMLElement;
/**
 * createElement
 * ---------------------------------------------------------------------------
 * Creates an HTML element with the attributes that are passed in through the
 * object.
 *
 * @param   obj             The object to base the element off of
 * @param   [keyedElems]    If provided, the elements that were created with a key
 *
 * @returns The HTML element with all attributes specified by the object
 */
export declare function createElement<T extends IKeyedElems>(obj: IElemDefinition<T>, keyedElems?: T): HTMLElement;
/**
 * createCustomElement
 * ----------------------------------------------------------------------------
 * Creates an HTML element with the specified attributes, but allows for
 * additional processing on the element.
 *
 * @param obj           The object to base the element off of
 * @param keyedElems    If provided, the elements that were created via a key
 * @param recurseVia    The custom function we should recurse through
 *
 * @returns The created element
 */
export declare function createCustomElement<T extends IKeyedElems, I extends IElemDefinition<T>>(obj: I, keyedElems?: T, recurseVia?: ICreateElementFunc<T>): HTMLElement;
/**
 * createSVGElement
 * ---------------------------------------------------------------------------
 * create a SVG element specifically
 */
export declare function createSVGElement<T extends IKeyedElems>(obj: IElemDefinition<T>, keyedElems?: T): SVGElement;
