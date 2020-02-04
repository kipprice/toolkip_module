import { IStandardStyles, ICustomFonts } from '../styleHelpers/_interfaces';
import { IConstructor } from '../objectHelpers/_interfaces';
import { isEmptyObject } from '../objectHelpers/navigate';
import { cloneObject } from '../objectHelpers/cloning';
import { NamedClass } from '../namedClass/namedClass';
import { flattenStyles } from '../styleHelpers/flattener';
import { registerStandardMediaQueries } from '../mediaQueries/mediaQueries';
import { splitStyles } from "../styleHelpers/placeholders";
import { StyleLibrary } from './libraries/styleLibrary';
import { PlaceholderLibrary } from './libraries/placeholderlibrary';
import { FontLibrary } from './libraries/fontLibrary';

/**----------------------------------------------------------------------------
 * @class Stylable
 * ----------------------------------------------------------------------------
 * Creates an element that can additionally add CSS styles
 * @author  Kip Price
 * @version 1.1.2
 * ----------------------------------------------------------------------------
 */
export abstract class Stylable<P extends string = string> extends NamedClass {

    //................................................
    //#region PROPERTIES

    /** keep track of the un-themed version of our styles */
    protected static _uncoloredStyles: IStandardStyles;
    private get _uncoloredStyles(): IStandardStyles { return (this.constructor as typeof Stylable)._uncoloredStyles; }

    /** store the dependencies that this class has on other stylables */
    protected static _styleDependencies: IConstructor<Stylable>[];

    /** overridable function to grab the appropriate styles for this particular class */
    protected _getUncoloredStyles(): IStandardStyles {
        return (this.constructor as typeof Stylable)._uncoloredStyles;
    }

    /** keep track of the fonts defined by this element */
    protected static _customFonts: ICustomFonts = {};
    private get _customFonts(): ICustomFonts { return (this.constructor as typeof Stylable)._customFonts; }
    public get customFonts(): ICustomFonts { return this._getCustomFonts(); }

    /** overridable function to grab the appropriate fonts for this particular class */
    protected _getCustomFonts(): ICustomFonts {
        return (this.constructor as typeof Stylable)._customFonts;
    }

    /** overridable function for grabbing a unique key for this element */
    protected get _uniqueKey(): string { return (this.constructor as any).name; }

    //#endregion
    //................................................

    //...........................
    //#region INSTANCE METHODS

    /**
     * Stylable
     * ----------------------------------------------------------------------------
     * Creates a stylable class
     */
    constructor() {
        super("Stylable");
        this._createStyles();
        registerStandardMediaQueries();
    }

    

    /**
     * mergeInStyles
     * ----------------------------------------------------------------------------
     * allow a caller to add styles after class creation, to more specifically
     * override the styles of a class
     * 
     * TODO: actually apply styles individually instead of globally
     */
    public mergeInStyles(...themes: IStandardStyles[]) {
        // TODO: handle merging in styles afterwards
        return this;
    }

    /**
     * _createStyles
     * ----------------------------------------------------------------------------
     * Create the styles for this class 
     * @param   forceOverride   True if we should create the classes even if they 
     *                          already exist
     */
    protected _createStyles(forceOverride?: boolean): void {

        // loop through dependencies and ensure they have their styles created
        for (let s of (this.constructor as any)._styleDependencies) {
            s._createStyles();
        }

        // if we don't have styles, or we've already created, quit
        if (isEmptyObject(this._uncoloredStyles)) { return; }
        if (StyleLibrary.hasStyles(this._uniqueKey) && !forceOverride) { return; }

        // ==> flatten & split our styles
        let flattenedStyles = flattenStyles(this._uncoloredStyles);
        let split = splitStyles(flattenedStyles);

        // ==> send the styles to their appropriate handlers
        StyleLibrary.add(this._uniqueKey, split.standard, forceOverride);
        PlaceholderLibrary.add(this._uniqueKey, split.withPlaceholders, forceOverride);
        FontLibrary.add(this._uniqueKey, this._customFonts, forceOverride);

    }

    /**
     * replacePlaceholder
     * ----------------------------------------------------------------------------
     * replace all instances of the specified placeholder with the provided value
     * across all instances of this stylable
     */
    public replacePlaceholder(placeholderName: P, placeholderValue: any): void {
        PlaceholderLibrary.replacePlaceholder({
            placeholder: placeholderName, 
            newValue: placeholderValue,
            uniqueKey: this._uniqueKey
        })
    }

    /**
     * overridePlaceholder
     * ----------------------------------------------------------------------------
     * replace all instancaes of the specified placeholder with the provided value
     * only for this particular instance 
     */
    public overridePlaceholder(placeholderName: P, placeholderValue: any, elem: HTMLElement): void {
        PlaceholderLibrary.replacePlaceholder({
            placeholder: placeholderName, 
            newValue: placeholderValue,
            uniqueKey: this._uniqueKey,
            baseElem: elem
        })

        // TODO: override in drawable
    }

    //#endregion
    //...........................
}