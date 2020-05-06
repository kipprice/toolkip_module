"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _form_1 = require("./_form");
const toolkip_style_helpers_1 = require("@kipprice/toolkip-style-helpers");
/**----------------------------------------------------------------------------
 * @class	InlineForm
 * ----------------------------------------------------------------------------
 * special type of form that doesn't render buttons, but instead saves
 * everytime there is a change
 * @author	Kip Price
 * @version	1.0.0
 * ----------------------------------------------------------------------------
 */
class InlineForm extends _form_1._Form {
    //#endregion
    //..................
    _createBase() {
        let out = super._createBase();
        toolkip_style_helpers_1.addClass(out, "inline");
        return out;
    }
    _createPostForm() {
        return null;
    }
    _onFormChange(event) {
        if (!this._isFormChangeForMe(event)) {
            return;
        }
        // any change within our form should be treated as a save for 
        // inline forms
        this.trySave();
    }
}
exports.InlineForm = InlineForm;
//..................
//#region STYLES
InlineForm._uncoloredStyles = {
    ".kipForm.inline": {
        display: "flex",
        nested: {
            ".formChildren.flex .kipFormElem": {
                marginRight: "20px"
            }
        }
    }
};
InlineForm._styleDependencies = [_form_1._Form];
