"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const _field_1 = require("../_field");
const toolkip_create_elements_1 = require("@kipprice/toolkip-create-elements");
const helpers_1 = require("../helpers");
const toolkip_shared_types_1 = require("@kipprice/toolkip-shared-types");
const _interfaces_1 = require("../_interfaces");
/**----------------------------------------------------------------------------
 * @class FilePathField
 * ----------------------------------------------------------------------------
 * handle a file-upload field that supports just a file path
 * @author  Kip Price
 * @version 1.0.1
 * ----------------------------------------------------------------------------
 */
class FilePathField extends _field_1._Field {
    //#endregion
    //..................
    //.....................
    //#region PROPERTIES
    /** select the appropriate type for the file path type */
    get _type() { return _interfaces_1.FieldTypeEnum.FILE_PATH; }
    /** set a default class for file-path elements */
    get _defaultCls() { return "filepath"; }
    /** set a default value for file-path elements */
    get _defaultValue() { return ""; }
    //#endregion
    //.....................
    /**
     * _parseFieldTemplate
     * ----------------------------------------------------------------------------
     * Handle creating this element off of a template
     * @param   template
     */
    _parseFieldTemplate(template) {
        super._parseFieldTemplate(template);
        this._onSaveCallback = template.onSave;
        this._attr = template.attr;
    }
    /**
     * _onCreateElements
     * ----------------------------------------------------------------------------
     */
    _onCreateElements() {
        this._createStandardLabel(this._elems.base);
        this._elems.display = toolkip_create_elements_1.createSimpleElement("", "display", this._data, null, null, this._elems.base);
        this._elems.inputContainer = toolkip_create_elements_1.createSimpleElement("", "fileContainer", "", null, null, this._elems.base);
        this._elems.input = helpers_1.createInputElement(this._id + "|input", "", "file", "", null, null, this._elems.inputContainer);
        this._elems.inputLabel = helpers_1.createLabelForInput("Upload File", this._id + "|input", "filepath", this._elems.inputContainer);
    }
    /**
     * _onChange
     * ----------------------------------------------------------------------------
     * handle when the data in this element changes
     */
    _getValueFromField() {
        // check if the link is the one that changed, and if so, update that
        if (!toolkip_shared_types_1.isNullOrUndefined(this._tempLink)) {
            return this._onLinkChange();
        }
        // quit if we don't have any files uploaded
        this._files = this._elems.input.files;
        console.log(this._files);
        if (!this._files) {
            return "";
        }
        // treat the file name as the value for now
        // we will store the real path as part of the save function
        let str = this._files[0].name;
        return str;
    }
    /**
     * _onLinkChange
     * ----------------------------------------------------------------------------
     */
    _onLinkChange() {
        let out = this._tempLink;
        this._tempLink = null;
        return out;
    }
    /**
     * update
     * ----------------------------------------------------------------------------
     * update this element to have the appropriate data
     */
    update(data, allowEvents) {
        this._data = data;
        this._elems.display.innerHTML = data;
        this._elems.input.value = "";
    }
    /**
     * save
     * ----------------------------------------------------------------------------
     * @param   internalOnly    If true, we're only saving to our own data field,
     *                          not an external callers
     *
     * @returns The file path that is now saved
     */
    save(internalOnly) {
        return __awaiter(this, void 0, void 0, function* () {
            if (internalOnly) {
                return;
            } // Don't do anything if this is an internal change
            if (this._files) { // Make sure that if we have files, we're uploading them
                if (!this._onSaveCallback) {
                    return "";
                } // Don't do anything if we don't have a callback
                this._data = yield this._onSaveCallback(this._files); // Run our callback
            }
            return this._data; // Return the appropriate data
        });
    }
    /**
     * _createClonedElement
     * ----------------------------------------------------------------------------
     * Duplicate this form element appropriately
     */
    _createClonedElement(appendToID) {
        return new FilePathField(this.id + appendToID, this);
    }
}
exports.FilePathField = FilePathField;
//..................
//#region STYLES
/** style elements for the file path */
FilePathField._uncoloredStyles = {
    ".kipFormElem.filepath input[type=file]": {
        display: "none"
    },
    ".kipFormElem.filepath label.filepath": {
        backgroundColor: "<formTheme>",
        color: "#FFF",
        borderRadius: "2px",
        boxShadow: "1px 1px 5px 2px rgba(0,0,0,.1)",
        padding: "10px",
        fontSize: "0.7em",
        cursor: "pointer"
    },
    ".kipFormElem.filepath .display": {
        fontSize: "0.6em",
        whiteSpace: "break"
    }
};
