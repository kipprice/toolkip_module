"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _field_1 = require("../_field");
const _interfaces_1 = require("../_interfaces");
const helpers_1 = require("../helpers");
const toolkip_shared_types_1 = require("@kipprice/toolkip-shared-types");
/**----------------------------------------------------------------------------
 * @class TextAreaField
 * ----------------------------------------------------------------------------
 * create a text area element for a form
 * @author  Kip Price
 * @version 1.0.1
 * ----------------------------------------------------------------------------
 */
class TextAreaField extends _field_1._Field {
    get _type() { return _interfaces_1.FieldTypeEnum.TEXTAREA; }
    get _defaultValue() { return ""; }
    get _defaultCls() { return "textarea"; }
    _onCreateElements() {
        let input = helpers_1.createInputElement(this._id, "input", "textarea", this._data);
        if (this._config.useGhostText) {
            input.placeholder = this._config.label || "";
        }
        this._elems.input = input;
        this._createStandardLabel();
        this._handleStandardLayout();
    }
    _getValueFromField() {
        let value = this._elems.input.value;
        value = value.replace(/\n/g, "<br>");
        value = value.replace(/    /g, "&nbsp;&nbsp;&nbsp;&nbsp;");
        return value;
    }
    _createClonedElement(appendToID) {
        return new TextAreaField(this._id + appendToID, this);
    }
    update(data, allowEvents) {
        if (toolkip_shared_types_1.isNullOrUndefined(data)) {
            data = "";
        }
        this._data = data;
        let displayStr = data.replace(/<br>/g, "\n");
        displayStr = displayStr.replace(/\&nbsp;/g, " ");
        this._elems.input.value = displayStr;
    }
}
exports.TextAreaField = TextAreaField;
