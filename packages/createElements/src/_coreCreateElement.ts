import { 
    IElemDefinition,
    IKeyedElems,
    ICreateElementFunc, 
    IAttribute,
    ClassName,
    SelectableValue,
    IClassDefinition
 } from "./_interfaces";
import { StandardElement, isNullOrUndefined, isString, IDrawable, isDrawable, isArray } from '@toolkip/shared-types';
import { addClass, flattenStyles, FlatClassDefinition, clearClass } from '@toolkip/style-helpers';
import { createCssClass } from '@toolkip/style-libraries';
import { bind } from '@toolkip/binding';
import { map, IKeyValPair, IConstructor  } from '@toolkip/object-helpers';
import { isClassDefinition } from "./_typeGuards";
import { isSelector, ModelEventFullPayload, IKeyedModel } from '@toolkip/model';

//................................................
//#region PUBLIC FUNCTIONS FOR CREATING ELEMENTS

//...................................................
//#region INTERNAL FUNCTIONS FOR CREATING ELEMENTS

/**
 * _coreCreateElement
 * ---------------------------------------------------------------------------
 * create a DOM element with the specified details
 */
export function _coreCreateElement<T extends IKeyedElems = IKeyedElems>(obj: IElemDefinition<T>, keyedElems?: T, recurseVia?: ICreateElementFunc<T>): StandardElement {
    
    let elem: StandardElement;
    let drawable: IDrawable;

    if (obj.drawable) {
        drawable = _createDrawable(obj.drawable);
        elem = drawable.base;
    } else {
        elem = _createStandardElement(obj);
    }

    // make sure we can recurse effectively
    if (!recurseVia) { recurseVia = _coreCreateElement; }

    // set attributes of the element
    _setElemIdentfiers(elem, obj, keyedElems, drawable);
    _setElemClass(elem, obj);
    _setElemAttributes(elem, obj);
    _setElemStyle(elem, obj);
    _setEventListeners(elem, obj);

    // set content of the element
    _setElemBaseContent(elem, obj);
    _addElemChildren(elem, obj, keyedElems, recurseVia);
    _setElemPostChildrenContent(obj, elem);

    // if a selector is provided, set it up 
    _setElemSelector(obj, elem);

    // append the element to an appropriate parent
    _appendElemToParent(obj, elem);

    return elem;
}

function _createDrawable(ctor: IConstructor<IDrawable> | (() => IDrawable)): IDrawable {
    let child: IDrawable;
    try {
        child = (ctor as (() => IDrawable))();
    
    // if it fails, fall back to using it as a constructor
    } catch(e) {
        child = new (ctor as IConstructor<IDrawable>)();
    }
    return child;
}

/**
 * _createStandardElement
 * ---------------------------------------------------------------------------
 * create the approproate type of element
 */
function _createStandardElement<T extends IKeyedElems>(obj: IElemDefinition<T>): StandardElement {
    let elem: StandardElement;
    let type = obj.type || "div";

    if (obj.namespace) {
        elem = document.createElementNS(obj.namespace, type) as StandardElement;
    } else {
        elem = document.createElement(type);
    }

    return elem;
}

/**
 * _setElemIdentifiers
 * ---------------------------------------------------------------------------
 * assign an ID to this element, and add it to the keyed array if appropriate
 */
function _setElemIdentfiers<T extends IKeyedElems>(elem: StandardElement, obj: IElemDefinition<T>, keyedElems?: IKeyedElems, drawable?: IDrawable): void {
    
    // set the id on the newly created object
    if (obj.id) { 
        _handleSelector(obj.id, (id) => elem.setAttribute("id", id) ) 
    }

    // if there is a key, add this element to the keyed elements
    if (obj.key && keyedElems) { 
        if (drawable) { keyedElems[obj.key as any] = drawable; }
        else { keyedElems[obj.key as any] = elem; }
    }
}

/**
 * _setElemClass
 * ---------------------------------------------------------------------------
 * set the CSS class of this element (including creating it if it doesn't
 * exist)
 */
function _setElemClass<T extends IKeyedElems>(elem: StandardElement, obj: IElemDefinition<T>): void {
    const cls = obj.cls;
    if (!cls) { return; }
    
    _handleSelector( cls, (v) => _innerSetElemClass(elem, v) )
}

