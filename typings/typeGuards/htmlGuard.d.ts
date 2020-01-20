/**
 * isHTMLElement
 * ----------------------------------------------------------------------------
 * check if the element is an HTML element
 */
export declare function isHTMLElement(test: any): test is HTMLElement;
export interface ISelectable {
    select(): void;
}
export declare function isSelectable(test: any): test is ISelectable;
