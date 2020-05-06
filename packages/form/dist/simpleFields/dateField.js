"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _field_1 = require("../_field");
const _interfaces_1 = require("../_interfaces");
const toolkip_primitive_helpers_1 = require("@kipprice/toolkip-primitive-helpers");
/**----------------------------------------------------------------------------
* @class DateField
* ----------------------------------------------------------------------------
* create a date element for a form
* @author  Kip Price
* @version 1.0.1
* ----------------------------------------------------------------------------
*/
class DateField extends _field_1._Field {
    get _type() { return _interfaces_1.FieldTypeEnum.DATE; }
    get _defaultValue() { return null; }
    get _defaultCls() { return "date"; }
    /** create the display for the date element */
    _onCreateElements() {
        this._createStandardLabeledInput();
        this._handleStandardLayout();
    }
    _getValueFromField() {
        // first convert the string value to a date
        let value = this._elems.input.value;
        let dateValue = toolkip_primitive_helpers_1.inputToDate(value);
        // run standard validations
        return dateValue;
    }
    _createClonedElement(appendToID) {
        return new DateField(this._id + appendToID, this);
    }
    update(data, allowEvents) {
        this._data = data;
        if (!this._elems.input) {
            return;
        }
        if (!this._data) {
            return;
        }
        this._elems.input.value = toolkip_primitive_helpers_1.inputDateFmt(data);
    }
    _testEquality(newDate) {
        return (toolkip_primitive_helpers_1.dateDiff(newDate, this._data) === 0);
    }
}
exports.DateField = DateField;
