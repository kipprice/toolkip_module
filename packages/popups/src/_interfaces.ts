import { IDrawableElements } from '@kipprice/toolkip-drawable/_interfaces";

export type PopupColor = "popupTheme";

export type PopupElements = {
    base: HTMLElement;
    overlay: HTMLElement;
    frame: HTMLElement;
    title: HTMLElement;
    content: HTMLElement;
    closeBtn: HTMLElement;
    buttonContainer: HTMLElement;
}

export interface IPopupDefinition {
    themeColor?: string;
}

export interface LoginPopupElements extends PopupElements {
    username: HTMLInputElement;
    password: HTMLInputElement;
}

export enum YesNoEnum {
    YES = 1,
    NO = 0
};

/**
 * IYesNoCallback
 * ----------------------------------------------------------------------------
 * @param   data
 * 
 */
export interface IYesNoCallback {
    (data: YesNoEnum): void;
}