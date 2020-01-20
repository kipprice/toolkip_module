import { IDrawableElements } from "../drawable/_interfaces";
import { IElemDefinition } from "../htmlHelpers/_interfaces";
export declare type PopupColor = "popupTheme";
export interface PopupElements extends IDrawableElements {
    base: HTMLElement;
    overlay: HTMLElement;
    frame: HTMLElement;
    title: HTMLElement;
    content: HTMLElement;
    closeBtn: HTMLElement;
    buttonContainer: HTMLElement;
}
export interface IPopupDefinition extends IElemDefinition {
    themeColor?: string;
}
export interface LoginPopupElements extends PopupElements {
    username: HTMLInputElement;
    password: HTMLInputElement;
}
export declare enum YesNoEnum {
    YES = 1,
    NO = 0
}
/**
 * IYesNoCallback
 * ----------------------------------------------------------------------------
 * @param   data
 *
 */
export interface IYesNoCallback {
    (data: YesNoEnum): void;
}
