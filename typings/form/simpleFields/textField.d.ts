import { Field } from "../_field";
import { FieldTypeEnum } from "../_interfaces";
/**----------------------------------------------------------------------------
 * @class TextField
 * ----------------------------------------------------------------------------
 * create a text element for a form
 * @author  Kip Price
 * @version 1.0.1
 * ----------------------------------------------------------------------------
 */
export declare class TextField extends Field<string> {
    protected get _type(): FieldTypeEnum;
    protected get _defaultValue(): string;
    protected get _defaultCls(): string;
    protected _onCreateElements(): void;
    protected _getValueFromField(): string;
    protected _createClonedElement(appendToID: string): TextField;
}
