import { _Drawable } from '@toolkip/drawable';
import { Collection } from '@toolkip/data-structures';
import { IStandardStyles } from '@toolkip/style-helpers';
import { 
		ContextMenuThemeColors,
		IOption,
		IOptionDrawable,
		ContextMenuOptions
	} from './_interfaces';
import { map } from '@toolkip/object-helpers';
import { ContextMenuOption } from './contextMenuOption';

/**----------------------------------------------------------------------------
 * @class ContextMenu
 * ----------------------------------------------------------------------------
 * creates a custom context menu 
 * @author	Kip Price
 * @version 1.0
 * ----------------------------------------------------------------------------
 */
export class ContextMenu extends _Drawable<ContextMenuThemeColors> {

	//.....................
	//#region PROPERTIES
	
	/** The menu that is being shown */
	protected static _showingMenu: ContextMenu;	

	/** True if we already added window listeners */
	protected static _windowListenersAdded: boolean;	

	/** adds a target to this instance of the context menu */
	protected _target: HTMLElement;					

	/** The collection of options available in our context menu */
	protected _options: Collection<IOptionDrawable>;					

	/** The elements we need for the option menu */
	protected _elems: {
		base: HTMLElement,																	
		option_container?: HTMLElement
	};

	/** public accessible function for the base element */
	public get base(): HTMLElement { return this._elems.base; }
	
	//#endregion
	//.....................

	//..........................................
	//#region STYLES

	/** collection of theme colors for the context menu */
	protected _colors: Partial<Record<ContextMenuThemeColors, string>>;

	/** the styles to use for the standard context menu */
	protected static _uncoloredStyles: IStandardStyles = {
		".ctxMenu": {
			backgroundColor: "<menuBG:#FFF>",
			color: "<menuText:#000>",
			fontFamily: "sans-serif",
			boxShadow: "1px 1px 3px 2px rgba(0,0,0,.1)",
			fontSize: "14px",
			borderRadius: "4px",
			paddingTop: "2px",
			paddingBottom: "2px",
			width: "10%",
			position: "absolute",
			zIndex: '10'
		},
	}
	
	//#endregion
	//..........................................

	/**
	 * ContextMenu
	 * ----------------------------------------------------------------------------
	 * Creates a custom context (right-click) menu for a given element
	 * @param 	target    	The element to create the custom menu for
	 * @param	opts		Any additiona options that should be applied to the 
	 * 						context menu
	 * @returns	The created context menu
	 */
	constructor(target: HTMLElement, opts?: ContextMenuOptions) {

		// Initialize our Drawable
		super(opts);
		
		this._addClassName("ContextMenu");

		// Set our initial properties
		this._target = target;
		this._colors = opts?.colors || {
			menuBG: "rgba(40,40,40,1)", 
			menuText: "#FFF", 
			menuOptBG: "rgba(40,40,40,.9)", 
			menuBorder: "#777", 
			menuOptNested: "rgba(40,40,40,.85)", 
			menuBorderNested: "#888", 
			menuSelectedText: "#505050", 
			menuSelectedBorder: "#999"
		};

		// Initialize the option array
		this._options = new Collection<IOptionDrawable>();

		// Create our other elements
		this._createElements();

		// Add listeners
		this._addEventListeners();
	}

	/**
	 * addOption
	 * ----------------------------------------------------------------------------
	 * adds an option to our context menu 
	 * 
	 * @param	opt			The option to add
	 * @param	subOptions	Any nested options to include
	 * @param	parent		What the parent element should be (defaults to option container)
	 * 
	 * @returns	True if the option could be added
	 */
	public addOption(opt: IOption, subOptions?: IOption[], parent?: HTMLElement): boolean {

		// Make sure the option label is unique
		if (this._options.hasElement(opt.label)) { return false; }

		// Create the option element & add to our connection
		const optDrawable = new ContextMenuOption(opt);
		optDrawable.draw(parent || this._elems.option_container);
		this._options.add(opt.label, {
			...opt,
			option: optDrawable
		});

		// quit if there are no sub options to add
		if (!subOptions) { return true; }

		// Loop through suboptions and add them as well
		let sub_success: boolean = true;
		for (let s_opt of subOptions) {
			if (!this.addSubOption(opt, s_opt)) { sub_success = false; }
		}
		if (!sub_success) { return false; }

		// Making it this far means we added everything ok
		return true;
	}

