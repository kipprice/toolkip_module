import { Field } from "../_field";
import { FieldTypeEnum } from "../_interfaces";
import { IStandardStyles } from "../../styleHelpers/_interfaces";
/**----------------------------------------------------------------------------
 * @class DateTimeField
 * ----------------------------------------------------------------------------
 * create an element to collect date and time for a form
 * @author  Kip Price
 * @version 1.0.1
 * ----------------------------------------------------------------------------
 */
export declare class DateTimeField extends Field<Date> {
    protected get _type(): FieldTypeEnum;
    protected get _defaultValue(): Date;
    protected get _defaultCls(): string;
    protected static _uncoloredStyles: IStandardStyles;
    protected _elems: {
        base: HTMLElement;
        label: HTMLElement;
        inputWrapper: HTMLElement;
        timeInput: HTMLInputElement;
        dateInput: HTMLInputElement;
    };
    protected _onCreateElements(): void;
    protected _getValueFromField(): Date;
    protected _createClonedElement(appendToID: string): DateTimeField;
    update(data: Date, allowEvents: boolean): void;
}