function _innerSetElemClass(elem: StandardElement, cls: string | string[] | IClassDefinition): void {
    if (isClassDefinition(cls)) {

        // create the styles generally on the page
        const flattenedStyles = flattenStyles(cls.styles);
        map(flattenedStyles, (value: FlatClassDefinition, selector: string) => {
            createCssClass(selector, value);
        })

        _setElemClassName(elem, cls.name);

    } else {
        _setElemClassName(elem, cls);
    }
}

function _setElemClassName(elem: StandardElement, name: ClassName): void {
    clearClass(elem);

    if (isString(name)) {
        addClass(elem, name);
    } else if(isArray(name)) {
        addClass(elem, name.join(" "));
    };
}

//...................................................
//#region ATTRIBUTE SPECIFIC

/**
 * _setElemAttributes
 * ---------------------------------------------------------------------------
 * set any additional attributes for the element that aren't defined as common
 * enough to be on the base elem definition
 */
function _setElemAttributes<T extends IKeyedElems>(elem: StandardElement, obj: IElemDefinition<T>): void {

    // if we don't have an attributes array, we want one
    if (!obj.attr) { obj.attr = {}; }

    // handle accessibility on elements that can be selected
    if (_isFocusable(obj)) { obj.focusable = true; }
    if (_needsTabIndex(obj)) { obj.attr.tabindex = 0; }

    // loop over all of the attributes
    map(obj.attr, (value: IAttribute, key: string) => {
        _handleSelector( value, (v) => _innerSetAttribute(elem, v, key) )        
    });
}

function _innerSetAttribute(elem: StandardElement, value: IAttribute, key?: string) {
    if (isNullOrUndefined(value)) { return; }

    if ((value as IKeyValPair<string>).key) {
        let pair: IKeyValPair<string> = value as IKeyValPair<string>;
        _setElemAttribute(elem, pair.key, pair.val);
    } else {
        _setElemAttribute(elem, key, value);
    }
}

/**
 * _setElemAttribute
 * ---------------------------------------------------------------------------
 * sets the actual contents of a particular attribute
 */
function _setElemAttribute(elem: StandardElement, key: string, value: any): void {

    switch (key) {

        // value gets special handling
        case "value":
            (elem as HTMLInputElement).value = (value as string);
            break;

        // everything else goes through set attribute
        default:
            elem.setAttribute(key, (value as string));
            break;
    }
}

/**
 * _isFocusable
 * ---------------------------------------------------------------------------
 * checks if this element should be able to receive focus
 */
function _isFocusable<T extends IKeyedElems>(obj: IElemDefinition<T>): boolean {
    if (!isNullOrUndefined(obj.focusable)) { return obj.focusable; }
    if (!obj.eventListeners) { return false; }
    if (!obj.eventListeners.click) { return false; }
    return true;
}

/**
 * _needsTabIndex
 * ---------------------------------------------------------------------------
 * check if this element should be getting a tab index value
 */
function _needsTabIndex<T extends IKeyedElems>(obj: IElemDefinition<T>): boolean {
    if (!_isFocusable(obj)) { return false; }
    if (obj.attr.tabIndex) { return false; }
    return true;
}

//#endregion
//...................................................

/**
 * _setElemStyle
 * ---------------------------------------------------------------------------
 * set the appropriate element-level styles for this element
 */
function _setElemStyle<T extends IKeyedElems>(elem: StandardElement, obj: IElemDefinition<T>): void {
    if (!obj.style) { return; }

    _handleSelector(obj.style, (style) => {
        map(style, (val: any, key: string) => {
            elem.style[key] = val;
        });
    })
    
}

/**
 * _setEventListeners
 * ---------------------------------------------------------------------------
 * go through any registered event listeners on this element and assign them
 */
function _setEventListeners<T extends IKeyedElems>(elem: StandardElement, obj: IElemDefinition<T>): void {
    if (!obj.eventListeners) { return; }

    // if this is an accessible object and it can take focus, add keybaord listeners too
    if (obj.focusable && obj.eventListeners.click && !obj.eventListeners.keypress) {
        let clickFunc: Function = obj.eventListeners.click;
        obj.eventListeners.keypress = (e: KeyboardEvent) => {
            if (e.keyCode !== 13 && e.keyCode !== 32) { return; }
            clickFunc(e);
            e.preventDefault();
        }

        let preventFocus: boolean = false;
        obj.eventListeners.mousedown = (e: MouseEvent) => {
            preventFocus = true;
            elem.blur();
        }

        obj.eventListeners.mouseup = (e: MouseEvent) => {
            preventFocus = false;
        }

        obj.eventListeners.focus = (e: FocusEvent) => {
            if (preventFocus) { 
                e.preventDefault(); 
                elem.blur();
                return false;
            }
            
        }
    }

    // loop through all listeners to add them to the element
    map(obj.eventListeners, (listener: EventListener, key: keyof WindowEventMap) => {
        elem.addEventListener(key, listener);
    });

}

