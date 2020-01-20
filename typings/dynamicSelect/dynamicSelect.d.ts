import { Drawable } from "../drawable/drawable";
import { Collection } from "../dataStructures/collection/collection";
import { DynamicOption } from "./dynamicOption";
import { IDynamicSelectElems, IDynamicOption } from "./_interfaces";
import { IStandardStyles } from "../styleHelpers/_interfaces";
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
export declare abstract class DynamicSelect extends Drawable {
    /** keep track of the options that are available for this select field */
    protected _availableOptions: Collection<DynamicOption>;
    /** keep track of whether we are currently running a query */
    protected _isQuerying: boolean;
    /** keep track of the next query we need to run if we're already querying */
    protected _nextQuery: string;
    /** keep track of the current query we're running */
    protected _currentQuery: string;
    /** keep track of elements needed for the select element */
    protected _elems: IDynamicSelectElems;
    /** make sure we can let listeners know about changes in this element*/
    protected _selectListeners: Function[];
    /** keep track of general change listeners */
    protected _changeListeners: Function[];
    /** keep track of the listeners for searching */
    protected _searchListeners: Function[];
    protected _value: string;
    get value(): string;
    /** keep track of the styles associated with this select field */
    protected static _uncoloredStyles: IStandardStyles;
    /**
     * DynamicSelect
     * ----------------------------------------------------------------------------
     * Create the Dynamic Select element
     */
    constructor();
    /**
     * _createElements
     * ----------------------------------------------------------------------------
     * Generate the elements needed by the dynamic select field
     */
    protected _createElements(): void;
    /**
     * _expandDrawer
     * ----------------------------------------------------------------------------
     * Expand the drawer of options
     */
    protected _expandDrawer(): void;
    /**
     * _collapseDrawer
     * ----------------------------------------------------------------------------
     * Collapse the drawer of options
     */
    protected _collapseDrawer(): void;
    /**
     * addOption
     * ----------------------------------------------------------------------------
     * Adds an option to our select field
     *
     * @param   opt     The option to add
     */
    addOption(opt: IDynamicOption): void;
    /**
     * addOptions
     * ----------------------------------------------------------------------------
     * Add a set of options to the select element
     * @param   opts    The options to add
     */
    addOptions(opts: IDynamicOption[]): void;
    /**
     * addEventListener
     * ----------------------------------------------------------------------------
     * Allow additional listeners on this select field
     */
    addEventListener(type: "select" | "change" | "search" | keyof WindowEventMap, func: Function): void;
    /**
     * _notifyChangeListeners
     * ----------------------------------------------------------------------------
     * Notify any listeners that some content changed
     */
    protected _notifyChangeListeners(): void;
    /**
     * _notifySelectListeners
     * ----------------------------------------------------------------------------
     * Notify any listeners that we have selected an element
     * @param   selectedOption  The option that was selected
     */
    protected _notifySelectListeners(selectedOption: DynamicOption): void;
    /**
     * _notifySearchListeners
     * ----------------------------------------------------------------------------
     * @param search
     */
    protected _notifySearchListeners(search: string): void;
    /**
     * _onChange
     * ----------------------------------------------------------------------------
     * Handle when the text field changes
     *
     * @param   e   Change event
     */
    protected _onQueryTextChange(e: Event): void;
    /**
     * _onKeyUp
     * ----------------------------------------------------------------------------
     * Check if we need to handle an enter press in the text field
     *
     * @param   e   The keyboard event fired
     */
    protected _onKeyEvent(e: KeyboardEvent): void;
    /**
     * _onBlur
     * ----------------------------------------------------------------------------
     * Handle when focus is lost on the search element
     * @param   event   The focus event
     */
    protected _onBlur(event: Event): void;
    /**
     * _onFocus
     * ----------------------------------------------------------------------------
     * Handle when focus is given to the search element
     * @param   event   The focus event
     */
    protected _onFocus(event: Event): void;
    /**
     * select
     * ----------------------------------------------------------------------------
     * Handle selecting an element in the search field
     * @param   selectedOption  The option that was selected
     */
    select(selectedOption: DynamicOption): void;
    /**
     * search
     * ----------------------------------------------------------------------------
     * Handle searching for a string that wasn't an option in
     * our search results
     */
    search(searchStr: string): void;
    /**
     * _updateFiltering
     * ----------------------------------------------------------------------------
     * make sure our filtered text reflects the most up-to-date value in the
     * text field
     */
    _updateFiltering(curText: string): void;
    /**
     * _query
     * ----------------------------------------------------------------------------
     * Handle querying for additional options to add
     * @param   queryText   The text to search
     */
    protected _query(queryText?: string): void;
    clear(): void;
    /**
     * _onQuery
     * ----------------------------------------------------------------------------
     * Queries an appropriate source to find new values to add to the select.
     * Expectation is that new queries get added to the available options through
     * addOption(s).
     *
     * @param   queryText   Text that should be used to find new options
     *
     * @returns A promise that will complete the query to the appropriate source
     */
    protected abstract _onQuery(queryText: string): Promise<any>;
}
