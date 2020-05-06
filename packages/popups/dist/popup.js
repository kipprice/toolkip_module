"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toolkip_drawable_1 = require("@kipprice/toolkip-drawable");
const toolkip_create_elements_1 = require("@kipprice/toolkip-create-elements");
const toolkip_style_helpers_1 = require("@kipprice/toolkip-style-helpers");
const toolkip_shared_types_1 = require("@kipprice/toolkip-shared-types");
/**----------------------------------------------------------------------------
 * @class Popup
 * ----------------------------------------------------------------------------
 * Generic class to show data in a popup form
 * @author	Kip Price
 * @version 1.0.2
 * ----------------------------------------------------------------------------
 */
class Popup extends toolkip_drawable_1._Drawable {
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
    constructor(obj) {
        super();
        if (obj.themeColor) {
            this.replacePlaceholder("btnBackground", obj.themeColor);
        }
    }
    //.....................
    //#region PROPERTIES
    get _addlCls() { return ""; }
    //#endregion
    //..............................
    //........................
    //#region CREATE ELEMENTS
    /**
     * _createElements
     * ----------------------------------------------------------------------------
     * Creates all of the elements needed for this popup
     */
    _createElements() {
        this._createBase({
            cls: "popup" + (this._addlCls ? " " + this._addlCls : ""),
            children: [
                { key: "overlay", cls: "overlay", eventListeners: { click: () => this.erase() } },
                { key: "frame", cls: "frame", children: [
                        { key: "title", cls: "popupTitle" },
                        { key: "closeBtn", cls: "closeBtn",
                            children: [{ cls: "x", content: "x" }],
                            eventListeners: { click: () => this.erase() }
                        },
                        { key: "content", cls: "content" },
                        { key: "buttonContainer", cls: "buttonContainer" }
                    ] },
            ]
        });
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
    setTitle(title) {
        this._elems.title.innerHTML = title;
        if (title) {
            toolkip_style_helpers_1.addClass(this._elems.title, "hasContent");
        }
        else {
            toolkip_style_helpers_1.removeClass(this._elems.title, "hasContent");
        }
    }
    /**
     * addContent
     * ----------------------------------------------------------------------------
     * Allows the user to add content to the popup
     * See individual tags for param info
     * @param	param1
     * @param	cls
     * @param	content
     */
    addContent(param1, cls, content) {
        let elem;
        // Create an HTMLElement if one wasn't passed in
        if (toolkip_shared_types_1.isString(param1)) {
            elem = toolkip_create_elements_1.createSimpleElement(param1, cls, content);
            // If a Drawable was passed in, grab its HTML element
        }
        else if (toolkip_shared_types_1.isDrawable(param1)) {
            elem = param1.base;
            // Otherwise, just take the HTMLElement that was passed in
        }
        else if (param1 instanceof HTMLElement) {
            elem = param1;
        }
        else {
            elem = toolkip_create_elements_1.createElement(param1);
        }
        // Quit if we don't have an element at this point
        if (!elem) {
            return;
        }
        // Add the element to our content container
        this._elems.content.appendChild(elem);
    }
    /**
     * clearContent
     * ----------------------------------------------------------------------------
     * Clears all content out of the form
     */
    clearContent() {
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
    addButton(label, callback) {
        let btnElem = toolkip_create_elements_1.createElement({ cls: "popupButton", parent: this._elems.buttonContainer, content: label });
        btnElem.addEventListener("click", () => {
            callback();
        });
    }
}
exports.Popup = Popup;
//#endregion
//.....................
//...............
//#region STYLES
/** styles to render the popup with */
Popup._uncoloredStyles = {
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
        fontFamily: "Segoe UI, OpenSans, Helvetica",
        position: "fixed",
        width: "100%",
        height: "100%",
        left: "0",
        top: "0",
        zIndex: "5",
    },
    ".frame": {
        position: "absolute",
        backgroundColor: "<popupBackground:#FFF>",
        borderRadius: "3px",
        boxShadow: "1px 1px 5px 2px rgba(0,0,0,.2)",
        display: "block",
        borderTop: "10px solid <stripe>",
        padding: "10px",
        maxHeight: "90%",
        overflowY: "auto"
    },
    ".popup .popupTitle": {
        fontSize: "1.3em",
        fontWeight: "bold"
    },
    ".popup .popupTitle.hasContent": {
        marginBottom: "5px"
    },
    ".popup .content": {
        fontSize: "0.9em"
    },
    ".popup .buttonContainer": {
        display: "flex",
        marginTop: "8px",
        justifyContent: "flex-end"
    },
    ".popup .buttonContainer .popupButton": {
        padding: "2px 10px",
        backgroundColor: "<btnBackground:#333>",
        color: "#FFF",
        cursor: "pointer",
        marginLeft: "15px",
        borderRadius: "30px",
        transition: "all ease-in-out .1s"
    },
    ".popup .buttonContainer .popupButton:hover": {
        transform: "scale(1.1)"
    },
    ".popup .closeBtn": {
        width: "16px",
        height: "16px",
        borderRadius: "8px",
        cursor: "pointer",
        position: "absolute",
        left: "calc(100% - 7px)",
        top: "-15px",
        backgroundColor: "#DDD",
        boxShadow: "1px 1px 5px 2px rgba(0,0,0,.1)",
        color: "#333",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transition: "all ease-in-out .1s"
    },
    ".popup .closeBtn .x": {
        paddingBottom: "2px"
    },
    ".popup .closeBtn:hover": {
        transform: "scale(1.1)"
    }
};
