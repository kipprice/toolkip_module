"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _field_1 = require("../_field");
const _interfaces_1 = require("../_interfaces");
const toolkip_create_elements_1 = require("@kipprice/toolkip-create-elements");
const helpers_1 = require("../helpers");
const toolkip_primitive_helpers_1 = require("@kipprice/toolkip-primitive-helpers");
/**----------------------------------------------------------------------------
 * @class DateTimeField
 * ----------------------------------------------------------------------------
 * create an element to collect date and time for a form
 * @author  Kip Price
 * @version 1.0.1
 * ----------------------------------------------------------------------------
 */
class DateTimeField extends _field_1._Field {
    //.....................
    //#region PROPERTIES
    get _type() { return _interfaces_1.FieldTypeEnum.DATE_TIME; }
    get _defaultValue() { return null; }
    get _defaultCls() { return "dateTime"; }
    //#endregion
    //..........................................
    _onCreateElements() {
        this._createStandardLabel(this._elems.base);
        this._elems.inputWrapper = toolkip_create_elements_1.createSimpleElement("", "inputs", "", null, null, this._elems.base);
        // draw the date
        let dateWrapper = toolkip_create_elements_1.createElement({ cls: "dateWrapper", parent: this._elems.inputWrapper });
        let dateLbl = toolkip_create_elements_1.createSimpleElement("", "lbl", "Date: ", null, null, dateWrapper);
        this._elems.dateInput = helpers_1.createInputElement("", "dateInput", "date", this._data, null, null, dateWrapper);
        this._elems.dateInput.addEventListener("change", () => {
            this._changeEventFired();
        });
        // draw the time
        let timeVal = (this._data ? toolkip_primitive_helpers_1.shortTime(this._data) : "");
        let timeWrapper = toolkip_create_elements_1.createElement({ cls: "timeWrapper", parent: this._elems.inputWrapper });
        let timeLbl = toolkip_create_elements_1.createSimpleElement("", "lbl", "Time: ", null, null, timeWrapper);
        this._elems.timeInput = helpers_1.createInputElement("", "timeInput", "time", timeVal, null, null, timeWrapper);
        this._elems.timeInput.addEventListener("change", () => {
            this._changeEventFired();
        });
    }
    _getValueFromField() {
        let timeStr = this._elems.timeInput.value;
        let dateStr = this._elems.dateInput.value;
        let date = toolkip_primitive_helpers_1.inputToDate(dateStr, timeStr);
        return date;
    }
    _createClonedElement(appendToID) {
        return new DateTimeField(this._id + appendToID, this);
    }
    update(data, allowEvents) {
        this.clear();
        this._data = data;
        if (!this._data) {
            return;
        }
        if (this._elems.dateInput) {
            this._elems.dateInput.value = toolkip_primitive_helpers_1.inputDateFmt(data);
        }
        if (this._elems.timeInput) {
            this._elems.timeInput.value = toolkip_primitive_helpers_1.inputTimeFmt(data);
        }
    }
}
exports.DateTimeField = DateTimeField;
//#endregion
//.....................
//..........................................
//#region STYLES
DateTimeField._uncoloredStyles = {
    ".kipFormElem.dateTime .inputs": {
        display: "flex",
        width: "100%",
        alignItems: "center",
        flexWrap: "wrap",
        nested: {
            ".dateWrapper": {
                marginRight: "10px"
            }
        }
    },
    ".kipFormElem.dateTime .inputs input": {
        marginRight: "20px",
        flexGrow: "1",
        minWidth: "150px"
    },
    ".kipFormElem.dateTime .inputs .lbl": {
        flexShrink: "1",
        maxWidth: "50px",
        marginTop: "4px"
    }
};
