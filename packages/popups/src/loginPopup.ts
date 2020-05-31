import { Popup } from "./popup";
import { LoginPopupElements } from "./_interfaces";
import { createLabeledInput, createElement } from '@toolkip/create-elements';
import { IStandardStyles } from '@toolkip/style-helpers';

/**----------------------------------------------------------------------------
 * @class LoginPopup
 * ----------------------------------------------------------------------------
 * Creates a popup with fields for handling login
 * @author  Kip Price
 * @version 1.0.0
 * ----------------------------------------------------------------------------
 */
export class LoginPopup extends Popup {

    //.....................
    //#region PROPERTIES
    
    /** elems contained within this popup */
    protected _elems: LoginPopupElements;

    /** what to do when the user chooses to login */
    protected _loginCallback: Function;
    public set loginCallback(func: Function) { this._loginCallback = func; }

    protected get _addlCls() { return "login"; }
    
    //#endregion
    //.....................

    /** draw specific styles for this particular popup */
    protected static _uncoloredStyles: IStandardStyles = {
        ".popup.login .wrapper + .wrapper": {
            marginTop: "10px"
        }
    }

    /**
     * _createElements
     * 
     * Creates the elements for this particular popup
     */
    protected _createElements(): void {
        super._createElements();

        let [ unameLbl, unameInput ] = createLabeledInput({ content: "Username" }, { type: "text" });
        this._elems.username = unameInput;
        this._elems.content.appendChild(createElement({ cls: 'wrapper', children: [unameLbl, unameInput] }));

        const [ pwordLbl, pwordInput ] = createLabeledInput({ content: "Password" }, { type: "password" });
        this._elems.password = pwordInput;
        this._elems.content.appendChild(createElement({ cls: 'wrapper', children: [ pwordLbl, pwordInput ]}));

        this.addButton("Login", () => {
            this.erase();
            if (!this._loginCallback) { return; }
            this._loginCallback(this._elems.username.value, this._elems.password.value);
        });

        this.addButton("Cancel", () => {
            this.erase();
        });
    }

    /**
     * erase
     * 
     * Handles undrawing the popup
     */
    public erase(): void {
        super.erase();
        this._elems.username.value = "";
        this._elems.password.value = "";
    }

}
