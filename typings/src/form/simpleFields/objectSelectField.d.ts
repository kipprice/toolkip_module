import { IObjectSelectTemplate, FieldTypeEnum, IObjectOption } from "../_interfaces";
import { Field } from "../_field";
/**----------------------------------------------------------------------------
 * @class ObjectSelectField
 * ----------------------------------------------------------------------------
 * create a dropdown for a form
 * @author  Kip Price
 * @version 1.0.1
 * ----------------------------------------------------------------------------
 */
export declare class ObjectSelectField<M, T extends IObjectSelectTemplate<M>> extends Field<M, T> {
    protected get _type(): FieldTypeEnum;
    protected get _defaultValue(): M;
    protected get _defaultCls(): string;
    protected _options: IObjectOption<M>[];
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
    protected _createClonedElement(appendToID: string): ObjectSelectField<M, T>;
}
