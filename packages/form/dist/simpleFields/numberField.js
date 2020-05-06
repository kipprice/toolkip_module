"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _field_1 = require("../_field");
const _interfaces_1 = require("../_interfaces");
/**----------------------------------------------------------------------------
 * @class NumberField
 * ----------------------------------------------------------------------------
 * create a number element for a form
 * @author  Kip Price
 * @version 1.0.1
 * ----------------------------------------------------------------------------
 */
class NumberField extends _field_1._Field {
    get _type() { return _interfaces_1.FieldTypeEnum.NUMBER; }
    get _defaultValue() { return 0; }
    get _defaultCls() { return "number"; }
    _onCreateElements() {
        this._createStandardLabeledInput();
        this._handleStandardLayout();
    }
    _getValueFromField() {
        let value = +this._elems.input.value;
        return value;
    }
    _createClonedElement(appendToID) {
        return new NumberField(this._id + appendToID, this);
    }
}
exports.NumberField = NumberField;
