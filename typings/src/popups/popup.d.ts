import { Drawable } from "../drawable/drawable";
import { PopupElements, PopupColor, IPopupDefinition } from "./_interfaces";
import { IClasses, IElemDefinition } from "../htmlHelpers/_interfaces";
import { IStandardStyles } from "../styleHelpers/_interfaces";
/**----------------------------------------------------------------------------
 * @class Popup
 * ----------------------------------------------------------------------------
 * Generic class to show data in a popup form
 * @author	Kip Price
 * @version 1.0.2
 * ----------------------------------------------------------------------------
 */
export declare class Popup extends Drawable {
    /** elements contained within the popup */
    protected _elems: PopupElements;
    /** styles to render the popup with */
    protected static _uncoloredStyles: IStandardStyles;
    setThemeColor(colorId: PopupColor, color: string, noReplace?: boolean): void;
    /**
     * Popup
     * ----------------------------------------------------------------------------
     * Creates a new popup form
     * @param 	obj 	If included, contains info on how to create this popup
     */
    constructor(obj?: IPopupDefinition);
    /**
     * _createElements
     * ----------------------------------------------------------------------------
     * Creates all of the elements needed for this popup
     */
    protected _createElements(): void;
    /**
     * _createOverlay
     * ----------------------------------------------------------------------------
     * Creates the overlay for the popup to shield the rest of the page
     */
    private _createOverlay;
    /**
     * _createFrame
     * ----------------------------------------------------------------------------
     * Create the frame of the popup
     */
    private _createFrame;
    /**
     * _createTitle
     * ----------------------------------------------------------------------------
     * Create the title of the popup
     */
    private _createTitle;
    /**
     * _createCloseButton
     * ----------------------------------------------------------------------------
     * Create the close button for the form
     */
    private _createCloseButton;
    /**
     * _createContentElement
     * ----------------------------------------------------------------------------
     * Create the element taht will hold all content for the popup
     */
    private _createContentElement;
    /**
     * _createButtonContainer
     * ----------------------------------------------------------------------------
     * Create the container that will hold buttons
     */
    private _createButtonContainer;
    /**
     * setTitle
     * ----------------------------------------------------------------------------
     * Sets the title for the popup
     * @param 	title	What to set as the title
     */
    setTitle(title: string): void;
    /**
     * addContent
     * ----------------------------------------------------------------------------
     * Allows the caller to add a Drawable to the popup
     * @param 	drawable 	The drawable element to add
     */
    addContent(drawable: Drawable): void;
    /**
     * addContent
     * ----------------------------------------------------------------------------
     * Allows the caller to add an HTMLElement to the popup
     * @param	elem	The HTMLElement to add
     */
    addContent(elem: HTMLElement): void;
    /**
     * addContent
     * ----------------------------------------------------------------------------
     * Allows the caller to pass basic info to the popup so that
     * createSimpleElement can be called
     * @param	id		ID of the element to be created
     * @param	cls		Class of the element to be created
     * @param	content	What content the element should contain
     */
    addContent(id?: string, cls?: string | IClasses, content?: string): void;
    /**
     * addContent
     * ----------------------------------------------------------------------------
     * Allows the caller to add detailed info to the popup so that createElement
     * can be called
     * @param	obj		The object containing data on how to create the element
     */
    addContent(obj: IElemDefinition): void;
    /**
     * clearContent
     * ----------------------------------------------------------------------------
     * Clears all content out of the form
     */
    clearContent(): void;
    /**
     * addButton
     * ----------------------------------------------------------------------------
     * Adds a button to the popup
     * @param 	label 		The label to use for the button
     * @param 	callback 	What to do when the button is clicked
     */
    addButton(label: string, callback: Function): void;
}
