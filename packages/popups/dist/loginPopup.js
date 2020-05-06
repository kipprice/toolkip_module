"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const popup_1 = require("./popup");
const toolkip_create_elements_1 = require("@kipprice/toolkip-create-elements");
/**----------------------------------------------------------------------------
 * @class LoginPopup
 * ----------------------------------------------------------------------------
 * Creates a popup with fields for handling login
 * @author  Kip Price
 * @version 1.0.0
 * ----------------------------------------------------------------------------
 */
class LoginPopup extends popup_1.Popup {
    set loginCallback(func) { this._loginCallback = func; }
    get _addlCls() { return "login"; }
    /**
     * _createElements
     *
     * Creates the elements for this particular popup
     */
    _createElements() {
        super._createElements();
        let usernameElems = toolkip_create_elements_1.createLabeledElement({ type: "input", attr: { type: "text" } }, { content: "Username" });
        this._elems.username = usernameElems.data;
        this._elems.content.appendChild(usernameElems.wrapper);
        let passwordElems = toolkip_create_elements_1.createLabeledElement({ type: "input", attr: { type: "password" } }, { content: "Password" });
        this._elems.password = passwordElems.data;
        this._elems.content.appendChild(passwordElems.wrapper);
        this.addButton("Login", () => {
            this.erase();
            if (!this._loginCallback) {
                return;
            }
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
    erase() {
        super.erase();
        this._elems.username.value = "";
        this._elems.password.value = "";
    }
}
exports.LoginPopup = LoginPopup;
//#endregion
//.....................
/** draw specific styles for this particular popup */
LoginPopup._uncoloredStyles = {
    ".popup.login .wrapper + .wrapper": {
        marginTop: "10px"
    }
};
