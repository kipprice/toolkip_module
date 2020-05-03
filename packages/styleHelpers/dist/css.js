"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toolkip_primitive_helpers_1 = require("@kipprice/toolkip-primitive-helpers");
const toolkip_shared_types_1 = require("@kipprice/toolkip-shared-types");
/**
 * addClass
 * ----------------------------------------------------------------------------
 * Allows a user to safely add a CSS class to an element's existing list of CSS classes
 * @param   elem      The element that should have its class updated
 * @param   newClass  The class to add the element
 *
 * @returns the provided element
 */
function addClass(elem, newClass) {
    let cls;
    let e;
    if (!elem || !newClass)
        return;
    // Handle Drawables being passed in
    if (toolkip_shared_types_1.isDrawable(elem)) {
        e = elem.base;
    }
    else {
        e = elem;
    }
    // Still suport setting the class if the class is not originally set
    cls = e.getAttribute("class");
    if (!cls) {
        e.setAttribute("class", newClass);
        return;
    }
    cls = " " + cls + " ";
    if (cls.indexOf(" " + newClass + " ") === -1) {
        cls = cls + newClass;
        e.setAttribute("class", toolkip_primitive_helpers_1.trim(cls));
    }
    return elem;
}
exports.addClass = addClass;
;
/**
 * removeClass
 * ----------------------------------------------------------------------------
 * Allows a user to safely remove a CSS class to an element's existing list of
 * CSS classes
 *
 * @param   elem      The element that should have its class updated
 * @param   newClass  The class to remove from the element
 *
 * @returns the provided element
 */
function removeClass(elem, oldClass) {
    ;
    let cls;
    let len;
    let e;
    // Quit if we're missing something
    if (!elem || !oldClass)
        return;
    // Handle Drawables being passed in
    if (toolkip_shared_types_1.isDrawable(elem)) {
        e = elem.base;
    }
    else {
        e = elem;
    }
    // Pull out the CSS class
    cls = " " + e.getAttribute("class") + " ";
    len = cls.length;
    cls = cls.replace(" " + oldClass + " ", " ");
    // Only reset the class attribute if it actually changed
    if (cls.length !== len) {
        e.setAttribute("class", toolkip_primitive_helpers_1.trim(cls));
    }
    return elem;
}
exports.removeClass = removeClass;
;
/**
 * addOrRemoveClass
 * ----------------------------------------------------------------------------
 * handle selection-state style decisions where we will want to add or remove
 * a particular class based on the result of a particular evaluation
 *
 * @param   elem      the element to update classes on
 * @param   clsName   the name of the class to add or remove
 * @param   shouldAdd if true, adds the class instead of removing
 *
 * @returns the element that was updated
 */
function addOrRemoveClass(elem, clsName, shouldAdd) {
    if (shouldAdd) {
        addClass(elem, clsName);
    }
    else {
        removeClass(elem, clsName);
    }
    return elem;
}
exports.addOrRemoveClass = addOrRemoveClass;
/**
 * hasClass
 * ----------------------------------------------------------------------------
 * Checks whether a provided HTML element has a CSS class applied
 *
 * @param   elem  The element to check
 * @param   cls   The CSS class to check for
 *
 * @returns True if the element has the CSS class applied; false otherwise
 */
