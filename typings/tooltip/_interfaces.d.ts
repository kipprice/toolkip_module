import { IDrawableElements } from "../drawable/_interfaces";
export interface ITooltipElements extends IDrawableElements {
    base: HTMLElement;
}
export declare enum TooltipPositionType {
    TOP = 0,
    BOTTOM = 1,
    LEFT = 2,
    RIGHT = 3
}
