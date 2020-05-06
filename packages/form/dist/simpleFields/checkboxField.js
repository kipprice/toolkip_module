"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _field_1 = require("../_field");
const _interfaces_1 = require("../_interfaces");
const helpers_1 = require("../helpers");
const toolkip_create_elements_1 = require("@kipprice/toolkip-create-elements");
/**----------------------------------------------------------------------------
* @class CheckboxField
* ----------------------------------------------------------------------------
* create a checkbox form element
* @author  Kip Price
* @version 1.0.1
* ----------------------------------------------------------------------------
*/
class CheckboxField extends _field_1._Field {
    //.....................
    //#region PROPERTIES
    get _type() { return _interfaces_1.FieldTypeEnum.CHECKBOX; }
    get _defaultValue() { return false; }
    get _defaultCls() { return "check"; }
    get _defaultLayout() { return _interfaces_1.FormElementLayoutEnum.LABEL_AFTER; }
    //#endregion
    //...................................................
    /** create the check elements */
    _onCreateElements() {
        this._createStandardInput();
        // Create the custom UI for the checkbox
        this._elems.lbl = helpers_1.createLabelForInput("", this._id + "|input", "", this._elems.base);
        this._elems.inputBox = toolkip_create_elements_1.createElement({
            cls: "inputBox",
            parent: this._elems.lbl,
            attr: { tabindex: 0 },
            eventListeners: {
                keypress: (event) => {
                    if (event.keyCode !== 13 && event.keyCode !== 32) {
                        return;
                    }
                    this._elems.input.checked = !this._elems.input.checked;
                }
            }
        });
        this._elems.inputInnerBox = toolkip_create_elements_1.createElement({
            cls: "innerInputBox",
            parent: this._elems.inputBox
        });
        this._elems.innerLbl = toolkip_create_elements_1.createSimpleElement("", "innerLbl", this._config.label, null, null, this._elems.lbl);
        this._handleStandardLayout();
    }
    /** handle when the checkbox is clicked */
    _getValueFromField() {
        let value = this._elems.input.checked;
        return value;
    }
    /**
     * _createClonedElement
     * ---------------------------------------------------------------------------
     * clone the appropriate element
     */
    _createClonedElement(appendToID) {
        return new CheckboxField(this._id + appendToID, this);
    }
    /**
     * update
     * ---------------------------------------------------------------------------
     * update the contents of the element
     * */
    update(data, allowEvents) {
        this._data = data;
        this._elems.input.checked = data;
    }
}
exports.CheckboxField = CheckboxField;
//#endregion
//.....................
//...................................................
//#region STYLES
CheckboxField._uncoloredStyles = {
    '.kipFormElem input[type="checkbox"]': {
        display: "none",
        zoom: "1.5",
        width: "18px",
        height: "18px",
        margin: "0",
        marginRight: "5px",
        border: "1px solid <formTheme>"
    },
    ".kipFormElem input[type='checkbox'] + label": {
        display: "flex"
    },
    '.kipFormElem input[type="checkbox"] + label .inputBox': {
        width: "18px",
        height: "18px",
        margin: "0",
        marginRight: "5px",
        border: "1px solid <formTheme>",
        position: "relative",
        boxSizing: "content-box",
        flexShrink: "0",
        marginTop: "4px"
    },
    ".kipFormElem input[type='checkbox'] + label .inputBox .innerInputBox": {
        position: "absolute",
        width: "0",
        height: "0",
        left: "9px",
        top: "9px",
        backgroundColor: "<formTheme>",
        transition: "all ease-in-out .1s"
    },
    ".kipFormElem input[type='checkbox']:checked + label .inputBox .innerInputBox, .kipFormElem input[type='checkbox']:checked + label:hover .inputBox .innerInputBox": {
        left: "2px",
        top: "2px",
        width: "14px",
        height: "14px"
    },
    ".kipFormElem input[type='checkbox'] + label:hover .inputBox .innerInputBox": {
        left: "4px",
        top: "4px",
        width: "10px",
        height: "10px",
        opacity: "0.7"
    },
    ".kipFormElem.check input[type='checkbox'] + label .innerLbl": {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        fontSize: "0.9em",
        paddingTop: "3px"
    }
};
CheckboxField._styleDependencies = [_field_1._Field];
