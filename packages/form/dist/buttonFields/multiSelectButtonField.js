"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _toggleButtonField_1 = require("./_toggleButtonField");
const shared_1 = require("../../../shared");
const toolkip_style_helpers_1 = require("@kipprice/toolkip-style-helpers");
const toolkip_primitive_helpers_1 = require("@kipprice/toolkip-primitive-helpers");
/**----------------------------------------------------------------------------
 * @class   MultiSelectButtonField
 * ----------------------------------------------------------------------------
 * toggle buttons as multi-select options
 * @author  Kip Price
 * @version 1.0.0
 * ----------------------------------------------------------------------------
 */
class MultiSelectButtonField extends _toggleButtonField_1._ToggleButtonField {
    //#endregion
    //.....................
    /**
     * MultiSelectButtonElem
     * ----------------------------------------------------------------------------
     * Create the multi select form
     * @param id
     * @param template
     */
    constructor(id, template) {
        super(id, template);
    }
    get _multiSelect() { return true; }
    get _defaultValue() { return []; }
    /**
     * _parseFieldTemplate
     * ----------------------------------------------------------------------------
     * @param template
     */
    _parseFieldTemplate(template) {
        super._parseFieldTemplate(template);
        this._selectedBtns = [];
    }
    /**
     * update
     * ----------------------------------------------------------------------------
     * @param data
     */
    update(data, allowEvents) {
        if (shared_1.isNullOrUndefined(data)) {
            return;
        }
        this.clear();
        // map all of the elements
        data.map((elem) => {
            let btn = this._getButtonToUpdate(elem);
            this._selectBtn(btn, elem);
        });
    }
    /**
     * _shouldBeSelected
     * ----------------------------------------------------------------------------
     * @param   elem    The element to potentially select
     * @returns True if a specified button should be selected
     */
    _shouldBeSelected(elem) {
        let dIdx = this._indexOf(elem.value);
        return (dIdx !== -1);
    }
    /**
     * _createClonedElement
     * ----------------------------------------------------------------------------
     * @param appendToID
     */
    _createClonedElement(appendToID) {
        return new MultiSelectButtonField(this.id + appendToID, this);
    }
    /**
     * _selectBtn
     * ----------------------------------------------------------------------------
     * @param btn
     * @param value
     */
    _selectBtn(btn, value) {
        if (!btn) {
            return;
        }
        // handle the case where the button was already selected
        let selectedIdx = this._selectedBtns.indexOf(btn);
        let dataIdx = this._indexOf(value);
        if ((dataIdx !== -1) && (selectedIdx === -1)) {
            return;
        }
        else if (selectedIdx != -1) {
            if (selectedIdx !== -1) {
                toolkip_style_helpers_1.removeClass(btn, "selected");
                this._selectedBtns.splice(selectedIdx, 1);
            }
            if (dataIdx !== -1) {
                this._data.splice(dataIdx, 1);
            }
        }
        // handle the case where the button was unselected
        else {
            this._data.push(value);
            this._selectedBtns.push(btn);
            toolkip_style_helpers_1.addClass(btn, "selected");
        }
    }
    /**
     * _indexOf
     * ----------------------------------------------------------------------------
     * @param value
     * @returns The index of the element in the array, or -1 if it isn't found
     */
    _indexOf(value) {
        let outIdx = -1;
        for (let idx = 0; idx < this._data.length; idx += 1) {
            let elem = this._data[idx];
            if (this._equalTo(elem, value)) {
                outIdx = idx;
                break;
            }
        }
        return outIdx;
    }
    /**
     * _equalTo
     * ----------------------------------------------------------------------------
     * Determine whether the data in this element is equivalent t
     * @param dataA
     * @param dataB
     */
    _equalTo(dataA, dataB) {
        switch (typeof dataA) {
            case "string":
            case "number":
            case "boolean":
                return (dataA === dataB);
        }
        if (dataA instanceof Date) {
            return (toolkip_primitive_helpers_1.shortDate(dataA) === toolkip_primitive_helpers_1.shortDate(dataB));
        }
        return (dataA === dataB);
    }
    /**
     * _onClear
     * ----------------------------------------------------------------------------
     * Handle clearing data from this element
     */
    clear() {
        this._data = [];
        // unselect everything
        for (let idx = (this._selectedBtns.length - 1); idx >= 0; idx -= 1) {
            let elem = this._selectedBtns[idx];
            toolkip_style_helpers_1.removeClass(elem, "selected");
            this._selectedBtns.splice(idx, 1);
        }
        ;
    }
}
exports.MultiSelectButtonField = MultiSelectButtonField;
