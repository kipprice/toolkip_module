import { IFieldConfig, IFields } from "./_interfaces";
import { ISelectOptions } from "../objectHelpers/_interfaces";
import { IAttributes, IChildren } from "../htmlHelpers/_interfaces";
import { Field } from "./_field";
export declare function cloneTemplate<D>(template: IFieldConfig<D>): IFieldConfig<D>;
/**
 * createSelectElement
 * ----------------------------------------------------------------------------
 * Creates a select element with associated options
 * @param id - ID to use for the select element
 * @param cls - the CSS class to use to style this select box
 * @param options - What options should be included in the select box
 * @param defaultSelection - What should be selected by default
 *
 * @version 1.0.2
 */
export declare function createSelectElement(id: string, cls: string, options: ISelectOptions, defaultSelection?: string | number): HTMLSelectElement;
/**
 * createSelectOptions
 * ----------------------------------------------------------------------------
 * create options that will sit in a select element
 */
export declare function createSelectOptions(options: ISelectOptions, defaultSelection?: string | number): HTMLOptionElement[];
export interface ICheckboxElems {
    wrapper: HTMLElement;
    checkbox: HTMLInputElement;
}
/**
 * Creates a checkbox element & a wrapper around it
 * @param id - ID to use for the checkbox
 * @param cls - the CSS class to style this checkbox
 * @param lbl - What label to use for this checkbox
 * @param checked - True if the checkbox should be checked
 */
export declare function createLabeledCheckbox(id: string, cls?: string, lbl?: string, checked?: boolean): ICheckboxElems;
/** creates a label that will be clickable to select an associated input */
export declare function createLabelForInput(lbl: string, labelFor: string, cls?: string, embedIn?: HTMLElement, attr?: IAttributes): HTMLLabelElement;
export declare function createRadioButtons(): void;
/**
 * Create an input element
 * @param id
 * @param cls
 * @param type
 * @param value
 * @param attr
 * @param children
 * @param parent
 */
export declare function createInputElement(id: string, cls: string, type: string, value?: any, attr?: IAttributes, children?: IChildren, parent?: HTMLElement): HTMLInputElement;
/**
 * isField
 * ----------------------------------------------------------------------------
 * determine whether a particular parameter is a form element
 * @param elem - Either a FormElement or a FormTemplate
 * @returns True if elem is a form Element
 */
export declare function isField<T>(elem: IFieldConfig<T> | Field<T> | IFields<any>): elem is Field<T>;
