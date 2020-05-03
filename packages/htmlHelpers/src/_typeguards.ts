import { isInterface, isNullOrUndefined, StandardElement } from '@kipprice/toolkip-shared";
import { ISelectable, IOffsetable } from "./_interfaces";

/** 
 * isHTMLElement
 * ----------------------------------------------------------------------------
 * check if the element is an HTML element 
 */
export function isHTMLElement(test: any): test is HTMLElement {
    return (test instanceof HTMLElement)
}



/**
 * hasOffsets
 * ----------------------------------------------------------------------------
 * determine if an element has the concept offsets
 */
export function hasOffsets(test: StandardElement): test is IOffsetable {
    if (isNullOrUndefined((test as any).offsetHeight)) {
        return false; 
    }
    return true;
}

/**
 * isSelectable
 * ----------------------------------------------------------------------------
 * determine if this element contains something that can be selected
 */
export function isSelectable(test: any): test is ISelectable {
    return !!(test as HTMLInputElement).select;
}