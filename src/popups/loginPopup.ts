import { Popup } from "./popup";
import { LoginPopupElements } from "./_interfaces";
import { ILabeledElement, createLabeledElement } from "../createElements";
import { IStandardStyles } from "../styleHelpers/_interfaces";


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
        let usernameElems: ILabeledElement = createLabeledElement({ type: "input", attr: { type: "text" } }, { content: "Username" });
        this._elems.username = usernameElems.data as HTMLInputElement;
        this._elems.content.appendChild(usernameElems.wrapper);

        let passwordElems: ILabeledElement = createLabeledElement({ type: "input", attr: { type: "password" } }, { content: "Password" });
        this._elems.password = passwordElems.data as HTMLInputElement;
        this._elems.content.appendChild(passwordElems.wrapper);

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
