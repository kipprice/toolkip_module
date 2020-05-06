"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fullScreenForm_1 = require("./fullScreenForm");
const popupForm_1 = require("./popupForm");
const inlineForm_1 = require("./inlineForm");
const embeddedForm_1 = require("./embeddedForm");
const _interfaces_1 = require("../_interfaces");
/**----------------------------------------------------------------------------
 * @class	Form (Deprecated)
 * ----------------------------------------------------------------------------
 * old version of shared form; use one of the more specific forms instead.
 * @author	Kip Price
 * @version	1.0.0
 * ----------------------------------------------------------------------------
 */
class Form extends embeddedForm_1.EmbeddedForm {
    /**
     * Form
     * ----------------------------------------------------------------------------
     * pass through to the appropriate new type of form
     */
    constructor(id, opts, elems) {
        opts.id = id;
        super(opts, elems);
        if (opts.popupForm) {
            opts.style = _interfaces_1.FormStyleOptions.POPUP;
        }
        let out;
        switch (opts.style) {
            case _interfaces_1.FormStyleOptions.INLINE:
                out = new inlineForm_1.InlineForm(opts, elems);
                break;
            case _interfaces_1.FormStyleOptions.POPUP:
                out = new popupForm_1.PopupForm(opts, elems);
                break;
            case _interfaces_1.FormStyleOptions.FULLSCREEN:
                out = new fullScreenForm_1.FullScreenForm(opts, elems);
                break;
        }
        return out;
    }
}
exports.Form = Form;
