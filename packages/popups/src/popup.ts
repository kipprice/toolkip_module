import { _Drawable } from '@toolkip/drawable';
import { PopupElements, IPopupDefinition } from "./_interfaces";
import { createElement, IElemDefinition, IClassDefinition, ClassName } from '@toolkip/create-elements';
import { addClass, removeClass, IStandardStyles } from '@toolkip/style-helpers';
import { StandardElement, isString, isDrawable } from '@toolkip/shared-types';


/**----------------------------------------------------------------------------
 * @class Popup
 * ----------------------------------------------------------------------------
 * Generic class to show data in a popup form
 * @author	Kip Price
 * @version 1.0.2
 * ----------------------------------------------------------------------------
 */
export class Popup extends _Drawable<"btnBackground" | "stripe" | "popupBackground", PopupElements, IPopupDefinition> {

	//.....................
	//#region PROPERTIES

	protected get _addlCls(): string { return ""; }
	//#endregion
	//.....................

	//...............
	//#region STYLES
	/** styles to render the popup with */
	protected static _uncoloredStyles: IStandardStyles = {
		".overlay": {
			backgroundColor: "rgba(0,0,0,.6)",
			position: "absolute",
			left: "0",
			top: "0",
			width: "100%",
			height: "100%",
		},

		".popup": {
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			position: "fixed",
			width: "100%",
			height: "100%",
			left: "0",
			top: "0",
			zIndex: "5",

			nested: {

				".frame": {
					position: "absolute",
					backgroundColor: "<popupBackground:#FFF>",
					borderRadius: "3px",
					boxShadow: "1px 1px 5px 2px rgba(0,0,0,.2)",
					display: "block",
					borderTop: "10px solid <stripe>",
					padding: "10px",
					maxHeight: "90%",
					overflowY: "auto",
					overflowX: 'hidden'
				},

				'.titleFlex': {
					display: 'flex',
					marginBottom: '5px'
				},

				'.popupTitle': {
					fontSize: "1.3em",
					fontWeight: "bold",
					flexGrow: '1'
				},

				".popupTitle.hasContent": {
					marginBottom: "5px"
				},

				".closeBtn": {
					width: "16px",
					height: "16px",
					borderRadius: "8px",
					cursor: "pointer",
					left: "calc(100% - 18px)",
					top: "2px",
					color: "#333",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					transition: "all ease-in-out .1s",
					flexShrink: '0',
					marginRight: '-8px',
					marginTop: '-8px',
					paddingLeft: '10px',
					opacity: '0.4',
					transformOrigin: '50% 50%',

					nested: {
						".x": {
							paddingBottom: "2px",
							transformOrigin: '50% 50%',
							transform: 'rotate(45deg)',
							fontSize: '1.2rem'
						},

						"&:hover": {
							transform: "scale(1.1)",
							opacity: '1'
						}
					}
				},

				".content": {
					fontSize: "0.9em"
				},

				".buttonContainer": {
					display: "flex",
					marginTop: "8px",
					justifyContent: "flex-end",

					nested: {
						".popupButton": {
							padding: "2px 10px",
							backgroundColor: "<btnBackground:#333>",
							color: "#FFF",
							cursor: "pointer",
							marginLeft: "15px",
							borderRadius: "30px",
							transition: "all ease-in-out .1s"
						},

						".popupButton:hover": {
							transform: "scale(1.1)"
						},
					}
				},
			}
		},

	}

	//#endregion
	//...............

	//..............................
	//#region CREATE A POPUP FORM

	/**
	 * Popup
	 * ----------------------------------------------------------------------------
	 * Creates a new popup form
	 * @param 	obj 	If included, contains info on how to create this popup
	 */
	constructor(obj?: IPopupDefinition) {
		super(obj);
		
		if (obj?.themeColor) {
			this.replacePlaceholder("btnBackground", obj.themeColor);
		}

	}
	//#endregion
	//..............................

	//........................
	//#region CREATE ELEMENTS

