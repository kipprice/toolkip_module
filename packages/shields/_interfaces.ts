import { IDrawableElements } from "../drawable/_interfaces";


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