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
const toolkip_object_helpers_1 = require("@kipprice/toolkip-object-helpers");
const toolkip_create_elements_1 = require("@kipprice/toolkip-create-elements");
const eventHandler_1 = require("../eventHandler");
const toolkip_style_helpers_1 = require("@kipprice/toolkip-style-helpers");
const toolkip_popups_1 = require("@kipprice/toolkip-popups");
const toolkip_drawable_1 = require("@kipprice/toolkip-drawable");
const sectionField_1 = require("../complexFields/sectionField");
const objectHelpers_1 = require("../../../objectHelpers");
class _Form extends toolkip_drawable_1._Drawable {
    //#endregion
    //.....................
    //..........................................
    //#region INITIALIZATION
    constructor(opts, children) {
        super();
        //#endregion
        //..................
        //...................
        //#region DELEGATES
        /** handle when the user saves the form */
        this._onSave = [];
        /** handle when the user chooses to cancel */
        this._onCancel = [];
        this._hasChanges = false;
        this._canSaveTracker = { hasMissingRequired: false, hasErrors: false };
        this._config = opts || {};
        this._addClassName("Form");
        this._placeholderValues = toolkip_object_helpers_1.combineObjects({ formBackgroundTheme: "#FFF", formTheme: "#EFC500", formSubTheme: "#444" }, this._config.colors || {});
        this._applyThemes();
        this._createElements(children);
    }
    registerSaveHandler(f) { this._onSave.push(f); }
    _notifySave(data) {
        if (!this._onSave) {
            return;
        }
        for (let d of this._onSave) {
            d(data);
        }
    }
    registerCancelHandler(f) { this._onCancel.push(f); }
    _notifyCancel(hasChanges) {
        if (!this._onCancel) {
            return;
        }
        for (let d of this._onCancel) {
            d(hasChanges);
        }
    }
    _shouldSkipCreateElements() { return true; }
    //#endregion
    //..........................................
    //..........................................
    //#region CREATE ELEMENTS
    _createElements(elems) {
        this._elems = {};
        this._createBase();
        this._createPreForm();
        this._createFormContainer();
        this._createCoreSection(elems);
        this._createPostForm();
    }
    /**
     * _createBase
     * ----------------------------------------------------------------------------
     * generate a base of the form
     */
    _createBase() {
        let cls = "kipForm";
        if (this._config.cls) {
            cls += " " + this._config.cls;
        }
        this._elems.base = toolkip_create_elements_1.createElement({
            cls: cls,
            type: "form",
            id: this._config.id
        });
        return this._elems.base;
    }
    /**
     * _createCoreElem
     * ----------------------------------------------------------------------------
     * create the core section that will display all of our data
     *
     * @param   options     the options that are passed in for the general form
     * @param   elems       Elements associated with this form
     *
     */
    _createCoreSection(elems) {
        // create the template that will render the section
        let template = {
            label: this._config.label,
            cls: this._config.cls,
            layout: this._config.layout,
            hideTitle: this._config.hideTitle,
            uncollapsible: !this._config.hideTitle
        };
        // create the core section
        this._elems.coreSection = new sectionField_1.SectionField(this._id, template, elems);
        this._applyThemes();
        this._addEventHandlers();
        // add the section to the overall form UI
        this._elems.coreSection.draw(this._elems.formContainer);
    }
    /**
     * _createPreForm
     * ----------------------------------------------------------------------------
     * handle generating the aspects of the form that are rendered before the
     * content. Overridable by child classes
     */
    _createPreForm() {
        this._elems.background = toolkip_create_elements_1.createElement({
            cls: "background",
            parent: this._elems.base
        });
        return this._elems.background;
    }
    /**
     * _createFormContainer
     * ----------------------------------------------------------------------------
     * generate the element that will actually encompass the form. Overridable by
     * child classes
     */
    _createFormContainer() {
        this._elems.formContainer = toolkip_create_elements_1.createElement({
            cls: "formContent",
            parent: this._elems.background
        });
        return this._elems.formContainer;
    }
    /**
     * _createPostForm
     * ----------------------------------------------------------------------------
     * generate any elements that will appear after the core section of the form.
     * Overridable by child classes
     */
    _createPostForm() {
        let btns = [
            {
                display: "Save",
                callback: () => this.trySave(),
                cls: "save primary",
                key: "saveButton"
            },
            {
                display: "Cancel",
                callback: () => { this.tryCancel(); },
                cls: "cancel tertiary"
            }
        ];
        if (this._config.addlButtons) {
            btns.splice(1, 0, ...this._config.addlButtons);
        }
        return this._createButtons(btns);
    }
    /**
     * _createButtons
     * ----------------------------------------------------------------------------
     * generate the buttons that should be visible in this form
     */
    _createButtons(btns) {
        let children = [];
        for (let b of btns) {
            if (!b) {
                continue;
            }
            children.push(this._createButton(b));
        }
        return toolkip_create_elements_1.createElement({
            cls: "kipBtns",
            parent: this._elems.background,
            children: children
        });
    }
    /**
     * _createButton
     * ----------------------------------------------------------------------------
     * generate a specific button with the provided definition
     */
    _createButton(btn) {
        return toolkip_create_elements_1.createElement({
            key: btn.key || "",
            type: "button",
            cls: "kipBtn " + (btn.cls ? btn.cls : " secondary"),
            content: btn.display,
            eventListeners: {
                click: (e) => {
                    btn.callback();
                    e.preventDefault();
                }
            }
        }, this._elems);
    }
    _addEventHandlers() {
        // add the event listener to the section changing
        eventHandler_1.formEventHandler.addEventListener(eventHandler_1.FORM_ELEM_CHANGE, {
            func: (event) => this._handleFormChange(event),
            uniqueId: this._id + "|form"
        });
        // handle when the form becomes savable or non-savable
        eventHandler_1.formEventHandler.addEventListener(eventHandler_1.FORM_SAVABLE_CHANGE, {
            func: (event) => this._handleSavabilityChange(event)
        });
    }
    //#endregion
    //..........................................
    //..........................................
    //#region CHANGE HANDLING
    _handleFormChange(event) {
        // listen only at the global level to this event
        let key = event.context.key;
        if (key !== this._id) {
            return;
        }
        // call into the child handling once it's determined we
        // care about this particular event
        this._onFormChange(event);
    }
    _onFormChange(event) {
        if (!this._isFormChangeForMe(event)) {
            return;
        }
        this._hasChanges = true;
    }
    _isFormChangeForMe(event) {
        let key = event.context.key;
        if (key !== this._id) {
            return false;
        }
        return true;
    }
    //#endregion
    //..........................................
    //..........................................
    //#region SAVABILITY CHANGE
    _handleSavabilityChange(event) {
        if (!this._elems.saveButton) {
            return;
        }
        let canSave = this.canSave();
        if (!canSave) {
            this._disableSave();
        }
        else {
            this._enableSave();
        }
    }
    _disableSave() {
        this._elems.saveButton.title = this._getCannotSaveMessage();
        this._elems.saveButton.setAttribute("disabled", "true");
        toolkip_style_helpers_1.addClass(this._elems.saveButton, "disabled");
    }
    _enableSave() {
        this._elems.saveButton.title = "";
        this._elems.saveButton.removeAttribute("disabled");
        toolkip_style_helpers_1.removeClass(this._elems.saveButton, "disabled");
    }
    //#endregion
    //..........................................
    //..........................................
    //#region HANDLE SAVING
    /**
     * getData
     * ----------------------------------------------------------------------------
     * ensure that we are retrieving the data within the form without actually
     * running the save handlers
     */
    getData() {
        return __awaiter(this, void 0, void 0, function* () {
            return this._elems.coreSection.save(true);
        });
    }
    /**
     * _save
     * ---------------------------------------------------------------------------
     * Saves data in the form
     *
     * @returns A promise that will retrieve the data contained in the form
     */
    _save() {
        return __awaiter(this, void 0, void 0, function* () {
            let data = yield this._elems.coreSection.save();
            // Alert any listeners of this particular form that 
            // the data has been updated
            this._notifySave(data);
            this._hasChanges = false;
            return data;
        });
    }
    /**
     * trySave
     * ---------------------------------------------------------------------------
     * Attempt to save the form
     */
    trySave() {
        return __awaiter(this, void 0, void 0, function* () {
            // handle if we can't save
            if (!this.canSave()) {
                this._showCannotSaveMessage();
                return null;
                // otherwise, retrieve the save data from the
                // core element
            }
            else {
                return yield this._save();
            }
        });
    }
    /**
     * _canSave
     * ---------------------------------------------------------------------------
     * Check with our elements that we are able to save
     */
    canSave() {
        this._canSaveTracker = this._elems.coreSection.canSave();
        if (this._canSaveTracker.hasErrors) {
            return false;
        }
        if (this._canSaveTracker.hasMissingRequired) {
            return false;
        }
        return true;
    }
    /**
     * _showCannotSaveMessage
     * ----------------------------------------------------------------------------
     * Show popup indicating why we couldn't save this form
     */
    _showCannotSaveMessage() {
        let msg = this._getCannotSaveMessage();
        if (!msg) {
            return;
        }
        let popup = new toolkip_popups_1.ErrorPopup(msg, "Couldn't Save");
        popup.replacePlaceholder("btnBackground", this._placeholderValues.formTheme);
        popup.draw(document.body);
    }
    /**
     * _getCannotSaveMessage
     * ----------------------------------------------------------------------------
     * Determine what message to show as to why the form cannot be saved
     */
    _getCannotSaveMessage() {
        let msg = "";
        if (this._canSaveTracker.hasErrors && this._canSaveTracker.hasMissingRequired) {
            msg = "This form has missing data and errors; correct errors and fill in all required fields before saving.";
        }
        else if (this._canSaveTracker.hasErrors) {
            msg = "There are some errors in your form; correct them before saving.";
        }
        else if (this._canSaveTracker.hasMissingRequired) {
            msg = "There are some fields with missing data; fill them in before saving.";
        }
        return msg;
    }
    //#endregion
    //..........................................
    //..........................................
    //#region HANDLE CANCELING
    /**
     * _cancelConfirmation
     * ----------------------------------------------------------------------------
     * Handle informing the user that they have unsaved changes before cancelling
     */
    _cancelConfirmation() {
        if (this._hasChanges) {
            let popup = new toolkip_popups_1.YesNoPopup("You have unsaved changes. Are you sure you want to cancel?", (response) => {
                if (response === toolkip_popups_1.YesNoEnum.YES) {
                    this._cancel();
                }
            });
            popup.replacePlaceholder("btnBackground", this._placeholderValues.formTheme);
            popup.draw(document.body);
        }
        else {
            this._cancel();
        }
    }
    /**
     * _cancel
     * ----------------------------------------------------------------------------
     * Cancel the form and any changes within it\
     */
    _cancel() {
        this.clear();
        this._notifyCancel(this._hasChanges);
        this._hasChanges = false;
    }
    /**
     * tryCancel
     * ----------------------------------------------------------------------------
     * Public call to attempt to cancel all data within a form; prompts the user to
     * verify cancelling if there are any unsaved elements unless otherwise
     * specified.
     *
     * @param   ignoreUnsavedChanges    If true, doesn't prompt the user to confirm
     *                                  that unsaved aspects won't be saved
     *
     * @returns True if the form was successfully canceled
     */
    tryCancel(ignoreUnsavedChanges) {
        if (!this._hasChanges || ignoreUnsavedChanges) {
            this._cancel();
            return true;
        }
        else {
            // show the popup
            this._cancelConfirmation();
            // tell the caller that they should wait for the cancel listener
            return false;
        }
    }
    //#endregion
    //..........................................
    //..........................................
    //#region CLEARING AND UPDATING DATA
    /**
     * clear
     * ----------------------------------------------------------------------------
     * clears all data out of the form
     */
    clear() {
        this._elems.coreSection.clear();
    }
    /**
     * update
     * ----------------------------------------------------------------------------
     * update the data in the form to match a particular data set
     *
     * @param   model           The data to update the form with
     * @param   allowEvents     If true, also fires change events as a result of
     *                          the update
     */
    update(model, allowEvents) {
        this._elems.coreSection.update(model, allowEvents);
        this._hasChanges = false;
    }
    //#endregion
    //..........................................
    //........................
    //#region TRACK CHANGES
    /* TODO: actually implement change control
    */
    undo() {
        // TODO
    }
    redo() {
    }
    _trackChanges() {
        // TODO
    }
    //#endregion
    //........................
    //..........................................
    //#region USABILITY
    /**
    * focus
    * ----------------------------------------------------------------------------
    * Gives focus to the first element that can take focus
    */
    focus() {
        this._elems.coreSection.focus();
    }
    //#endregion
    //..........................................
    //.................................
    //#region CHANGE THE FORM DISPLAY
    /**
     * addFormElement
     * ----------------------------------------------------------------------------
     * Adds a form element to our form after it's been initialized
     */
    addFormElement(key, formElem) {
        return this._elems.coreSection.addChildElement(key, formElem);
    }
    getField(id) {
        return this._elems.coreSection.getField(id);
    }
    //#endregion
    //.................................
    //..........................................
    //#region THEMING
    _applyThemes(target) {
        if (!target) {
            target = this;
        }
        objectHelpers_1.map(this._placeholderValues, (pVal, pName) => {
            target.replacePlaceholder(pName, pVal);
        });
    }
    replacePlaceholder(pName, pVal, force) {
        super.replacePlaceholder(pName, pVal, force);
        this._elems.coreSection.replacePlaceholder(pName, pVal, force);
    }
    overridePlaceholder(pName, pVal) {
        super.overridePlaceholder(pName, pVal);
        this._elems.coreSection.overridePlaceholder(pName, pVal);
    }
}
exports._Form = _Form;
//..................
//#region STYLES
_Form._uncoloredStyles = {
    ".kipForm": {
        fontFamily: "Open Sans,Segoe UI Light,Helvetica",
        fontSize: "1em",
        boxSizing: "border-box",
        fontWeight: "100",
        nested: {
            ".background": {
                display: "flex",
                flexDirection: "column"
            },
            ".formContent": {
                flexShrink: "1",
                flexGrow: "1",
                position: "relative",
                padding: "5px",
                overflowY: "auto",
            },
            ".kipBtn": {
                cursor: "pointer",
                opacity: "0.7",
                transition: "all ease-in-out .1s",
                fontFamily: "Open Sans,Segoe UI Light,Helvetica",
                fontSize: "1em",
                nested: {
                    "&:hover:not(.disabled)": {
                        opacity: "1"
                    },
                    "&.disabled": {
                        cursor: "not-allowed",
                        opacity: "0.4"
                    }
                }
            },
            ".kipBtns": {
                display: "flex",
                flexDirection: "row-reverse",
                nested: {
                    ".kipBtn": {
                        padding: "3px 15px",
                        margin: "5px",
                        borderRadius: "3px",
                        nested: {
                            "&.primary": {
                                backgroundColor: "<formTheme>",
                                color: "#FFF"
                            },
                            "&.secondary": {
                                border: "1px solid <formTheme>",
                                color: "<formTheme>"
                            },
                            "&.tertiary": {
                                border: "1px solid <formSubTheme>",
                                color: "<formSubTheme>"
                            }
                        }
                    }
                }
            },
            "button": {
                backgroundColor: "transparent",
                border: "none"
            }
        }
    }
};
