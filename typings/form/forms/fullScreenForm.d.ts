import { _Form } from "./_form";
import { IStandardStyles } from "../../styleHelpers/_interfaces";
export declare class FullScreenForm<T> extends _Form<T> {
    protected static _uncoloredStyles: IStandardStyles;
    protected _getUncoloredStyles(): IStandardStyles;
    protected _createBase(): import("../..").StandardElement;
}
