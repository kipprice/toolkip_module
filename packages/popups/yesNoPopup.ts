import { Popup } from "./popup";
import { IYesNoCallback, YesNoEnum } from "./_interfaces";


export class YesNoPopup extends Popup {

    /** handle a callback when the user makes a selection */
    protected _onSelection: IYesNoCallback;

    /**
     * Creates a YesNoPopup
     * @param   prompt  What to ask the user
     * 
     */
    constructor(prompt: string, onSelection: IYesNoCallback) {
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
    protected _createButtons(): void {
        this._createButton("Yes", YesNoEnum.YES);
        this._createButton("No", YesNoEnum.NO);
    }

    /**
     * _createButton
     * ----------------------------------------------------------------------------
     * Create a button in the yes / no form
     */
    protected _createButton(label: string, value: YesNoEnum): void {

        let callback: Function = () => {
            if (!this._onSelection) { return; }
            this._onSelection(value);
            this.erase();
        }

        this.addButton(label, callback);
    }
}

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
export function showYesNoForm(prompt: string, onSelect: IYesNoCallback): void {
    let form: YesNoPopup = new YesNoPopup(prompt, onSelect);
    form.draw(document.body);
} 
