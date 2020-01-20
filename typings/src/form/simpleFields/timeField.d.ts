import { Field } from "../_field";
import { FieldTypeEnum } from "../_interfaces";
/**----------------------------------------------------------------------------
 * @class TimeField
 * ----------------------------------------------------------------------------
 * create a time element for a form
 * @author  Kip Price
 * @version 1.0.1
 * ----------------------------------------------------------------------------
 */
export declare class TimeField extends Field<Date> {
    protected get _type(): FieldTypeEnum;
    protected get _defaultValue(): Date;
    protected get _defaultCls(): string;
    protected _onCreateElements(): void;
    protected _getValueFromField(): Date;
    protected _createClonedElement(appendToID: string): TimeField;
    update(data: Date, allowEvents: boolean): void;
}
