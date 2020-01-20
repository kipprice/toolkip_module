import { isDrawable } from '../drawable/_typeguards';

/** 
 * isHTMLElement
 * ----------------------------------------------------------------------------
 * check if the element is an HTML element 
 */
export function isHTMLElement(test: any): test is HTMLElement {
    if (!test) { return false; }
    if (isDrawable(test)) { return false; }
    return (!!(test as HTMLElement).appendChild);
}

export interface ISelectable {
    select(): void;
}

export function isSelectable(test: any): test is ISelectable {
    return !!(test as HTMLInputElement).select;
}
