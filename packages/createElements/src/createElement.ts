import { IElemDefinition, IKeyedElems, ICreateElementFunc } from "./_interfaces";
import { _coreCreateElement, _coreCreateElements } from "./_coreCreateElement";
import { SVG_NAMESPACE } from './_constants';


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
export function createElement<T extends IKeyedElems>(obj: IElemDefinition<T>, keyedElems?: T): HTMLElement {
    if (!obj) { return; }
    return _coreCreateElement(obj, keyedElems) as HTMLElement;
}

/**
 * createElements
 * ----------------------------------------------------------------------------
 * generate several elements at once, and return them as an array
 * 
 * @param   objs            The elements to create
 * @param   [keyedElems]    If provided, the object to save any keyed elements into
 * 
 * @returns The created array of elements
 */
export function createElements<T extends IKeyedElems>(objs: IElemDefinition<T>[], keyedElems?: T): HTMLElement[] {
    if (!objs) { return; }
    return _coreCreateElements(objs, keyedElems) as HTMLElement[];
}

/**
 * createCustomElement
 * ----------------------------------------------------------------------------
 * Creates an HTML element with the specified attributes, but allows for 
 * additional processing on the element.
 * 
 * @param obj           The object to base the element off of
 * @param [keyedElems]  If provided, the elements that were created via a key
 * @param [recurseVia]  The custom function we should recurse through
 * 
 * @returns The created element
 */
export function createCustomElement<T extends IKeyedElems, I extends IElemDefinition<T>>(obj: I, keyedElems?: T, recurseVia?: ICreateElementFunc<T>): HTMLElement {
    if (!obj) { return; }
    return _coreCreateElement(obj, keyedElems, recurseVia) as HTMLElement;
}

/**
 * createSVGElement
 * ---------------------------------------------------------------------------
 * create a SVG element specifically
 * 
 * @param   def             The definition to use for the SVG element
 * @param   [keyedElems]    If provided, the object to populate with all of the
 *                          keyed elements
 * 
 * @returns The created SVG element
 */
export function createSVGElement<T extends IKeyedElems>(def: IElemDefinition<T>, keyedElems?: T): SVGElement {
    if (!def) { return; }
    def.type = def.type || "svg";
    def.namespace = SVG_NAMESPACE;
    return _coreCreateElement(def, keyedElems) as SVGElement;
}

/**
 * createSVGElements
 * ----------------------------------------------------------------------------
 * generate several svg elements
 * 
 * @param   defs            The definitions to use for the SVG elements
 * @param   [keyedElems]    If provided, the object to populate with all of the
 *                          keyed elements
 * 
 * @returns The created SVG elements
 */
export function createSVGElements<T extends IKeyedElems>(defs: IElemDefinition<T>[], keyedElems?: T): SVGElement[] {
    if (!defs) { return; }
    const out = [];
    for (let d of defs) {
        out.push(createSVGElement(d, keyedElems))
    }
    return out;
}