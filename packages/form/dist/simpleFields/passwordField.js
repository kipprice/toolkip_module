"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _field_1 = require("../_field");
const _interfaces_1 = require("../_interfaces");
/**----------------------------------------------------------------------------
 * @class Password
 * ----------------------------------------------------------------------------
 * create a  password element for a form
 * @author  Kip Price
 * @version 1.0.0
 * ----------------------------------------------------------------------------
 */
class PasswordField extends _field_1._Field {
    get _type() { return _interfaces_1.FieldTypeEnum.PASSWORD; }
    get _defaultValue() { return ""; }
    get _defaultCls() { return "password"; }
    _onCreateElements() {
        this._createStandardLabeledInput(false);
        this._handleStandardLayout();
    }
    _getValueFromField() {
        let value = this._elems.input.value;
        return value;
    }
    _createClonedElement(appendToID) {
        return new PasswordField(this._id + appendToID, this);
    }
}
exports.PasswordField = PasswordField;
