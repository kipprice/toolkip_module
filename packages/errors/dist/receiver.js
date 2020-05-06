"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const silentRenderer_1 = require("./renderers/silentRenderer");
/**----------------------------------------------------------------------------
 * @class	ErrorReceiver
 * ----------------------------------------------------------------------------
 * give an easy way to show or hide errors; will swallow unless specifically
 * specified that the error state is in debug mode
 * @author	Kip Price
 * @version	1.0.0
 * ----------------------------------------------------------------------------
 */
class _ErrorReceiver {
    //#endregion
    //.....................
    /**
     * ErrorReceiver
     * ----------------------------------------------------------------------------
     * default to rendering silently; a caller can get at the details within the
     * error stack whenever they need to
     */
    constructor() {
        this._renderer = new silentRenderer_1.SilentRenderer();
    }
    set renderer(r) { this._renderer = r; }
    get renderer() { return this._renderer; }
    error(details) {
        return this._renderer.error(details);
    }
    warn(details) {
        return this._renderer.warn(details);
    }
    log(details) {
        return this._renderer.log(details);
    }
}
exports.ErrorReceiver = new _ErrorReceiver();
function error(details) {
    exports.ErrorReceiver.error(details);
}
exports.error = error;
function warn(details) {
    exports.ErrorReceiver.warn(details);
}
exports.warn = warn;
function log(details) {
    exports.ErrorReceiver.log(details);
}
exports.log = log;