	/**
	 * addSubOption
	 * ----------------------------------------------------------------------------
	 * Adds a nested option to our context menu
	 * 
	 * @param 	srcOption	The option we are nesting under 
	 * @param 	subOption 	The sub option we are currently adding
	 * 
	 * @returns	True if the suboption was added
	 */
	public addSubOption(srcOption: IOption, subOption: IOption): boolean {

		// If this is a new option, create it first
		if (!this._options.hasElement(srcOption.label)) {
			this.addOption(srcOption);
		}

		// Try to grab the option from our collection
		const optionDrawable = this._getOption(srcOption.label);

		// Quit if the option hasn't been appropriately initialized
		if (!optionDrawable) { return false; }
		if (!optionDrawable.option) { return false; }

		const subOptionDrawable = optionDrawable.option.addOption(subOption);
		this._options.add(subOption.label, {
			...subOption,
			option: subOptionDrawable
		});

	}

	/**
	 * _getOption
	 * ----------------------------------------------------------------------------
	 * grabs a particular option from our menu 
	 * @param	lbl		The label of the option we are grabbing
	 * @returns	The option with this label
	 */
	private _getOption(lbl: string): IOptionDrawable {
		if (!lbl) { return null; }
		return this._options.getValue(lbl);
	}

	/**
	 * removeOption
	 * ----------------------------------------------------------------------------
	 * removes an option from our menu 
	 * @param	lbl		The label of the option being removed
	 * @returns	True if the option was removed
	 */
	public removeOption(lbl: string): boolean {

		const iCol = this._options.remove(lbl);
		if (!iCol) { return false; }

		const opt = iCol.value;
		opt.option.erase();

		// Return true if we made it this far
		return true;

	};

	/**
	 * clearOptions
	 * ----------------------------------------------------------------------------
	 * Removes all of our options
	 */
	public clearOptions(): void {

		this._options.resetLoop(true);

		// Remove all HTML ELements
		while (this._options.hasNext(true)) {
			const iCol = this._options.getNext(true);
			if (!iCol) { continue; }

			const opt = iCol.value;
			opt.option.erase();
		}

		// Clear the collection
		this._options.clear();

	};

	/**
	 * _addEventListeners
	 * ----------------------------------------------------------------------------
	 * Adds event listeners to the relevant pieces to show and/or hide the context 
	 * menu 
	 */
	private _addEventListeners(): void {

		// Erase the currently showing context menu always on mousedown and on right-click
		this._addWindowListeners()

		// Show this menu when it's target is hit
		this._target.addEventListener("contextmenu", (e: MouseEvent) => {
			let pos_x: number;
			let pos_y: number;

			this.erase();

			// Show the normal rclick menu when holding control
			if (e.altKey) { return true; }

			// Stop bubbling since we have found our target
			e.stopPropagation();
			e.preventDefault();

			// Grab the approximate position
			pos_x = e.clientX;
			pos_y = e.clientY;

			// Adjust the display
			this._positionBubble(pos_x, pos_y);

			// Draw in our best guess position
			this.draw(document.body);
			ContextMenu._showingMenu = this;

			this._adjustBubble(pos_x, pos_y);

			// prevent the real r-click menu
			return false;
		});

	};

	protected _addWindowListeners(): void {
		if (ContextMenu._windowListenersAdded) { return; }

		window.addEventListener("contextmenu", () => {
			this._hideExistingMenu();
		});

		window.addEventListener("click", () => {
			this._hideExistingMenu();
		});

		ContextMenu._windowListenersAdded;
	}

	protected _adjustBubble(pos_x: number, pos_y: number) {
		// If we're too far over, shift it.
		if ((pos_x + this.base.offsetWidth) > window.innerWidth) {
			pos_x = (window.innerWidth - this.base.offsetWidth);
		}

		// If we're too low, move up
		if ((pos_y + this.base.offsetHeight) > window.innerHeight) {
			pos_y = (window.innerHeight - this.base.offsetHeight);
		}

		// Adjust the display
		this._positionBubble(pos_x, pos_y)
	}

	protected _positionBubble(pos_x: number, pos_y: number) {
		this.base.style.left = (pos_x + "px");
		this.base.style.top = (pos_y + "px");
	}

	/**
	 * _createElements
	 * ----------------------------------------------------------------------------
	 * Creates the basic elements of the context menu & optionally adds the 
	 * standard classes
	 */
	protected _createElements(opts?: ContextMenuOptions): void {
		this._createBase({
			cls: ["ctxMenu", opts?.cls],
			children: [{
				cls: "optionContainer", key: "option_container"
			}]
		});

		this._setColors();
	};

	protected _setColors() {
		if (!this._colors)
		map(this._colors, (color: string, key: ContextMenuThemeColors) => {
			this.replacePlaceholder(key, color)
		})
	}


	/**
	 * _hideExistingMenu
	 * ----------------------------------------------------------------------------
	 * Hides whatever context menu is currently showing 
	 */
	private _hideExistingMenu(): void {
		const currentMenu = ContextMenu._showingMenu;
		if (!currentMenu) { return; }
		if (!currentMenu.base.parentNode) { return; }
		currentMenu.erase();
	}


}
