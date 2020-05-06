"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _field_1 = require("../_field");
const _interfaces_1 = require("../_interfaces");
const helpers_1 = require("../helpers");
/**----------------------------------------------------------------------------
 * @class FileUploadField
 * ----------------------------------------------------------------------------
 * handle file uploads such that they return a file list
 * @author  Kip Price
 * @version 1.0.1
 * ----------------------------------------------------------------------------
 */
class FileUploadField extends _field_1._Field {
    //.....................
    //#region PROPERTIES
    /** track the type of form element this is */
    get _type() { return _interfaces_1.FieldTypeEnum.FILE_UPLOAD; }
    /** give this for element a default CSS class */
    get _defaultCls() { return "file"; }
    /** set a default value for this form element type */
    get _defaultValue() { return null; }
    //#endregion
    //.....................
    /**
     * _parseFieldTemplate
     * ----------------------------------------------------------------------------
     * Parse the details of how to render this element
     */
    _parseFieldTemplate(template) {
        super._parseFieldTemplate(template);
        this._attr = template.attr;
    }
    /**
     * _onCreateElements
     * ----------------------------------------------------------------------------
     * Handle creating elements
     */
    _onCreateElements() {
        this._createStandardLabel(this._elems.base);
        this._elems.input = helpers_1.createInputElement("", "", "file", this._data, null, null, this._elems.base);
    }
    /**
     * _onChange
     * ----------------------------------------------------------------------------
     * Handle when the user has uploaded a file
     * @returns True if the file passes validation
     */
    _getValueFromField() {
        let files = this._elems.input.files;
        return files;
    }
    /**
     * _createClonedElement
     * ----------------------------------------------------------------------------
     * Handle cloning this element
     * @param   appendToId  The ID to append to the cloned element
     * @returns The created cloned element
     */
    _createClonedElement(appendToId) {
        return new FileUploadField(this.id + appendToId, this);
    }
}
exports.FileUploadField = FileUploadField;
