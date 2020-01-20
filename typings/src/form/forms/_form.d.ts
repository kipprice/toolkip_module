import { IFormOptions, ICanSaveTracker, FormColor, IFields, IFormButton } from "../_interfaces";
import { StandardElement } from "../../drawable/_interfaces";
import { FormElemChangeEvent, FormSavableEvent } from "../eventHandler";
import { Field } from "../_field";
import { Drawable } from "../../drawable/drawable";
import { IStandardStyles } from "../../styleHelpers/_interfaces";
import { SectionField } from "../complexFields/sectionField";
export declare abstract class _Form<T> extends Drawable {
    protected static _uncoloredStyles: IStandardStyles;
    /** handle when the user saves the form */
    protected _onSave: ((data: T) => void)[];
    registerSaveHandler(f: (data: T) => void): void;
    protected _notifySave(data: T): void;
    /** handle when the user chooses to cancel */
    protected _onCancel: ((hasChanges?: boolean) => void)[];
    registerCancelHandler(f: (hasChanges?: boolean) => void): void;
    protected _notifyCancel(hasChanges?: boolean): void;
    protected _config: IFormOptions;
    protected _elems: {
        base: HTMLElement;
        background: HTMLElement;
        formContainer: HTMLElement;
        coreSection: SectionField<T>;
        saveButton?: HTMLElement;
        cancelButton?: HTMLElement;
    };
    protected _hasChanges: boolean;
    protected _canSaveTracker: ICanSaveTracker;
    setThemeColor(colorId: FormColor, color: string, noReplace?: boolean): void;
    protected _getUniqueThemeName(): string;
    constructor(opts: IFormOptions, children?: IFields<T>);
    protected _shouldSkipCreateElements(): boolean;
    protected _createElements(elems: IFields<T>): void;
    /**
     * _createBase
     * ----------------------------------------------------------------------------
     * generate a base of the form
     */
    protected _createBase(): StandardElement;
    /**
     * _createCoreElem
     * ----------------------------------------------------------------------------
     * create the core section that will display all of our data
     *
     * @param   options     the options that are passed in for the general form
     * @param   elems       Elements associated with this form
     *
     */
    protected _createCoreSection(elems: IFields<T>): void;
    /**
     * _createPreForm
     * ----------------------------------------------------------------------------
     * handle generating the aspects of the form that are rendered before the
     * content. Overridable by child classes
     */
    protected _createPreForm(): StandardElement;
    /**
     * _createFormContainer
     * ----------------------------------------------------------------------------
     * generate the element that will actually encompass the form. Overridable by
     * child classes
     */
    protected _createFormContainer(): StandardElement;
    /**
     * _createPostForm
     * ----------------------------------------------------------------------------
     * generate any elements that will appear after the core section of the form.
     * Overridable by child classes
     */
    protected _createPostForm(): StandardElement;
    /**
     * _createButtons
     * ----------------------------------------------------------------------------
     * generate the buttons that should be visible in this form
     */
    protected _createButtons(btns: IFormButton[]): HTMLElement;
    /**
     * _createButton
     * ----------------------------------------------------------------------------
     * generate a specific button with the provided definition
     */
    protected _createButton(btn: IFormButton): StandardElement;
    protected _addEventHandlers(): void;
    protected _handleFormChange(event: FormElemChangeEvent<any>): void;
    protected _onFormChange(event: FormElemChangeEvent<any>): void;
    protected _isFormChangeForMe(event: FormElemChangeEvent<any>): boolean;
    protected _handleSavabilityChange(event: FormSavableEvent): void;
    protected _disableSave(): void;
    protected _enableSave(): void;
    /**
     * getData
     * ----------------------------------------------------------------------------
     * ensure that we are retrieving the data within the form without actually
     * running the save handlers
     */
    getData(): Promise<T>;
    /**
     * _save
     * ---------------------------------------------------------------------------
     * Saves data in the form
     *
     * @returns A promise that will retrieve the data contained in the form
     */
    protected _save(): Promise<T>;
    /**
     * trySave
     * ---------------------------------------------------------------------------
     * Attempt to save the form
     */
    trySave(): Promise<T>;
    /**
     * _canSave
     * ---------------------------------------------------------------------------
     * Check with our elements that we are able to save
     */
    canSave(): boolean;
    /**
     * _showCannotSaveMessage
     * ----------------------------------------------------------------------------
     * Show popup indicating why we couldn't save this form
     */
    protected _showCannotSaveMessage(): void;
    /**
     * _getCannotSaveMessage
     * ----------------------------------------------------------------------------
     * Determine what message to show as to why the form cannot be saved
     */
    protected _getCannotSaveMessage(): string;
    /**
     * _cancelConfirmation
     * ----------------------------------------------------------------------------
     * Handle informing the user that they have unsaved changes before cancelling
     */
    protected _cancelConfirmation(): void;
    /**
     * _cancel
     * ----------------------------------------------------------------------------
     * Cancel the form and any changes within it\
     */
    protected _cancel(): void;
    /**
     * tryCancel
     * ----------------------------------------------------------------------------
     * Public call to attempt to cancel all data within a form; prompts the user to
     * verify cancelling if there are any unsaved elements unless otherwise
     * specified.
     *
     * @param   ignoreUnsavedChanges    If true, doesn't prompt the user to confirm
     *                                  that unsaved aspects won't be saved
     *
     * @returns True if the form was successfully canceled
     */
    tryCancel(ignoreUnsavedChanges?: boolean): boolean;
    /**
     * clear
     * ----------------------------------------------------------------------------
     * clears all data out of the form
     */
    clear(): void;
    /**
     * update
     * ----------------------------------------------------------------------------
     * update the data in the form to match a particular data set
     *
     * @param   model           The data to update the form with
     * @param   allowEvents     If true, also fires change events as a result of
     *                          the update
     */
    update(model: T, allowEvents?: boolean): void;
    undo(): void;
    redo(): void;
    protected _trackChanges(): void;
    /**
    * focus
    * ----------------------------------------------------------------------------
    * Gives focus to the first element that can take focus
    */
    focus(): void;
    /**
     * addFormElement
     * ----------------------------------------------------------------------------
     * Adds a form element to our form after it's been initialized
     */
    addFormElement<K extends keyof T>(key: K, formElem: Field<T[K]>): boolean;
    getField(id: string): Field<any>;
}
