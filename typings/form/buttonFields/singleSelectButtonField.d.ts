import { IFormSingleSelectButtonTemplate } from "./_interfaces";
import { ToggleButtonField } from "./_toggleButtonField";
import { IToggleBtnOption } from "../../objectHelpers/_interfaces";
/**----------------------------------------------------------------------------
 * @class   SingleSelectButtonField
 * ----------------------------------------------------------------------------
 * toggle buttons as equivalent to radio buttons
 * @author  Kip Price
 * @version 1.0.0
 * ----------------------------------------------------------------------------
 */
export declare class SingleSelectButtonField<M, T extends IFormSingleSelectButtonTemplate<M> = IFormSingleSelectButtonTemplate<M>> extends ToggleButtonField<M, T> {
    protected _selectedBtn: HTMLElement;
    protected _options: IToggleBtnOption<M>[];
    protected get _defaultValue(): M;
    protected get _multiSelect(): boolean;
    /** handle a button being selected */
    protected _selectBtn(btn: HTMLElement, value: M): void;
    protected _createClonedElement(appendToID: string): SingleSelectButtonField<M, T>;
    protected _shouldBeSelected(elem: IToggleBtnOption<M>): boolean;
    clear(): void;
}
