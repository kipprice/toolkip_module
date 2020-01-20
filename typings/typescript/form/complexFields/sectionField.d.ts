import { IFields, FieldTypeEnum, ICanSaveTracker } from "../_interfaces";
import { CollapsibleField } from "./_collapsibleField";
import { IStandardStyles } from "../../styleHelpers/_interfaces";
import { Field } from "../_field";
import { IFormCollapsibleTemplate, ICollapsibleHTMLElements } from "./_interfaces";
/**----------------------------------------------------------------------------
 * @class SectionField
 * ----------------------------------------------------------------------------
 * create an element in the form that will contain other elements of a form
 * @author  Kip Price
 * @version 1.0.2
 * ----------------------------------------------------------------------------
 */
export declare class SectionField<M extends Object, T extends IFormCollapsibleTemplate<M> = IFormCollapsibleTemplate<M>> extends CollapsibleField<M, T> {
    /** styles to display this section correctly */
    protected static _uncoloredStyles: IStandardStyles;
    /** section elements are a merged set of themes */
    protected _getUncoloredStyles(): IStandardStyles;
    /** HTML elements that make up this form */
    protected _elems: ICollapsibleHTMLElements;
    /** update the appropriate theme color for the form */
    setThemeColor(uniqueId: string, color: string, noReplace: boolean): void;
    /** also allow child elements that are gracefully created */
    protected _children: IFields<M> | Field<M>;
    get children(): IFields<M> | Field<M>;
    /** handle the defaults that all form elements need */
    protected get _defaultCls(): string;
    protected get _defaultValue(): M;
    /** use a section type */
    protected get _type(): FieldTypeEnum;
    /**
     * SectionElement
     * ----------------------------------------------------------------------------
     * create a section element
     * @param   id          Unique identifier for the section
     * @param   config      Template for the section itself
     * @param   children    All child elements of this section
     */
    constructor(id: string, config: T | SectionField<M, T>, children?: IFields<M> | Field<M>);
    /**
     * _onCreateElements
     * ----------------------------------------------------------------------------
     * create elements for the section
     */
    protected _onCreateElements(): void;
    /** create a clone of this element */
    protected _createClonedElement(appendToID: string): SectionField<M, T>;
    /**
     * _parseChildren
     * ----------------------------------------------------------------------------
     * parse the children array of this form element
     * @param   children    The children for this section
     */
    protected _parseChildren<K extends keyof M>(children?: IFields<M> | Field<M>): void;
    /**
     * parseChild
     * ----------------------------------------------------------------------------
     * Go through our children array and create the individual children
     * @param   child   The element to parse
     */
    protected _parseChild(child: Field<any>): Field<any>;
    /**
     * _updateInternalData
     * ----------------------------------------------------------------------------
     * Handle keeping our internal data tracking up to date with our children
     * @param   internalOnly    If true, indicates that we aren't doing a full save
     */
    protected _updateInternalData<K extends keyof M>(internalOnly?: boolean): Promise<any>;
    protected _updateInternalField<K extends keyof M>(key: K, elem: Field<M[K]>, data: M, internalOnly?: boolean): Promise<any>;
    /**
     * save
     * ----------------------------------------------------------------------------
     * Handle saving the section
     *
     * @param   internalOnly    If true, doesn't do all the updating that would
     *                          happen on a real save
     *
     * @returns The data contained in this sections child elements
     */
    save(internalOnly?: boolean): Promise<M>;
    /**
     * canSave
     * ----------------------------------------------------------------------------
     * Determine whether this element can save, based on whether its children
     * have errors.
     *
     * @returns True if we can save this element
     */
    canSave<K extends keyof M>(): ICanSaveTracker;
    /**
     * clear
     * ----------------------------------------------------------------------------
     * Clear out all child elements when clearing the section
     */
    clear<K extends keyof M>(): void;
    /**
     * focus
     * ----------------------------------------------------------------------------
     * Allow the first child of this section to take focus
     */
    focus<K extends keyof M>(): boolean;
    /**
     * update
     * ----------------------------------------------------------------------------
     * update the inter contents of the form
     * @param   data    The new data for this element
     */
    update<K extends keyof M>(data: M, allowEvents: boolean): void;
    /**
     * _getValueFromField
     * ----------------------------------------------------------------------------
     * return standard value
     */
    protected _getValueFromField(): M;
    /**
     * _validate
     * ----------------------------------------------------------------------------
     * no validation for section elements
     */
    protected _validate(data: M): boolean;
    addChildElement<K extends keyof M>(key: K, formElem: Field<M[K]>): boolean;
    protected _updateClsBasedOnLayout(): void;
    getField(id: string): Field<any>;
}
