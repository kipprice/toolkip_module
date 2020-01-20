import { IFieldConfig, FieldTypeEnum, FormElementLayoutEnum, IListenerFunction, IFieldElems, EvaluableElem, ICanSaveTracker, IErrorString } from "./_interfaces";
import { Drawable } from "../drawable/drawable";
import { IStandardStyles } from "../styleHelpers/_interfaces";
import { FormElemChangeEvent } from "./eventHandler";
/**----------------------------------------------------------------------------
 * @class	Field
 * ----------------------------------------------------------------------------
 * abstract implementation of a form element to be used in the form library
 * @author	Kip Price
 * @version	1.0.0
 * ----------------------------------------------------------------------------
 */
export declare abstract class Field<M, T extends IFieldConfig<M> = IFieldConfig<M>> extends Drawable {
    /** store the standard class for all form elements */
    protected readonly _standardCls: string;
    /** id of the element */
    protected _id: string;
    get id(): string;
    /** what type of field this is */
    protected abstract get _type(): FieldTypeEnum;
    get type(): FieldTypeEnum;
    /** keep track of the form template */
    protected _config: T;
    get template(): T;
    protected get _defaultLayout(): FormElementLayoutEnum;
    /** abstract property for the default value of child elements */
    protected abstract get _defaultValue(): M;
    /** abstract property for the default class of child elements */
    protected abstract get _defaultCls(): string;
    /** the current value of the element */
    protected _data: M;
    get data(): M;
    set data(data: M);
    /** handle listeners for events */
    protected _listeners: IListenerFunction<M>[];
    /** keep track of whether we are currently in an error state */
    protected _hasErrors: boolean;
    get hasErrors(): boolean;
    protected _isHidden: boolean;
    /** elements of the form element */
    protected _elems: IFieldElems;
    /** input element */
    get input(): EvaluableElem;
    /** allow for label or label containers to be used */
    protected get _labelElem(): HTMLElement;
    /** keep track of where this form is drawn */
    protected _parent: HTMLElement;
    /** placeholder for individual CSS styles */
    protected static _uncoloredStyles: IStandardStyles;
    /**
     * FormElement
     * ----------------------------------------------------------------------------
     * Create a Form Element
     * @param   id      The ID of the element; should be unique in the form
     * @param   data    a template or existing form element
     */
    constructor(id: string, data?: T | Field<M, T>);
    /**
     * _shouldSkipCreateElements
     * ----------------------------------------------------------------------------
     * handle element creation at our own pace
     */
    protected _shouldSkipCreateElements(): boolean;
    /**
     * _parseFieldTemplate
     * ----------------------------------------------------------------------------
     * parse the template for this particular field
     */
    protected _parseFieldTemplate(template: T): void;
    /**
     * _processTemplateClass
     * ----------------------------------------------------------------------------
     * generate the appropriate class for this element
     */
    protected _processTemplateClass(): void;
    /**
     * _processRequiredElement
     * ----------------------------------------------------------------------------
     * if this element is required, indicate that we're not ready to save if we
     * don't yet have data
     */
    protected _processRequiredElement(): void;
    /**
     * _registerOnOtherChangeListener
     * ----------------------------------------------------------------------------
     * listen for other fields changing, if a listener was provided in the
     * template
     */
    protected _registerOnOtherChangeListener(): void;
    /**
     * _createElements
     * ----------------------------------------------------------------------------
     * creates all elements for this input
     */
    protected _createElements(): void;
    /**
     * _onCreateElements
     * ----------------------------------------------------------------------------
     * generates the input-type-specific elements for this form element
     */
    protected abstract _onCreateElements(): void;
    /**
     * _registerInputListeners
     * ----------------------------------------------------------------------------
     * create the listeners that pay attention to when content in the form has
     * updated
     */
    protected _registerInputListeners(input: HTMLInputElement): void;
    /**
     * _addStandardElemsToCore
     * ----------------------------------------------------------------------------
     * add created elements to the appropriate parent
     */
    protected _addStandardElemsToCore(): void;
    /**
     * _handleStandardLayout
     * ----------------------------------------------------------------------------
     * helper to handle an elements layout based on their config
     *
     * @returns True if the layout was valid; false otherwise
     */
    protected _handleStandardLayout(): boolean;
    /**
    * _tableLayout
    *----------------------------------------------------------------------------
    * draws elements in a table format
    */
    protected _tableLayout(): void;
    /**
     * _flexLayout
     * ----------------------------------------------------------------------------
     * handle a flex layout of label: elem
     */
    protected _flexLayout(): void;
    /**
     * _multiLineLayout
     * ----------------------------------------------------------------------------
     * handle a multiline layout of label on top of input
     */
    protected _multiLineLayout(): void;
    /**
     * _labelAfterLayout
     * ----------------------------------------------------------------------------
     * handle displaying the label element after the input
     */
    protected _labelAfterLayout(): void;
    /**
     * save
     * ----------------------------------------------------------------------------
     * handle saving the data from this form
     * @returns The data contained within this form element
     */
    save<K extends keyof M>(internalUpdate?: boolean): Promise<M>;
    /**
     * canSave
     * ----------------------------------------------------------------------------
     * Determines whether this element has the option for saving
     *
     * @returns True if this element is prepared to save
     */
    canSave(): ICanSaveTracker;
    /**
     * _hasBlankRequiredElems
     * ----------------------------------------------------------------------------
     * Check if this element has any misisng required elements
     */
    protected _hasBlankRequiredElems(): boolean;
    /**
     * update
     * ----------------------------------------------------------------------------
     * handle setting data programmatically
     * @param   data    The data to populate in this field
     */
    update(data: M, allowEvents: boolean): void;
    /**
     * _testEquality
     * ----------------------------------------------------------------------------
     * determine if the new value is the same as the current value
     */
    protected _testEquality(data: M): boolean;
    /**
     * _updateUI
     * ----------------------------------------------------------------------------
     * update the UI elements to have the right data, when the data has changed
     */
    protected _updateUI(data: M): void;
    /**
     * _clear
     * ----------------------------------------------------------------------------
     * reset the form to its default values
     */
    clear(): void;
    /**
     * _clearUI
     * ----------------------------------------------------------------------------
     * clear out the form element
     */
    protected _clearUI(): void;
    /**
     * focus
     * ----------------------------------------------------------------------------
     * Set focus to the input of this form element
     */
    focus(): boolean;
    /**
    * _dispatchSavableChangeEvent
    * ----------------------------------------------------------------------------
    * let any listeners know that we updated the savable status of this element
    */
    protected _dispatchSavableChangeEvent(): void;
    /**
     * _dispatchChangeEvent
     * ----------------------------------------------------------------------------
     * let any listeners know that we updated our stuff
     */
    protected _dispatchChangeEvent(subkey?: string): void;
    /**
     * _handleOtherChange
     * ----------------------------------------------------------------------------
     * wrapper around our listener to ensure the data gets parsed appropriately
     */
    protected _handleOtherChange(ev: FormElemChangeEvent<any>): void;
    /**
     * _changeEventFired
     * ----------------------------------------------------------------------------
     * handle when the input element has changed in order to kick off the
     * validation process
     */
    protected _changeEventFired(fieldStillHasFocus?: boolean): void;
    /**
     * _getChangedValue
     * ----------------------------------------------------------------------------
     * child implementation that grabs the data from the input field and processes
     * it so that it is in the right format
     */
    protected abstract _getValueFromField(fieldStillHasFocus: boolean): M;
    /**
     * _shouldValidateBeforeBlur
     * ----------------------------------------------------------------------------
     * determine whether validation should occur on every change, or whether it
     * should only occur upon moving focus away from the field
     */
    protected _shouldValidateBeforeBlur(): boolean;
    /**
     * _validate
     * ----------------------------------------------------------------------------
     * validate that the current value of this field is appropriate
     * @param   value   data we are validating
     * @returns true if the validation succeeded, false otherwise
     */
    protected _validate(value: M): boolean;
    /**
     * _runValidation
     * ----------------------------------------------------------------------------
     *  runs the user-defined validation function & returns the result
     */
    protected _runValidation(data: M, errorString: IErrorString): boolean;
    /**
     * _onValidationError
     * ----------------------------------------------------------------------------
     * take an action based on validation failing, taking into consideration
     * the validation type of this field
     */
    protected _onValidationError(err?: IErrorString): void;
    /**
     * _updateErrorElem
     * ----------------------------------------------------------------------------
     * update the error element of this field to show the appropriate message
     */
    protected _updateErrorElem(err: IErrorString): void;
    /**
     * _updateInputOnError
     * ----------------------------------------------------------------------------
     * update the input element when a validation attempt failed
     */
    protected _updateInputOnError(): void;
    /**
     * _buildValidationErrorDisplay
     * ----------------------------------------------------------------------------
     * generate the error message based on the error details returned by the
     * validation function
     */
    protected _buildValidationErrorDisplay(err: IErrorString): string;
    /**
     * _clearErrors
     * ----------------------------------------------------------------------------
     * clear all of the errors
     *
     */
    protected _clearErrors(): void;
    /**
     * _createStandardInput
     *----------------------------------------------------------------------------
     *  create a standard input based on the form type
     */
    protected _createStandardInput(): void;
    /**
     * _createStandardLabel
     * ----------------------------------------------------------------------------
     *  create a standard label for the input
     */
    protected _createStandardLabel(embedIn?: HTMLElement): void;
    /**
     * _createStandardLabeledInput
     *----------------------------------------------------------------------------
     * create an input field with a label, based on the form type
     */
    protected _createStandardLabeledInput(shouldEmbed?: boolean): void;
    /**
     * _cloneFormElement
     * ----------------------------------------------------------------------------
     * wrapper around the cloning method so we don't run into protection issues
     */
    protected _cloneFormElement(elemToClone: Field<any>, appendToID?: string): Field<any>;
    /**
     * _createClonedElement
     * ----------------------------------------------------------------------------
     * creates a new version of the same form element
     *
     * @param   appendToID  ID to add to the current elem ID when cloning (to
     *                      avoid id conflicts)
     *
     * @returns The cloned form element
     */
    protected _createClonedElement(appendToID: string): Field<M, T>;
    getField(id: string): Field<any>;
    /**
     * show
     * ----------------------------------------------------------------------------
     * ensure that this field is shown
     */
    show(): Promise<void>;
    /**
     * hide
     * ----------------------------------------------------------------------------
     * ensure that this field isn't shown
     */
    hide(): Promise<void>;
}
