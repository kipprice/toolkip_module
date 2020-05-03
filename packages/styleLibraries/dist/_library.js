"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toolkip_style_helpers_1 = require("@kipprice/toolkip-style-helpers");
const toolkip_object_helpers_1 = require("@kipprice/toolkip-object-helpers");
const toolkip_html_helpers_1 = require("@kipprice/toolkip-html-helpers");
const toolkip_async_1 = require("@kipprice/toolkip-async");
/**----------------------------------------------------------------------------
 * @class	Library
 * ----------------------------------------------------------------------------
 * keep track of all styles that are necessary for styling all elements
 * @author	Kip Price
 * @version	1.0.0
 * ----------------------------------------------------------------------------
 */
class _Library {
    constructor() {
        //.....................
        //#region PROPERTIES
        /* the styles themselves, indexed by the unique key that created them */
        this._rawStyles = {};
        /* the style elements that have been created */
        this._elems = {};
        //#endregion
        //.....................
        //..........................................
        //#region MANAGE IDENTFIERS
        this._lastId = 0;
        //#endregion
        //..........................................
    }
    getNextId() {
        this._lastId += 1;
        return this._lastId.toString();
    }
    //#endregion
    //..........................................
    //..........................................
    //#region PUBLIC ACCESSORS
    /**
     * hasStyles
     * ----------------------------------------------------------------------------
     * check if a certain set of styles (as marled by a unique key) have already
     * been rendered
     * @param   uniqueKey   The key to check for styles
     * @returns True if this key already has registered styles
     */
    hasStyles(uniqueKey) {
        return !!this._rawStyles[uniqueKey];
    }
    /**
     * add
     * ----------------------------------------------------------------------------
     * add in a set of distinct styles to be tracked & rendered in style elements.
     * standardly called when instantiating the first instance of a stylable
     * element.
     *
     * The general flow is:
     *  1) verify that these styles don't already exist (or that it is safe to recreate)
     *  2) merge any existing styles with the newly provided styles
     *  3) update the style elements that use these styles
     *
     * @param   uniqueKey   The key to associate with these styles
     * @param   styles      The styles to add
     * @param   force       If provided, ignores when the styles are already
     *                      created
     */
    add(uniqueKey, styles, force) {
        let existingStyles = this._getOrCreateExistingStyles(uniqueKey);
        if (!toolkip_object_helpers_1.isEmptyObject(existingStyles) && !force) {
            return;
        }
        // merge in with any styles that are already set for this element
        // & update the associated element 
        let mergedStyles = this._merge([existingStyles, styles]);
        this._rawStyles[uniqueKey] = mergedStyles;
        this._updateElems(mergedStyles, uniqueKey);
    }
    /**
     * removeStyles
     * ----------------------------------------------------------------------------
     * handle removing style elements from the library
     * @param   uniqueKey   The set of styles to remove
     * @returns true if the styles were successfully removed, false otherwise
     */
    remove(uniqueKey) {
        if (!this._rawStyles[uniqueKey]) {
            return false;
        }
        // delete the style element from the UI
        toolkip_html_helpers_1.removeElement(this._elems[uniqueKey]);
        // remove from our data stores
        delete this._rawStyles[uniqueKey];
        delete this._elems[uniqueKey];
        return true;
    }
    //#endregion
    //..........................................
    _merge(styles) {
        if (styles.length < 1) {
            return null;
        }
        return toolkip_style_helpers_1.combineStyles(...styles);
    }
    _stringify(styles) {
        return toolkip_style_helpers_1.stringifyStyles(styles);
    }
    _updateElems(styles, uniqueKey) {
        let stringifiedStyles = this._stringify(styles);
        for (let cIdx = 0; cIdx < stringifiedStyles.length; cIdx += 1) {
            let elem = this._getOrCreateElem(uniqueKey);
            elem.innerHTML = stringifiedStyles[cIdx];
        }
    }
    _getOrCreateElem(uniqueKey) {
        if (this._elems[uniqueKey]) {
            return this._elems[uniqueKey];
        }
        // create the element if we haven't yet, and register it to this ID
        let elem = toolkip_style_helpers_1.createStyleElement(`${uniqueKey}-${this._idSuffix}`);
        this._elems[uniqueKey] = elem;
        toolkip_async_1.nextRender().then(() => document.head.appendChild(elem));
        return elem;
    }
    _getOrCreateExistingStyles(uniqueKey) {
        if (!this._rawStyles[uniqueKey]) {
            this._rawStyles[uniqueKey] = {};
        }
        return this._rawStyles[uniqueKey];
    }
    //..........................................
    //#region RETRIEVE ELEMENTS AS NEEDED
    getElemForKey(uniqueKey) {
        if (!this._elems[uniqueKey]) {
            return null;
        }
        return this._elems[uniqueKey];
    }
}
exports._Library = _Library;
