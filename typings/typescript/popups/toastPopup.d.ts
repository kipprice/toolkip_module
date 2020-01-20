import { Popup } from "./popup";
import { IStandardStyles } from "../styleHelpers/_interfaces";
import { IElemDefinition } from "../htmlHelpers/_interfaces";
export declare class ToastPopup extends Popup {
    private _showFor;
    protected static _uncoloredStyles: IStandardStyles;
    protected _getUncoloredStyles(): IStandardStyles;
    constructor(details: string, title?: string, showFor?: number, obj?: IElemDefinition);
    draw(parent?: HTMLElement, force?: boolean): void;
    erase(): void;
}
