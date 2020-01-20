import { NumberField } from "./numberField";
import { FieldTypeEnum } from "../_interfaces";
import { IStandardStyles } from "../../styleHelpers/_interfaces";
/**---------------------------------------------------------------------------
 * @class 	PercentageField
 * ---------------------------------------------------------------------------
 * Show a numeric form specific to percentages. Only differs from a numeric
 * element in the display
 *
 * @author  Kip Price
 * @version 1.0.0
 * ---------------------------------------------------------------------------
 */
export declare class PercentageField extends NumberField {
    protected get _type(): FieldTypeEnum;
    protected get _defaultValue(): number;
    protected get _defaultCls(): string;
    protected static _uncoloredStyles: IStandardStyles;
    protected _getUncoloredStyles(): IStandardStyles;
    protected _createElements(): void;
    /**
     * _createClonedElement
     * ---------------------------------------------------------------------------
     * create a new percentage element as required
     */
    protected _createClonedElement(appendToID: string): NumberField;
}
