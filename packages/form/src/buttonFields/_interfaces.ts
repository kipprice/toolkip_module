import { IFieldElems, IFieldConfig } from "../_interfaces";
import { IToggleBtnOption } from "@toolkip/object-helpers";


//.....................
//#region INTERFACES
export interface IToggleButtonElem<T> {
    key: T;
    btn: HTMLElement;
}

export interface IToggleButtonElems extends IFieldElems {
    postChildrenContainer: HTMLElement;
}

export interface IFormToggleButtonTemplate<T> extends IFieldConfig<any> {
    options?: IToggleBtnOption<any>[];
}
//#endregion
//.....................

export interface IExpandableElems extends IToggleButtonElems {
    base: HTMLElement;
    opts: HTMLElement;
    input: HTMLInputElement;
    addBtn: HTMLElement;
}

export interface IFormMultiSelectButtonTemplate<T> extends IFormToggleButtonTemplate<T[]> {
    options?: IToggleBtnOption<T>[];
}

export interface IFormSingleSelectButtonTemplate<T> extends IFormToggleButtonTemplate<T> {
    options?: IToggleBtnOption<T>[];
}