import { Popup } from "./popup";
import { IStandardStyles, addClass, transition } from '@toolkip/style-helpers';
import { nextRender } from '@toolkip/async';
import { IPopupDefinition } from './_interfaces';

const DEFAULT_TOAST_DURATION_IN_MS = 5000;
/**----------------------------------------------------------------------------
 * @class	ToastPopup
 * ----------------------------------------------------------------------------
 * shows a brief notification to the user with a specified timeout afterwhich
 * the message will fade.
 * 
 * @author	Kip Price
 * @version	1.0.0
 * ----------------------------------------------------------------------------
 */
export class ToastPopup extends Popup {
    private _showFor: number;

    protected static _uncoloredStyles: IStandardStyles = {
        ".toast": {
            pointerEvents: "none"
        },

        ".toast .overlay": {
            display: "none",
            pointerEvents: "none"
        },

        ".toast .closeBtn": {
            display: "none",
        },

        ".toast .popupButton": {
            pointerEvents: "auto"
        },

        ".toast .frame": {
            width: "15%",
            height: "auto",
            boxSizing: "border-box",
            left: "85%",

        }
    }

    protected static _styleDependencies = [Popup];

    /**
     * ToastPopup
     * ----------------------------------------------------------------------------
     * create a toast popup and show it for the specified number of millisconds
     * 
     * @param   details     The detailed mesasage to display in the toat
     * 
     * @param   [title]     A high-level title for the popup
     * 
     * @param   [showFor]   How many milliseconds to show this toast for. Set to -1 
     *                      to only hide after the user selects "dismiss". Defaults
     *                      to five seconds.
     */
    constructor(details: string, title?: string, showFor?: number, popupOptions: IPopupDefinition = {}) {
        super(popupOptions);
        addClass(this._elems.base, "toast");
        this._showFor = showFor || DEFAULT_TOAST_DURATION_IN_MS;

        if (title) { this.setTitle(title); }

        this.addContent(details);
        this.addButton("Dismiss", () => { this.erase(); });
    }

    public draw(parent?: HTMLElement, force?: boolean): void {
        super.draw(parent, force);
        this._setupTransition();
    }

    protected async _setupTransition() {
        await nextRender();

        // make sure we show a slide animation
        transition(this._elems.frame, { top: "100%" }, { top: "calc(100% - <height>)" }, 300).then(() => {
            this._elems.frame.style.top = this._elems.frame.offsetTop + "px";
        });
        
        // if the user chose to never auto-hide, respect that
        if (this._showFor === -1) { return; }

        // Remove this popup after the specified timeout
        window.setTimeout(() => {
            this.erase();
        }, this._showFor);
    }

    public erase(): void {
        delete this._elems.frame.style.top;
        transition(this._elems.frame, { top: "calc(100% - <height>)", opacity: "1" }, { top: "100%", opacity: "0" }, 300).then(() => {
            super.erase();
        });
    }
}
