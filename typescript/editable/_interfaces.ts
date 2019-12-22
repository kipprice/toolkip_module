import { IDrawableElements } from "../drawable/_interface";
import { IElemDefinition } from "../htmlHelpers/_interfaces";

/** Interface for the result of a validate function */
export interface IValidateResult {
    passed: boolean;
    allowLeave?: boolean;
}

/** Interface for the validate function used for Editables */
export interface ValidateFunction {
    (value: string): IValidateResult;
}

/** Interface for the update function used for Editables */
export interface UpdateFunction<T> {
    (value: T): void;
}

/** Interface for the format function used for Editables */
export interface FormatFunction<T> {
    (value: T, forEdit?: boolean): string;
}

/** Interface for the unformat function used for Editables */
export interface ParseContentFunction<T> {
    (value: string): T;
}

export interface IEditableElems extends IDrawableElements {
    base: HTMLElement;
    display: HTMLElement;
    input: HTMLInputElement;
}	

/**
 * IEditableOptions
 * ---------------------------------------------------------------------------
 * Keep track of the information a caller can create an Editable with
 */
export interface IEditableOptions<T> extends IElemDefinition {

    /** value for the Editable */
    value?: T;

    /** value to use by default */
    defaultValue?: string;

    /** type of editable element */
    inputType: string;

    /** handle validation */
    onValidate?: ValidateFunction;

    /** handle when the editable updates */
    onUpdate?: UpdateFunction<T>;

    /** handle when we need to format data for editing */
    onFormat?: FormatFunction<T>;

    /** handle when we need to convert data to the unformatted version */
    onParseContent?: ParseContentFunction<T>;

    /** allow for multi-line editable fields, but by default, keep the editable to a single line */
    isMultiline?: boolean;

    /** color to use for the BG of the editable */
    lightBg?: string;
}