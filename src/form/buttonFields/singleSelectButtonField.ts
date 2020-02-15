import { IFormSingleSelectButtonTemplate } from "./_interfaces";
import { _ToggleButtonField } from "./_toggleButtonField";
import { IToggleBtnOption } from "../../objectHelpers/_interfaces";
import { removeClass, addClass } from "../../styleHelpers/css";


/**----------------------------------------------------------------------------
 * @class   SingleSelectButtonField
 * ----------------------------------------------------------------------------
 * toggle buttons as equivalent to radio buttons
 * @author  Kip Price
 * @version 1.0.0
 * ----------------------------------------------------------------------------
 */
export class SingleSelectButtonField<M, T extends IFormSingleSelectButtonTemplate<M> = IFormSingleSelectButtonTemplate<M>> extends _ToggleButtonField<M, T> {

    protected _selectedBtn: HTMLElement;
    protected _options: IToggleBtnOption<M>[];
    protected get _defaultValue(): M { return null; }
    protected get _multiSelect(): boolean { return false; }

    /** handle a button being selected */
    protected _selectBtn(btn: HTMLElement, value: M): void {
        if (!btn) { return; }

        if (this._selectedBtn) {
            removeClass(this._selectedBtn, "selected");
        }

        if (this._selectedBtn === btn) {
            this._data = this._defaultValue;
            this._selectedBtn = null;
            return;
        }

        this._data = value;
        this._selectedBtn = btn;
        addClass(btn, "selected");
    }

    protected _createClonedElement(appendToID: string): SingleSelectButtonField<M, T> {
        return new SingleSelectButtonField<M, T>(this._id + appendToID, this);
    }

    protected _shouldBeSelected(elem: IToggleBtnOption<M>): boolean {
        return this._data === elem.value;
    }

    public clear(): void {
        if (this._selectedBtn) {
            removeClass(this._selectedBtn, "selected");
            this._selectedBtn = null;
        }
        this._data = this._defaultValue;
    }

}
