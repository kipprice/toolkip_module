import { Field } from "../_field";
import { FieldTypeEnum } from "../_interfaces";
/**----------------------------------------------------------------------------
 * @class NumberField
 * ----------------------------------------------------------------------------
 * create a number element for a form
 * @author  Kip Price
 * @version 1.0.1
 * ----------------------------------------------------------------------------
 */
export declare class NumberField extends Field<number> {
    protected get _type(): FieldTypeEnum;
    protected get _defaultValue(): number;
    protected get _defaultCls(): string;
    protected _onCreateElements(): void;
    protected _getValueFromField(): number;
    protected _createClonedElement(appendToID: string): NumberField;
}
