"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _interfaces_1 = require("../_interfaces");
const _field_1 = require("../_field");
const toolkip_object_helpers_1 = require("@kipprice/toolkip-object-helpers");
const helpers_1 = require("../helpers");
/**----------------------------------------------------------------------------
 * @class ObjectSelectField
 * ----------------------------------------------------------------------------
 * create a dropdown for a form
 * @author  Kip Price
 * @version 1.0.1
 * ----------------------------------------------------------------------------
 */
class ObjectSelectField extends _field_1._Field {
    //.....................
    //#region PROPERTIES
    get _type() { return _interfaces_1.FieldTypeEnum.SELECT; }
    get _defaultValue() { return null; }
    get _defaultCls() { return "select"; }
    //#endregion
    //.....................
    /**
     * _parseFieldTemplate
     * ----------------------------------------------------------------------------
     * Get additional details about how this select field should be set up
     */
    _parseFieldTemplate(template) {
        super._parseFieldTemplate(template);
        // parse options into an array instead of a dictionary
        this._options = [];
        toolkip_object_helpers_1.map(template.options, (obj, display) => {
            this._options.push({
                display: display,
                value: obj
            });
        });
    }
    /**
     * _onCreateElements
     * ----------------------------------------------------------------------------
     * Create the elements needed for the select field
     */
    _onCreateElements() {
        // map the objects to the index in which they are stored
        let slimOptions = {};
        for (let oIdx = 0; oIdx < this._options.length; oIdx += 1) {
            let o = this._options[oIdx];
            slimOptions[oIdx] = o.display;
        }
        // create a standard select element
        this._elems.input = helpers_1.createSelectElement(this._id, "input", slimOptions);
        this._createStandardLabel();
        this._handleStandardLayout();
    }
    /**
     * _onChange
     * ----------------------------------------------------------------------------
     * manage when details in this select field changed
     */
    _getValueFromField() {
        let idx = this._elems.input.value;
        let value = this._options[idx];
        return value;
    }
    /**
     * _createClonedElement
     * ----------------------------------------------------------------------------
     * Generate the cloned select element
     */
    _createClonedElement(appendToID) {
        return new ObjectSelectField(this._id + appendToID, this);
    }
}
exports.ObjectSelectField = ObjectSelectField;
