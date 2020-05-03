"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const scriptLoader_1 = require("./scriptLoader");
const url_1 = require("./url");
/**----------------------------------------------------------------------------
 * @class   Router
 * ----------------------------------------------------------------------------
 * Assist with routing based on the URL loaded
 * @author  Kip Price
 * @version 1.0.0
 * ----------------------------------------------------------------------------
 */
class _Router {
    /**
     * route
     * ----------------------------------------------------------------------------
     * Route this page to a particular set of code, based on details on the
     * URL that brought us here
     */
    route() {
        this._route(url_1.cleanURL(), url_1.splitParams());
    }
    /**
     * _createScriptLoader
     * ----------------------------------------------------------------------------
     * Overridable function that determines how JS files are dynamically loaded
     */
    _createScriptLoader() {
        this._loader = new scriptLoader_1.ScriptLoader("{0}");
    }
}
exports._Router = _Router;