/**
 * _setElemBaseContent
 * ---------------------------------------------------------------------------
 * set the initial content of the element, which will be rendered before any
 * children are added
 */
function _setElemBaseContent<T extends IKeyedElems>(elem: StandardElement, obj: IElemDefinition<T>): void {

    // Set the first bit of content in the element (guaranteed to come before children)
    if (obj.before_content) { _handleSelector(obj.before_content, (before_content) => elem.innerHTML = before_content ) }

    // also check for the various content types
    if (obj.content) { _handleSelector(
        obj.content, 
        (content, { oldValue }) => {
            if (oldValue && elem.innerHTML.indexOf(oldValue) !== -1) {
                elem.innerHTML = elem.innerHTML.replace(oldValue, content);
            } else {
                elem.innerHTML += content 
            }
        }) }
    else if (obj.innerHTML) { _handleSelector(obj.innerHTML, (innerHTML) => elem.innerHTML = innerHTML ) }
    else if (obj.innerText) { _handleSelector(obj.innerText, (innerText) => (elem as any).innerText = innerText ) }
}

/**
 * _addElemChildren
 * ---------------------------------------------------------------------------
 * add any appropriate children to this element
 */
function _addElemChildren<T extends IKeyedElems>(elem: StandardElement, obj: IElemDefinition<T>, keyedElems?: T, recurseVia?: ICreateElementFunc<T>): void {
    if (!obj.children) { return; }

    // loop through each child
    for (let c of obj.children) {

        // make sure there is a child
        if (!c) {
            console.warn("cannot append non-existent child element");
            continue;
        }

        // if the child is a drawable, draw it on the base
        if ((isDrawable(c))) {
            c.draw(elem);

        // if the child is already an element, just add it
        } else if ((c as HTMLElement).setAttribute) {
            elem.appendChild(c as HTMLElement);

            // otherwise, recurse to create this child
        } else {
            let def: IElemDefinition<T> = c as IElemDefinition<T>;
            if (obj.namespace) { def.namespace = obj.namespace; }
            let child = recurseVia(def, keyedElems);
            elem.appendChild(child);
        }


    }

}

/**
 * _setElemPostChildrenContent
 * ---------------------------------------------------------------------------
 * if there is content specified after children, set it here
 */
function _setElemPostChildrenContent<T extends IKeyedElems>(obj: IElemDefinition<T>, elem: StandardElement): void {
    if (!obj.after_content) { return; }
    _handleSelector(obj.after_content, (after_content) => elem.innerHTML += obj.after_content);   
    elem.innerHTML += obj.after_content;
}

/**
 * _appendElemToParent
 * ---------------------------------------------------------------------------
 * add this element to a parent element
 */
function _appendElemToParent<T extends IKeyedElems>(obj: IElemDefinition<T>, elem: StandardElement): void {
    if (!obj.parent) { return; }
    
    obj.parent.appendChild(elem);
}



//#endregion
//...................................................

//..........................................
//#region SELECTOR HELPERS

const _setElemSelector = <T extends IKeyedElems>(obj: IElemDefinition<T>, elem: StandardElement) => {
    if (!obj.selector) { return; }
    const { selector, applyCb } = obj.selector;
    selector.apply((payload) => { applyCb(payload, elem) })

    const value = selector.getData();
    applyCb({ value, eventType: 'none' } as any, elem);
}

const _handleSelector = <T>(value: SelectableValue<T>, cb: (v: T, payload?: ModelEventFullPayload<any, T>) => void) => {
    if (isSelector(value)) {
        value.apply((payload) => {
            cb(payload.value, payload)
        });
        cb(value.getData(), {} as any)
    } else {
        cb(value as T, {} as any);
    }
}

//#endregion
//..........................................

