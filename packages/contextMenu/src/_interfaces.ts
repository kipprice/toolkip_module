import { IDictionary } from '@kipprice/toolkip-objectHelpers/_interfaces";

export interface IOptionCallback {
    (e: Event): void;
}

export interface IOption {
    label: string;
    callback?: IOptionCallback;
    elems?: {
        base?: HTMLElement,
        sub_menu?: HTMLElement
    };
}

export enum ContextMenuColors {
    MAIN_COLOR = 0,
    FONT_COLOR = 1,
    SUB_MENU_COLOR = 2,
    SUB_MENU_BORDER = 3,
    SUB_SUB_MENU_COLOR = 4,
    SUB_SUB_MENU_BORDER = 5,
    
}

export interface IContextMenuThemeColors extends IDictionary<string> {
    menuBG: string; 
    menuText: string; 
    menuOptBG: string; 
    menuBorder: string; 
    menuOptNested: string; 
    menuBorderNested: string; 
    menuSelectedText: string; 
    menuSelectedBorder: string;
}