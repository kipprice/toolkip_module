import { Popup } from "./popup";
import { IStandardStyles } from "../styleHelpers/_interfaces";
import { IElemDefinition } from "../htmlHelpers/_interfaces";
import { addClass } from "../styleHelpers/css";
import transition from "../styleHelpers/transition";


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

    protected _getUncoloredStyles(): IStandardStyles {
        return this._mergeThemes(Popup._uncoloredStyles, ToastPopup._uncoloredStyles);
    }

    constructor(details: string, title?: string, showFor?: number, obj?: IElemDefinition) {
        super(obj);
        addClass(this._elems.base, "toast");
        this._showFor = showFor || 2000;
        if (title) { this.setTitle(title); }
        this.addContent("", "", details);
        this.addButton("Dismiss", () => { this.erase(); });
    }

    public draw(parent?: HTMLElement, force?: boolean): void {
        super.draw(parent, force);

        // make sure we show a slide animation
        transition(this._elems.frame, { top: "100%" }, { top: "calc(100% - <height>)" }, 300).then(() => {
            this._elems.frame.style.top = this._elems.frame.offsetTop + "px";
        });
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
