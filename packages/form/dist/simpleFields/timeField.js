"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _field_1 = require("../_field");
const _interfaces_1 = require("../_interfaces");
const toolkip_primitive_helpers_1 = require("@kipprice/toolkip-primitive-helpers");
/**----------------------------------------------------------------------------
 * @class TimeField
 * ----------------------------------------------------------------------------
 * create a time element for a form
 * @author  Kip Price
 * @version 1.0.1
 * ----------------------------------------------------------------------------
 */
class TimeField extends _field_1._Field {
    get _type() { return _interfaces_1.FieldTypeEnum.TIME; }
    get _defaultValue() { return null; }
    get _defaultCls() { return "time"; }
    _onCreateElements() {
        this._createStandardLabeledInput();
        this._handleStandardLayout();
    }
    _getValueFromField() {
        let value = this._elems.input.value;
        let dateValue = toolkip_primitive_helpers_1.inputToDate("", value);
        return dateValue;
    }
    _createClonedElement(appendToID) {
        return new TimeField(this._id + appendToID, this);
    }
    update(data, allowEvents) {
        this._data = data;
        if (!this._elems.input) {
            return;
        }
        if (!this._data) {
            return;
        }
        this._elems.input.value = toolkip_primitive_helpers_1.inputTimeFmt(data);
    }
}
exports.TimeField = TimeField;
