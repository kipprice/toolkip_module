import { IFormToggleButtonTemplate, IToggleButtonElems, IToggleButtonElem } from "./_interfaces";
import { Field } from "../_field";
import { IToggleBtnOption } from "../../objectHelpers/_interfaces";
import { FieldTypeEnum } from "../_interfaces";
import { IStandardStyles } from "../../styleHelpers/_interfaces";
/**----------------------------------------------------------------------------
 * @class   ToggleButtonField
 * ----------------------------------------------------------------------------
 * template for toggle buttons
 * @author  Kip Price
 * @version 1.0.0
 * ----------------------------------------------------------------------------
 */
export declare abstract class ToggleButtonField<M, T extends IFormToggleButtonTemplate<M> = IFormToggleButtonTemplate<M>> extends Field<M, T> {
    /** keep track of elements for this element */
    protected _elems: IToggleButtonElems;
    /** the button options toggle button type */
    protected _options: IToggleBtnOption<any>[];
    /** handle whether this is a multi-select function */
    protected _multiSelect: boolean;
    /** keep track of our buttons */
    protected _buttons: IToggleButtonElem<M>[];
    /** type for the toggle buttons */
    protected get _type(): FieldTypeEnum;
    /** default class for the toggle buttons */
    protected get _defaultCls(): string;
    /** static styles for the toggle buttons */
    protected static _uncoloredStyles: IStandardStyles;
    protected _getUncoloredStyles(): IStandardStyles;
    /**
     * ToggleButtonElement
     * ----------------------------------------------------------------------------
     * Create a toggle button class
     * @param   id          The ID to use for the toggle button
     * @param   template    The template for this element
     */
    constructor(id: string, template: T | ToggleButtonField<M, T>);
    /**
     * _parseFieldTemplate
     * ----------------------------------------------------------------------------
     * Parse data in the element template
     * @param   template    Handle the element
     */
    protected _parseFieldTemplate(template: T): void;
    /**
     * _onCreateElements
     * ----------------------------------------------------------------------------
     * create the elements needed for toggle buttons
     */
    protected _onCreateElements(): void;
    protected _flexLayout(): void;
    protected _multiLineLayout(): void;
    protected _tableLayout(): void;
    protected _appendChildren(): void;
    protected _labelAfterLayout(): void;
    /**
     * _updateOptions
     * ---------------------------------------------------------------------------
     * update the buttons that are presented as options to the user
     */
    protected _updateOptions(options: IToggleBtnOption<M>[]): void;
    /**
     * _clearOptions
     * ---------------------------------------------------------------------------
     * clear out the current set of options
     */
    protected _clearOptions(): void;
    /**
     * _createOptionsElements
     * ----------------------------------------------------------------------------
     */
    protected _createOptionsElements(): void;
    /**
     * _createOptionElement
     * ----------------------------------------------------------------------------
     * @param elem
     */
    protected _createOptionElement(elem: IToggleBtnOption<any>): HTMLElement;
    /**
     * _onChange
     * ----------------------------------------------------------------------------
     * process when the user has changed their selection
     */
    protected _getValueFromField(): M;
    update(data: M, allowEvents: boolean): void;
    /**
     * updateUI
     * ----------------------------------------------------------------------------
     * update the selected buttons based on the passed in information
     */
    protected _updateUI(data: M): void;
    /**
     * _getButtonToUpdate
     * ----------------------------------------------------------------------------
     * @param data
     */
    protected _getButtonToUpdate(data: any): HTMLElement;
    protected _equalityTest(a: IToggleButtonElem<M>, b: IToggleButtonElem<M>): boolean;
    protected _testEquality(a: any): boolean;
    abstract clear(): void;
    protected abstract _selectBtn(btn: HTMLElement, value: any): void;
    protected abstract _shouldBeSelected(elem: IToggleBtnOption<any>): boolean;
}
