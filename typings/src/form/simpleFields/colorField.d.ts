import { Field } from "../_field";
import { FieldTypeEnum } from "../_interfaces";
/**----------------------------------------------------------------------------
 * @class   ColorField
 * ----------------------------------------------------------------------------
 * Creates a form element for collecting colors
 * @version 1.0.1
 * @author  Kip Price
 * ----------------------------------------------------------------------------
 */
export declare class ColorField extends Field<string> {
    /** type of element */
    protected get _type(): FieldTypeEnum;
    /** default value to use */
    protected get _defaultValue(): string;
    /** default CSS class to use */
    protected get _defaultCls(): string;
    /**
     * _onCreateElements
     * ----------------------------------------------------------------------------
     * Create elements for this form element
     */
    protected _onCreateElements(): void;
    /**
     * _onChange
     * ----------------------------------------------------------------------------
     * Handle the change event for this input
     */
    protected _getValueFromField(): string;
    /**
     * _createClonedElement
     * ----------------------------------------------------------------------------
     * Clone this element
     * @param   appendToID  Additional ID piece to use
     */
    protected _createClonedElement(appendToID: string): ColorField;
}
