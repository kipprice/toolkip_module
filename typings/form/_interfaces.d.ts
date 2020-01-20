import { Field } from "./_field";
import { Drawable } from "../drawable/drawable";
import { ISelectOptions, IDictionary } from "../objectHelpers/_interfaces";
/** type of the element */
export declare enum FieldTypeEnum {
    TEXT = 1,
    NUMBER = 2,
    DATE = 3,
    TIME = 4,
    DATE_TIME = 5,
    SELECT = 6,
    CHECKBOX = 7,
    TEXTAREA = 8,
    ARRAY = 9,
    ARRAY_CHILD = 10,
    TOGGLE_BUTTON = 11,
    CUSTOM = 12,
    SECTION = 13,
    HIDDEN = 14,
    FILE_UPLOAD = 15,
    FILE_PATH = 16,
    COLOR = 17,
    PERCENTAGE = 18,
    PASSWORD = 19
}
export declare enum ValidationType {
    KEEP_ERROR_VALUE = 1,
    RESTORE_OLD_VALUE = 2,
    CLEAR_ERROR_VALUE = 3,
    NO_BLUR_PROCESSED = 4
}
/** options for layout */
export declare enum FormElementLayoutEnum {
    MULTILINE = 0,
    TABLE = 1,
    FLEX = 2,
    LABEL_AFTER = 3
}
/** handle more type safeness of form */
export declare type IFields<F> = {
    [P in keyof F]?: Field<F[P]>;
};
/** handle multiple types of evaluable elements */
export declare type EvaluableElem = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | IElemWithValue;
/** allow another caller to listen to a form element changing */
export interface IListenerFunction<T> {
    (key: string, data: T): void;
}
/** handle when the element's data has changed */
export interface IValidateFunc<T> {
    (data: T, errorString: IErrorString): boolean;
}
/** handle when another element of the form has changed */
export interface IOtherChangeFunc<T> {
    (otherID: string, data: any, formElement: Field<T>, context?: any): void;
}
/** consistent set of elements for all Form Elements */
export interface IFieldElems {
    base: HTMLElement;
    error?: HTMLElement;
    lblContainer?: HTMLElement;
    lbl?: HTMLElement;
    helpTextIcon?: HTMLElement;
    input?: EvaluableElem;
    childrenContainer?: HTMLElement;
    [key: string]: HTMLElement | Drawable;
}
/** standard elements for a displayable form element */
export interface IFormDisplay {
    label?: string;
    cls?: string;
    layout?: FormElementLayoutEnum;
    hideTitle?: boolean;
    useGhostText?: boolean;
    helpText?: string;
}
export declare enum FormStyleOptions {
    EMBEDDED = 1,
    POPUP = 2,
    INLINE = 3,
    FULLSCREEN = 4
}
export interface IFormButton {
    display: string;
    cls?: string;
    callback: Function;
    key?: "saveButton" | "cancelButton";
}
export interface ICanSaveTracker {
    hasErrors: boolean;
    hasMissingRequired: boolean;
}
export interface IErrorString {
    title?: string;
    details?: string;
}
/** handle the template for setting up a form */
export interface IFieldConfig<T> extends IFormDisplay {
    value?: T;
    defaultValue?: T;
    position?: number;
    required?: boolean;
    onValidate?: IValidateFunc<T>;
    onOtherChange?: IOtherChangeFunc<T>;
    validationType?: ValidationType;
}
/** handle an interface for anything that can contain a value */
export interface IElemWithValue extends HTMLElement {
    value: any;
    checked?: boolean;
}
export declare type FormColor = "formTheme" | "formSubTheme" | "formBackgroundTheme";
/** represent the objects that will be selectable by this element */
export interface IObjectSelectOptions<T> {
    [display: string]: T;
}
/** select-specific template options */
export interface IObjectSelectTemplate<T> extends IFieldConfig<T> {
    options: IObjectSelectOptions<T>;
}
/** create options that correspond to an object */
export interface IObjectOption<T> {
    display: string;
    value: T;
}
/** select-specific template options */
export interface ISelectFieldTemplate<T extends string | number> extends IFieldConfig<T> {
    options: ISelectOptions;
}
export interface IFormOptions extends IFormDisplay {
    /** identifier for the form */
    id?: string;
    /** the type of form that is being rendered */
    style?: FormStyleOptions;
    /** true if we should skip the style rendering */
    noStandardStyles?: boolean;
    /** colors to use for this form */
    colors?: IDictionary<string, FormColor>;
    /** any additional buttons that should be added to the form */
    addlButtons?: IFormButton[];
    /** true if we should allow canceling the form even if there
     * are unsaved changes */
    ignoreChanges?: boolean;
    /** @deprecated: use style instead */
    popupForm?: boolean;
}
