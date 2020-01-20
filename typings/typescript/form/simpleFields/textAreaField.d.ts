import { Field } from "../_field";
import { FieldTypeEnum } from "../_interfaces";
/**----------------------------------------------------------------------------
 * @class TextAreaField
 * ----------------------------------------------------------------------------
 * create a text area element for a form
 * @author  Kip Price
 * @version 1.0.1
 * ----------------------------------------------------------------------------
 */
export declare class TextAreaField extends Field<string> {
    protected get _type(): FieldTypeEnum;
    protected get _defaultValue(): string;
    protected get _defaultCls(): string;
    protected _onCreateElements(): void;
    protected _getValueFromField(): string;
    protected _createClonedElement(appendToID: string): TextAreaField;
    update(data: string, allowEvents: boolean): void;
}