function hasClass(elem, cls) {
    let e;
    let cur_cls;
    if (!elem)
        return;
    // Handle Drawables being passed in
    if (toolkip_shared_types_1.isDrawable(elem)) {
        e = elem.base;
    }
    else {
        e = elem;
    }
    // Grab the current CSS class and check if the passed-in class is present
    cur_cls = " " + e.getAttribute("class") + " ";
    if (cur_cls.indexOf(" " + cls + " ") === -1) {
        return false;
    }
    return true;
}
exports.hasClass = hasClass;
;
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
function setProperty(cls, item, val, force) {
    let i;
    let css;
    let sIdx;
    let rules;
    let rule;
    // Loop through all of the stylesheets we have available
    for (sIdx = 0; sIdx < document.styleSheets.length; sIdx += 1) {
        // Pull in the appropriate index for the browser we're using
        css = document.all ? 'rules' : 'cssRules'; //cross browser
        rules = document.styleSheets[sIdx][css];
        // If we have rules to loop over...
        if (rules) {
            // ... loop through them and check if they are the class we are looking for
            for (i = 0; i < rules.length; i += 1) {
                rule = rules[i];
                // If we have a match on the class...
                if (rule.selectorText === cls) {
                    // ... and the class has the item we're looking for ...
                    if ((rule.style[item]) || (force)) {
                        //... set it to our new value, and return true.
                        rule.style[item] = val;
                        return true;
                    }
                }
            }
        }
    }
    // Return false if we didn't change anything
    return false;
}
exports.setProperty = setProperty;
;
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
function getProperty(cls, item) {
    let i;
    let css;
    let sIdx;
    let rules;
    let rule;
    // Loop through all of the stylesheets we have available
    for (sIdx = 0; sIdx < document.styleSheets.length; sIdx += 1) {
        // Pull in the appropriate index for the browser we're using
        css = document.all ? 'rules' : 'cssRules'; //cross browser
        rules = document.styleSheets[sIdx][css];
        // If we have an index...
        if (rules) {
            // ... loop through all and check for the actual class
            for (i = 0; i < rules.length; i += 1) {
                rule = rules[i];
                // If we find the class...
                if (rule.selectorText === cls) {
                    // ... return what the item is set to (if anything)
                    return (rule.style[item]);
                }
            }
        }
    }
    // Return a blank string if it couldn't be found
    return "";
}
exports.getProperty = getProperty;
;
/**
 * _old_CreateClass
 * ----------------------------------------------------------------------------
 * @deprecated
 * Creates a CSS class and adds it to the style of the document
 * @param  {string}      selector   CSS selector to use to define what elements get this style
 * @param  {any}         attr       Array of css attributes that should be applied to the class
 * @param  {boolean}     [noAppend] True if we shouldn't actually add the class to the documment yet
 * @return {HTMLElement}            The CSS style tag that was created
 */
function _old_CreateClass(selector, attr, noAppend) {
    //TODO: verify this can be removed entirely
    let cls;
    let a;
    let styles;
    // Grab the style node of this document (or create it if it doesn't exist)
    styles = document.getElementsByTagName("style");
    if (noAppend || styles.length > 0) {
        cls = styles[0];
    }
    else {
        cls = document.createElement("style");
        cls.innerHTML = "";
    }
    // Loop through the attributes we were passed in to create the class
    cls.innerHTML += "\n" + selector + " {\n";
    for (a in attr) {
        if (attr.hasOwnProperty(a)) {
            if (attr[a].key) {
                cls.innerHTML += "\t" + attr[a].key + ": " + attr[a].val + ";\n";
            }
            else {
                cls.innerHTML += "\t" + a + " : " + attr[a] + ";\n";
            }
        }
    }
    cls.innerHTML += "\n}";
    // Append the class to the head of the document
    if (!noAppend) {
        document.head.appendChild(cls);
    }
    // Return the style node
    return cls;
}
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
function getComputedStyle(elem, attr) {
    let style;
    let e;
    // Handle Drawables being passed in
    if (toolkip_shared_types_1.isDrawable(elem)) {
        e = elem.base;
    }
    else {
        e = elem;
    }
    // Use the library function on the window first
    if (window.getComputedStyle) {
        style = window.getComputedStyle(e);
        if (attr) {
            return style.getPropertyValue(attr);
        }
        else {
            return style;
        }
        // If that doesn't work, maybe it's through the currentStyle property
    }
    else if (e.currentStyle) {
        style = e.currentStyle;
        if (attr) {
            return style[attr];
        }
        else {
            return style;
        }
    }
    return null;
}
exports.getComputedStyle = getComputedStyle;
