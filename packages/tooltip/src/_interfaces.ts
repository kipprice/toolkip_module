import { IDrawableElements } from '@toolkip/drawable';


export interface ITooltipElements extends IDrawableElements {
    base: HTMLElement;
}

export enum TooltipPositionType {
    TOP = 0,
    BOTTOM = 1,
    LEFT = 2,
    RIGHT = 3
}