"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const multiSelectButtonField_1 = require("./multiSelectButtonField");
const toolkip_create_elements_1 = require("@kipprice/toolkip-create-elements");
/**----------------------------------------------------------------------------
 * @class   ExpandableButtonField
 * ----------------------------------------------------------------------------
 * Add standard form element to create new buttons inline
 * @author  Kip Price
 * @version 1.0.0
 * ----------------------------------------------------------------------------
 */
class _ExpandableButtonField extends multiSelectButtonField_1.MultiSelectButtonField {
    //#endregion
    //..................
    constructor(id, template) {
        super(id, template);
        _ExpandableButtonField._instances.push(this);
    }
    static set options(opts) {
        if (this._options) {
            return;
        }
        this._options = opts;
        for (let instance of this._instances) {
            instance._createAvailableOptions();
        }
    }
    //#endregion
    //.......................................
    //.....................
    //#region PROPERTIES
    get _defaultCls() { return "toggleBtns expandable"; }
    get _addBtnLabel() { return "+ Add"; }
    /**
     * _createClonedElement
     * ----------------------------------------------------------------------------
     * @param appendToId
     */
    _createClonedElement(appendToId) {
        return new this.constructor(this._id + appendToId, this.template);
    }
    /**
     * _onChange
     * ----------------------------------------------------------------------------
     * Changing buttons always succeeds
     */
    _getValueFromField() { return this._data; }
    /**
     * _onCreateElements
     * ----------------------------------------------------------------------------
     * Create the appropriate elements for this
     */
    _onCreateElements() {
        this._elems.base = toolkip_create_elements_1.createElement({
            cls: "optElement"
        });
        this._createAvailableOptions();
        this._createInput();
    }
    /**
     * _createTags
     * ----------------------------------------------------------------------------
     * Create the tags section of this form element
     */
    _createAvailableOptions() {
        if (!this._elems.opts) {
            this._elems.opts = toolkip_create_elements_1.createElement({
                cls: "opts",
                parent: this._elems.base
            });
        }
        else {
            this._elems.opts.innerHTML = "";
            this._buttons = [];
        }
        if (!this.constructor._options) {
            return;
        }
        // loop through the available options
        for (let opt of this.constructor._options) {
            let optElem = this._createAvailableOption(opt);
            this._elems.opts.appendChild(optElem);
        }
        ;
    }
    /**
     * _createTag
     * ----------------------------------------------------------------------------
     * Create a toggle button for this element
     * @param   opt
     * @returns The created element
     */
    _createAvailableOption(opt) {
        let tagElem = this._createOptionElement(opt);
        return tagElem;
    }
    /**
     * _createInput
     * ----------------------------------------------------------------------------
     * Create the appropriate input elements to be able to create new options
     * inline
     */
    _createInput() {
        let inputWrapper = toolkip_create_elements_1.createElement({
            cls: "addOptWrapper",
            parent: this._elems.base
        });
        this._addInputField(inputWrapper);
        this._addAddButton(inputWrapper);
    }
    /**
     * _addInputField
     * ----------------------------------------------------------------------------
     * if appropriate, add a text field that can be used to add new elements
     * @param inputWrapper
     */
    _addInputField(inputWrapper) {
        if (!this._showInputField) {
            return;
        }
        this._elems.input = toolkip_create_elements_1.createElement({
            cls: "addOpt",
            type: "input",
            parent: inputWrapper,
            eventListeners: {
                keydown: (keyEvent) => {
                    if (keyEvent.keyCode !== 13) {
                        return;
                    }
                    this._addNewOption(this._elems.input.value);
                    this._clearInputField();
                }
            }
        });
    }
    /**
     * _addAddButton
     * ----------------------------------------------------------------------------
     * Add the appropriate button to create new elements to add
     */
    _addAddButton(inputWrapper) {
        this._elems.addBtn = toolkip_create_elements_1.createElement({
            cls: "addBtn",
            content: this._addBtnLabel,
            parent: inputWrapper,
            attr: {
                tabindex: "0"
            },
            eventListeners: {
                click: () => {
                    this._addNewOption(this._elems.input.value);
                    this._clearInputField();
                },
                keydown: (keyEvent) => {
                    if (keyEvent.keyCode !== 13) {
                        return;
                    }
                    this._addNewOption(this._elems.input.value);
                    this._clearInputField();
                    this._elems.input.focus();
                }
            }
        });
    }
    /**
     * _clearInputField
     * ----------------------------------------------------------------------------
     * Clear out the input field if we have one
     */
    _clearInputField() {
        if (!this._elems.input) {
            return;
        }
        this._elems.input.value = "";
    }
    /**
     * _addNewOption
     * ----------------------------------------------------------------------------
     * Add a new tag to our collection
     */
    _addNewOption(name) {
        // only add new elements
        if (name && this._doesElementAlreadyExist(name)) {
            return;
        }
        let opt = this._createNewOption(name);
        let optElem = this._createAvailableOption(opt);
        this._elems.opts.appendChild(optElem);
        this._selectBtn(optElem, opt.value);
    }
    /**
     * update
     * ----------------------------------------------------------------------------
     * Update the current selections of the element
     * @param data
     */
    update(data, allowEvents) {
        this._createAvailableOptions();
        super.update(data, allowEvents);
    }
}
exports._ExpandableButtonField = _ExpandableButtonField;
_ExpandableButtonField._instances = [];
//#endregion
//.....................
//..................
//#region STYLES
_ExpandableButtonField._uncoloredStyles = {
    ".optElement": {
        whiteSpace: "nowrap",
        marginTop: "10px",
        nested: {
            ".opts": {
                display: "flex",
                flexGrow: "1",
                flexWrap: "wrap",
                width: "100%",
                nested: {
                    ".toggleBtn": {
                        width: "auto",
                    }
                }
            },
            ".addOptWrapper": {
                display: "flex",
                maxWidth: "300px",
                fontSize: "1em",
                marginTop: "10px",
                nested: {
                    ".addOpt": {
                        flexGrow: "1"
                    },
                    ".addBtn": {
                        backgroundColor: "<formTheme>",
                        color: "#FFF",
                        padding: "2px 10px",
                        cursor: "pointer",
                        width: "auto",
                        display: "inline-block",
                        whiteSpace: "nowrap",
                        marginLeft: "10px",
                        transition: "all ease-in-out .2",
                        flexShrink: "0",
                        borderRadius: "30px",
                        nested: {
                            "&:hover": {
                                transform: "scale(1.05)"
                            }
                        }
                    }
                }
            }
        }
    }
};
