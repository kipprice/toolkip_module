"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toolkip_shared_types_1 = require("@kipprice/toolkip-shared-types");
const toolkip_style_helpers_1 = require("@kipprice/toolkip-style-helpers");
const toolkip_style_libraries_1 = require("@kipprice/toolkip-style-libraries");
const toolkip_binding_1 = require("@kipprice/toolkip-binding");
const toolkip_object_helpers_1 = require("@kipprice/toolkip-object-helpers");
const _typeGuards_1 = require("./_typeGuards");
//................................................
//#region PUBLIC FUNCTIONS FOR CREATING ELEMENTS
//...................................................
//#region INTERNAL FUNCTIONS FOR CREATING ELEMENTS
/**
 * _coreCreateElement
 * ---------------------------------------------------------------------------
 * create a DOM element with the specified details
 */
function _coreCreateElement(obj, keyedElems, recurseVia) {
    let elem;
    let drawable;
    if (obj.drawable) {
        drawable = _createDrawable(obj.drawable);
        elem = drawable.base;
    }
    else {
        elem = _createStandardElement(obj);
    }
    // make sure we can recurse effectively
    if (!recurseVia) {
        recurseVia = _coreCreateElement;
    }
    // set attributes of the element
    _setElemIdentfiers(elem, obj, keyedElems, drawable);
    _setElemClass(elem, obj);
    _setElemAttributes(elem, obj);
    _setElemStyle(elem, obj);
    _setEventListeners(elem, obj);
    _setKipTooltip(elem, obj);
    // set content of the element
    _setElemBaseContent(elem, obj);
    _addElemChildren(elem, obj, keyedElems, recurseVia);
    _setElemPostChildrenContent(obj, elem);
    // append the element to an appropriate parent
    _appendElemToParent(obj, elem);
    return elem;
}
exports._coreCreateElement = _coreCreateElement;
function _createDrawable(ctor) {
    let child;
    try {
        child = ctor();
        // if it fails, fall back to using it as a constructor
    }
    catch (e) {
        child = new ctor();
    }
    return child;
}
/**
 * _createStandardElement
 * ---------------------------------------------------------------------------
 * create the approproate type of element
 */
function _createStandardElement(obj) {
    let elem;
    let type = obj.type || "div";
    if (obj.namespace) {
        elem = document.createElementNS(obj.namespace, type);
    }
    else {
        elem = document.createElement(type);
    }
    return elem;
}
/**
 * _setElemIdentifiers
 * ---------------------------------------------------------------------------
 * assign an ID to this element, and add it to the keyed array if appropriate
 */
function _setElemIdentfiers(elem, obj, keyedElems, drawable) {
    // set the id on the newly created object
    if (obj.id) {
        elem.setAttribute("id", obj.id);
    }
    // if there is a key, add this element to the keyed elements
    if (obj.key && keyedElems) {
        if (drawable) {
            keyedElems[obj.key] = drawable;
        }
        else {
            keyedElems[obj.key] = elem;
        }
    }
}
/**
 * _setElemClass
 * ---------------------------------------------------------------------------
 * set the CSS class of this element (including creating it if it doesn't
 * exist)
 */
function _setElemClass(elem, obj) {
    const cls = obj.cls;
    if (!cls) {
        return;
    }
    if (_typeGuards_1.isClassDefinition(cls)) {
        // create the styles generally on the page
        const flattenedStyles = toolkip_style_helpers_1.flattenStyles(cls.styles);
        toolkip_object_helpers_1.map(flattenedStyles, (value, selector) => {
            toolkip_style_libraries_1.createCssClass(selector, value);
        });
        _setElemClassName(elem, cls.name);
    }
    else {
        _setElemClassName(elem, cls);
    }
}
function _setElemClassName(elem, name) {
    if (toolkip_shared_types_1.isString(name)) {
        toolkip_style_helpers_1.addClass(elem, name);
    }
    else {
        toolkip_style_helpers_1.addClass(elem, name.join(" "));
    }
}
//...................................................
//#region ATTRIBUTE SPECIFIC
/**
 * _setElemAttributes
 * ---------------------------------------------------------------------------
 * set any additional attributes for the element that aren't defined as common
 * enough to be on the base elem definition
 */
function _setElemAttributes(elem, obj) {
    // if we don't have an attributes array, we want one
    if (!obj.attr) {
        obj.attr = {};
    }
    // handle accessibility on elements that can be selected
    if (_isFocusable(obj)) {
        obj.focusable = true;
    }
    if (_needsTabIndex(obj)) {
        obj.attr.tabindex = 0;
    }
    // loop over all of the attributes
    toolkip_object_helpers_1.map(obj.attr, (value, key) => {
        if (toolkip_shared_types_1.isNullOrUndefined(value)) {
            return;
        }
        if (value.key) {
            let pair = value;
            _setElemAttribute(elem, pair.key, pair.val);
        }
        else {
            _setElemAttribute(elem, key, value);
        }
    });
}
/**
 * _isFocusable
 * ---------------------------------------------------------------------------
 * checks if this element should be able to receive focus
 */
