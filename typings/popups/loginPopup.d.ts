import { Popup } from "./popup";
import { LoginPopupElements } from "./_interfaces";
import { IElemDefinition } from "../htmlHelpers/_interfaces";
import { IStandardStyles } from "../styleHelpers/_interfaces";
/**----------------------------------------------------------------------------
 * @class LoginPopup
 * ----------------------------------------------------------------------------
 * Creates a popup with fields for handling login
 * @author  Kip Price
 * @version 1.0.0
 * ----------------------------------------------------------------------------
 */
export declare class LoginPopup extends Popup {
    /** elems contained within this popup */
    protected _elems: LoginPopupElements;
    /** what to do when the user chooses to login */
    protected _loginCallback: Function;
    set loginCallback(func: Function);
    /** draw specific styles for this particular popup */
    protected static _uncoloredStyles: IStandardStyles;
    /** make sure we get a mix of core styles and these styles */
    protected _getUncoloredStyles(): IStandardStyles;
    /**
     * Creates a LoginPopup object
     * @param   obj     If provided, the data to create the base element of the popup
     */
    constructor(obj?: IElemDefinition);
    /**
     * _createElements
     *
     * Creates the elements for this particular popup
     */
    protected _createElements(): void;
    /**
     * erase
     *
     * Handles undrawing the popup
     */
    erase(): void;
}
