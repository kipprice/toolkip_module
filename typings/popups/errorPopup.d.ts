import { Popup } from "./popup";
import { IElemDefinition } from "../htmlHelpers/_interfaces";
/**----------------------------------------------------------------------------
 * @class	ErrorPopup
 * ----------------------------------------------------------------------------
 * Simple form to show an error message
 * @author	Kip Price
 * @version	1.0.3
 * ----------------------------------------------------------------------------
 */
export declare class ErrorPopup extends Popup {
    /** allow callers to register when the form is closed */
    protected _onClose: () => void;
    set onClose(f: () => void);
    protected _notifyClose(): void;
    /**
     * ErrorPopup
     * ----------------------------------------------------------------------------
     * create a popup that shows an error to the user
     */
    constructor(details: string, title?: string, obj?: IElemDefinition);
}
