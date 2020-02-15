import { IStandardStyles, ICustomFonts } from '../styleHelpers/_interfaces';
import { IConstructor, IDictionary } from '../objectHelpers/_interfaces';
import { isEmptyObject, getPrototype } from '../objectHelpers/navigate';
import { _NamedClass } from '../namedClass/namedClass';
import { flattenStyles } from '../styleHelpers/flattener';
import { registerStandardMediaQueries } from '../mediaQueries/mediaQueries';
import { splitStyles } from "../styleHelpers/placeholders";
import { StyleLibrary } from '../styleLibraries/styleLibrary';
import { PlaceholderLibrary } from '../styleLibraries/placeholderlibrary';
import { combineStyles } from '../styleHelpers';
import { StandardElement } from '../drawable';
import { IStylableDependency } from '.';

/**----------------------------------------------------------------------------
 * @class Stylable
 * ----------------------------------------------------------------------------
 * Creates an element that can additionally add CSS styles
 * @author  Kip Price
 * @version 1.1.2
 * ----------------------------------------------------------------------------
 */
export abstract class _Stylable<P extends string = string> extends _NamedClass {

    //................................................
    //#region PROPERTIES

    /** keep track of the un-themed version of our styles */
    protected static _uncoloredStyles: IStandardStyles;
    protected get _uncoloredStyles(): IStandardStyles { return (this.constructor as typeof _Stylable)._uncoloredStyles; }

    private _mergedStyles: IStandardStyles;

    /** store the values we've set for various placeholders */
    protected _placeholderValues: Partial<IDictionary<any, P>> = {};

    /** store the dependencies that this class has on other stylables */
    protected static _styleDependencies: IStylableDependency[] = [];
    private get _styleDependencies() { return (this.constructor as typeof _Stylable)._styleDependencies; }

    /** overridable function for grabbing a unique key for this element */
    protected get _uniqueKey(): string { return (this.constructor as any).name; }

    //#endregion
    //................................................

    //..........................................
    //#region STATIC METHODS
    
    /**
     * createStyles
     * ----------------------------------------------------------------------------
     * creates all of the styles that are associated with this stylable, or 
     * listed as dependencies. This is performed at the class level because an
     * implementer of the Stylable could legitimately be uninstantiable (e.g. 
     * an abstract parent class like Shield) 
     * 
     * @param   uniqueKey   The identifier for this class; uses the name of the class 
     *                      if not provided
     * @param
     */
    public static createStyles(uniqueKey?: string, mergedStyles?: IStandardStyles, forceOverride?: boolean) {
        if (!uniqueKey) { uniqueKey = this.name; }
        if (!mergedStyles) { mergedStyles = this._uncoloredStyles; }
        
        this._createParentStyles();
        this._createStyleDependencies();
        this._createSelfStyles(uniqueKey, mergedStyles, forceOverride);
    }

    /**
     * _createStyleDependencies
     * ----------------------------------------------------------------------------
     * render all of the styles that this drawable is dependent on existing
     */
    private static _createStyleDependencies() {
        const dependencies = this._styleDependencies;
        if (!dependencies) { return; }

        // loop through dependencies and ensure they have their styles created
        for (let s of dependencies) {
            (s as any).createStyles();
        }
    }

    private static _createParentStyles() {
        // first prototype is of this class; second
        // is the parent
        let parent = getPrototype(getPrototype(this));
        while(parent && isStylable(parent)) {
            const pConstructor = parent.constructor as any;
            if (pConstructor.hasOwnProperty("_uncoloredStyles")) {
                (pConstructor as any).createStyles();
            }

            parent = getPrototype(parent)
        }

    }

