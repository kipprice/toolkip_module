"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toolkip_object_helpers_1 = require("@kipprice/toolkip-object-helpers");
const combiner_1 = require("./combiner");
/**----------------------------------------------------------------------------
 * @class	StyleCleaner
 * ----------------------------------------------------------------------------
 * handle cleaning up style definitions
 * @author	Kip Price
 * @version	2.0.0
 * ----------------------------------------------------------------------------
 */
class _StyleFlattener {
    flatten(styles) {
        return this._flattenStyles(styles, "");
    }
    /**
     * _flattenStyles
     * ----------------------------------------------------------------------------
     * Clean the nested styles data so that we can parse it properly
     *
     * @param   styles          The styles to clean
     * @param   lastSelector    If included, the selector to preface the cleaned
     *                          version of this styles with
     *
     * @returns The cleaned styles
     */
    _flattenStyles(styles, lastSelector) {
        let outStyles = {};
        // go through each key of the provided styles and flatten them
        // to be a single layer deep
        toolkip_object_helpers_1.map(styles, (value, selector) => {
            // split all selectors at commas so we can appropriately nest
            let newSelectors = this._buildNewSelectors(selector, lastSelector);
            // loop through all of the relevant selectors for this set of styles
            for (let selector of newSelectors) {
                let calculatedStyles = this._flattenClassDefinition(selector, value);
                outStyles = combiner_1.combineStyles(outStyles, calculatedStyles);
            }
        });
        return outStyles;
    }
    /**
     * _flattenClassDefinition
     * ----------------------------------------------------------------------------
     * Clean a particular class definition recursively
     *
     * @param   selector    The CSS selector for this class
     * @param   classDef    The definition for this CSS class
     *
     * @returns The merged styles
     */
    _flattenClassDefinition(selector, classDef) {
        let topStyles = {
            [selector]: {},
        };
        // go through each { property : value } pair
        toolkip_object_helpers_1.map(classDef, (propertyValue, propertyName) => {
            // if this is our nested classes, continue recursing down the chain
            if (propertyName === "nested") {
                let subnestedStyles = this._flattenStyles(propertyValue, selector);
                topStyles = combiner_1.combineStyles(topStyles, subnestedStyles);
                // otherwise, just set the value into our top-level styles
            }
            else {
                topStyles[selector][propertyName] = propertyValue;
            }
        });
        return topStyles;
    }
    //..........................................
    //#region BUILD SELECTOR NAMES
    /**
     * buildNewSelectors
     * ----------------------------------------------------------------------------
     * generate the full selector names for nested classes
     */
    _buildNewSelectors(curSelector, lastSelector) {
        let newSelectors = curSelector.split(",");
        if (!lastSelector) {
            return newSelectors;
        }
        // insert the last selector at the right spot for each of 
        // the new selectors
        for (let i = 0; i < newSelectors.length; i += 1) {
            newSelectors[i] = this._buildNewSelector(newSelectors[i], lastSelector);
        }
        // return the updated array
        return newSelectors;
    }
    /**
     * _nuildNewSelector
     * ----------------------------------------------------------------------------
     * generate the full selector name for a nested class
     */
    _buildNewSelector(newSelector, lastSelector) {
        let out = "";
        // handle selectors that specify where the last selector should sit
        if (newSelector.indexOf("&") !== -1) {
            out = newSelector.replace(/&/g, lastSelector);
            // handle all other subclass cases
        }
        else {
            out = lastSelector + " " + newSelector;
        }
        return out;
    }
}
const StyleFlattener = new _StyleFlattener();
//..........................................
//#region PUBLIC FUNCTIONS
function flattenStyles(styles) {
    return StyleFlattener.flatten(styles);
}
exports.flattenStyles = flattenStyles;
//#endregion
//..........................................
