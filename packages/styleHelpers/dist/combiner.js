"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toolkip_object_helpers_1 = require("@kipprice/toolkip-object-helpers");
/**----------------------------------------------------------------------------
 * @class	StyleCombiner
 * ----------------------------------------------------------------------------
 * generates merged version of style classes, making sure to update nested
 * properties that are shared within a single selector
 * @author	Kip Price
 * @version	1.0.0
 * ----------------------------------------------------------------------------
 */
class _StyleCombiner {
    combine(...styles) {
        return this._combineStyles(...styles);
    }
    /**
     * _combineThemes
     * ----------------------------------------------------------------------------
     * @param   styles  The themes to combine
     * @returns The merged themes
     */
    _combineStyles(...styles) {
        let outStyles = {};
        // Go through each of the themes & each of their selectors
        for (let style of styles) {
            toolkip_object_helpers_1.map(style, (curCls, selector) => {
                // font face styles
                if (curCls instanceof Array) {
                    outStyles[selector] = this._combineFontStyle(outStyles[selector] || [], curCls);
                    // standard styles
                }
                else {
                    outStyles[selector] = this._combineStandardStyle(outStyles[selector] || {}, curCls);
                }
            });
        }
        ;
        return outStyles;
    }
    _combineStandardStyle(existingStyles, curCls) {
        // merge in the styles for this particular class into any existing 
        // styles for this selector
        let mergedDef = this._combineStyle(existingStyles, curCls);
        if (!mergedDef) {
            return;
        }
        return mergedDef;
    }
    _combineFontStyle(existingFonts, curFonts) {
        return existingFonts.concat(curFonts);
    }
    /**
     * _combineStyle
     * ----------------------------------------------------------------------------
     * merge in a particualr class into an existing set of styles
     */
    _combineStyle(startingStyles, curCls) {
        let mergedDef = this._mergeClassDefinition(startingStyles, curCls);
        if (toolkip_object_helpers_1.isEmptyObject(mergedDef)) {
            return null;
        }
        return mergedDef;
    }
    /**
     * _mergeDefinitions
     * ----------------------------------------------------------------------------
     * merge a particular set of definitions
     * @param   definitions     The definitions to merge
     * @returns The merged set of definitions
     */
    _mergeClassDefinition(...definitions) {
        let mergedDef = {};
        // loop through all of the definitions & their properties
        for (let def of definitions) {
            toolkip_object_helpers_1.map(def, (val, property) => {
                mergedDef[property] = val;
            });
        }
        return mergedDef;
    }
}
const StyleCombiner = new _StyleCombiner();
//..........................................
//#region PUBLIC FUNCTIONS
function combineStyles(...styles) {
    return StyleCombiner.combine(...styles);
}
exports.combineStyles = combineStyles;
//#endregion
//..........................................
