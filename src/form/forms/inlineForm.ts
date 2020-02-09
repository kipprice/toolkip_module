import { _Form } from "./_form";
import { IStandardStyles } from "../../styleHelpers/_interfaces";
import { StandardElement } from "../../drawable/_interfaces";
import { addClass } from "../../styleHelpers/css";
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
export class InlineForm<T> extends _Form<T> {

    //..................
    //#region STYLES

    protected static _uncoloredStyles: IStandardStyles = {
        ".kipForm.inline": {
            display: "flex",

            nested: {
                ".formChildren.flex .kipFormElem": {
                    marginRight: "20px"
                }
            }
        }
    }

    protected static _styleDependencies = [_Form];

    //#endregion
    //..................

    protected _createBase(): StandardElement {
        let out = super._createBase();
        addClass(out, "inline");
        return out;
    }

    protected _createPostForm(): StandardElement {
        return null;
    }

    protected _onFormChange(event: FormElemChangeEvent<any>): void {
        if (!this._isFormChangeForMe(event)) { return; }

        // any change within our form should be treated as a save for 
        // inline forms
        this.trySave();
    }
}
