"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toolkip_style_helpers_1 = require("@kipprice/toolkip-style-helpers");
const _typeguards_1 = require("./_typeguards");
const toolkip_shared_types_1 = require("@kipprice/toolkip-shared-types");
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
function removeSubclassFromAllElements(cls, subcls, exception) {
    let elems;
    let e;
    let elem;
    elems = document.getElementsByClassName(cls);
    for (e = 0; e < elems.length; e += 1) {
        elem = elems[e];
        // Only remove it if it isn't the exception
        if (elem !== exception) {
            toolkip_style_helpers_1.removeClass(elem, subcls);
        }
    }
}
exports.removeSubclassFromAllElements = removeSubclassFromAllElements;
;
/**
 * addResizingElement (UNIMPLEMENTED)
 * ----------------------------------------------------------------------------
 * Adds an element to the document that should resize with the document
 *
 * @param   elem        The element that should resize
 * @param   fixedRatio  If provided, keeps the image at this fixed ratio of w:h at all document sizes
 * @param   forceInitW  Optionally force the initial width to a certain value
 * @param   forceInitH  Optionally force the initial height to a certain value
 *
 */
function addResizingElement(elem, fixedRatio, forceInitW, forceInitH) {
    // TODO: implement
}
;
/**
 * resizeElement (UNIMPLEMENTED)
 * ----------------------------------------------------------------------------
 * Resizes an element to be the same ratio as it previously was
 * @param   obj   The element to resize
 *
 */
function resizeElement(obj) {
    // TODO: implement
}
;
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
function isChildEventTarget(ev, root) {
    return isChild(root, ev.target);
}
exports.isChildEventTarget = isChildEventTarget;
;
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
function isChild(root, child) {
    ;
    let parent;
    parent = child;
    // Loop through til we either have a match or ran out of parents
    while (parent) {
        if (parent === root)
            return true;
        parent = parent.parentNode;
    }
    return false;
}
exports.isChild = isChild;
;
//..........................................
//#region ADD OR REMOVE ALL CHILDREN
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
function appendChildren(parent, ...kids) {
    ;
    let idx;
    for (idx = 0; idx < kids.length; idx += 1) {
        parent.appendChild(kids[idx]);
    }
}
exports.appendChildren = appendChildren;
/**
 * clearChildren
 * ----------------------------------------------------------------------------
 * remove all children from the specified parent element
 */
function clearChildren(parent) {
    for (let idx = parent.children.length - 1; idx >= 0; idx -= 1) {
        let child = parent.children[idx];
        parent.removeChild(child);
    }
}
exports.clearChildren = clearChildren;
//#endregion
//..........................................
/**
 * moveElemRelativePosition
 * ----------------------------------------------------------------------------
 * Moves an element a relative anount
 *
 * @param   elem      The element to move
 * @param   distance  The relative distance to move
 *
 */
function moveElemRelativePosition(elem, distance) {
    let top = parseInt(elem.style.top) || 0;
    let left = parseInt(elem.style.left) || 0;
    elem.style.top = (top + distance.y) + "px";
    elem.style.left = (left + distance.x) + "px";
}
exports.moveElemRelativePosition = moveElemRelativePosition;
/**
 * resetPageFocus
 * ----------------------------------------------------------------------------
 * Reset where current focus is to the top of the page
 *
 */
function resetPageFocus() {
    let oldTabIndex = -1;
    if (toolkip_shared_types_1.isNullOrUndefined(document.body.tabIndex)) {
        oldTabIndex = document.body.tabIndex;
    }
    document.body.tabIndex = 0;
    document.body.focus();
    document.body.tabIndex = oldTabIndex;
}
exports.resetPageFocus = resetPageFocus;
/**
 * removeElement
 * ----------------------------------------------------------------------------
 * Remove an element from the DOM
 * @param   elem    The element to remove
 *
 */
function removeElement(elem) {
    if (!elem.parentNode) {
        return;
    }
    elem.parentNode.removeChild(elem);
}
exports.removeElement = removeElement;
/**
 * select
 * ----------------------------------------------------------------------------
 * Selects the contents of an HTML element, whether an input or a
 * content-editable element.
 *
 * @param   htmlElem    The element to select the contents of
 *
 */