	/**
	 * _createElements
	 * ----------------------------------------------------------------------------
	 * Creates all of the elements needed for this popup
	 */
	protected _createElements(obj: IPopupDefinition): void {
		this._createBase({
			cls: ["popup", this._addlCls, obj.cls],
			children: [
				{ key: "overlay", cls: "overlay", eventListeners: { click: () => this.erase() } },
				
				{ key: "frame", cls: "frame", children: [
					{ cls: 'titleFlex', children: [
						{ key: "title", cls: "popupTitle" },
						{ key: "closeBtn", cls: "closeBtn",  
							children: [{ cls: "x", content: "&#x002B;" }], 
							eventListeners: { click: () => this.erase() } 
						}
					]},
					{ key: "content", cls: "content"},
					{ key: "buttonContainer", cls: "buttonContainer" }
				]},
			]
		})
	}
	//#endregion
	//........................

	//........................
	//#region SET THE TITLE

	/**
	 * setTitle
	 * ----------------------------------------------------------------------------
	 * Sets the title for the popup
	 * @param 	title	What to set as the title
	 */
	public setTitle(title: string): void {
		this._elems.title.innerHTML = title;

		if (title) {
			addClass(this._elems.title, "hasContent");
		} else {
			removeClass(this._elems.title, "hasContent");
		}
	}
	//#endregion
	//........................

	//...............................................................
	//#region ALLOW THE CALLER TO ADD / REMOVE CONTENT TO THE POPUP

	/**
	 * addContent
	 * ----------------------------------------------------------------------------
	 * Allows the caller to add a Drawable to the popup
	 * @param 	drawable 	The drawable element to add
	 */
	public addContent(drawable: _Drawable): void;

	/**
	 * addContent
	 * ----------------------------------------------------------------------------
	 * Allows the caller to add an HTMLElement to the popup
	 * @param	elem	The HTMLElement to add
	 */
	public addContent(elem: HTMLElement): void;

	/**
	 * addContent
	 * ----------------------------------------------------------------------------
	 * Allows the caller to pass basic info to the popup so that 
	 * createElement can be called with the specified content
	 * 
	 * @param	id		ID of the element to be created
	 * @param	cls		Class of the element to be created
	 * @param	content	What content the element should contain
	 */
	public addContent(content?: string): void;

	/**
	 * addContent
	 * ----------------------------------------------------------------------------
	 * Allows the caller to add detailed info to the popup so that createElement
	 * can be called
	 * @param	obj		The object containing data on how to create the element
	 */
	public addContent(obj: IElemDefinition): void;

	/**
	 * addContent
	 * ----------------------------------------------------------------------------
	 * Allows the user to add content to the popup
	 * See individual tags for param info
	 * @param	param1
	 * @param	cls
	 * @param	content
	 */
	public addContent(param1?: (HTMLElement | string | _Drawable | IElemDefinition)): void {
		let elem: StandardElement;

		// Create an HTMLElement if one wasn't passed in
		if (isString(param1)) {
			elem = createElement({ content: param1 });

			// If a Drawable was passed in, grab its HTML element
		} else if (isDrawable(param1)) {
			elem = param1.base;

			// Otherwise, just take the HTMLElement that was passed in
		} else if (param1 instanceof HTMLElement) {
			elem = param1;

		} else {
			elem = createElement(param1);
		}

		// Quit if we don't have an element at this point
		if (!elem) { return; }

		// Add the element to our content container
		this._elems.content.appendChild(elem);
	}

	/**
	 * clearContent
	 * ----------------------------------------------------------------------------
	 * Clears all content out of the form
	 */
	public clearContent(): void {
		this._elems.content.innerHTML = "";
	}
	//#endregion
	//...............................................................

	//.....................
	//#region ADD BUTTONS

	/**
	 * addButton
	 * ----------------------------------------------------------------------------
	 * Adds a button to the popup
	 * @param 	label 		The label to use for the button
	 * @param 	callback 	What to do when the button is clicked
	 */
	public addButton(label: string, callback: Function): void {
		let btnElem: HTMLElement = createElement({ cls: "popupButton", parent: this._elems.buttonContainer, content: label });
		btnElem.addEventListener("click", () => {
			callback();
		});
	}

	//#endregion
	//.....................

}


