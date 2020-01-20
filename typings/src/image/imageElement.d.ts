import { Drawable } from "../drawable/drawable";
import { IStandardStyles } from "../styleHelpers/_interfaces";
export declare class ImageElement extends Drawable {
    protected static _uncoloredStyles: IStandardStyles;
    setThemeColor(key: "imageElementPrimary", color: string, noReplace?: boolean): void;
    protected _elems: {
        base: HTMLElement;
        img: HTMLImageElement;
    };
    protected _src: string;
    get src(): string;
    set src(src: string);
    protected _widthToHeightRatio: number;
    constructor(src: string);
    protected _shouldSkipCreateElements(): boolean;
    protected _createElements(): void;
    protected _onError(): void;
    protected _checkForImageLoad(): void;
    protected _doesImageHaveMissingSize(): boolean;
    protected _measureImage(): void;
    protected _resize(): void;
    protected _clearClasses(): void;
}
