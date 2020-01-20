import { IFormMultiSelectButtonTemplate } from "./_interfaces";
import { ToggleButtonField } from "./_toggleButtonField";
import { IToggleBtnOption } from "../../objectHelpers/_interfaces";
/**----------------------------------------------------------------------------
 * @class   MultiSelectButtonField
 * ----------------------------------------------------------------------------
 * toggle buttons as multi-select options
 * @author  Kip Price
 * @version 1.0.0
 * ----------------------------------------------------------------------------
 */
export declare class MultiSelectButtonField<M, T extends IFormMultiSelectButtonTemplate<M> = IFormMultiSelectButtonTemplate<M>> extends ToggleButtonField<M[], T> {
    protected _selectedBtns: HTMLElement[];
    protected get _multiSelect(): boolean;
    protected get _defaultValue(): M[];
    protected _options: IToggleBtnOption<M>[];
    /**
     * MultiSelectButtonElem
     * ----------------------------------------------------------------------------
     * Create the multi select form
     * @param id
     * @param template
     */
    constructor(id: string, template: T | MultiSelectButtonField<M, T>);
    /**
     * _parseFieldTemplate
     * ----------------------------------------------------------------------------
     * @param template
     */
    protected _parseFieldTemplate(template: T): void;
    /**
     * update
     * ----------------------------------------------------------------------------
     * @param data
     */
    update(data: M[], allowEvents: boolean): void;
    /**
     * _shouldBeSelected
     * ----------------------------------------------------------------------------
     * @param   elem    The element to potentially select
     * @returns True if a specified button should be selected
     */
    protected _shouldBeSelected(elem: IToggleBtnOption<M>): boolean;
    /**
     * _createClonedElement
     * ----------------------------------------------------------------------------
     * @param appendToID
     */
    protected _createClonedElement(appendToID: string): MultiSelectButtonField<M, T>;
    /**
     * _selectBtn
     * ----------------------------------------------------------------------------
     * @param btn
     * @param value
     */
    protected _selectBtn(btn: HTMLElement, value: M): void;
    /**
     * _indexOf
     * ----------------------------------------------------------------------------
     * @param value
     * @returns The index of the element in the array, or -1 if it isn't found
     */
    protected _indexOf(value: M): number;
    /**
     * _equalTo
     * ----------------------------------------------------------------------------
     * Determine whether the data in this element is equivalent t
     * @param dataA
     * @param dataB
     */
    protected _equalTo(dataA: M, dataB: M): boolean;
    /**
     * _onClear
     * ----------------------------------------------------------------------------
     * Handle clearing data from this element
     */
    clear(): void;
}
