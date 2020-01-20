import { Drawable } from '../drawable/drawable';
import { ValidateFunction, UpdateFunction, FormatFunction, ParseContentFunction, IEditableElems, IEditableOptions } from './_interfaces';
import { IStandardStyles } from '../styleHelpers/_interfaces';
/**---------------------------------------------------------------------------
 * @class	Editable<T>
 * ---------------------------------------------------------------------------
 * Drawable element that also allows for editing inline
 * @author	Kip Price
 * @version	1.3.0
 * ---------------------------------------------------------------------------
 */
export declare class Editable<T> extends Drawable {
    /** type of input field this editable contains */
    type: string;
    /** value for the field */
    protected _value: T;
    get value(): T;
    set value(val: T);
    protected _defaultValue: string;
    /** function to use on validation */
    onValidate: ValidateFunction;
    /** function to use when data gets updated */
    onUpdate: UpdateFunction<T>;
    /** function to use to format data */
    format: FormatFunction<T>;
    /** function to use to unformat data */
    parseContent: ParseContentFunction<T>;
    /** internal flag to detect if we are modifying */
    private _isModifying;
    /** track whether this editable supports multi-line input */
    private _isMultiline;
    /** elements we care about */
    protected _elems: IEditableElems;
    /** styles to use for standard Editables */
    protected static _uncoloredStyles: IStandardStyles;
    /**
     * Editable
     * ----------------------------------------------------------------------------
     * Creates an Editable object
     * @param	options		Any options needed to configure the editable
     *
     */
    constructor(options?: IEditableOptions<T>);
    /**
     * _addHandlers
     *
     * Adds all handlers specified by the user
     * @param 	options		Options specified by the user
     *
     */
    private _addHandlers;
    /**
     * _addDefaultFormatHandlers
     * ---------------------------------------------------------------------------
     * Adds default handlers for dealing with formatting of the Editable
     */
    private _addDefaultFormatHandlers;
    /**
     * _addDefaultParseHandler
     * ---------------------------------------------------------------------------
     * Handle parsing through type override if the user didn't specify anything
     */
    private _addDefaultParseHandler;
    /**
     * _addDefaultFormatHandler
     * ---------------------------------------------------------------------------
     * Handle formatting through toString if the user didn't specify anything
     */
    private _addDefaultFormatHandler;
    /**
     * _shouldSkipCreateElements
     * ---------------------------------------------------------------------------
     * If true, doesn't run the element creation until manually called
     * @returns	True
     */
    protected _shouldSkipCreateElements(): boolean;
    /**
     * _createElements
     * ---------------------------------------------------------------------------
     * Create elements for the editable
     */
    protected _createElements(): void;
    /**
     * _addListeners
     *
     * Add event listeners to the editable
     *
     */
    private _addListeners;
    private _handleFocusEvent;
    /**
     * _save
     *
     * Save the contents of the Editable
     *
     * @returns True if the editable was successfully saved
     *
     */
    private _save;
    /**
     * _validate
     *
     * validate whether the current data in the input field is valid
     *
     * @param	content		Content to validate
     *
     * @returns	Result of the validation
     *
     */
    private _validate;
    /**
     * _onValidationFailed
     *
     * validation failing for this element
     *
     * @param	allowLeave	True if the user should be able to navigate away
     *
     * @returns	False
     *
     */
    private _onValidationFailed;
    /**
     * _onValidationPassed
     *
     * handle validation passing for this element
     * @param	content		Content to set for the editable
     * @returns	True
     *
     */
    private _onValidationPassed;
    /**
     * modify
     * ----------------------------------------------------------------------------
     * Modifies the Editable element
     * @returns True if we were able to start modifying the element
     */
    modify(): boolean;
    focus(): void;
    protected _hideElement(elem: HTMLElement): void;
    protected _showElement(elem: HTMLElement): void;
    /**
     * _renderDisplayView
     * ----------------------------------------------------------------------------
     * Overridable function that creates the display-version of the editable
     */
    protected _renderDisplayView(): void;
}
