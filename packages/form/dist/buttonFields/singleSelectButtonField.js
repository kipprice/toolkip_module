"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _toggleButtonField_1 = require("./_toggleButtonField");
const toolkip_style_helpers_1 = require("@kipprice/toolkip-style-helpers");
/**----------------------------------------------------------------------------
 * @class   SingleSelectButtonField
 * ----------------------------------------------------------------------------
 * toggle buttons as equivalent to radio buttons
 * @author  Kip Price
 * @version 1.0.0
 * ----------------------------------------------------------------------------
 */
class SingleSelectButtonField extends _toggleButtonField_1._ToggleButtonField {
    get _defaultValue() { return null; }
    get _multiSelect() { return false; }
    /** handle a button being selected */
    _selectBtn(btn, value) {
        if (!btn) {
            return;
        }
        if (this._selectedBtn) {
            toolkip_style_helpers_1.removeClass(this._selectedBtn, "selected");
        }
        if (this._selectedBtn === btn) {
            this._data = this._defaultValue;
            this._selectedBtn = null;
            return;
        }
        this._data = value;
        this._selectedBtn = btn;
        toolkip_style_helpers_1.addClass(btn, "selected");
    }
    _createClonedElement(appendToID) {
        return new SingleSelectButtonField(this._id + appendToID, this);
    }
    _shouldBeSelected(elem) {
        return this._data === elem.value;
    }
    clear() {
        if (this._selectedBtn) {
            toolkip_style_helpers_1.removeClass(this._selectedBtn, "selected");
            this._selectedBtn = null;
        }
        this._data = this._defaultValue;
    }
}
exports.SingleSelectButtonField = SingleSelectButtonField;