    /**
     * _createStyles
     * ----------------------------------------------------------------------------
     * Create the styles for this class 
     * @param   forceOverride   True if we should create the classes even if they 
     *                          already exist
     */
    private static _createSelfStyles(uniqueKey: string, mergedStyles: IStandardStyles, forceOverride?: boolean): void {
        
        // if we don't have styles, or we've already created, quit
        if (isEmptyObject(mergedStyles)) { return; }
        if (StyleLibrary.hasStyles(uniqueKey) && !forceOverride) { return; }

        // ==> flatten & split our styles
        let flattenedStyles = flattenStyles(mergedStyles);
        let split = splitStyles(flattenedStyles);

        // ==> send the styles to their appropriate handlers
        StyleLibrary.add(uniqueKey, split.standard, forceOverride);
        PlaceholderLibrary.add(uniqueKey, split.withPlaceholders, forceOverride);

    }
    
    //#endregion
    //..........................................

    //...........................
    //#region INSTANCE METHODS

    /**
     * Stylable
     * ----------------------------------------------------------------------------
     * Creates a stylable class
     */
    constructor() {
        super("Stylable");
        this._mergedStyles = this._uncoloredStyles;
        this._createStyles();
        registerStandardMediaQueries();
    }

    /**
     * mergeInStyles
     * ----------------------------------------------------------------------------
     * allow a caller to add styles after class creation, to more specifically
     * override the styles of a class
     */
    public mergeInStyles(...themes: IStandardStyles[]) {
        this._mergedStyles = combineStyles(this._mergedStyles, ...themes) as IStandardStyles;
        this._createStyles(true);
        return this;
    }

    

    /**
     * createStyles
     * ----------------------------------------------------------------------------
     * allow for creating this stylables styles from outside of a specific class
     * replaces the "preemptivelyCreateStyles" function
     */
    private _createStyles(forceOverride?: boolean) {
        if (this._shouldSkipStyles()) { return; }
        (this.constructor as any).createStyles(
            this._uniqueKey,
            this._mergedStyles,
            forceOverride
        )
    }

    private _shouldSkipStyles(): boolean {
        const c = this.constructor;
        // check if the properties are our own
        if (c.hasOwnProperty("_uncoloredStyles")) { return false; }

        // check if the parent styles were already created
        const parentProto = getPrototype(getPrototype(c));
        if (PlaceholderLibrary.hasStyles(parentProto._uniqueKey)) {
            return true;
        }

        return false;
    }



    protected _defaultPlaceholder(placeholderName: P, defaultValue: any): any[] {
        return [
            defaultValue,
            `<${placeholderName}>`
        ];
    }

    /**
     * replacePlaceholder
     * ----------------------------------------------------------------------------
     * replace all instances of the specified placeholder with the provided value
     * across all instances of this stylable
     */
    public replacePlaceholder(placeholderName: P, placeholderValue: any, force?: boolean): void {
        if (this._placeholderValues[placeholderName] && !force) { return; } 
        this._placeholderValues[placeholderName] = placeholderValue;
        

        // replace in our own styles
        PlaceholderLibrary.replacePlaceholder({
            placeholder: placeholderName, 
            newValue: placeholderValue,
            uniqueKey: this._uniqueKey
        });

        // replace in any dependant styles
        for (let s of this._styleDependencies) {
            PlaceholderLibrary.replacePlaceholder({
                placeholder: placeholderName,
                newValue: placeholderValue,
                uniqueKey: s.name
            })
        }
    }

    /**
     * overridePlaceholder
     * ----------------------------------------------------------------------------
     * replace all instancaes of the specified placeholder with the provided value
     * only for this particular instance 
     */
    public overridePlaceholder(placeholderName: P, placeholderValue: any, elem: StandardElement): void {
        PlaceholderLibrary.replacePlaceholder({
            placeholder: placeholderName, 
            newValue: placeholderValue,
            uniqueKey: this._uniqueKey,
            baseElem: elem
        });
    }

    //#endregion
    //...........................
}

function isStylable (obj: any): obj is _Stylable {
    return !!(obj as _Stylable).mergeInStyles;
}