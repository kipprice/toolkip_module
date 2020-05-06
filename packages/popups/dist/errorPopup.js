"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const popup_1 = require("./popup");
/**----------------------------------------------------------------------------
 * @class	ErrorPopup
 * ----------------------------------------------------------------------------
 * Simple form to show an error message
 * @author	Kip Price
 * @version	1.0.3
 * ----------------------------------------------------------------------------
 */
class ErrorPopup extends popup_1.Popup {
    /**
     * ErrorPopup
     * ----------------------------------------------------------------------------
     * create a popup that shows an error to the user
     */
    constructor(details, title) {
        super();
        this.setTitle(title || "Uh-oh...that wasn't supposed to happen");
        this.addContent("", "", details);
        this.addButton("Okay", () => {
            this.erase();
            this._notifyClose();
        });
    }
    set onClose(f) { this._onClose = f; }
    _notifyClose() {
        if (!this._onClose) {
            return;
        }
        this._onClose();
    }
}
exports.ErrorPopup = ErrorPopup;
