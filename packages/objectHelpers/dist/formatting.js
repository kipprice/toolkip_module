"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toolkip_primitive_helpers_1 = require("@kipprice/toolkip-primitive-helpers");
const manipulate_1 = require("./manipulate");
/**
 * stringify
 * ----------------------------------------------------------------------------
 * turn a JSON object into a string version
 */
function stringify(obj, asHtml, prefix) {
    let out = [];
    let newLineChar = asHtml ? "<br>" : "\n";
    let tabChar = asHtml ? "&nbsp;&nbsp;&nbsp;&nbsp;" : "\t";
    if (!prefix) {
        prefix = "";
    }
    manipulate_1.map(obj, (value, key) => {
        let valStr;
        switch (typeof value) {
            case "string":
                valStr = value;
                break;
            case "number":
            case "boolean":
                valStr = value.toString();
                break;
            default:
                if (!value) {
                    valStr = value;
                    break;
                }
                if (value.hasOwnProperty("toString")) {
                    valStr = newLineChar + value.toString();
                }
                else {
                    valStr = newLineChar + stringify(value, asHtml, tabChar);
                }
        }
        out.push(_format(prefix + key, valStr, asHtml));
    });
    return out.join("");
}
exports.stringify = stringify;
/**
 * _format
 * ----------------------------------------------------------------------------
 * format a particular property appropriately
 */
function _format(key, value, asHtml) {
    if (asHtml) {
        return _formatPropertyAsHTML(key, value);
    }
    return _formatPropertyAsPlainText(key, value);
}
/**
 * _formatPropertyAsHTML
 * ----------------------------------------------------------------------------
 * show a property as HTML
 */
function _formatPropertyAsHTML(key, value) {
    return toolkip_primitive_helpers_1.format("<b>{0}</b>: {1}{2}", key, value, "<br>");
}
/**
 * _formatPropertyAsPlainText
 * ----------------------------------------------------------------------------
 * show a JSON property as string
 */
function _formatPropertyAsPlainText(key, value) {
    return toolkip_primitive_helpers_1.format("{0}: {1}\n", key, value);
}
