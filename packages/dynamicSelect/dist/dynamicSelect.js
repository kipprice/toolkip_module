"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toolkip_drawable_1 = require("@kipprice/toolkip-drawable");
const dynamicOption_1 = require("./dynamicOption");
const toolkip_data_structures_1 = require("@kipprice/toolkip-data-structures");
const toolkip_create_elements_1 = require("@kipprice/toolkip-create-elements");
const toolkip_style_helpers_1 = require("@kipprice/toolkip-style-helpers");
/**----------------------------------------------------------------------------
 * @class DynamicSelect
 * ----------------------------------------------------------------------------
 * Create a select element that can load dynamic options
 * // TODO: support more than just an ID being retrieved
 * // TODO: fix drawer bugs (keyboard input, flicker)
 * @author  Kip Price
 * @version 1.0.1
 * ----------------------------------------------------------------------------
 */
class _DynamicSelect extends toolkip_drawable_1._Drawable {
    //#endregion
    //...............
    //.....................
    //#region CONSTRUCTOR
    /**
     * DynamicSelect
     * ----------------------------------------------------------------------------
     * Create the Dynamic Select element
     */
    constructor() {
        super();
        // initialize our collection
        this._availableOptions = new toolkip_data_structures_1.Collection();
        this._availableOptions.addType = toolkip_data_structures_1.CollectionTypeEnum.ReplaceDuplicateKeys;
    }
    get value() { return this._value; }
    //#endregion
    //.....................
    //........................
    //#region CREATE ELEMENTS
    /**
     * _createElements
     * ----------------------------------------------------------------------------
     * Generate the elements needed by the dynamic select field
     */
    _createElements() {
        this._elems = {};
        this._elems.base = toolkip_create_elements_1.createElement({
            cls: "dynamicSelect"
        });
        this._elems.input = toolkip_create_elements_1.createElement({
            type: "input",
            parent: this._elems.base,
            eventListeners: {
                input: (e) => { this._onQueryTextChange(e); },
                keydown: (e) => { this._onKeyEvent(e); },
                blur: (e) => { this._onBlur(e); },
                focus: (e) => { this._onFocus(e); }
            }
        });
        this._elems.clearBtn = toolkip_create_elements_1.createElement({
            cls: "clearBtn",
            content: "x",
            parent: this._elems.base,
            eventListeners: {
                click: () => { this._elems.input.value = ""; }
            }
        });
        this._elems.drawer = toolkip_create_elements_1.createElement({
            cls: "drawer collapsed",
            parent: this._elems.base
        });
        this._elems.innerOptions = toolkip_create_elements_1.createElement({
            cls: "innerOptions",
            parent: this._elems.drawer
        });
        this._elems.loadingIcon = toolkip_create_elements_1.createElement({ cls: "hidden loading", parent: this._elems.drawer });
    }
    //#endregion
    //........................
    //...........................
    //#region DRAWER FUNCTIONS
    /**
     * _expandDrawer
     * ----------------------------------------------------------------------------
     * Expand the drawer of options
     */
    _expandDrawer() {
        toolkip_style_helpers_1.removeClass(this._elems.drawer, "collapsed");
        toolkip_style_helpers_1.transition(this._elems.drawer, { height: "0", opacity: "0" }, { height: "<height>", opacity: "1" }, 300);
    }
    /**
     * _collapseDrawer
     * ----------------------------------------------------------------------------
     * Collapse the drawer of options
     */
    _collapseDrawer() {
        toolkip_style_helpers_1.transition(this._elems.drawer, { height: "<height>", opacity: "1" }, { height: "0", opacity: "0" }, 300).then(() => {
            toolkip_style_helpers_1.addClass(this._elems.drawer, "collapsed");
        });
    }
    //#endregion   
    //...........................
    //........................
    //#region AUGMENT OPTIONS
    /**
     * addOption
     * ----------------------------------------------------------------------------
     * Adds an option to our select field
     *
     * @param   opt     The option to add
     */
    addOption(opt) {
        let option = new dynamicOption_1.DynamicOption(opt, this);
        if (this._availableOptions.add(option.id, option) === -1) {
            return;
        }
        ;
        this._updateFiltering(this._elems.input.value);
        this._elems.innerOptions.appendChild(option.base);
    }
    /**
     * addOptions
     * ----------------------------------------------------------------------------
     * Add a set of options to the select element
     * @param   opts    The options to add
     */
    addOptions(opts) {
        let opt;
        for (opt of opts) {
            this.addOption(opt);
        }
    }
    //#endregion
    //........................
    //........................
    //#region EVENT LISTENERS
    /**
     * addEventListener
     * ----------------------------------------------------------------------------
     * Allow additional listeners on this select field
     */
    addEventListener(type, func) {
        switch (type) {
            case "select":
                if (!this._selectListeners) {
                    this._selectListeners = [];
                }
                this._selectListeners.push(func);
                break;
            case "search":
                if (!this._searchListeners) {
                    this._searchListeners = [];
                }
                this._searchListeners.push(func);
                break;
            case "change":
                if (!this._changeListeners) {
                    this._changeListeners = [];
                }
                this._changeListeners.push(func);
                break;
            default:
                super.addEventListener(type, func);
                break;
        }
    }
    /**
     * _notifyChangeListeners
     * ----------------------------------------------------------------------------
     * Notify any listeners that some content changed
     */
    _notifyChangeListeners() {
        let listener;
        if (!this._changeListeners) {
            return;
        }
        for (listener of this._changeListeners) {
            if (!listener) {
                continue;
            }
            listener(this._elems.input.value);
        }
    }
    /**
     * _notifySelectListeners
     * ----------------------------------------------------------------------------
     * Notify any listeners that we have selected an element
     * @param   selectedOption  The option that was selected
     */
    _notifySelectListeners(selectedOption) {
        let listener;
        if (!this._selectListeners) {
            return;
        }
        for (listener of this._selectListeners) {
            if (!listener) {
                continue;
            }
            listener(selectedOption);
        }
    }
    /**
     * _notifySearchListeners
     * ----------------------------------------------------------------------------
     * @param search
     */
    _notifySearchListeners(search) {
        let listener;
        if (!this._searchListeners) {
            return;
        }
        for (listener of this._searchListeners) {
            if (!listener) {
                continue;
            }
            listener(search);
        }
    }
    /**
     * _onChange
     * ----------------------------------------------------------------------------
     * Handle when the text field changes
     *
     * @param   e   Change event
     */
    _onQueryTextChange(e) {
        let curText = this._elems.input.value;
        // update which options are filtered
        this._updateFiltering(curText);
        // let listeners know that we have updates
        this._notifyChangeListeners();
        // run a new query if we can
        this._query(curText);
    }
    /**
     * _onKeyUp
     * ----------------------------------------------------------------------------
     * Check if we need to handle an enter press in the text field
     *
     * @param   e   The keyboard event fired
     */
    _onKeyEvent(e) {
        let foundNext = false;
        let pair;
        switch (e.keyCode) {
            // enter
            case 13:
                pair = this._availableOptions.getCurrent();
                if (pair) {
                    this.select(pair.value);
                }
                else {
                    this.search(this._elems.input.value);
                }
                break;
            // up arrow
            case 38:
                pair = this._availableOptions.getCurrent();
                while (foundNext === false && this._availableOptions.hasNext(true)) {
                    let opt = this._availableOptions.getNext(true).value;
                    foundNext = opt.hilite();
                }
                if (foundNext) {
                    if (pair) {
                        pair.value.unhilite();
                    }
                }
                break;
            // down arrow
            case 40:
                pair = this._availableOptions.getCurrent();
                while (foundNext === false && this._availableOptions.hasNext()) {
                    let opt = this._availableOptions.getNext().value;
                    foundNext = opt.hilite();
                }
                if (foundNext) {
                    if (pair) {
                        pair.value.unhilite();
                    }
                }
                break;
        }
    }
    /**
     * _onBlur
     * ----------------------------------------------------------------------------
     * Handle when focus is lost on the search element
     * @param   event   The focus event
     */
    _onBlur(event) {
        this._collapseDrawer();
    }
    /**
     * _onFocus
     * ----------------------------------------------------------------------------
     * Handle when focus is given to the search element
     * @param   event   The focus event
     */
    _onFocus(event) {
        this._expandDrawer();
        this._availableOptions.resetLoop();
    }
    /**
     * select
     * ----------------------------------------------------------------------------
     * Handle selecting an element in the search field
     * @param   selectedOption  The option that was selected
     */
    select(selectedOption) {
        this._collapseDrawer();
        this._elems.input.value = selectedOption.display;
        this._value = selectedOption.id;
        this._elems.input.blur();
        this._notifySelectListeners(selectedOption);
    }
    /**
     * search
     * ----------------------------------------------------------------------------
     * Handle searching for a string that wasn't an option in
     * our search results
     */
    search(searchStr) {
        this._collapseDrawer();
        this._elems.input.value = searchStr;
        this._elems.input.blur();
        this._notifySearchListeners(searchStr);
    }
    //#endregion
    //........................
    //...........................
    //#region HANDLE FILTERING
    /**
     * _updateFiltering
     * ----------------------------------------------------------------------------
     * make sure our filtered text reflects the most up-to-date value in the
     * text field
     */
    _updateFiltering(curText) {
        // split the text by space for smarter filtering
        let words = curText.toLowerCase().split(" ");
        this._availableOptions.map((elem) => {
            elem.tryFilter(words);
        });
    }
    //#endregion
    //...........................
    //........................
    //#region QUERY HANDLING
    /**
     * _query
     * ----------------------------------------------------------------------------
     * Handle querying for additional options to add
     * @param   queryText   The text to search
     */
    _query(queryText) {
        // quit if we're already running this query
        if (queryText === this._currentQuery) {
            return;
        }
        // if we're in the process of querying, just queue up a new query for next time
        if (this._isQuerying) {
            this._nextQuery = queryText;
            return;
        }
        // if we have nothing to query, quit
        if (!queryText) {
            return;
        }
        this._currentQuery = queryText;
        this._isQuerying = true;
        toolkip_style_helpers_1.removeClass(this._elems.loadingIcon, "hidden");
        this._onQuery(queryText).then(() => {
            this._currentQuery = "";
            this._isQuerying = false;
            toolkip_style_helpers_1.addClass(this._elems.loadingIcon, "hidden");
            // start the next query if appropriate
            if (this._nextQuery) {
                this._query(this._nextQuery);
                this._nextQuery = "";
            }
        });
    }
    //#endregion
    //........................
    //..................
    //#region CLEARING
    clear() {
        this._elems.input.value = "";
        this._updateFiltering("");
        this._notifyChangeListeners();
    }
}
exports._DynamicSelect = _DynamicSelect;
//#endregion
//.....................
//...............
//#region STYLES
/** keep track of the styles associated with this select field */
_DynamicSelect._uncoloredStyles = {
    "@keyframes rotate": {
        "from": { transform: "rotate(0deg)" },
        "to": { transform: "rotate(360deg)" }
    },
    ".dynamicSelect": {
        position: "relative",
        fontFamily: "Segoe UI, Open Sans, Helvetica",
        nested: {
            "input": {
                position: "relative",
                fontSize: "2em",
                zIndex: "3"
            },
            ".clearBtn": {
                color: "#555",
                transition: "all ease-in-out .1s",
                position: "absolute",
                left: "calc(100% - 25px)",
                top: "0",
                width: "20px",
                height: "20px",
                fontSize: "20px",
                cursor: "pointer",
                transformOrigin: "50% 100%",
                nested: {
                    "&:hover": {
                        transform: "scale(1.1)"
                    }
                }
            },
            ".drawer": {
                boxShadow: "1px 1px 5px 2px rgba(0,0,0,.2)",
                color: "<0>",
                backgroundColor: "#FFF",
                minWidth: "200px",
                maxHeight: "300px",
                overflowY: "auto",
                position: "absolute",
                left: "0",
                top: "3em",
                display: "inline-block",
                zIndex: "2",
                nested: {
                    ".loading": {
                        borderRadius: "100%",
                        border: "2px transparent solid",
                        borderTop: "2px #333 solid",
                        animation: "rotate 1s linear infinite",
                        width: "20px",
                        height: "20px",
                        marginLeft: "auto",
                        marginRight: "auto",
                        transition: "height ease-in-out .1s",
                        padding: "5px",
                        nested: {
                            "&.hidden": {
                                display: "none"
                            }
                        }
                    },
                    "&.collapsed": {
                        maxHeight: "0",
                        overflow: "hidden",
                        opacity: "0"
                    }
                }
            }
        }
    }
};
