import { Drawable } from '../drawable/drawable';
import { Collection } from '../dataStructures/collection/collection';
import { IStandardStyles } from '../styleHelpers/_interfaces';
import { IContextMenuThemeColors, IOption } from './_interfaces';
/**----------------------------------------------------------------------------
 * @class ContextMenu
 * ----------------------------------------------------------------------------
 * creates a custom context menu
 * @author	Kip Price
 * @version 1.0
 * ----------------------------------------------------------------------------
 */
export declare class ContextMenu extends Drawable {
    /** The menu that is being shown */
    protected static _showingMenu: ContextMenu;
    /** True if we already added window listeners */
    protected static _windowListenersAdded: boolean;
    /** adds a target to this instance of the context menu */
    protected _target: HTMLElement;
    /** The collection of options available in our context menu */
    protected _options: Collection<IOption>;
    /** true if we should not create our standard styles */
    protected _noStyles: boolean;
    /** The elements we need for the option menu */
    protected _elems: {
        base: HTMLElement;
        option_container?: HTMLElement;
    };
    /** public accessible function for the base element */
    get base(): HTMLElement;
    /** collection of theme colors for the context menu */
    protected _colors: IContextMenuThemeColors;
    /** the styles to use for the standard context menu */
    protected static _uncoloredStyles: IStandardStyles;
    /**
     * Creates a custom context (right-click) menu for a given element
     * @param 	target    	The element to create the custom menu for
     * @param 	noStyles	True if we shouldn't create css classes for the standard menu styles
     * @param	colors		Optional set of theme colors to use for the menu
     *
     */
    constructor(target: HTMLElement, noStyles?: boolean, colors?: IContextMenuThemeColors);
    /**
     * addOption
     *
     * adds an option to our context menu
     *
     * @param	opt			The option to add
     * @param	subOptions	Any nested options to include
     * @param	parent		What the parent element should be (defaults to option container)
     *
     * @returns	True if the option could be added
     *
     */
    addOption(opt: IOption, subOptions?: IOption[], parent?: HTMLElement): boolean;
    /**
     * addSubOption
     *
     * Adds a nested option to our context menu
     *
     * @param 	srcOption	The option we are nesting under
     * @param 	subOption 	The sub option we are currently adding
     *
     * @returns	True if the suboption was added
     *
     */
    addSubOption(srcOption: IOption, subOption: IOption): boolean;
    /**
     * _buildSubMenu
     *
     * creates a sub menu
     * @param	srcOption	The option to nest under
     *
     */
    private _buildSubMenu;
    /**
     * _getOption
     *
     * grabs a particular option from our menu
     *
     * @param	lbl		The label of the option we are grabbing
     *
     * @returns	The option with this label
     *
     */
    private _getOption;
    /**
     * removeOption
     *
     * removes an option from our menu
     *
     * @param	lbl		The label of the option being removed
     *
     * @returns	True if the option was removed
     *
     */
    removeOption(lbl: string): boolean;
    /**
     * clearOptions
     *
     * Removes all of our options
     *
     */
    clearOptions(): void;
    /**
     * _addEventListeners
     *
     * Adds event listeners to the relevant pieces to show and/or hide the context menu
     *
     */
    private _addEventListeners;
    /**
     * _createElements
     *
     * Creates the basic elements of the context menu & optionally adds the
     * standard classes
     *
     */
    protected _createElements(): void;
    /**
     * _setThemeColors
     *
     * Sets the theme colors for the context menu
     *
     */
    protected _setThemeColors(): void;
    /**
     * _hideExistingMenu
     *
     * Hides whatever context menu is currently showing
     *
     */
    private _hideExistingMenu;
}
