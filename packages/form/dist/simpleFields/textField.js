"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _field_1 = require("../_field");
const _interfaces_1 = require("../_interfaces");
/**----------------------------------------------------------------------------
 * @class TextField
 * ----------------------------------------------------------------------------
 * create a text element for a form
 * @author  Kip Price
 * @version 1.0.1
 * ----------------------------------------------------------------------------
 */
class TextField extends _field_1._Field {
    get _type() { return _interfaces_1.FieldTypeEnum.TEXT; }
    get _defaultValue() { return ""; }
    get _defaultCls() { return "text"; }
    _onCreateElements() {
        this._createStandardLabeledInput(false);
        this._handleStandardLayout();
    }
    _getValueFromField() {
        let value = this._elems.input.value;
        return value;
    }
    _createClonedElement(appendToID) {
        return new TextField(this._id + appendToID, this);
    }
}
exports.TextField = TextField;
