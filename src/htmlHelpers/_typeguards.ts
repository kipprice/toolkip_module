import { isInterface, isNullOrUndefined, StandardElement } from "../shared";
import { IElemDefinition, ISelectable, IOffsetable } from "./_interfaces";

/** 
 * isHTMLElement
 * ----------------------------------------------------------------------------
 * check if the element is an HTML element 
 */
export function isHTMLElement(test: any): test is HTMLElement {
    return (test instanceof HTMLElement)
}

/** 
 * isElemDefinition
 * ----------------------------------------------------------------------------
 * check if the element is an element definition implementation 
 */
export function isIElemDefinition(test: any): test is IElemDefinition {
    let out: boolean;
    let comp: IElemDefinition = {
        after_content: "",
        attr: null,
        before_content: "",
        children: null,
        cls: "",
        content: "",
        id: "",
        parent: null,
        type: "" as any
    }

    if (isInterface<IElemDefinition>(test, comp)) { return true; }
    return false;

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