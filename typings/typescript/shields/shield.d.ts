import { Drawable } from "../drawable/drawable";
import { IShieldElements } from "./_interfaces";
import { IStandardStyles } from "../styleHelpers/_interfaces";
export declare abstract class Shield extends Drawable {
    protected _elems: IShieldElements;
    protected _showElementTimeout: number;
    protected _showingAtInstant: Date;
    protected static _uncoloredStyles: IStandardStyles;
    constructor();
    protected _createElements(): void;
    protected abstract _createShieldDetails(): void;
    draw(parent?: HTMLElement): void;
    erase(): void;
}
