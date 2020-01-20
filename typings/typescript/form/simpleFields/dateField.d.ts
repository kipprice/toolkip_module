import { Field } from "../_field";
import { FieldTypeEnum } from "../_interfaces";
/**----------------------------------------------------------------------------
* @class DateField
* ----------------------------------------------------------------------------
* create a date element for a form
* @author  Kip Price
* @version 1.0.1
* ----------------------------------------------------------------------------
*/
export declare class DateField extends Field<Date> {
    protected get _type(): FieldTypeEnum;
    protected get _defaultValue(): Date;
    protected get _defaultCls(): string;
    /** create the display for the date element */
    protected _onCreateElements(): void;
    protected _getValueFromField(): Date;
    protected _createClonedElement(appendToID: string): DateField;
    update(data: Date, allowEvents: boolean): void;
    protected _testEquality(newDate: Date): boolean;
}
