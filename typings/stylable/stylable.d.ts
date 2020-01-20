import { IStandardStyles, ICustomFonts, TypedClassDefinition } from '../styleHelpers/_interfaces';
import { StandardElement } from '../drawable/_interfaces';
import { IDictionary } from '../objectHelpers/_interfaces';
import { NamedClass } from '../namedClass/namedClass';
/**----------------------------------------------------------------------------
 * @class Stylable
 * ----------------------------------------------------------------------------
 * Creates an element that can additionally add CSS styles
 * @author  Kip Price
 * @version 1.1.2
 * ----------------------------------------------------------------------------
 */
export declare abstract class Stylable extends NamedClass {
    /** create the collection of all styles that have been added to the page */
    private static _pageStyles;
    /** hold the style tag containing our css class */
    private static _styleElems;
    /** keep track of all of the classes without the color substitutions */
    private static _themedStyles;
    /** keep track of all of the theme colors for each of the classes */
    private static _themeColors;
    /** hold the style tag that contains color-specific classes */
    private static _colorStyleElems;
    /** keep track of the custom fonts for the page */
    private static _customPageFonts;
    /** keep track of the custom fonts */
    private static _customFontElem;
    /** keep track of the styles we've already created */
    private static _createdStyles;
    /**
     * _buildThemeColorId
     * ----------------------------------------------------------------------------
     * Create a unique ID for a color for a particular class
     *
     * @param   idx         The index of the color
     * @param   uniqueID    Optional name to use instead of the class name
     *
     * @returns The created color ID
     */
    protected static _buildThemeColorId(uniqueId: string): string;
    /**
     * _containedPlaceholder
     * ----------------------------------------------------------------------------
     * check if a particular value string has a placeholder within it
     * @param   value   The value to check
     * @returns True if a placeholder is found
     */
    protected static _containedPlaceholder(value: string): string;
    /**
     * _findAllContainedPlaceholders
     * ----------------------------------------------------------------------------
     * check if a particular value string has a placeholder within it
     * @param   value   The value to check
     * @returns True if a placeholder is found
     */
    protected static _findAllContainedPlaceholders(styles: IStandardStyles): string[];
    /**
     * _updateAllThemeColors
     * ----------------------------------------------------------------------------
     * Make sure we have an updated version of our styles
     */
    protected static _updateAllThemeColors(): void;
    /**
     * _updateThemeColor
     * ----------------------------------------------------------------------------
     * updates an individual theme color
     * @param   colorId     The color ID to update
     */
    protected static _updateThemeColor(colorId: string): void;
    /**
     * _updateColorInClassDefinition
     * ----------------------------------------------------------------------------
     * checks whether a color is replacing a current color ID in the definition
     * @param def
     * @param colorId
     */
    protected static _updateColorInClassDefinition(def: TypedClassDefinition, colorId: string): boolean;
    /**
     * _mergeIntoStyles
     * ----------------------------------------------------------------------------
     * Add a new set of styles into the set of page styles
     * @param   styles  The styles to merge
     */
    protected static _mergeIntoStyles(styles: IStandardStyles): void;
    /**
     * _mergeThemes
     * ----------------------------------------------------------------------------
     * Mere a set of themes into a single theme
     * @param   styles  Sets of themes that should be merged together
     * @returns The updated set of themes
     */
    protected static _mergeThemes(placeholderToMatch: string, ...styles: IStandardStyles[]): IStandardStyles;
    /**
     * _mergeColorThemes
     * ----------------------------------------------------------------------------
     * Merge color specific style elements into our color arrays
     * @param   styles  Styles to combine into color-specific sets
     * @returns The created dictionary of theme specific colors
     */
    protected static _mergeColorThemes(...styles: IStandardStyles[]): IDictionary<IStandardStyles>;
    /**
     * _combineThemes
     * ----------------------------------------------------------------------------
     * @param   themes  The themes to combine
     * @returns The merged themes
     */
    private static _combineThemes;
    /**
     * _mergeDefinitions
     * ----------------------------------------------------------------------------
     * merge a particular set of definitions
     * @param   definitions     The definitions to merge
     * @returns The merged set of definitions
     */
    private static _mergeDefinition;
    /**
     * _mergeIntoFonts
     *
     * @param fonts
     *
     */
    protected static _mergeIntoFonts(fonts: ICustomFonts): void;
    /**
     * _createStyles
     * ----------------------------------------------------------------------------
     * Create the styles for this class
     * @param   forceOverride   True if we should create the classes even if they
     *                          already exist
     */
    protected static _createStyles(forceOverride?: boolean): void;
    /**
     * _createFontStyles
     * ----------------------------------------------------------------------------
     * @param forceOverride
     */
    protected static _createFontStyles(forceOverride?: boolean): void;
    /**
     * _createColoredStyles
     * ----------------------------------------------------------------------------
     * Create all styles for color-affected classes
     * @param   forceOverride   If true, regenerates all styles for colors
     */
    protected static _createAllColoredStyles(forceOverride?: boolean): void;
    /**
     * _createColorStyle
     * ----------------------------------------------------------------------------
     * Create a particular color's style
     * @param   styles          The styles to create for this color
     * @param   colorId         The ID of the color
     * @param   forceOverride   If true, regenerates the classes for this color
     */
    protected static _createColoredStyles(styles: IStandardStyles, colorId: string, forceOverride?: boolean): void;
    /**
     * _sharedCreateStyles
     * ----------------------------------------------------------------------------
     * Creates styles (either colored or not)
     * @param   styles
     * @param   elems
     * @param   forceOverride
     */
    protected static _sharedCreateStyles(styles: IStandardStyles, elems: HTMLStyleElement[], forceOverride?: boolean): HTMLStyleElement[];
    /**
     * _addNewElement
     * ----------------------------------------------------------------------------
     * @param elems
     */
    protected static _addNewElement(elems: any): HTMLStyleElement;
    /**
     * _cleanStyles
     * ----------------------------------------------------------------------------
     * Clean the nested styles data so that we can parse it properly
     * @param   styles  The styles to clean
     * @returns The cleaned styles
     */
    protected static _cleanStyles(styles: IStandardStyles, lastSelector?: string): IStandardStyles;
    /**
     * _cleanClassDef
     * ----------------------------------------------------------------------------
     * Clean a particular class definition recursively
     * @param   selector    The CSS selector for this class
     * @param   classDef    The definition for this CSS class
     * @returns The merged styles
     */
    protected static _cleanClassDef(selector: string, classDef: TypedClassDefinition): IStandardStyles;
    /** keep track of the styles defined by this class */
    private _styles;
    /** keep track of the un-themed version of our styles */
    protected static _uncoloredStyles: IStandardStyles;
    private get _uncoloredStyles();
    get uncoloredStyles(): IStandardStyles;
    /** overridable function to grab the appropriate styles for this particular class */
    protected _getUncoloredStyles(): IStandardStyles;
    /** keep track of the fonts defined by this element */
    protected static _customFonts: ICustomFonts;
    private get _customFonts();
    get customFonts(): ICustomFonts;
    /** overridable function to grab the appropriate fonts for this particular class */
    protected _getCustomFonts(): ICustomFonts;
    /** keep track of the initial set of colors */
    protected _colors: IDictionary<string>;
    /** keep track of whether we've initialized our styles */
    protected _hasCreatedStyles: boolean;
    /**
     * Stylable
     * ----------------------------------------------------------------------------
     * Creates a stylable class
     */
    constructor();
    /**
     * _registerMediaListeners
     * ----------------------------------------------------------------------------
     * Auto-apply various styles for easier mobile-optimizing
     */
    protected _registerMediaListeners(): void;
    /**
     * _registerMediaListener
     * ----------------------------------------------------------------------------
     * Register a listener to detect if a particular media query passes
     *
     * @param   matchQuery   The media query to test for matching
     *
     * @param   classToApply    What class to apply if the query matches
     *
     * @param   elem            If included, the element that should have the class
     *                          auto-applied
     */
    protected _registerMediaListener(matchQuery: string, classToApply: string, elem?: StandardElement): void;
    /**
     * _applyColors
     * ----------------------------------------------------------------------------
     * Apply the appropriate theme colors
     * @param   otherElem   If passed in, sets a theme color on a different element
     */
    protected _applyColors(otherElem?: Stylable): void;
    /**
     * setThemeColor
     * ----------------------------------------------------------------------------
     * Update a theme color based on placeholders
     *
     * @param   uniqueId        The index of the theme color
     * @param   color           The color to replace it with
     * @param   noReplace       True if we shouldn't replace an existing color
     */
    setThemeColor(colorId: string, color: string, noReplace?: boolean): void;
    /**
     * _buildThemeColorId
     * ----------------------------------------------------------------------------
     * Create a unique ID for a color for a particular class
     *
     * @param   idx         The index of the color
     * @param   uniqueID    Optional name to use instead of the class name
     *
     * @returns The created color ID
     */
    protected _buildThemeColorId(uniqueId?: string): string;
    /**
     * _mergeThemes
     * ----------------------------------------------------------------------------
     * Instance class to merge different themes
     *
     * @param   themes  The themes to merge
     *
     * @returns The merged themes
     */
    protected _mergeThemes(...themes: IStandardStyles[]): IStandardStyles;
    /**
     * mergeInStyles
     * ----------------------------------------------------------------------------
     * allow a caller to add styles after class creation, to more specifically
     * override the styles of a class
     *
     * TODO: actually apply styles individually instead of globally
     */
    mergeInStyles(...themes: IStandardStyles[]): this;
    /**
     * _createStyles
     * ----------------------------------------------------------------------------
     * Create the styles for this class
     * @param   forceOverride   True if we should create the classes even if they
     *                          already exist
     */
    protected _createStyles(forceOverride?: boolean): void;
    /**
     * _cleanStyles
     * ----------------------------------------------------------------------------
     * Clean the nested styles data so that we can parse it properly
     * @param   styles  The styles to clean
     * @returns The cleaned styles
     */
    protected _cleanStyles(styles: IStandardStyles, lastSelector?: string): IStandardStyles;
}
