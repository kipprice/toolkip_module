import { IAttributes, IChild, IElemDefinition, ILabeledElement, IClassDefinition, IKeyedElems, ICreateElementFunc, ClassName } from "./_interfaces";
import { trim, join } from '@kipprice/toolkip-primitiveHelpers/strings";
import { _coreCreateElement } from "./_coreCreateElement";


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
export function createCustomElement<T extends IKeyedElems, I extends IElemDefinition<T>>(obj: I, keyedElems?: T, recurseVia?: ICreateElementFunc<T>): HTMLElement {
    if (!obj) { return; }
    return _coreCreateElement(obj, keyedElems, recurseVia) as HTMLElement;
}

/**
 * createSVGElement
 * ---------------------------------------------------------------------------
 * create a SVG element specifically
 */
export function createSVGElement<T extends IKeyedElems>(obj: IElemDefinition<T>, keyedElems?: T): SVGElement {
    if (!obj) { return; }
    if (!obj.namespace) { obj.namespace = "http://www.w3.org/2000/svg"; }
    return _coreCreateElement(obj, keyedElems) as SVGElement;
}

/**
 * createSimpleElement
 * ----------------------------------------------------------------------------
 * Creates a div element with the provided id, class, content, and attributes.
 * @deprecated
 * 
 * @param {string} id - The ID to assign the element {optional}
 * @param {string} cls - The class to assign the element {optional}
 * @param {string} content - What to include as the contents of the div {optional}
 * @param {arr} attr - An array of key-value pairs that sets all other attributes for the element
 *
 * @return {HTMLElement} The created element, with all specified parameters included.
 * 
 */
export function createSimpleElement(
    id?: string, 
    cls?: ClassName | IClassDefinition, 
    content?: string, 
    attr?: IAttributes, 
    children?: IChild[], 
    parent?: HTMLElement
) {
    let obj: IElemDefinition;

    obj = {};
    obj.id = id;              // Set the element's ID
    obj.type = "div";         // Set the type of element to create
    obj.content = content;    // Set what the content of the element should be
    obj.cls = cls;            // Set the appropriate CSS class for the element
    obj.attr = attr;          // Set a list of attributes for the element
    obj.children = children;  // Attach children to to the element
    obj.parent = parent;      // Attach the created element to the appropriate parent

    // Use our standard function for creating elements
    return createElement(obj);
};

/**
 * createSimpleLabeledElement
 * ----------------------------------------------------------------------------
 * Create an element and an associated label
 * 
 * @param   id        ID to use for the labeled elem container
 * @param   cls       CSS class to use for the 
 * @param   lbl       Text of the label
 * @param   content   Content of the element that is being labeled
 * @param   children  Any additional child elements
 * @param   parent    The node this element should be added to
 * @param   skipZero  True if we should not draw anything if the content is 0
 *
 * @returns The created element + label
 * 
 */
export function createSimpleLabeledElement(
    id: string, 
    cls: string, 
    lbl: string, 
    content: any, 
    attr: IAttributes, 
    children: IChild[], 
    parent: HTMLElement, 
    skipZero: boolean
): HTMLElement {
    
    let obj: any;
    let cLbl: any;
    let cContent: any;

    if (content === undefined || content === null) return;
    if ((typeof content === typeof "string") && (trim(content).length === 0)) {
        return;
    }
    if (skipZero && content === 0) { return; }
    // Create the wrapper
    obj = {};
    obj.id = id;
    obj.type = "div";
    obj.cls = cls;
    obj.attr = attr;
    obj.children = children;
    obj.parent = parent;

    // Create the label
    cLbl = {
        cls: "lbl",
        content: lbl,
        type: "span"
    };

    // Create the content
    cContent = {
        cls: "content",
        content: content,
        type: "span"
    };

    obj.children = [cLbl, cContent];

    return createElement(obj) as HTMLElement;
};



/**
 * createLabeledElement
 * ----------------------------------------------------------------------------
 * Create an element along with a label
 * 
 * @param   dataElem    Specs by which the data element should be created
 * @param   labelElem   Specs by which the label element should be created
 * 
 * @returns The labeled element
 * 
 */
export function createLabeledElement(dataElem: IElemDefinition, labelElem: IElemDefinition): ILabeledElement {
    // quit if the 
    if (!dataElem || !labelElem) { return; }

    // create the actual element
    let data: HTMLElement = createElement(dataElem) as HTMLElement;

    // create the labeled element
    labelElem.cls = join(" ", labelElem.cls as string, "lbl");
    let lbl: HTMLElement = createElement(labelElem) as HTMLElement;

    // craete the wrapper element
    let container: HTMLElement = createElement({ cls: "wrapper", children: [lbl, data] }) as HTMLElement;

    return {
        data: data,
        lbl: lbl,
        wrapper: container
    };
}
