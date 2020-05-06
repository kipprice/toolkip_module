"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const popup_1 = require("./popup");
const _interfaces_1 = require("./_interfaces");
class YesNoPopup extends popup_1.Popup {
    /**
     * Creates a YesNoPopup
     * @param   prompt  What to ask the user
     *
     */
    constructor(prompt, onSelection) {
        super();
        this._onSelection = onSelection;
        this.addContent("", "", prompt);
        this._createButtons();
    }
    /**
     * _createButtons
     * ----------------------------------------------------------------------------
     * Create the yes/no buttons for the popup
     *
     */
    _createButtons() {
        this._createButton("Yes", _interfaces_1.YesNoEnum.YES);
        this._createButton("No", _interfaces_1.YesNoEnum.NO);
    }
    /**
     * _createButton
     * ----------------------------------------------------------------------------
     * Create a button in the yes / no form
     */
    _createButton(label, value) {
        let callback = () => {
            if (!this._onSelection) {
                return;
            }
            this._onSelection(value);
            this.erase();
        };
        this.addButton(label, callback);
    }
}
exports.YesNoPopup = YesNoPopup;
/**
 * showYesNoForm
 * ----------------------------------------------------------------------------
 * Show a particular yes - no prompt
 *
 * @param   prompt  The text to display for the form
 *
 * @returns The selection made by the user
 *
 */
function showYesNoForm(prompt, onSelect) {
    let form = new YesNoPopup(prompt, onSelect);
    form.draw(document.body);
}
exports.showYesNoForm = showYesNoForm;
