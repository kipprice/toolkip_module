import { _Form } from "./_form";
import { IStandardStyles } from "../../styleHelpers/_interfaces";
import { StandardElement } from "../../drawable/_interfaces";
import { SectionField } from "../complexFields/sectionField";
/**----------------------------------------------------------------------------
 * @class	PopupForm
 * ----------------------------------------------------------------------------
 * form that renders as a popup display automatically
 * @author	Kip Price
 * @version	1.0.0
 * ----------------------------------------------------------------------------
 */
export declare class PopupForm<T> extends _Form<T> {
    protected static _uncoloredStyles: IStandardStyles;
    protected _getUncoloredStyles(): IStandardStyles;
    protected _isHidden: boolean;
    protected _elems: {
        base: HTMLElement;
        overlay: HTMLElement;
        background: HTMLElement;
        closeButton: HTMLElement;
        formContainer: HTMLElement;
        coreSection: SectionField<T>;
    };
    protected _createBase(): StandardElement;
    protected _createPreForm(): StandardElement;
    protected _createTitle(): void;
    trySave(): Promise<T>;
    tryCancel(ignoreUnsavedChanges?: boolean): boolean;
    /**
    * show
    * ----------------------------------------------------------------------------
    * show the form on the appropriate parent if it styled a as a popup
    */
    show(): void;
    /**
     * hide
     * ----------------------------------------------------------------------------
     * hide the form if it is styled as a popup
     */
    hide(): void;
}
