import { ISelectFieldTemplate, FieldTypeEnum } from "../_interfaces";
import { Field } from "../_field";
import { ISelectOptions } from "../../objectHelpers/_interfaces";
/**----------------------------------------------------------------------------
 * @class SelectField
 * ----------------------------------------------------------------------------
 * create a dropdown for a form with either numeric or string backing data
 * @author  Kip Price
 * @version 2.0.0
 * ----------------------------------------------------------------------------
 */
export declare class SelectField<M extends string | number, T extends ISelectFieldTemplate<M> = ISelectFieldTemplate<M>> extends Field<M, T> {
    protected get _type(): FieldTypeEnum;
    protected get _defaultValue(): M;
    protected get _defaultCls(): string;
    protected _options: ISelectOptions;
    protected _elems: {
        base: HTMLElement;
        input: HTMLSelectElement;
        lbl: HTMLElement;
    };
    /**
     * _parseFieldTemplate
     * ----------------------------------------------------------------------------
     * Get additional details about how this select field should be set up
     */
    protected _parseFieldTemplate(template: T): void;
    /**
     * _onCreateElements
     * ----------------------------------------------------------------------------
     * Create the elements needed for the select field
     */
    protected _onCreateElements(): void;
    /**
     * _onChange
     * ----------------------------------------------------------------------------
     * manage when details in this select field changed
     */
    protected _getValueFromField(): M;
    /**
     * _createClonedElement
     * ----------------------------------------------------------------------------
     * Generate the cloned select element
     */
    protected _createClonedElement(appendToID: string): SelectField<M, T>;
}
