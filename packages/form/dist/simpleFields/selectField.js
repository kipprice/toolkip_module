"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _interfaces_1 = require("../_interfaces");
const _field_1 = require("../_field");
const helpers_1 = require("../helpers");
const toolkip_primitive_helpers_1 = require("@kipprice/toolkip-primitive-helpers");
/**----------------------------------------------------------------------------
 * @class SelectField
 * ----------------------------------------------------------------------------
 * create a dropdown for a form with either numeric or string backing data
 * @author  Kip Price
 * @version 2.0.0
 * ----------------------------------------------------------------------------
 */
class SelectField extends _field_1._Field {
    get _type() { return _interfaces_1.FieldTypeEnum.SELECT; }
    get _defaultValue() { return null; }
    get _defaultCls() { return "select"; }
    /**
     * _parseFieldTemplate
     * ----------------------------------------------------------------------------
     * Get additional details about how this select field should be set up
     */
    _parseFieldTemplate(template) {
        super._parseFieldTemplate(template);
        this._options = template.options;
    }
    /**
     * _onCreateElements
     * ----------------------------------------------------------------------------
     * Create the elements needed for the select field
     */
    _onCreateElements() {
        this._elems.input = helpers_1.createSelectElement(this._id, "input", this._options);
        this._createStandardLabel();
        this._handleStandardLayout();
    }
    /**
     * _onChange
     * ----------------------------------------------------------------------------
     * manage when details in this select field changed
     */
    _getValueFromField() {
        let v = this._elems.input.value;
        let value = v;
        if (toolkip_primitive_helpers_1.isNumeric(v)) {
            value = +v;
        }
        return value;
    }
    /**
     * _createClonedElement
     * ----------------------------------------------------------------------------
     * Generate the cloned select element
     */
    _createClonedElement(appendToID) {
        return new SelectField(this._id + appendToID, this);
    }
}
exports.SelectField = SelectField;
