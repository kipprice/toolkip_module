import { IDrawableElements, DrawableElement } from '@toolkip/drawable';
import { IElemDefinition } from '@toolkip/create-elements';


/**
 * ILoadingShieldElements
 * 
 * Keep track of elements
 * 
 */
export interface ILoadingShieldElements extends IShieldElements{
    text: HTMLElement;
    icon: HTMLElement;
    wrapper: HTMLElement;
}

export interface IShieldElements extends IDrawableElements {
    base: HTMLElement;
    shieldContent: HTMLElement;
}

export type IShieldOptions = {
    theme?: 'light' | 'dark';
    onOverlayClick?: () => void;
}

export type IComposableShieldOptions = IShieldOptions & {
    contents: IElemDefinition | DrawableElement;
}