function select(htmlElem) {
    // elements that have select built in are easy: just use their function
    if (_typeguards_1.isSelectable(htmlElem)) {
        htmlElem.select();
        // content-editable areas are trickier; use some range logic 
        // (taken from https://stackoverflow.com/questions/6139107/programmatically-select-text-in-a-contenteditable-html-element)
    }
    else {
        // get the range of the element
        let range = document.createRange();
        range.selectNodeContents(htmlElem);
        // set the window selection to be the range for the element
        let selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
    }
}
exports.select = select;
exports.HTML_TAB = "&nbsp;&nbsp;&nbsp;&nbsp;";
/**
 * encodeForHTML
 * ----------------------------------------------------------------------------
 * Encode a string so that it can render appropriately in HTML contexts
 * @param   data    The data to encode
 * @returns The encoded data
 *
 */
function encodeForHTML(data) {
    data = data.replace(/&/g, "&amp;");
    data = data.replace(/</g, "&lt;");
    data = data.replace(/>/g, "&gt;");
    // whitespace
    data = data.replace(/\\n/g, "<br>");
    data = data.replace(/\\t/g, exports.HTML_TAB);
    return data;
}
exports.encodeForHTML = encodeForHTML;
/**
 * decodeFromHTML
 * ----------------------------------------------------------------------------
 * From an HTML-renderable string, convert back to standard strings
 * @param   data    The string to unencode
 * @returns The decoded data
 */
function decodeFromHTML(data) {
    data = data.replace(/&amp;/g, "&");
    data = data.replace(/&lt;/g, "<");
    data = data.replace(/&gt;/g, ">");
    // some uncommon but possible control characters
    data = data.replace(/&quot;/g, "\"");
    data = data.replace(/&apos;/g, "'");
    // whitespace replacements
    data = data.replace(/<br>/g, "\n");
    data = data.replace(new RegExp(exports.HTML_TAB, "g"), "\t");
    data = data.replace(/&nbsp;/g, " ");
    return data;
}
exports.decodeFromHTML = decodeFromHTML;
/**
 * replaceElemWithElem
 * ----------------------------------------------------------------------------
 * replace a particular element with another in the DOM
 *
 * @param   elemToReplace   The element to remove
 * @param   replacement     The element to replace with
 */
function replaceElemWithElem(elemToReplace, replacement) {
    if (!elemToReplace.parentNode) {
        return;
    }
    // grab the current references that we'll need to properly replace
    let nextChild = elemToReplace.nextSibling;
    let parent = elemToReplace.parentNode;
    // remove the current element and add our new one
    parent.removeChild(elemToReplace);
    parent.insertBefore(replacement, nextChild);
}
exports.replaceElemWithElem = replaceElemWithElem;
/**
 * isVisible
 * ----------------------------------------------------------------------------
 * determine if a particular element is visible to the end user
 * @param   elem    The element to check
 * @returns True if the element is visible; false otherwise
 */
function isVisible(elem) {
    if (_typeguards_1.hasOffsets(elem)) {
        if (elem.offsetWidth !== 0) {
            return true;
        }
        if (elem.offsetHeight !== 0) {
            return true;
        }
    }
    else {
        if (elem.clientWidth !== 0) {
            return true;
        }
        if (elem.clientHeight !== 0) {
            return true;
        }
    }
    return false;
}
exports.isVisible = isVisible;
/**
 * getElementsBySelector
 * ----------------------------------------------------------------------------
 * gets all elements in the current page that match the specified query
 * selector.wrapper around querySelectorAll
 *
 * @param   selector    The string we should use for selecting elements
 *
 * @returns An array of the elements that match the specified selector
 */
function getElementsBySelector(selector) {
    let list = document.body.querySelectorAll(selector);
    let out = [];
    for (let l of list) {
        out.push(l);
    }
    return out;
}
exports.getElementsBySelector = getElementsBySelector;
/**
 * doesElementMatchSelector
 * ----------------------------------------------------------------------------
 * check if a given element is considered a match for the specified selector
 * (wrapper around the standard function)
 */
function doesElementMatchSelector(elem, selector) {
    if (!elem) {
        return false;
    }
    if (!elem.matches) {
        return false;
    }
    return elem.matches(selector);
}
exports.doesElementMatchSelector = doesElementMatchSelector;
