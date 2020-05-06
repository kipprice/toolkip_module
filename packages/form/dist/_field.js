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
const _interfaces_1 = require("./_interfaces");
const toolkip_drawable_1 = require("@kipprice/toolkip-drawable");
const toolkip_shared_types_1 = require("@kipprice/toolkip-shared-types");
const toolkip_style_helpers_1 = require("@kipprice/toolkip-style-helpers");
const toolkip_create_elements_1 = require("@kipprice/toolkip-create-elements");
const toolkip_comparable_1 = require("@kipprice/toolkip-comparable");
const toolkip_tooltip_1 = require("@kipprice/toolkip-tooltip");
const eventHandler_1 = require("./eventHandler");
const helpers_1 = require("./helpers");
const toolkip_async_1 = require("@kipprice/toolkip-async");
const toolkip_primitive_helpers_1 = require("@kipprice/toolkip-primitive-helpers");
/**----------------------------------------------------------------------------
 * @class	Field
 * ----------------------------------------------------------------------------
 * abstract implementation of a form element to be used in the form library
 * @author	Kip Price
 * @version	1.0.0
 * ----------------------------------------------------------------------------
 */
class _Field extends toolkip_drawable_1._Drawable {
    //#endregion
    //..........................................
    //..........................................
    //#region CONSTRUCT A FIELD
    /**
     * FormElement
     * ----------------------------------------------------------------------------
     * Create a Form Element
     * @param   id      The ID of the element; should be unique in the form
     * @param   data    a template or existing form element
     */
    constructor(id, data) {
        super();
        //..........................................
        //#region CONSTANTS
        /** store the standard class for all form elements */
        this._standardCls = "kipFormElem";
        this._addClassName("FormElement");
        this._id = id;
        this._hasErrors = false;
        //  parse the template for this element
        if (helpers_1.isField(data)) {
            this._parseFieldTemplate(data.template);
        }
        else {
            this._parseFieldTemplate(data);
        }
        this._createElements();
    }
    get id() { return this._id; }
    get type() { return this._type; }
    get template() { return this._config; }
    get _defaultLayout() { return _interfaces_1.FormElementLayoutEnum.MULTILINE; }
    get data() { return this._data; }
    set data(data) { this.update(data, false); } // TODO: evaluate if we'd ever need to fire events here
    get hasErrors() { return this._hasErrors; }
    /** input element */
    get input() {
        if (!this._elems.input) {
            return null;
        }
        return this._elems.input;
    }
    /** allow for label or label containers to be used */
    get _labelElem() {
        return this._elems.lblContainer || this._elems.lbl;
    }
    /**
     * _shouldSkipCreateElements
     * ----------------------------------------------------------------------------
     * handle element creation at our own pace
     */
    _shouldSkipCreateElements() { return true; }
    //#endregion
    //..........................................
    //..........................................
    //#region PARSE TEMPLATE
    /**
     * _parseFieldTemplate
     * ----------------------------------------------------------------------------
     * parse the template for this particular field
     */
    _parseFieldTemplate(template) {
        // ensure template is never null
        if (toolkip_shared_types_1.isNullOrUndefined(template)) {
            template = {};
        }
        // save off the template
        this._config = template;
        // set appropriate defaults on the template
        if (!template.label) {
            template.label = this._id;
        }
        if (!template.layout) {
            template.layout = this._defaultLayout;
        }
        if (!template.defaultValue) {
            template.defaultValue = this._defaultValue;
        }
        // verify that we check for valid falsey values
        if (toolkip_shared_types_1.isNullOrUndefined(template.value)) {
            template.value = template.defaultValue;
        }
        if (toolkip_shared_types_1.isNullOrUndefined(template.validationType)) {
            template.validationType = _interfaces_1.ValidationType.KEEP_ERROR_VALUE;
        }
        // handle our special cases
        this._processTemplateClass();
        this._processRequiredElement();
        this._registerOnOtherChangeListener();
        // set our data to be the default value
        this._data = template.defaultValue;
    }
    /**
     * _processTemplateClass
     * ----------------------------------------------------------------------------
     * generate the appropriate class for this element
     */
    _processTemplateClass() {
        let template = this._config;
        template.cls = toolkip_primitive_helpers_1.join(" ", this._standardCls, // class for all form elements
        this._defaultCls, // class for this particular form element
        template.cls, // class specified in template
        template.required ? "required" : "" // required class (if appropriate)
        );
    }
    /**
     * _processRequiredElement
     * ----------------------------------------------------------------------------
     * if this element is required, indicate that we're not ready to save if we
     * don't yet have data
     */
    _processRequiredElement() {
        // quit if this element isn't required, or if we already have a value
        if (!this._config.required) {
            return;
        }
        if (this._data) {
            return;
        }
        // otherwise, send a message that this element is not ready to save
        eventHandler_1.formEventHandler.dispatchEvent(eventHandler_1.FORM_SAVABLE_CHANGE, new eventHandler_1.FormSavableEvent({
            hasErrors: false,
            hasMissingRequired: true
        }));
    }
    /**
     * _registerOnOtherChangeListener
     * ----------------------------------------------------------------------------
     * listen for other fields changing, if a listener was provided in the
     * template
     */
    _registerOnOtherChangeListener() {
        // don't add a listener if there's nothing to listen to
        if (!this._config.onOtherChange) {
            return;
        }
        eventHandler_1.formEventHandler.addEventListener(eventHandler_1.FORM_ELEM_CHANGE, {
            func: (ev) => { this._handleOtherChange(ev); }
        });
    }
    //#endregion
    //..........................................
    //...........................
    //#region CREATE ELEMENTS
    /**
     * _createElements
     * ----------------------------------------------------------------------------
     * creates all elements for this input
     */
    _createElements() {
        // generate the elements that are shared between all form elements
        toolkip_create_elements_1.createElement({
            cls: this._config.cls,
            key: "base",
            children: [{
                    cls: "error",
                    key: "error"
                }]
        }, this._elems);
        // Let the child handle actually creating the elements that make 
        // up the specific nature of the element
        this._onCreateElements();
        // register the change listener if we created one
        if (this._elems.input) {
            this._registerInputListeners(this._elems.input);
        }
        // generate the styles for the element 
        // (we need to do this manually because form elements aren't 
        //  Drawable elements)
        // this._createStyles();
        // detect whether the element starts hidden
        if (toolkip_style_helpers_1.hasClass(this._elems.base, "hidden")) {
            this._isHidden = true;
        }
    }
    /**
     * _registerInputListeners
     * ----------------------------------------------------------------------------
     * create the listeners that pay attention to when content in the form has
     * updated
     */
    _registerInputListeners(input) {
        input.addEventListener("input", () => {
            this._changeEventFired(true);
        });
        input.addEventListener("change", () => {
            this._changeEventFired();
        });
    }
    /**
     * _addStandardElemsToCore
     * ----------------------------------------------------------------------------
     * add created elements to the appropriate parent
     */
    _addStandardElemsToCore() {
        this._elems.base.appendChild(this._labelElem);
        this._elems.base.appendChild(this._elems.input);
    }
    //#endregion
    //...........................
    //..........................................
    //#region HANDLE LAYOUT OF ELEMENTS
    /**
     * _handleStandardLayout
     * ----------------------------------------------------------------------------
     * helper to handle an elements layout based on their config
     *
     * @returns True if the layout was valid; false otherwise
     */
    _handleStandardLayout() {
        let l = _interfaces_1.FormElementLayoutEnum;
        switch (this._config.layout) {
            // label displays in table cell, elemnt in other table cell
            case l.TABLE:
                this._tableLayout();
                return true;
            // label displays before element inline
            case l.FLEX:
                this._flexLayout();
                return true;
            // label displays line above element
            case l.MULTILINE:
                this._multiLineLayout();
                return true;
            // label displays after the input
            case l.LABEL_AFTER:
                this._labelAfterLayout();
                return true;
        }
        return false;
    }
    /**
    * _tableLayout
    *----------------------------------------------------------------------------
    * draws elements in a table format
    */
    _tableLayout() {
        // build the cells that will hold the elements
        let cells = [];
        for (var i = 0; i < 2; i += 1) {
            let cell = toolkip_create_elements_1.createElement({
                type: "td",
                cls: "frmCel"
            });
            cells[i] = cell;
        }
        // add the label and the input to the table cells
        if (this._labelElem) {
            cells[0].appendChild(this._labelElem);
        }
        if (this._elems.input) {
            cells[1].appendChild(this._elems.input);
        }
        // create the actual table element & add it to the core element
        this._elems.table = toolkip_create_elements_1.createTable("", "", cells);
        this._elems.base.appendChild(this._elems.table);
    }
    /**
     * _flexLayout
     * ----------------------------------------------------------------------------
     * handle a flex layout of label: elem
     */
    _flexLayout() {
        this._addStandardElemsToCore();
        toolkip_style_helpers_1.addClass(this._elems.base, "flex");
    }
    /**
     * _multiLineLayout
     * ----------------------------------------------------------------------------
     * handle a multiline layout of label on top of input
     */
    _multiLineLayout() {
        this._addStandardElemsToCore();
        toolkip_style_helpers_1.addClass(this._elems.base, "multiline");
    }
    /**
     * _labelAfterLayout
     * ----------------------------------------------------------------------------
     * handle displaying the label element after the input
     */
    _labelAfterLayout() {
        this._elems.base.appendChild(this._elems.input);
        this._elems.base.appendChild(this._labelElem);
    }
    //#endregion
    //..........................................
    //..........................................
    //#region SAVE THIS FIELD
    /**
     * save
     * ----------------------------------------------------------------------------
     * handle saving the data from this form
     * @returns The data contained within this form element
     */
    save(internalUpdate) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._data;
        });
    }
    /**
     * canSave
     * ----------------------------------------------------------------------------
     * Determines whether this element has the option for saving
     *
     * @returns True if this element is prepared to save
     */
    canSave() {
        return {
            hasErrors: this._hasErrors,
            hasMissingRequired: this._hasBlankRequiredElems()
        };
    }
    /**
     * _hasBlankRequiredElems
     * ----------------------------------------------------------------------------
     * Check if this element has any misisng required elements
     */
    _hasBlankRequiredElems() {
        if (!this._config.required) {
            return false;
        }
        if (this._data !== this._config.defaultValue) {
            return false;
        }
        return true;
    }
    //#endregion
    //..........................................
    //..........................................
    //#region DATA MANAGEMENT
    /**
     * update
     * ----------------------------------------------------------------------------
     * handle setting data programmatically
     * @param   data    The data to populate in this field
     */
    update(data, allowEvents) {
        // check if the value has changed, and if so, notify others
        let changed = !this._testEquality(data);
        if (changed && allowEvents) {
            window.setTimeout(() => { this._dispatchChangeEvent(); }, 0);
        }
        // clear the form ahead of time
        this.clear();
        // if there's no data, grab the default value from the config
        if (toolkip_shared_types_1.isNullOrUndefined(data)) {
            data = this._config.defaultValue;
        }
        // set the data and update the UI
        this._data = data;
        this._updateUI(data);
    }
    /**
     * _testEquality
     * ----------------------------------------------------------------------------
     * determine if the new value is the same as the current value
     */
    _testEquality(data) {
        return toolkip_comparable_1.equals(data, this._data);
    }
    /**
     * _updateUI
     * ----------------------------------------------------------------------------
     * update the UI elements to have the right data, when the data has changed
     */
    _updateUI(data) {
        if (!this._elems.input) {
            return;
        }
        this._elems.input.value = data;
    }
    /**
     * _clear
     * ----------------------------------------------------------------------------
     * reset the form to its default values
     */
    clear() {
        this._data = this._config.defaultValue;
        this._clearUI();
    }
    /**
     * _clearUI
     * ----------------------------------------------------------------------------
     * clear out the form element
     */
    _clearUI() {
        if (!this._elems.input) {
            return;
        }
        this._elems.input.value = this._config.defaultValue;
    }
    //#endregion
    //..........................................
    //..........................................
    //#region EVENT HANDLING
    /**
     * focus
     * ----------------------------------------------------------------------------
     * Set focus to the input of this form element
     */
    focus() {
        if (!this._elems.input) {
            return false;
        }
        this._elems.input.focus();
        return true;
    }
    /**
    * _dispatchSavableChangeEvent
    * ----------------------------------------------------------------------------
    * let any listeners know that we updated the savable status of this element
    */
    _dispatchSavableChangeEvent() {
        eventHandler_1.formEventHandler.dispatchEvent(eventHandler_1.FORM_SAVABLE_CHANGE, new eventHandler_1.FormSavableEvent({
            target: this
        }));
    }
    /**
     * _dispatchChangeEvent
     * ----------------------------------------------------------------------------
     * let any listeners know that we updated our stuff
     */
    _dispatchChangeEvent(subkey) {
        eventHandler_1.formEventHandler.dispatchEvent(eventHandler_1.FORM_ELEM_CHANGE, new eventHandler_1.FormElemChangeEvent({
            key: this._id,
            subkey: subkey,
            data: this._data,
            target: this
        }));
    }
    /**
     * _handleOtherChange
     * ----------------------------------------------------------------------------
     * wrapper around our listener to ensure the data gets parsed appropriately
     */
    _handleOtherChange(ev) {
        if (!this._config.onOtherChange) {
            return;
        }
        this._config.onOtherChange(ev.context.key, ev.context.data, this);
    }
    //#endregion
    //..........................................
    //.............................................
    //#region HANDLE USER CHANGES TO THE FIELD
    /**
     * _changeEventFired
     * ----------------------------------------------------------------------------
     * handle when the input element has changed in order to kick off the
     * validation process
     */
    _changeEventFired(fieldStillHasFocus) {
        // clear out any current errors
        this._clearErrors();
        // if we don't validate until the field has lost focus, continue on
        if (fieldStillHasFocus && !this._shouldValidateBeforeBlur()) {
            return;
        }
        // notify listeners that something that might affect savability has occurred
        toolkip_async_1.wait(0).then(() => this._dispatchSavableChangeEvent());
        // grab & validate the data from the field
        let value = this._getValueFromField(fieldStillHasFocus);
        if (this._testEquality(value)) {
            return;
        }
        let validationResult = this._validate(value);
        if (!validationResult) {
            return;
        }
        // notify event listeners that something has successfully changed
        this._dispatchChangeEvent();
    }
    /**
     * _shouldValidateBeforeBlur
     * ----------------------------------------------------------------------------
     * determine whether validation should occur on every change, or whether it
     * should only occur upon moving focus away from the field
     */
    _shouldValidateBeforeBlur() { return true; }
    //#endregion
    //.............................................
    //..........................................
    //#region VALIDATION
    /**
     * _validate
     * ----------------------------------------------------------------------------
     * validate that the current value of this field is appropriate
     * @param   value   data we are validating
     * @returns true if the validation succeeded, false otherwise
     */
    _validate(value) {
        // spin up the object that will get updated if the validation encounters an error
        let errorString = {
            title: "",
            details: ""
        };
        // run through our custom validation
        let validationResult = this._runValidation(value, errorString);
        // if validation succeeded, set our data to the passed-in value
        if (validationResult) {
            this._data = value;
            return true;
            // otherwise, show the appropriate error state
        }
        else {
            this._onValidationError(errorString);
            return false;
        }
    }
    /**
     * _runValidation
     * ----------------------------------------------------------------------------
     *  runs the user-defined validation function & returns the result
     */
    _runValidation(data, errorString) {
        // run it through the user-defined eval function
        if (this._config.onValidate) {
            if (!this._config.onValidate(data, errorString)) {
                this._hasErrors = true;
                return false;
            }
        }
        // if we made it this far, either there was no validation, or it succeeded
        this._hasErrors = false;
        return true;
    }
    //#endregion
    //..........................................
    //..........................................
    //#region ERROR HANDLING
    /**
     * _onValidationError
     * ----------------------------------------------------------------------------
     * take an action based on validation failing, taking into consideration
     * the validation type of this field
     */
    _onValidationError(err) {
        this._updateErrorElem(err);
        this._updateInputOnError();
    }
    /**
     * _updateErrorElem
     * ----------------------------------------------------------------------------
     * update the error element of this field to show the appropriate message
     */
    _updateErrorElem(err) {
        if (!this._elems.error) {
            return;
        }
        let msg = this._buildValidationErrorDisplay(err);
        this._elems.error.innerHTML = msg;
    }
    /**
     * _updateInputOnError
     * ----------------------------------------------------------------------------
     * update the input element when a validation attempt failed
     */
    _updateInputOnError() {
        if (!this._elems.input) {
            return;
        }
        let value;
        switch (this._config.validationType) {
            case _interfaces_1.ValidationType.CLEAR_ERROR_VALUE:
                value = this._config.defaultValue;
                break;
            case _interfaces_1.ValidationType.KEEP_ERROR_VALUE:
                value = this._elems.input.value;
                break;
            case _interfaces_1.ValidationType.NO_BLUR_PROCESSED:
                value = this._elems.input.value;
                window.setTimeout(() => { this._elems.input.focus(); }, 10);
                break;
            case _interfaces_1.ValidationType.RESTORE_OLD_VALUE:
                value = this._data;
                break;
            default:
                value = this._config.defaultValue;
                break;
        }
        this._elems.input.value = value;
    }
    /**
     * _buildValidationErrorDisplay
     * ----------------------------------------------------------------------------
     * generate the error message based on the error details returned by the
     * validation function
     */
    _buildValidationErrorDisplay(err) {
        if (!err) {
            return "Invalid data";
        }
        let msg;
        msg = err.title ? err.title + ": " : "Uh-oh: ";
        msg += err.details || (this._id + "'s data couldn't be saved");
        return msg;
    }
    /**
     * _clearErrors
     * ----------------------------------------------------------------------------
     * clear all of the errors
     *
     */
    _clearErrors() {
        if (this._elems.error) {
            this._elems.error.innerHTML = "";
        }
    }
    //#endregion
    //..........................................
    //..........................................
    //#region STANDARD ELEMENT CREATION
    /**
     * _createStandardInput
     *----------------------------------------------------------------------------
     *  create a standard input based on the form type
     */
    _createStandardInput() {
        let attr = {};
        if (this._config.useGhostText) {
            attr.placeholder = this._config.label;
        }
        this._elems.input = helpers_1.createInputElement(this._id + "|input", "input", _interfaces_1.FieldTypeEnum[this.type], this._data, attr);
    }
    /**
     * _createStandardLabel
     * ----------------------------------------------------------------------------
     *  create a standard label for the input
     */
    _createStandardLabel(embedIn) {
        let lbl = this._config.label;
        if (this._config.useGhostText) {
            lbl = "";
        }
        this._elems.lblContainer = toolkip_create_elements_1.createElement({
            cls: "labelContainer",
            parent: embedIn
        });
        this._elems.lbl = helpers_1.createLabelForInput(lbl, this._id, "lbl", this._elems.lblContainer);
        if (this._config.helpText) {
            this._elems.helpTextIcon = toolkip_create_elements_1.createElement({
                type: "span",
                cls: "helpTextIcon",
                content: "?",
                parent: this._elems.lblContainer
            });
            let tooltip = new toolkip_tooltip_1.Tooltip({ content: this._config.helpText }, this._elems.helpTextIcon);
        }
    }
    /**
     * _createStandardLabeledInput
     *----------------------------------------------------------------------------
     * create an input field with a label, based on the form type
     */
    _createStandardLabeledInput(shouldEmbed) {
        this._createStandardInput();
        this._createStandardLabel((shouldEmbed ? this._elems.input : null));
    }
    //#endregion
    //..........................................
    //..........................................
    //#region CLONE AN ELEMENT
    /**
     * _cloneFormElement
     * ----------------------------------------------------------------------------
     * wrapper around the cloning method so we don't run into protection issues
     */
    _cloneFormElement(elemToClone, appendToID) {
        if (!appendToID) {
            appendToID = "";
        }
        return elemToClone._createClonedElement(appendToID);
    }
    /**
     * _createClonedElement
     * ----------------------------------------------------------------------------
     * creates a new version of the same form element
     *
     * @param   appendToID  ID to add to the current elem ID when cloning (to
     *                      avoid id conflicts)
     *
     * @returns The cloned form element
     */
    _createClonedElement(appendToID) {
        return new this.constructor(this._id + appendToID, this._config);
    }
    //#endregion
    //..........................................
    //..........................................
    //#region GET ELEMENTS AFTER CREATION
    getField(id) {
        if (id === this._id) {
            return this;
        }
        return null;
    }
    //#endregion
    //..........................................
    //..........................................
    //#region HANDLE SHOWING OR HIDING THE FIELD
    /**
     * show
     * ----------------------------------------------------------------------------
     * ensure that this field is shown
     */
    show() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._isHidden) {
                return;
            }
            this._isHidden = false;
            toolkip_style_helpers_1.removeClass(this._elems.base, "hidden");
            yield toolkip_style_helpers_1.transition(this._elems.base, { height: "0" }, { height: "<height>" }, 200);
        });
    }
    /**
     * hide
     * ----------------------------------------------------------------------------
     * ensure that this field isn't shown
     */
    hide() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._isHidden) {
                return;
            }
            this._isHidden = true;
            yield toolkip_style_helpers_1.transition(this._elems.base, { maxHeight: "<height>", overflow: "hidden" }, { maxHeight: "0 !important", overflow: "hidden" }, 200);
            toolkip_style_helpers_1.addClass(this._elems.base, "hidden");
        });
    }
}
exports._Field = _Field;
//#endregion
//..........................................
//..........................................
//#region STYLES
/** placeholder for individual CSS styles */
_Field._uncoloredStyles = {
    ".kipFormElem, .kipFormElem input, .kipFormElem select, .kipFormElem textarea": {
        fontSize: "1em",
        width: "100%",
        boxSizing: "border-box",
        fontFamily: "Segoe UI, Open Sans, Helvetica",
    },
    ".kipFormElem": {
        marginTop: "10px",
        position: "relative"
    },
    ".kipFormElem.hidden": {
        display: "none"
        // TODO: allow for transitions
    },
    ".kipFormElem input, .kipFormElem textarea, .kipFormElem select": {
        border: "1px solid #CCC",
        borderRadius: "3px"
    },
    ".kipFormElem textarea": {
        minHeight: "100px",
        maxWidth: "100%"
    },
    ".kipFormElem .labelContainer": {
        display: "flex",
        alignItems: "center"
    },
    ".kipFormElem .helpTextIcon": {
        width: "19px",
        height: "19px",
        boxSizing: "border-box",
        paddingTop: "4px",
        backgroundColor: "<formSubTheme>",
        color: "#FFF",
        borderRadius: "50%",
        fontSize: "0.8em",
        textAlign: "center",
        fontFamily: "SpecialElite",
        cursor: "pointer",
        nested: {
            "&:hover": {
                transform: "scale(1.1)"
            }
        }
    },
    ".kipFormElem .lbl": {
        fontSize: "0.9em",
        color: "#666",
        width: "100%",
        boxSizing: "border-box"
    },
    ".kipFormElem.required .lbl": {},
    ".kipFormElem.required .lbl:after": {
        content: '"*"',
        color: "<formSubTheme>",
        fontWeight: "bold",
        position: "absolute",
        marginLeft: "2px"
    },
    ".kipFormElem .error": {
        color: "#C30",
        fontSize: "0.7em",
        fontStyle: "italic"
    },
    ".kipFormElem.flex": {
        display: "flex",
        alignItems: "center",
        nested: {
            "> div:not(.error), > label, > span, > input": {
                width: "auto",
                marginRight: "10px"
            }
        }
    },
    ".kipFormElem.multiline": {
        nested: {
            "input, textarea, select": {
                marginTop: "5px"
            }
        }
    }
};
