import { IDictionary } from '@toolkip/object-helpers';
import { ContextMenuOption } from './contextMenuOption';

export interface IOptionCallback {
    (e: Event): void;
}

export interface IOption {
    label: string;
    callback?: IOptionCallback;
}

export type ContextMenuOptions = {
    colors: Partial<Record<ContextMenuThemeColors, string>>;
    cls: string;
}

export type IOptionDrawable = IOption & {
    option: ContextMenuOption;
}

export enum ContextMenuColors {
    MAIN_COLOR = 0,
    FONT_COLOR = 1,
    SUB_MENU_COLOR = 2,
    SUB_MENU_BORDER = 3,
    SUB_SUB_MENU_COLOR = 4,
    SUB_SUB_MENU_BORDER = 5,
    
}

export type ContextMenuThemeColors = 
    'menuBG' |
    'menuText' |
    'menuOptBG' |
    'menuBorder' |
    'menuOptNested' |
    'menuBorderNested' |
    'menuSelectedText' |
    'menuSelectedBorder';
