"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _library_1 = require("./_library");
const toolkip_object_helpers_1 = require("@kipprice/toolkip-object-helpers");
const toolkip_style_helpers_1 = require("@kipprice/toolkip-style-helpers");
const toolkip_html_helpers_1 = require("@kipprice/toolkip-html-helpers");
// TODO: clean up this class once there is enough test coverage to do so safely
/**----------------------------------------------------------------------------
 * @class	ColorLibrary
 * ----------------------------------------------------------------------------
 * register the specific coolor-based styles for all elements in the given
 * application
 * @author	Kip Price
 * @version	1.0.0
 * ----------------------------------------------------------------------------
 */
class _PlaceholderLibrary extends _library_1._Library {
    constructor() {
        //.....................
        //#region PROPERTIES
        super(...arguments);
        /**
         * keep track of the index version of our placeholders
         * this is formatted as
         *  { placeholder -> uniqueKey -> selector -> propertyName -> true }
         *
         * when we extract data, we will do so through mapping the index onto
         * the actual styles stored within our rawStyles property
        **/
        this._indexedPlaceholders = {};
        //#endregion
        //..........................................
    }
    /** suffix the generate styles with the appropriate sub id */
    get _idSuffix() { return "placeholder"; }
    //#endregion
    //.....................
    //..........................................
    //#region INDEX PLACEHOLDERS
    /**
     * _indexByPlaceholder
     * ----------------------------------------------------------------------------
     * create the index compared against the styles
     */
    _indexByPlaceholder(styles, uniqueKey) {
        let d = { [uniqueKey]: styles };
        let out = toolkip_style_helpers_1.indexByPlaceholder(d);
        toolkip_object_helpers_1.map(out, (dict, placeholder) => {
            if (!dict[uniqueKey]) {
                return;
            }
            // what a mess...everything about this class is a mess
            // ==> get the styles, indexed by placeholders
            let placeholderIdx = this._indexedPlaceholders[placeholder] || {};
            //==> merge into the exsting styles
            let uniqueIdx = placeholderIdx[uniqueKey] || {};
            let combo = toolkip_object_helpers_1.combineObjects(uniqueIdx, dict[uniqueKey]);
            toolkip_object_helpers_1.setDictValue(this._indexedPlaceholders, combo, [placeholder, uniqueKey]);
        });
        return out;
    }
    /**
     * _updateElems
     * ----------------------------------------------------------------------------
     * create the appropriate elements
     */
    _updateElems(styles, uniqueKey) {
        let indexed = this._indexByPlaceholder(styles, uniqueKey);
        toolkip_object_helpers_1.map(indexed, (dict, placeholder) => {
            let idx = dict[uniqueKey];
            let builtStyles = toolkip_style_helpers_1.mapIndexToStyle(idx, this._rawStyles[uniqueKey]);
            if (!builtStyles) {
                return;
            } // this shouldn't happen
            this._updatePlaceholderElem(builtStyles, uniqueKey, placeholder);
        });
    }
    _updatePlaceholderElem(styles, uniqueKey, placeholder) {
        super._updateElems(styles, this._formatElemString(uniqueKey, placeholder));
    }
    //#endregion
    //..........................................
    //..........................................
    //#region REPLACE PLACEHOLDERS
    replacePlaceholder(opts) {
        // ==> most specific case: styles on a single element
        if (opts.baseElem) {
            this._replaceSingleElemPlaceholders(opts);
        }
        // ==> semi-specific: styles for all instances of a given class
        else if (opts.uniqueKey) {
            this._replacePlaceholderForKey(opts);
        }
        // ==> global: replace all instances of this placeholder
        else {
            this._replacePlaceholdersForMultipleKeys(opts);
        }
    }
    _replacePlaceholdersForMultipleKeys(opts) {
        const idx = this._indexedPlaceholders[opts.placeholder];
        if (!idx || toolkip_object_helpers_1.isEmptyObject(idx)) {
            return;
        }
        // loop through each of the unique keys affected by this placeholder change
        // and apply the unique-key specific code
        toolkip_object_helpers_1.map(idx, (_, uniqueKey) => {
            opts.uniqueKey = uniqueKey;
            this._replacePlaceholderForKey(opts);
            opts.uniqueKey = null;
        });
    }
    _replacePlaceholderForKey(opts) {
        if (!opts.uniqueKey) {
            return;
        }
        const replacedStyles = this._replacePlaceholderViaIndex(opts);
        // update the appropriate text in our style element(s)
        this._updatePlaceholderElem(replacedStyles, opts.uniqueKey, opts.placeholder);
    }
    _replaceSingleElemPlaceholders(opts) {
        if (!opts.uniqueKey || !opts.newValue) {
            return;
        }
        const replacedStyles = this._replacePlaceholderViaIndex(opts);
        const matches = this._findMatches(opts.baseElem, toolkip_object_helpers_1.getKeys(replacedStyles));
        // actually do the individual replacement
        toolkip_object_helpers_1.map(matches, (matchedElems, selector) => {
            for (let matchedElem of matchedElems) {
                toolkip_object_helpers_1.map(replacedStyles[selector], (pVal, pName) => {
                    matchedElem.style[pName] = pVal;
                });
            }
        });
    }
    /**
     * _findMatches
     * ----------------------------------------------------------------------------
     * find all of the elements that match any of the specified selectors that are
     * also a part of the specified element's descendant tree
     */
    _findMatches(parent, selectors) {
        let out = {};
        for (let s of selectors) {
            out[s] = this._findMatch(parent, s);
        }
        return out;
    }
    /**
     * _findMatch
     * ----------------------------------------------------------------------------
     * determine whether the specified selector exists within the specified
     * elements descendant tree. uses a queue to evaluate all children under the
     * specified parent
     */
    _findMatch(parent, selector) {
        let out = [];
        let nodeQueue = [parent];
        let cnt = 0;
        // keep going until we have checked all nodes within our queue
        while (cnt < nodeQueue.length) {
            let currentNode = nodeQueue[cnt];
            // if this is a match, add it to our output array
            if (toolkip_html_helpers_1.doesElementMatchSelector(currentNode, selector)) {
                out.push(currentNode);
            }
            // add the next set of nodes & increment
            nodeQueue = nodeQueue.concat([...currentNode.childNodes]);
            cnt += 1;
        }
        return out;
    }
    //#endregion
    //..........................................
    //..........................................
    //#region HELPERS
    _replacePlaceholderViaIndex(opts) {
        const styles = this._indexedPlaceholders[opts.placeholder][opts.uniqueKey];
        let mappedStyles = toolkip_style_helpers_1.mapIndexToStyle(styles, this._rawStyles[opts.uniqueKey]);
        return toolkip_style_helpers_1.replacePlaceholders(mappedStyles, opts.placeholder, opts.newValue);
    }
    _formatElemString(uniqueKey, placeholder) {
        return `${uniqueKey}-${placeholder}`;
    }
}
exports.PlaceholderLibrary = new _PlaceholderLibrary();
