"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shield_1 = require("./shield");
const toolkip_create_elements_1 = require("@kipprice/toolkip-create-elements");
/**
 * @class LoadingShield
 *
 * Show a loading indication
 * @version 1.0.0
 * @author  Kip Price
 *
 */
class LoadingShield extends shield_1._Shield {
    /**
     * Create a loading shield
     * @param   loadingText   Additional etxt to display while loading
     *
     */
    constructor(loadingText) {
        super();
        this._loadingText = loadingText || "Loading...";
        this._createElements();
    }
    /** skip creating elements before data is set */
    _shouldSkipCreateElements() { return true; }
    /**
     * _createShieldDetails
     *
     * Create
     *
     */
    _createShieldDetails() {
        this._elems.wrapper = toolkip_create_elements_1.createElement({
            cls: "loadingContainer",
            parent: this._elems.shieldContent
        });
        this._elems.text = toolkip_create_elements_1.createElement({
            cls: "loadingText",
            content: this._loadingText,
            parent: this._elems.wrapper
        });
        this._elems.icon = toolkip_create_elements_1.createElement({
            cls: "loadingIcon",
            parent: this._elems.wrapper
        });
    }
}
exports.LoadingShield = LoadingShield;
/** styles for the loading shield */
LoadingShield._uncoloredStyles = {
    ".kipShield loadingContainer": {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    ".kipShield .loadingText": {
        fontFamily: '"OpenSansLight", "OpenSans", "Helvetica"',
        fontSize: "1.4em",
        color: "#FFF"
    },
    ".kipShield .loadingIcon": {
        border: "1px solid transparent",
        borderTop: "1px solid #FFF",
        borderRadius: "25px",
        width: "25px",
        height: "25px",
        animation: "rotate infinite linear 1s",
        margin: "auto"
    },
    "@keyframes rotate": {
        from: { transform: "rotate(0deg)" },
        to: { transform: "rotate(360deg)" }
    }
};
//#endregion
/** make sure we return the right set of styles */
LoadingShield._styleDependencies = [shield_1._Shield];
