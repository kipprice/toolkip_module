"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toolkip_drawable_1 = require("@kipprice/toolkip-drawable");
const toolkip_create_elements_1 = require("@kipprice/toolkip-create-elements");
class _Shield extends toolkip_drawable_1._Drawable {
    constructor() {
        super();
    }
    _createElements() {
        this._elems.base = toolkip_create_elements_1.createElement({
            cls: "kipShield"
        });
        this._elems.shieldContent = toolkip_create_elements_1.createElement({
            cls: "shieldContent",
            parent: this._elems.base
        });
        this._createShieldDetails();
    }
    ;
    draw(parent) {
        if (!parent) {
            parent = document.body;
        }
        // make sure the shield only shows if we are showing for long enough
        // for a human brain to process it
        this._showElementTimeout = window.setTimeout(() => {
            super.draw(parent);
            this._showElementTimeout = null;
        }, 200);
    }
    erase() {
        if (this._showElementTimeout) {
            window.clearTimeout(this._showElementTimeout);
            return;
        }
        super.erase();
    }
}
exports._Shield = _Shield;
_Shield._uncoloredStyles = {
    ".kipShield": {
        position: "fixed",
        backgroundColor: "rgba(0,0,0,0.6)",
        width: "100%",
        height: "100%",
        left: "0",
        top: "0",
        zIndex: "100"
    },
    ".kipShield .shieldContent": {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%"
    }
};
