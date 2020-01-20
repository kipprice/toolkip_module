import { Popup } from "./popup";
import { IYesNoCallback, YesNoEnum } from "./_interfaces";
import { IElemDefinition } from "../htmlHelpers/_interfaces";
export declare class YesNoPopup extends Popup {
    /** handle a callback when the user makes a selection */
    protected _onSelection: IYesNoCallback;
    /**
     * Creates a YesNoPopup
     * @param   prompt  What to ask the user
     * @param   obj
     *
     */
    constructor(prompt: string, onSelection: IYesNoCallback, obj?: IElemDefinition);
    /**
     * _createButtons
     *
     * Create the yes/no buttons for the popup
     *
     */
    protected _createButtons(): void;
    /**
     * _createButton
     *
     * Create a button in the yes / no form
     *
     */
    protected _createButton(label: string, value: YesNoEnum): void;
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
export declare function showYesNoForm(prompt: string, onSelect: IYesNoCallback): void;
