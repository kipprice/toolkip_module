import { _Field } from "./_field";
import { _Drawable } from "../drawable/_drawable";
import { ISelectOptions, IDictionary } from "../objectHelpers/_interfaces";


//...............
//#region ENUMS

/** type of the element */
export enum FieldTypeEnum {
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
};

export enum ValidationType {
    KEEP_ERROR_VALUE = 1,
    RESTORE_OLD_VALUE = 2,
    CLEAR_ERROR_VALUE = 3,
    NO_BLUR_PROCESSED = 4
}

/** options for layout */
export enum FormElementLayoutEnum {
    MULTILINE = 0,
    TABLE = 1,
    FLEX = 2,
    LABEL_AFTER = 3
};

//#endregion
//...............

//...............
//#region TYPES

/** handle more type safeness of form */
export type IFields<F> = {
    [P in keyof F]?: _Field<F[P]>;
}

/** handle multiple types of evaluable elements */
export type EvaluableElem = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | IElemWithValue;

//#endregion
//...............

//..................
//#region FUNCTIONS

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
    (otherID: string, data: any, formElement: _Field<T>, context?: any): void;
}

//#endregion
//..................

//........................
//#region UI INTERFACES

/** consistent set of elements for all Form Elements */
export interface IFieldElems {
    base: HTMLElement;
    error?: HTMLElement;
    lblContainer?: HTMLElement;
    lbl?: HTMLElement;
    helpTextIcon?: HTMLElement;
    input?: EvaluableElem;
    childrenContainer?: HTMLElement;
    [key: string]: HTMLElement | _Drawable;
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

export enum FormStyleOptions {
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

//#endregion
//........................

//..............................
//#region VALIDATION INTERFACES

export interface ICanSaveTracker {
    hasErrors: boolean;
    hasMissingRequired: boolean;
}

export interface IErrorString {
    title?: string;
    details?: string;
}

//#endregion
//..............................

//.................................
//#region FUNCTIONALITY INTERFACES

/** handle the template for setting up a form */
export interface IFieldConfig<T> extends IFormDisplay {
    value?: T,
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

export type FormColor = "formTheme" | "formSubTheme" | "formBackgroundTheme";

//#endregion
//.................................

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

//..........................................
//#region TYPES AND INTERFACES

export interface IFormOptions extends IFormDisplay {
    /** identifier for the form */
    id?: string;

    /** the type of form that is being rendered */
    style?: FormStyleOptions

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

//#endregion
//..........................................

