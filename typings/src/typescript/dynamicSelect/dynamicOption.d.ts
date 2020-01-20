import { Drawable } from "../drawable/drawable";
import { IDynamicOption, IDynamicOptionElems, IDynamicSelect } from "./_interfaces";
import { IStandardStyles } from "../../styleHelpers/_interfaces";
/**----------------------------------------------------------------------------
 * @class DynamicOption
 * ----------------------------------------------------------------------------
 * Create an option for a dynamic select field
 * @author  Kip Price
 * @version 1.0.0
 * ----------------------------------------------------------------------------
 */
export declare class DynamicOption extends Drawable implements IDynamicOption {
    /** unique ID for the option */
    protected _id: string;
    get id(): string;
    /** display string for the option */
    protected _display: string;
    get display(): string;
    /** determine whether this option is currently filtered */
    protected _isFiltered: boolean;
    get isFiltered(): boolean;
    /** determine whether this option is selected */
    protected _isSelected: boolean;
    get isSelected(): boolean;
    /** keep track of the elements */
    protected _elems: IDynamicOptionElems;
    /** keep track of the dynamic select element for this option */
    protected _selectParent: IDynamicSelect;
    /** track styles for the option field */
    protected static _uncoloredStyles: IStandardStyles;
    /**
     * DynamicOption
     * ----------------------------------------------------------------------------
     * Create the dynamic option
     * @param   opt     Details of the option we are creating
     */
    constructor(opt: IDynamicOption, parent: IDynamicSelect);
    /**
     * _shouldSkipCreateElements
     * ----------------------------------------------------------------------------
     * Determine if we should avoid creating elements in the constructor
     * @returns True if we should skip the create elements
     */
    protected _shouldSkipCreateElements(): boolean;
    /**
     * _createElements
     * ----------------------------------------------------------------------------
     * Create elements for this option
     */
    protected _createElements(): void;
    /**
     * select
     * ----------------------------------------------------------------------------
     * Select this particular element
     */
    select(): boolean;
    /**
     * hilite
     * ----------------------------------------------------------------------------
     * Hilite the current selected element
     */
    hilite(): boolean;
    /**
     * unhilite
     * ----------------------------------------------------------------------------
     * remove hiliting of the current selected element
     */
    unhilite(): boolean;
    /**
     * _filter
     * ----------------------------------------------------------------------------
     * Filter out this option if appropriate
     */
    protected _filter(): void;
    /**
     * _unfilter
     * ----------------------------------------------------------------------------
     * Remove filtering for this option if appropriate
     */
    protected _unfilter(): void;
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
    tryFilter(words: string[]): Promise<void>;
}
