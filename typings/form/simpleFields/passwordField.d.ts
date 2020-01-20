import { Field } from "../_field";
import { FieldTypeEnum } from "../_interfaces";
/**----------------------------------------------------------------------------
 * @class Password
 * ----------------------------------------------------------------------------
 * create a  password element for a form
 * @author  Kip Price
 * @version 1.0.0
 * ----------------------------------------------------------------------------
 */
export declare class PasswordField extends Field<string> {
    protected get _type(): FieldTypeEnum;
    protected get _defaultValue(): string;
    protected get _defaultCls(): string;
    protected _onCreateElements(): void;
    protected _getValueFromField(): string;
    protected _createClonedElement(appendToID: string): PasswordField;
}
