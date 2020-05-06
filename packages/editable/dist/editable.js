"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toolkip_style_helpers_1 = require("@kipprice/toolkip-style-helpers");
const toolkip_html_helpers_1 = require("@kipprice/toolkip-html-helpers");
const toolkip_bound_views_1 = require("@kipprice/toolkip-bound-views");
const toolkip_async_1 = require("@kipprice/toolkip-async");
/**---------------------------------------------------------------------------
 * @class	Editable<T>
 * ---------------------------------------------------------------------------
 * Drawable element that also allows for editing inline
 * @author	Kip Price
 * @version	1.4.0
 * ---------------------------------------------------------------------------
 */
class Editable extends toolkip_bound_views_1._BoundView {
    //#endregion
    //..........................................
    //.................................
    //#region INITIALIZE OUR EDITABLE
    /**
     * Editable
     * ----------------------------------------------------------------------------
     * Creates an Editable object
     * @param	options		Any options needed to configure the editable
     *
     */
    constructor(options) {
        // initialize options if they weren't passed in
        if (!options) {
            options = {};
        }
        // Call the Drawable constructor
        super();
        this._addClassName("Editable");
        this.replacePlaceholder("editableLightBG", options.lightBg || "rgba(0,0,0,.2)");
        // Store details about the options
        this._addProperties(options);
        this._addHandlers(options);
        // set our top level properties
        this._model = options.defaultValue || null;
        this._isModifying = false;
        this._createElements();
    }
    //.....................
    //#region PROPERTIES
    /** use value syntax as wrapper for model */
    get value() { return this.model; }
    set value(val) { this.model = val; }
    set onUpdate(f) { this._onUpdate = f; }
    _notifyUpdate(newValue) {
        if (!this._onUpdate) {
            return;
        }
        this._onUpdate(newValue);
    }
    /**
     * _addProperties
     * ----------------------------------------------------------------------------
     * add the properties that are relevant to the editable
     */
    _addProperties(options) {
        this._options = {
            inputType: options.inputType,
            defaultValue: options.defaultValue,
            isMultiline: options.isMultiline,
            lightBg: options.lightBg
        };
    }
    /**
     * _addHandlers
     * ----------------------------------------------------------------------------
     * Adds all handlers specified by the user
     * @param 	options		Options specified by the user
     *
     */
    _addHandlers(options) {
        this._handlers = {
            onValidate: options.onValidate,
            onFormat: options.onFormat,
            onParseContent: options.onParseContent
        };
        // TODO: clean this up
        if (options.onUpdate) {
            this.onUpdate = options.onUpdate;
        }
    }
    /**
     * _format
     * ----------------------------------------------------------------------------
     * handle rendering the value as a string
     */
    _format(value, forEdit) {
        // use the user-specified function if available
        if (this._handlers.onFormat) {
            return this._handlers.onFormat(value, forEdit);
        }
        // otherwise, fall back to the default
        if (!value) {
            value = this._options.defaultValue;
        }
        if (!value) {
            return "";
        }
        return value.toString();
    }
    /**
     * _parse
     * ----------------------------------------------------------------------------
     * handle converting the string version into a value
     */
    _parse(value) {
        if (this._handlers.onParseContent) {
            return this._handlers.onParseContent(value);
        }
        return value;
    }
    /**
     * _validate
     * ----------------------------------------------------------------------------
     * validate whether the current data in the input field is valid
     * @param	content		Content to validate
     * @returns	Result of the validation
     */
    _validate(value) {
        if (this._handlers.onValidate) {
            return this._handlers.onValidate(value);
        }
        return { passed: true };
    }
    /**
     * _shouldSkipCreateElements
     * ---------------------------------------------------------------------------
     * If true, doesn't run the element creation until manually called
     * @returns	True
     */
    _shouldSkipCreateElements() { return true; }
    //#endregion
    //.................................
    //....................................
    //#region CREATE ELEMENTS & LISTENERS
    /**
     * _createElements
     * ---------------------------------------------------------------------------
     * Create elements for the editable
     */
    _createElements() {
        this._createBase({
            key: "base",
            cls: "editable" + (this._options.isMultiline ? " multiline" : ""),
            children: [
                { key: "display", cls: "display unselectable", focusable: true },
                { key: "label", type: "input", cls: "input hidden", attr: { type: this._options.inputType } },
            ]
        });
        this._renderDisplayView();
        this._addListeners();
    }
    /**
     * _addListeners
     * ----------------------------------------------------------------------------
     * Add event listeners to the editable
     */
    _addListeners() {
        // Click event on our base element
        this._elems.display.addEventListener("click", (e) => { this._handleFocusEvent(e); });
        this._elems.display.addEventListener("focus", (e) => { this._handleFocusEvent(e); });
        // Enter key recognition on our input element
        this._elems.input.addEventListener("keypress", (ev) => {
            if (ev.keyCode === 13) {
                if (this._isModifying && !ev.shiftKey) {
                    this._save();
                    ev.preventDefault();
                    // don't process enter key except for multi line elements with shift key
                }
                else if (!this._options.isMultiline || !ev.shiftKey) {
                    ev.stopPropagation();
                    ev.preventDefault();
                }
            }
        });
        // Blur recognition on our input element
        this._elems.input.addEventListener("blur", () => {
            if (this._isModifying) {
                this._save();
            }
        });
    }
    _handleFocusEvent(e) {
        if (!this._isModifying) {
            this.modify();
        }
    }
    //#endregion
    //....................................
    //.......................................
    //#region HANDLE CHANGES TO THE ELEMENT
    /**
     * _save
     * ----------------------------------------------------------------------------
     * Save the contents of the Editable
     *
     * @returns True if the editable was successfully saved
     */
    _save() {
        let validated;
        let content = this._elems.input.value;
        validated = this._validate(content);
        // Update UI / saved data based on whether validation passed
        if (!validated.passed) {
            return this._onValidationFailed(validated.allowLeave);
        }
        else {
            return this._onValidationPassed(content);
        }
    }
    //#endregion
    //.......................................
    //.............................................
    //#region VALIDATE USER INPUT IN THE ELEMENT
    /**
     * _onValidationFailed
     * ----------------------------------------------------------------------------
     * validation failing for this element
     * @param	allowLeave	True if the user should be able to navigate away
     * @returns	false
     */
    _onValidationFailed(allowLeave) {
        // Add the error class
        toolkip_style_helpers_1.addClass(this._elems.input, "error");
        // If we won't allow the user to leave, don't
        if (!allowLeave) {
            toolkip_html_helpers_1.select(this._elems.input);
            this._elems.input.focus();
        }
        return false;
    }
    /**
     * _onValidationPassed
     * ----------------------------------------------------------------------------
     * handle validation passing for this element
     * @param	content		Content to set for the editable
     * @returns	True
     */
    _onValidationPassed(content) {
        // Remove any error hiliting if we did it
        toolkip_style_helpers_1.removeClass(this._elems.input, "error");
        // Resave our value through our unformat function
        this._model = this._parse(content);
        // Call our update function in order to notify our parent
        if (this.onUpdate) {
            this.onUpdate(this.value);
        }
        // swap the UI back to the display version
        this._hideElement(this._elems.input);
        this._showElement(this._elems.display);
        // remove our modifying flag
        this._isModifying = false;
        // update content of the display element
        this._renderDisplayView();
        return true;
    }
    //#endregion
    //.............................................
    //..........................................
    //#region ENABLE THE ELEMENT FOR EDITING
    /**
     * modify
     * ----------------------------------------------------------------------------
     * Modifies the Editable element
     * @returns True if we were able to start modifying the element
     */
    modify() {
        // Don't start modifying again if we are already modifying
        if (this._isModifying) {
            return false;
        }
        // Set our property to true
        this._isModifying = true;
        // Grab the appropriately formatted string for this element
        this._elems.input.value = this._format(this.value, true);
        // get the appropriate size for the element
        let size = this._elems.display.offsetWidth;
        this._elems.input.style.width = (size - 6) + "px";
        // Update the HTML to have an editable field
        this._hideElement(this._elems.display);
        this._showElement(this._elems.input);
        // Select our input
        toolkip_async_1.wait(100).then(() => toolkip_html_helpers_1.select(this._elems.input));
        this._elems.input.focus();
        return true;
    }
    //#endregion
    //..........................................
    focus() {
        this._handleFocusEvent();
    }
    _hideElement(elem) {
        toolkip_style_helpers_1.addClass(elem, "hidden");
    }
    _showElement(elem) {
        toolkip_style_helpers_1.removeClass(elem, "hidden");
    }
    /**
     * _renderDisplayView
     * ----------------------------------------------------------------------------
     * Overridable function that creates the display-version of the editable
     */
    _renderDisplayView() {
        this._elems.display.innerHTML = this._format(this._model);
    }
}
exports.Editable = Editable;
//#endregion
//..........................................
//..........................................
//#region STYLES
/** styles to use for standard Editables */
Editable._uncoloredStyles = {
    ".unselectable": {
        userSelect: "none",
        mozUserSelect: "none",
        webkitUserSelect: "none",
        khtmlUserSelect: "none",
        oUserSelect: "none"
    },
    ".editable": {
        fontFamily: "Open Sans, Segoe UI, Helvetica",
        fontSize: "1em",
        cursor: "pointer",
        nested: {
            "input": {
                fontFamily: "Open Sans, Segoe UI, Helvetica",
                fontSize: "1em",
                backgroundColor: "<editableLightBG>",
                border: "2px solid #AAA",
                minWidth: "150px",
                whiteSpace: "nowrap",
                nested: {
                    "&:focus": {
                        border: "2px dotted rgba(0,0,0,.4)",
                        outline: "none"
                    },
                    "&.error": {
                        borderColor: "#C30"
                    }
                }
            },
            "&.multiline .input": {
                whiteSpace: "auto"
            },
            ".display": {
                border: "2px solid transparent",
                nested: {
                    "&:hover": {
                        backgroundColor: "<editableLightBG>",
                    }
                }
            },
            ".hidden": {
                display: "none"
            }
        }
    }
};
;
