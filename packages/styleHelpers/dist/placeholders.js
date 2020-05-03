"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toolkip_object_helpers_1 = require("@kipprice/toolkip-object-helpers");
/**----------------------------------------------------------------------------
 * @class	StylePlaceholders
 * ----------------------------------------------------------------------------
 * keep track of the placeholders used within styles to be able to update at
 * a later point
 * @author	Kip Price
 * @version	1.0.0
 * ----------------------------------------------------------------------------
 */
class _StylePlaceholders {
    /**
     * splitOutParameters
     * ----------------------------------------------------------------------------
     * ensure that we have separate lists for styles with & without placeholders
     */
    splitOutPlaceholders(flattenedStyles) {
        let out = { standard: {}, withPlaceholders: {} };
        toolkip_object_helpers_1.map(flattenedStyles, (def, selector) => {
            toolkip_object_helpers_1.map(def, (pVal, pName) => {
                if (this._containsPlaceholder(pVal)) {
                    toolkip_object_helpers_1.setDictValue(out.withPlaceholders, pVal, [selector, pName]);
                }
                else {
                    toolkip_object_helpers_1.setDictValue(out.standard, pVal, [selector, pName]);
                }
            });
        });
        return out;
    }
    /**
     * findContainedPlaceholder
     * ----------------------------------------------------------------------------
     * check if a particular value string has a placeholder within it
     * @param   value   The value to check
     * @returns True if a placeholder is found
     */
    findContainedPlaceholder(value) {
        let placeholderRegex = /<(.+?)>/;
        let result = placeholderRegex.exec(value);
        if (!result || !result[1]) {
            return null;
        }
        // handle default values
        let splitPlaceholder = result[1].split(":");
        return {
            name: splitPlaceholder[0],
            defaultValue: splitPlaceholder[1]
        };
    }
    /**
     * _containsPlaceholder
     * ----------------------------------------------------------------------------
     * check if a given propert contains a piece of text that will be replaced
     * at a later point in time
     */
    _containsPlaceholder(value) {
        let placeholder = this.findContainedPlaceholder(value);
        return !!placeholder;
    }
    /**
     * indexStyleDictByPlaceholder
     * ----------------------------------------------------------------------------
     * index by placeholder all of the style elements that would be affected by
     * changing a particular placeholder value
     */
    indexStyleDictByPlaceholder(styleDict) {
        let idx = {};
        toolkip_object_helpers_1.map(styleDict, (styles, uniqueKey) => {
            toolkip_object_helpers_1.map(styles, (def, selector) => {
                toolkip_object_helpers_1.map(def, (pVal, pName) => {
                    // grab the appropriate placeholder
                    let placeholder = this.findContainedPlaceholder(pVal);
                    if (!placeholder) {
                        return;
                    }
                    // set the property name into the index in the position
                    // placeholder -> uniqueKey -> selector
                    toolkip_object_helpers_1.setDictValue(idx, true, [placeholder.name, uniqueKey, selector, pName]);
                });
            });
        });
        return idx;
    }
    /**
     * mapIndexToStyle
     * ----------------------------------------------------------------------------
     * turn an index into the set of styles it corresponds to
     * @param   index       The index we are mapping
     * @param   styles      The styles we are applying
     * @returns the styles that correspond to the index
     * TODO: evaluate whether this is necessary
     */
    mapIndexToStyle(index, styles) {
        let out = {};
        toolkip_object_helpers_1.map(index, (d, selector) => {
            toolkip_object_helpers_1.map(d, (unused, pName) => {
                if (!styles[selector]) {
                    return;
                }
                toolkip_object_helpers_1.setDictValue(out, styles[selector][pName], [selector, pName]);
            });
        });
        return out;
    }
    /**
     * replacePlaceholder
     * ----------------------------------------------------------------------------
     * replace all insteances of the specified placeholder in the provided styles
     * @param   styles      the styles to start from; these will not be modified
     * @param   placeholder the placeholder we are replacing
     * @param   replaceWith the value that should be swapped in for the placeholder
     * @returns a copy of the original styles, with all of the placeholders replaced
     */
    replacePlaceholders(styles, placeholder, replaceWith) {
        let matchRegex = new RegExp("<" + placeholder + ".*?>", "g");
        let out = toolkip_object_helpers_1.cloneObject(styles);
        toolkip_object_helpers_1.map(out, (def, selector) => {
            toolkip_object_helpers_1.map(def, (pVal, pName) => {
                out[selector][pName] = pVal.replace(matchRegex, replaceWith);
            });
        });
        return out;
    }
}
exports.StylePlaceholders = new _StylePlaceholders();
//..........................................
//#region PUBLIC FUNCTIONS
function findContainedPlaceholder(value) {
    return exports.StylePlaceholders.findContainedPlaceholder(value);
}
exports.findContainedPlaceholder = findContainedPlaceholder;
function splitStyles(flattenedStyles) {
    return exports.StylePlaceholders.splitOutPlaceholders(flattenedStyles);
}
exports.splitStyles = splitStyles;
function indexByPlaceholder(styleDict) {
    return exports.StylePlaceholders.indexStyleDictByPlaceholder(styleDict);
}
exports.indexByPlaceholder = indexByPlaceholder;
function replacePlaceholders(styles, placeholder, replaceWith) {
    return exports.StylePlaceholders.replacePlaceholders(styles, placeholder, replaceWith);
}
exports.replacePlaceholders = replacePlaceholders;
function mapIndexToStyle(index, styles) {
    return exports.StylePlaceholders.mapIndexToStyle(index, styles);
}
exports.mapIndexToStyle = mapIndexToStyle;
//#endregion
//..........................................
