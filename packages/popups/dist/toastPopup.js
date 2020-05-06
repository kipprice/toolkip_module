"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const popup_1 = require("./popup");
const toolkip_style_helpers_1 = require("@kipprice/toolkip-style-helpers");
class ToastPopup extends popup_1.Popup {
    constructor(details, title, showFor) {
        super();
        toolkip_style_helpers_1.addClass(this._elems.base, "toast");
        this._showFor = showFor || 2000;
        if (title) {
            this.setTitle(title);
        }
        this.addContent("", "", details);
        this.addButton("Dismiss", () => { this.erase(); });
    }
    draw(parent, force) {
        super.draw(parent, force);
        // make sure we show a slide animation
        toolkip_style_helpers_1.transition(this._elems.frame, { top: "100%" }, { top: "calc(100% - <height>)" }, 300).then(() => {
            this._elems.frame.style.top = this._elems.frame.offsetTop + "px";
        });
        // Remove this popup after the specified timeout
        window.setTimeout(() => {
            this.erase();
        }, this._showFor);
    }
    erase() {
        delete this._elems.frame.style.top;
        toolkip_style_helpers_1.transition(this._elems.frame, { top: "calc(100% - <height>)", opacity: "1" }, { top: "100%", opacity: "0" }, 300).then(() => {
            super.erase();
        });
    }
}
exports.ToastPopup = ToastPopup;
ToastPopup._uncoloredStyles = {
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
};
ToastPopup._styleDependencies = [popup_1.Popup];
