"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stringifier_1 = require("./stringifier");
/**----------------------------------------------------------------------------
 * @class	StyleElementGenerator
 * ----------------------------------------------------------------------------
 * handle creating style elements & adding them to the document
 * @author	Kip Price
 * @version	1.0.0
 * ----------------------------------------------------------------------------
 */
class _StyleElementGenerator {
    //..........................................
    //#region CREATE A STYLE ELEMENT
    /**
     * createElement
     * ----------------------------------------------------------------------------
     * Create the element that will then be added to the document
     * @param   findExisting    If true, returns the first existing style tag in the document
     * @returns The created style element
     */
    createElement(id) {
        return this._createElement(id);
    }
    _createElement(id) {
        let elem;
        // check to see if there is already a style tag with the specified ID
        if (id) {
            elem = document.getElementById(id);
            if (elem) {
                return elem;
            }
        }
        // if we couldn't find an element, generate a new one
        elem = document.createElement("style");
        if (id) {
            elem.setAttribute("id", id);
        }
        return elem;
    }
    //#endregion
    //..........................................
    //..........................................
    //#region CREATE AN ELEMENT FOR A SET OF STYLES
    createElementForStyles(styles, id, addToDocument) {
        if (!styles) {
            return [];
        }
        return this._createElementForStyles(styles, id, addToDocument);
    }
    _createElementForStyles(styles, id, addToDocument) {
        let stringified = stringifier_1.stringifyStyles(styles);
        let out = [];
        for (let s of stringified) {
            let elem = this._createElement(id);
            elem.innerHTML = s;
            if (addToDocument) {
                document.head.appendChild(elem);
            }
            out.push(elem);
        }
        return out;
    }
}
const StyleElementGenerator = new _StyleElementGenerator();
//..........................................
//#region EXPORTED FUNCTIONS
function createStyleElement(id) {
    return StyleElementGenerator.createElement(id);
}
exports.createStyleElement = createStyleElement;
function createElementForStyles(styles, id, addToDocument) {
    return StyleElementGenerator.createElementForStyles(styles, id, addToDocument);
}
exports.createElementForStyles = createElementForStyles;
//#endregion
//..........................................
