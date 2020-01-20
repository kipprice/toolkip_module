import { IAttributes, IChildren, IElemDefinition } from "./_interfaces";
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
export declare function createSimpleLabeledElement(id: string, cls: string, lbl: string, content: any, attr: IAttributes, children: IChildren, parent: HTMLElement, skipZero: boolean): HTMLElement;
export interface ILabeledElement {
    data: HTMLElement;
    lbl: HTMLElement;
    wrapper: HTMLElement;
}
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
export declare function createLabeledElement(dataElem: IElemDefinition, labelElem: IElemDefinition): ILabeledElement;
