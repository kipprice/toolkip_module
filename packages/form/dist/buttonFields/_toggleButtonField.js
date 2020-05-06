"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _field_1 = require("../_field");
const toolkip_object_helpers_1 = require("@kipprice/toolkip-object-helpers");
const _interfaces_1 = require("../_interfaces");
const toolkip_style_helpers_1 = require("@kipprice/toolkip-style-helpers");
const toolkip_create_elements_1 = require("@kipprice/toolkip-create-elements");
const toolkip_primitive_helpers_1 = require("@kipprice/toolkip-primitive-helpers");
const toolkip_async_1 = require("@kipprice/toolkip-async");
/**----------------------------------------------------------------------------
 * @class   ToggleButtonField
 * ----------------------------------------------------------------------------
 * template for toggle buttons
 * @author  Kip Price
 * @version 1.0.0
 * ----------------------------------------------------------------------------
 */
class _ToggleButtonField extends _field_1._Field {
    //#endregion
    //..................
    /**
     * ToggleButtonElement
     * ----------------------------------------------------------------------------
     * Create a toggle button class
     * @param   id          The ID to use for the toggle button
     * @param   template    The template for this element
     */
    constructor(id, template) {
        super(id, template);
    }
    /** type for the toggle buttons */
    get _type() { return _interfaces_1.FieldTypeEnum.TOGGLE_BUTTON; }
    /** default class for the toggle buttons */
    get _defaultCls() { return "toggleBtns"; }
    /**
     * _parseFieldTemplate
     * ----------------------------------------------------------------------------
     * Parse data in the element template
     * @param   template    Handle the element
     */
    _parseFieldTemplate(template) {
        super._parseFieldTemplate(template);
        this._options = template.options;
    }
    /**
     * _onCreateElements
     * ----------------------------------------------------------------------------
     * create the elements needed for toggle buttons
     */
    _onCreateElements() {
        this._elems.childrenContainer = toolkip_create_elements_1.createSimpleElement("", "formChildren", "", null, null);
        this._createOptionsElements();
        this._handleStandardLayout();
    }
    //........................
    //#region HANDLE LAYOUT
    _flexLayout() {
        toolkip_style_helpers_1.addClass(this._elems.base, "flex");
        this._createStandardLabel(this._elems.base);
        this._appendChildren();
    }
    _multiLineLayout() {
        toolkip_style_helpers_1.addClass(this._elems.base, "multiline");
        this._createStandardLabel(this._elems.base);
        this._appendChildren();
    }
    _tableLayout() {
        this._multiLineLayout();
        //TODO: do a real table layout
    }
    //#endregion
    //........................
    _appendChildren() {
        this._elems.base.appendChild(this._elems.childrenContainer);
        if (this._elems.postChildrenContainer) {
            this._elems.base.appendChild(this._elems.postChildrenContainer);
        }
    }
    _labelAfterLayout() {
        toolkip_style_helpers_1.addClass(this._elems.base, "labelLast");
        this._appendChildren();
        this._createStandardLabel(this._elems.base);
    }
    /**
     * _updateOptions
     * ---------------------------------------------------------------------------
     * update the buttons that are presented as options to the user
     */
    _updateOptions(options) {
        // clear out any existing options
        this._clearOptions();
        // update the option arrays
        this._options = options;
        this._config.options = options;
        // regenerate the buttons
        this._createOptionsElements();
    }
    /**
     * _clearOptions
     * ---------------------------------------------------------------------------
     * clear out the current set of options
     */
    _clearOptions() {
        this._buttons = [];
        this._elems.childrenContainer.innerHTML = "";
    }
    /**
     * _createOptionsElements
     * ----------------------------------------------------------------------------
     */
    _createOptionsElements() {
        toolkip_object_helpers_1.map(this._options, (elem) => {
            this._createOptionElement(elem);
        });
    }
    /**
     * _createOptionElement
     * ----------------------------------------------------------------------------
     * @param elem
     */
    _createOptionElement(elem) {
        let btn = toolkip_create_elements_1.createElement({
            id: this._id + "btn" + elem.value,
            cls: "toggleBtn",
            content: elem.label,
            parent: this._elems.childrenContainer,
            eventListeners: {
                click: () => {
                    this._selectBtn(btn, elem.value);
                    this._changeEventFired();
                }
            }
        });
        // check if we already know that this button should be selected
        if (this._shouldBeSelected(elem)) {
            this._selectBtn(btn, elem.value);
        }
        // add this to our button arary as appropriate
        if (!this._buttons) {
            this._buttons = [];
        }
        this._buttons.push({ key: elem.value, btn: btn });
        return btn;
    }
    /**
     * _onChange
     * ----------------------------------------------------------------------------
     * process when the user has changed their selection
     */
    _getValueFromField() {
        let value = this._data;
        return value;
    }
    update(data, allowEvents) {
        let changed = !this._testEquality(data);
        if (!changed) {
            return;
        }
        super.update(data, allowEvents);
    }
    /**
     * updateUI
     * ----------------------------------------------------------------------------
     * update the selected buttons based on the passed in information
     */
    _updateUI(data) {
        let btn = this._getButtonToUpdate(data);
        toolkip_async_1.wait(100).then(() => {
            if (!this._selectBtn) {
                console.log("missing _selectBtn: " + this._selectBtn);
                throw new Error("missing _select function");
            }
            this._selectBtn(btn, data);
        });
    }
    /**
     * _getButtonToUpdate
     * ----------------------------------------------------------------------------
     * @param data
     */
    _getButtonToUpdate(data) {
        let idx = toolkip_primitive_helpers_1.indexOf(this._buttons, { key: data, btn: null }, (a, b) => {
            return this._equalityTest(a, b);
        });
        if (idx === -1) {
            return;
        }
        let btn = this._buttons[idx].btn;
        return btn;
    }
    _equalityTest(a, b) {
        return (a.key === b.key);
    }
    _testEquality(a) { return false; }
}
exports._ToggleButtonField = _ToggleButtonField;
//#endregion
//.....................
//..................
//#region STYLES
/** static styles for the toggle buttons */
_ToggleButtonField._uncoloredStyles = {
    ".toggleBtns .formChildren": {
        display: "flex",
        flexWrap: "wrap",
        marginLeft: "0",
        marginTop: "5px"
    },
    ".toggleBtns.flex .formChildren": {},
    ".toggleBtn": {
        borderRadius: "3px",
        boxShadow: "1px 1px 4px 2px rgba(0,0,0,.1)",
        padding: "4px",
        marginRight: "10px",
        cursor: "pointer",
        textAlign: "center",
        fontSize: "0.8em",
        border: "1px solid transparent",
        opacity: "0.7",
        transition: "all ease-in-out .1s"
    },
    ".toggleBtn.selected, .toggleBtn:hover": {
        border: "1px solid <formTheme>",
        transform: "scale(1.08)"
    },
    ".toggleBtn.selected": {
        opacity: "1"
    }
};
_ToggleButtonField._styleDependencies = [_field_1._Field];
