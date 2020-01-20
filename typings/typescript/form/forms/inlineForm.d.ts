import { _Form } from "./_form";
import { IStandardStyles } from "../../styleHelpers/_interfaces";
import { StandardElement } from "../../drawable/_interfaces";
import { FormElemChangeEvent } from "../eventHandler";
/**----------------------------------------------------------------------------
 * @class	InlineForm
 * ----------------------------------------------------------------------------
 * special type of form that doesn't render buttons, but instead saves
 * everytime there is a change
 * @author	Kip Price
 * @version	1.0.0
 * ----------------------------------------------------------------------------
 */
export declare class InlineForm<T> extends _Form<T> {
    protected static _uncoloredStyles: IStandardStyles;
    protected _getUncoloredStyles(): IStandardStyles;
    protected _createBase(): StandardElement;
    protected _createPostForm(): StandardElement;
    protected _onFormChange(event: FormElemChangeEvent<any>): void;
}