function _isFocusable(obj) {
    if (!toolkip_shared_types_1.isNullOrUndefined(obj.focusable)) {
        return obj.focusable;
    }
    if (!obj.eventListeners) {
        return false;
    }
    if (!obj.eventListeners.click) {
        return false;
    }
    return true;
}
/**
 * _needsTabIndex
 * ---------------------------------------------------------------------------
 * check if this element should be getting a tab index value
 */
function _needsTabIndex(obj) {
    if (!_isFocusable(obj)) {
        return false;
    }
    if (obj.attr.tabIndex) {
        return false;
    }
    return true;
}
/**
 * _setElemAttribute
 * ---------------------------------------------------------------------------
 * sets the actual contents of a particular attribute
 */
function _setElemAttribute(elem, key, value) {
    switch (key) {
        // value gets special handling
        case "value":
            elem.value = value;
            break;
        // everything else goes through set attribute
        default:
            elem.setAttribute(key, value);
            break;
    }
}
//#endregion
//...................................................
/**
 * _setElemStyle
 * ---------------------------------------------------------------------------
 * set the appropriate element-level styles for this element
 */
function _setElemStyle(elem, obj) {
    if (!obj.style) {
        return;
    }
    toolkip_object_helpers_1.map(obj.style, (val, key) => {
        elem.style[key] = val;
    });
}
/**
 * _setEventListeners
 * ---------------------------------------------------------------------------
 * go through any registered event listeners on this element and assign them
 */
function _setEventListeners(elem, obj) {
    if (!obj.eventListeners) {
        return;
    }
    // if this is an accessible object and it can take focus, add keybaord listeners too
    if (obj.focusable && obj.eventListeners.click && !obj.eventListeners.keypress) {
        let clickFunc = obj.eventListeners.click;
        obj.eventListeners.keypress = (e) => {
            if (e.keyCode !== 13 && e.keyCode !== 32) {
                return;
            }
            clickFunc(e);
            e.preventDefault();
        };
        let preventFocus = false;
        obj.eventListeners.mousedown = (e) => {
            preventFocus = true;
            elem.blur();
        };
        obj.eventListeners.mouseup = (e) => {
            preventFocus = false;
        };
        obj.eventListeners.focus = (e) => {
            if (preventFocus) {
                e.preventDefault();
                elem.blur();
                return false;
            }
        };
    }
    // loop through all listeners to add them to the element
    toolkip_object_helpers_1.map(obj.eventListeners, (listener, key) => {
        elem.addEventListener(key, listener);
    });
}
/**
 * _setKipTooltip
 * ---------------------------------------------------------------------------
 * set a more UI-focused tooltip on a particular element
 */
function _setKipTooltip(elem, obj) {
    if (!obj.tooltip) {
        return;
    }
    // FIXME: don't have circular reference
    //new Tooltip({ content: obj.tooltip }, elem as HTMLElement);
}
/**
 * _setElemBaseContent
 * ---------------------------------------------------------------------------
 * set the initial content of the element, which will be rendered before any
 * children are added
 */
function _setElemBaseContent(elem, obj) {
    // Set the first bit of content in the element (guaranteed to come before children)
    if (obj.before_content) {
        elem.innerHTML = obj.before_content;
    }
    // Also check for just plain "Content"
    if (obj.content) {
        elem.innerHTML += obj.content;
    }
    // also check for bound content; if we find it, add our own content updater
    if (obj.boundContent) {
        toolkip_binding_1.bind(obj.boundContent, (newVal) => {
            elem.innerHTML = newVal;
        });
        elem.innerHTML = obj.boundContent();
    }
}
/**
 * _addElemChildren
 * ---------------------------------------------------------------------------
 * add any appropriate children to this element
 */
function _addElemChildren(elem, obj, keyedElems, recurseVia) {
    if (!obj.children) {
        return;
    }
    // loop through each child
    for (let c of obj.children) {
        // make sure there is a child
        if (!c) {
            console.warn("cannot append non-existent child element");
            continue;
        }
        // if the child is a drawable, draw it on the base
        if ((toolkip_shared_types_1.isDrawable(c))) {
            c.draw(elem);
            // if the child is already an element, just add it
        }
        else if (c.setAttribute) {
            elem.appendChild(c);
            // otherwise, recurse to create this child
        }
        else {
            let def = c;
            if (obj.namespace) {
                def.namespace = obj.namespace;
            }
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
function _setElemPostChildrenContent(obj, elem) {
    if (!obj.after_content) {
        return;
    }
    elem.innerHTML += obj.after_content;
}
/**
 * _appendElemToParent
 * ---------------------------------------------------------------------------
 * add this element to a parent element
 */
function _appendElemToParent(obj, elem) {
    if (!obj.parent) {
        return;
    }
    obj.parent.appendChild(elem);
}
//#endregion
//...................................................
