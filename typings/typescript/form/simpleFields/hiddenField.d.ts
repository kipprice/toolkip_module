import { IStandardStyles } from './../../styleHelpers/_interfaces';
import { Field } from "../_field";
import { FieldTypeEnum } from "../_interfaces";
/**----------------------------------------------------------------------------
 * @class HiddenField
 * ----------------------------------------------------------------------------
 * handle a data element that will be set, but not displayed to the user
 * @author  Kip Price
 * @version 1.0.1
 * ----------------------------------------------------------------------------
 */
export declare class HiddenField<T> extends Field<T> {
    protected static _uncoloredStyles: IStandardStyles;
    protected get _type(): FieldTypeEnum;
    protected get _defaultCls(): string;
    protected get _defaultValue(): T;
    protected _onCreateElements(): void;
    protected _getValueFromField(): T;
    protected _createClonedElement(appendToID: string): HiddenField<T>;
    save(): Promise<T>;
}
