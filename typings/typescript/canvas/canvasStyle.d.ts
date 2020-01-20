import { CanvasColor, StyleChangeEnum, StyleChangeHandler } from "./_interfaces";
export declare class CanvasElementStyle {
    protected _fillColor: CanvasColor;
    get fillColor(): CanvasColor;
    set fillColor(color: CanvasColor);
    protected _strokeColor: CanvasColor;
    get strokeColor(): CanvasColor;
    set strokeColor(color: CanvasColor);
    protected _fontFamily: string;
    get fontFamily(): string;
    set fontFamily(family: string);
    protected _fontVariant: string;
    get fontVariant(): string;
    set fontVariant(variant: string);
    protected _fontSize: number;
    get fontSize(): number;
    set fontSize(size: number);
    protected _strokeSize: number;
    get strokeSize(): number;
    set strokeSize(size: number);
    protected _textAlign: CanvasTextAlign;
    get textAlign(): CanvasTextAlign;
    set textAlign(align: CanvasTextAlign);
    protected _font: string;
    get font(): string;
    set font(font: string);
    protected _listeners: StyleChangeHandler[][];
    protected _oldStyle: CanvasElementStyle;
    /** nothing to construct */
    constructor(style?: CanvasElementStyle);
    addStyleChangeListener(changeType: StyleChangeEnum, func: StyleChangeHandler): void;
    protected _onChange(changeType: StyleChangeEnum): void;
    setStyle(context: CanvasRenderingContext2D): void;
    restoreStyle(context: CanvasRenderingContext2D): void;
    protected _saveOffOldStyle(context: CanvasRenderingContext2D): void;
    protected _applyStyleToContext(context: CanvasRenderingContext2D, style: CanvasElementStyle): void;
}
