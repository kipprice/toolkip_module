"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const toolkip_drawable_1 = require("@kipprice/toolkip-drawable");
const toolkip_create_elements_1 = require("@kipprice/toolkip-create-elements");
const toolkip_style_helpers_1 = require("@kipprice/toolkip-style-helpers");
const toolkip_async_1 = require("@kipprice/toolkip-async");
/**----------------------------------------------------------------------------
 * @class DynamicOption
 * ----------------------------------------------------------------------------
 * Create an option for a dynamic select field
 * @author  Kip Price
 * @version 1.0.0
 * ----------------------------------------------------------------------------
 */
class DynamicOption extends toolkip_drawable_1._Drawable {
    //#endregion
    //...............
    /**
     * DynamicOption
     * ----------------------------------------------------------------------------
     * Create the dynamic option
     * @param   opt     Details of the option we are creating
     */
    constructor(opt, parent) {
        super();
        this._id = opt.id;
        this._display = opt.display;
        this._selectParent = parent;
        this._createElements();
    }
    get id() { return this._id; }
    get display() { return this._display; }
    get isFiltered() { return this._isFiltered; }
    get isSelected() { return this._isSelected; }
    //#region CREATE ELEMENTS
    /**
     * _shouldSkipCreateElements
     * ----------------------------------------------------------------------------
     * Determine if we should avoid creating elements in the constructor
     * @returns True if we should skip the create elements
     */
    _shouldSkipCreateElements() { return true; }
    /**
     * _createElements
     * ----------------------------------------------------------------------------
     * Create elements for this option
     */
    _createElements() {
        this._elems = {};
        this._isFiltered = true;
        // create the base element
        this._elems.base = toolkip_create_elements_1.createElement({
            id: "opt|" + this._id,
            cls: "dynamicOption filtered",
            eventListeners: {
                click: () => {
                    console.log("click processed");
                    this._selectParent.select(this);
                }
            }
        });
        // create the text element
        this._elems.text = toolkip_create_elements_1.createElement({
            content: this._display,
            cls: "optText",
            parent: this._elems.base
        });
    }
    //#endregion
    //#region INTERACTION
    /**
     * select
     * ----------------------------------------------------------------------------
     * Select this particular element
     */
    select() {
        if (this._isFiltered) {
            return false;
        }
    }
    /**
     * hilite
     * ----------------------------------------------------------------------------
     * Hilite the current selected element
     */
    hilite() {
        if (this._isFiltered) {
            return false;
        }
        toolkip_style_helpers_1.addClass(this._elems.base, "hilite");
        this._elems.base.scrollIntoView();
        return true;
    }
    /**
     * unhilite
     * ----------------------------------------------------------------------------
     * remove hiliting of the current selected element
     */
    unhilite() {
        toolkip_style_helpers_1.removeClass(this._elems.base, "hilite");
        return true;
    }
    /**
     * _filter
     * ----------------------------------------------------------------------------
     * Filter out this option if appropriate
     */
    _filter() {
        if (this._isFiltered) {
            return;
        }
        this._isFiltered = true;
        toolkip_style_helpers_1.transition(this._elems.base, { maxHeight: "<height>", padding: "5px" }, { maxHeight: "0", padding: "0" }, 200).then(() => {
            toolkip_style_helpers_1.addClass(this._elems.base, "filtered");
        });
    }
    /**
     * _unfilter
     * ----------------------------------------------------------------------------
     * Remove filtering for this option if appropriate
     */
    _unfilter() {
        if (!this._isFiltered) {
            return;
        }
        this._isFiltered = false;
        toolkip_style_helpers_1.removeClass(this._elems.base, "filtered");
        toolkip_style_helpers_1.transition(this._elems.base, { maxHeight: "0", padding: "0" }, { maxHeight: "<height>", padding: "5px" }, 200).then;
    }
    /**
     * tryFilter
     * ----------------------------------------------------------------------------
     * Asynchronous call to ensure that options that don't match the current
     * select string are filtered out of the results
     *
     * @param   words   The words required in a relevant string for the option
     *                  in order to not filter
     *
     * @returns Promise that will run the filtering logic
     */
    tryFilter(words) {
        return __awaiter(this, void 0, void 0, function* () {
            // wait til the next frame render
            yield toolkip_async_1.nextRender();
            let word;
            let notFound = false;
            let display = this._display.toLowerCase();
            let id = this._id.toLowerCase();
            // loop through the words that were passed in and ensure all are there
            for (word of words) {
                if (display.indexOf(word) === -1) {
                    if (id.indexOf(word) === -1) {
                        notFound = true;
                        break;
                    }
                }
            }
            // if a word was missing, filter this element
            if (notFound) {
                this._filter();
            }
            else {
                this._unfilter();
            }
        });
    }
}
exports.DynamicOption = DynamicOption;
//#endregion
//..................
//...............
//#region STYLES
/** track styles for the option field */
DynamicOption._uncoloredStyles = {
    ".dynamicOption": {
        overflow: "hidden",
        cursor: "pointer",
        padding: "5px",
        nested: {
            "&.filtered": {
                maxHeight: "0",
                padding: "0"
            },
            "&:hover, &.hilite": {
                backgroundColor: "#eee"
            }
        }
    }
};
