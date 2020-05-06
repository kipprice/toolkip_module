"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _field_1 = require("../_field");
const _interfaces_1 = require("../_interfaces");
/**----------------------------------------------------------------------------
 * @class   ColorField
 * ----------------------------------------------------------------------------
 * Creates a form element for collecting colors
 * @version 1.0.1
 * @author  Kip Price
 * ----------------------------------------------------------------------------
 */
class ColorField extends _field_1._Field {
    /** type of element */
    get _type() { return _interfaces_1.FieldTypeEnum.COLOR; }
    /** default value to use */
    get _defaultValue() { return "#000000"; }
    /** default CSS class to use */
    get _defaultCls() { return "color"; }
    /**
     * _onCreateElements
     * ----------------------------------------------------------------------------
     * Create elements for this form element
     */
    _onCreateElements() {
        this._createStandardLabeledInput();
        this._handleStandardLayout();
    }
    /**
     * _onChange
     * ----------------------------------------------------------------------------
     * Handle the change event for this input
     */
    _getValueFromField() {
        let value = this._elems.input.value;
        return value;
    }
    /**
     * _createClonedElement
     * ----------------------------------------------------------------------------
     * Clone this element
     * @param   appendToID  Additional ID piece to use
     */
    _createClonedElement(appendToID) {
        return new ColorField(this._id + appendToID, this);
    }
}
exports.ColorField = ColorField;
