"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toolkip_shared_types_1 = require("@kipprice/toolkip-shared-types");
/**
 * isHTMLElement
 * ----------------------------------------------------------------------------
 * check if the element is an HTML element
 */
function isHTMLElement(test) {
    return (test instanceof HTMLElement);
}
exports.isHTMLElement = isHTMLElement;
/**
 * hasOffsets
 * ----------------------------------------------------------------------------
 * determine if an element has the concept offsets
 */
function hasOffsets(test) {
    if (toolkip_shared_types_1.isNullOrUndefined(test.offsetHeight)) {
        return false;
    }
    return true;
}
exports.hasOffsets = hasOffsets;
/**
 * isSelectable
 * ----------------------------------------------------------------------------
 * determine if this element contains something that can be selected
 */
function isSelectable(test) {
    return !!test.select;
}
exports.isSelectable = isSelectable;
