import { IToggleBtnOption } from "../../objectHelpers/_interfaces";
import { IExpandableElems, IFormMultiSelectButtonTemplate } from "./_interfaces";
import { MultiSelectButtonField } from "./multiSelectButtonField";
import { IStandardStyles } from "../../styleHelpers/_interfaces";
/**----------------------------------------------------------------------------
 * @class   ExpandableButtonField
 * ----------------------------------------------------------------------------
 * Add standard form element to create new buttons inline
 * @author  Kip Price
 * @version 1.0.0
 * ----------------------------------------------------------------------------
 */
export declare abstract class ExpandableButtonField<M, T extends IFormMultiSelectButtonTemplate<M> = IFormMultiSelectButtonTemplate<M>> extends MultiSelectButtonField<M, T> {
    protected static _options: IToggleBtnOption<any>[];
    static set options(opts: IToggleBtnOption<any>[]);
    protected static _instances: ExpandableButtonField<any>[];
    protected get _defaultCls(): string;
    protected _elems: IExpandableElems;
    protected abstract get _showInputField(): boolean;
    protected get _addBtnLabel(): string;
    protected static _uncoloredStyles: IStandardStyles;
    constructor(id: string, template: T | ExpandableButtonField<M, T>);
    /**
     * _createClonedElement
     * ----------------------------------------------------------------------------
     * @param appendToId
     */
    protected _createClonedElement(appendToId: string): ExpandableButtonField<M, T>;
    /**
     * _onChange
     * ----------------------------------------------------------------------------
     * Changing buttons always succeeds
     */
    protected _getValueFromField(): M[];
    /**
     * _onCreateElements
     * ----------------------------------------------------------------------------
     * Create the appropriate elements for this
     */
    protected _onCreateElements(): void;
    /**
     * _createTags
     * ----------------------------------------------------------------------------
     * Create the tags section of this form element
     */
    protected _createAvailableOptions(): void;
    /**
     * _createTag
     * ----------------------------------------------------------------------------
     * Create a toggle button for this element
     * @param   opt
     * @returns The created element
     */
    protected _createAvailableOption(opt: IToggleBtnOption<M>): HTMLElement;
    /**
     * _createInput
     * ----------------------------------------------------------------------------
     * Create the appropriate input elements to be able to create new options
     * inline
     */
    protected _createInput(): void;
    /**
     * _addInputField
     * ----------------------------------------------------------------------------
     * if appropriate, add a text field that can be used to add new elements
     * @param inputWrapper
     */
    protected _addInputField(inputWrapper: HTMLElement): void;
    /**
     * _addAddButton
     * ----------------------------------------------------------------------------
     * Add the appropriate button to create new elements to add
     */
    protected _addAddButton(inputWrapper: HTMLElement): void;
    /**
     * _clearInputField
     * ----------------------------------------------------------------------------
     * Clear out the input field if we have one
     */
    protected _clearInputField(): void;
    /**
     * _addNewOption
     * ----------------------------------------------------------------------------
     * Add a new tag to our collection
     */
    protected _addNewOption(name: string): void;
    /**
     * update
     * ----------------------------------------------------------------------------
     * Update the current selections of the element
     * @param data
     */
    update(data: M[], allowEvents: boolean): void;
    protected abstract _doesElementAlreadyExist(text: string): boolean;
    protected abstract _createNewOption(text?: string): IToggleBtnOption<M>;
}
