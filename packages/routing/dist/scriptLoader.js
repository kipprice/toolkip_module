"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toolkip_primitive_helpers_1 = require("@kipprice/toolkip-primitive-helpers");
const toolkip_create_elements_1 = require("@kipprice/toolkip-create-elements");
/**----------------------------------------------------------------------------
 * @class   ScriptLoader
 * ----------------------------------------------------------------------------
 * Dynamically load a JS file to the document
 * @author  Kip Price
 * @version 1.0.0
 * ----------------------------------------------------------------------------
 */
class ScriptLoader {
    /**
     * ScriptLoader
     * ----------------------------------------------------------------------------
     * Initialize the script loader with the appropriate format function
     */
    constructor(format) {
        this._scriptURLFormat = format || "{0}";
    }
    /**
     * _loadScript
     * ----------------------------------------------------------------------------
     * Dynamically load a particular script
     * @param   script  unique piece that should be applied in our formatted string
     *                  to load this particular URL
     */
    loadScript(script) {
        let formattedURL = toolkip_primitive_helpers_1.format(this._scriptURLFormat, script);
        toolkip_create_elements_1.createElement({
            type: "script",
            attr: { src: formattedURL },
            parent: document.head
        });
    }
}
exports.ScriptLoader = ScriptLoader;
