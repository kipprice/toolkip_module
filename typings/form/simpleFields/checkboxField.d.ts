import { Field } from "../_field";
import { FieldTypeEnum, FormElementLayoutEnum } from "../_interfaces";
import { IStandardStyles } from "../../styleHelpers/_interfaces";
/**----------------------------------------------------------------------------
* @class CheckboxField
* ----------------------------------------------------------------------------
* create a checkbox form element
* @author  Kip Price
* @version 1.0.1
* ----------------------------------------------------------------------------
*/
export declare class CheckboxField extends Field<boolean> {
    protected get _type(): FieldTypeEnum;
    protected get _defaultValue(): boolean;
    protected get _defaultCls(): string;
    protected get _defaultLayout(): FormElementLayoutEnum;
    protected _elems: {
        base: HTMLElement;
        error?: HTMLElement;
        lbl?: HTMLElement;
        input?: HTMLInputElement;
        inputBox?: HTMLElement;
        inputInnerBox?: HTMLElement;
        innerLbl?: HTMLElement;
    };
    protected static _uncoloredStyles: IStandardStyles;
    protected _getUncoloredStyles(): IStandardStyles;
    /** create the check elements */
    protected _onCreateElements(): void;
    /** handle when the checkbox is clicked */
    protected _getValueFromField(): boolean;
    /**
     * _createClonedElement
     * ---------------------------------------------------------------------------
     * clone the appropriate element
     */
    protected _createClonedElement(appendToID: string): CheckboxField;
    /**
     * update
     * ---------------------------------------------------------------------------
     * update the contents of the element
     * */
    update(data: boolean, allowEvents: boolean): void;
}
