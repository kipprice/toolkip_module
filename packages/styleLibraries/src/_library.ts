import { Styles, createStyleElement, combineStyles, stringifyStyles } from '@toolkip/style-helpers';
import { IDictionary, isEmptyObject } from '@toolkip/object-helpers';
import { removeElement } from '@toolkip/html-helpers';
import { nextRender } from '@toolkip/async';
import { equals } from '@toolkip/comparable';

/**----------------------------------------------------------------------------
 * @class	Library
 * ----------------------------------------------------------------------------
 * keep track of all styles that are necessary for styling all elements
 * @author	Kip Price
 * @version	1.0.0
 * ----------------------------------------------------------------------------
 */
export abstract class _Library {
    //.....................
    //#region PROPERTIES
    
    /* the styles themselves, indexed by the unique key that created them */
    protected _rawStyles: IDictionary<Styles> = {};

    /* the style elements that have been created */
    protected _elems: IDictionary<HTMLStyleElement> = {};

    protected abstract get _idSuffix(): string;
    
    //#endregion
    //.....................

    //..........................................
    //#region MANAGE IDENTFIERS

    protected _lastId: number = 0;

    public getNextId() {
        this._lastId += 1;
        return this._lastId.toString()
    }
    
    //#endregion
    //..........................................

    //..........................................
    //#region PUBLIC ACCESSORS
    
    /**
     * hasStyles
     * ----------------------------------------------------------------------------
     * check if a certain set of styles (as marled by a unique key) have already
     * been rendered 
     * @param   uniqueKey   The key to check for styles
     * @returns True if this key already has registered styles
     */
    public hasStyles(uniqueKey: string): boolean {
        return !!this._rawStyles[uniqueKey];
    }

    /**
     * add
     * ----------------------------------------------------------------------------
     * add in a set of distinct styles to be tracked & rendered in style elements.
     * standardly called when instantiating the first instance of a stylable 
     * element.
     * 
     * The general flow is:
     *  1) verify that these styles don't already exist (or that it is safe to recreate)
     *  2) merge any existing styles with the newly provided styles
     *  3) update the style elements that use these styles
     * 
     * @param   uniqueKey   The key to associate with these styles
     * @param   styles      The styles to add
     * @param   force       If provided, ignores when the styles are already 
     *                      created
     */
    public add(uniqueKey: string, styles: Styles, force?: boolean ) {

        const existingStyles = this._getOrCreateExistingStyles(uniqueKey);
        const mergedStyles = this._merge([ existingStyles, styles ]);
        if (!this._shouldAdd(existingStyles, mergedStyles, force)) { return; }

        // merge in with any styles that are already set for this element
        // & update the associated element 
        this._rawStyles[uniqueKey] = mergedStyles;
        this._updateElems(mergedStyles, uniqueKey)
        
    }

    protected _shouldAdd(existingStyles, mergedStyles, force) {
        if (force) { return true; }
        if (isEmptyObject(existingStyles)) { return true; }
        if (!equals(existingStyles, mergedStyles)) { return true; }
        return false;
    }

    /**
     * removeStyles
     * ----------------------------------------------------------------------------
     * handle removing style elements from the library
     * @param   uniqueKey   The set of styles to remove
     * @returns true if the styles were successfully removed, false otherwise
     */
    public remove(uniqueKey: string): boolean {
        if (!this._rawStyles[uniqueKey]) {
            return false; 
        }

        // delete the style element from the UI
        removeElement(this._elems[uniqueKey]);

        // remove from our data stores
        delete this._rawStyles[uniqueKey];
        delete this._elems[uniqueKey];

        return true;
    }
    
    //#endregion
    //..........................................
    
    private _merge(styles: Styles[]): Styles {
        if (styles.length < 1) { return null; }
        return combineStyles(...styles)
    }

    private _stringify(styles: Styles): string[] {
        return stringifyStyles(styles);
    }

    protected _updateElems(styles: Styles, uniqueKey?: string): void  {
        let stringifiedStyles = this._stringify(styles);

        for (let cIdx = 0; cIdx < stringifiedStyles.length; cIdx += 1) {
                let elem = this._getOrCreateElem(uniqueKey);
                elem.innerHTML = stringifiedStyles[cIdx];
        }
    }

    protected _getOrCreateElem(uniqueKey: string): HTMLStyleElement {
        if (this._elems[uniqueKey]) { return this._elems[uniqueKey]; }

        // create the element if we haven't yet, and register it to this ID
        let elem = createStyleElement(`${uniqueKey}-${this._idSuffix}`)
        this._elems[uniqueKey] = elem;
        nextRender().then(() => document.head.appendChild(elem));
        return elem; 
    }

    private _getOrCreateExistingStyles(uniqueKey: string): Styles {
        if (!this._rawStyles[uniqueKey]) { 
            this._rawStyles[uniqueKey] = {}; 
        }
        return this._rawStyles[uniqueKey];
    }
    
    //..........................................
    //#region RETRIEVE ELEMENTS AS NEEDED
    
    public getElemForKey(uniqueKey: string): HTMLStyleElement {
        if (!this._elems[uniqueKey]) { return null; }
        return this._elems[uniqueKey];
    }

    public get(uniqueKey: string): Styles {
        if (!this._rawStyles[uniqueKey]) { return null; }
        return this._rawStyles[uniqueKey];
    }
    
    //#endregion
    //..........................................
}