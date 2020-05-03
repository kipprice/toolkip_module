import { Popup } from "./popup";

/**----------------------------------------------------------------------------
 * @class	ErrorPopup
 * ----------------------------------------------------------------------------
 * Simple form to show an error message
 * @author	Kip Price
 * @version	1.0.3
 * ----------------------------------------------------------------------------
 */
export class ErrorPopup extends Popup {

    /** allow callers to register when the form is closed */
    protected _onClose: () => void;
    public set onClose(f: () => void) { this._onClose = f; }
    protected _notifyClose() {
        if (!this._onClose) { return; }
        this._onClose();
    }

    /**
     * ErrorPopup
     * ----------------------------------------------------------------------------
     * create a popup that shows an error to the user
     */
    constructor(details: string, title?: string) {
        super();
        this.setTitle(title || "Uh-oh...that wasn't supposed to happen");
        this.addContent("", "", details);
        this.addButton("Okay", () => {
            this.erase();
            this._notifyClose();
        });
    }

}
