import { _Library } from "./_library";
import { map, combineObjects, setDictValue, isEmptyObject, IDictionary, getKeys } from '@toolkip/object-helpers';
import { IFlatStyles, indexByPlaceholder, PlaceholderIndex, mapIndexToStyle, replacePlaceholders } from '@toolkip/style-helpers';
import { IPlaceholderReplaceOptions } from "./_interfaces";
import { StandardElement } from '@toolkip/shared-types';
import { doesElementMatchSelector } from '@toolkip/html-helpers';

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
class _PlaceholderLibrary extends _Library{
    //.....................
    //#region PROPERTIES
    
    /** 
     * keep track of the index version of our placeholders 
     * this is formatted as 
     *  { placeholder -> uniqueKey -> selector -> propertyName -> true }
     * 
     * when we extract data, we will do so through mapping the index onto 
     * the actual styles stored within our rawStyles property
    **/
    private _indexedPlaceholders: PlaceholderIndex = {};

    /** suffix the generate styles with the appropriate sub id */
    protected get _idSuffix() { return "placeholder"}
    
    //#endregion
    //.....................

    //..........................................
    //#region INDEX PLACEHOLDERS

    /**
     * _indexByPlaceholder
     * ----------------------------------------------------------------------------
     * create the index compared against the styles
     */
    private _indexByPlaceholder(styles: IFlatStyles, uniqueKey: string): PlaceholderIndex {
        let d = { [uniqueKey]: styles }
        let out = indexByPlaceholder(d);

        map(out, (dict, placeholder: string) => {
            if (!dict[uniqueKey]) { return; }

            // what a mess...everything about this class is a mess

            // ==> get the styles, indexed by placeholders
            let placeholderIdx = this._indexedPlaceholders[placeholder] || {};

            //==> merge into the exsting styles
            let uniqueIdx = placeholderIdx[uniqueKey] || {};
            let combo = combineObjects(uniqueIdx, dict[uniqueKey]);
            
            setDictValue(this._indexedPlaceholders, combo, [placeholder, uniqueKey]);
        });

        return out;
    }

    /**
     * _updateElems
     * ----------------------------------------------------------------------------
     * create the appropriate elements
     */
    protected _updateElems(styles: IFlatStyles, uniqueKey: string): void {
        let indexed = this._indexByPlaceholder(styles, uniqueKey);
        
        map(indexed, (dict, placeholder: string) => {
            let idx = dict[uniqueKey];
            let builtStyles = mapIndexToStyle(
                idx, 
                this._rawStyles[uniqueKey] as IFlatStyles
            )

            if (!builtStyles) { return; } // this shouldn't happen

            this._updatePlaceholderElem(builtStyles, uniqueKey, placeholder);
        })
    }

    protected _updatePlaceholderElem(styles: IFlatStyles, uniqueKey: string, placeholder: string): void {
        super._updateElems(styles, this._formatElemString(uniqueKey, placeholder))
    }
    
    //#endregion
    //..........................................

    //..........................................
    //#region REPLACE PLACEHOLDERS
    
    public replacePlaceholder(opts: IPlaceholderReplaceOptions): void {

        // ==> most specific case: styles on a single element
        if (opts.baseElem) { 
            this._replaceSingleElemPlaceholders(opts); 
        }

        // ==> semi-specific: styles for all instances of a given class
        else if (opts.uniqueKey) { 
            this._replacePlaceholderForKey(opts); 
        }

        // ==> global: replace all instances of this placeholder
        else { this._replacePlaceholdersForMultipleKeys(opts); }
        
    }

    private _replacePlaceholdersForMultipleKeys(opts: IPlaceholderReplaceOptions): void {
        const idx = this._indexedPlaceholders[opts.placeholder];
        if (!idx || isEmptyObject(idx)) { return; }

        // loop through each of the unique keys affected by this placeholder change
        // and apply the unique-key specific code
        map(idx, (_, uniqueKey: string) => {
            opts.uniqueKey = uniqueKey;
            this._replacePlaceholderForKey(opts);
            opts.uniqueKey = null;
        })
    }

    private _replacePlaceholderForKey(opts: IPlaceholderReplaceOptions): void {
        if (!opts.uniqueKey) { return; }
        const replacedStyles = this._replacePlaceholderViaIndex(opts);

        // update the appropriate text in our style element(s)
        this._updatePlaceholderElem(
            replacedStyles, 
            opts.uniqueKey, 
            opts.placeholder
        );

    }

    private _replaceSingleElemPlaceholders(opts: IPlaceholderReplaceOptions): void {
        if (!opts.uniqueKey || !opts.newValue) { return; }
        const replacedStyles: IFlatStyles = this._replacePlaceholderViaIndex(opts);
        const matches = this._findMatches(opts.baseElem, getKeys(replacedStyles));

        // actually do the individual replacement
        map(matches, (matchedElems: StandardElement[], selector: string) => {
            for (let matchedElem of matchedElems) {
                map(replacedStyles[selector], (pVal: any, pName: string) => {
                    matchedElem.style[pName] = pVal;
                })
            }
        })
    }

    /**
     * _findMatches
     * ----------------------------------------------------------------------------
     * find all of the elements that match any of the specified selectors that are 
     * also a part of the specified element's descendant tree
     */
    private _findMatches(parent: StandardElement, selectors: string[]): IDictionary<StandardElement[]> {
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
    private _findMatch(parent: StandardElement, selector: string): StandardElement[] {
        let out = [];
        let nodeQueue = [parent];
        let cnt = 0;

        // keep going until we have checked all nodes within our queue
        while(cnt < nodeQueue.length) {
            let currentNode = nodeQueue[cnt];
            
            // if this is a match, add it to our output array
            if (doesElementMatchSelector(currentNode, selector)) {
                out.push(currentNode);
            }
            
            // add the next set of nodes & increment
            nodeQueue = nodeQueue.concat([ ...currentNode.childNodes ] as StandardElement[]);
            cnt += 1;
        }

        return out;
    }
    
    //#endregion
    //..........................................

    //..........................................
    //#region HELPERS
    
    private _replacePlaceholderViaIndex(opts: IPlaceholderReplaceOptions): IFlatStyles {
        if (!this._indexedPlaceholders[opts.placeholder]) {
            this._indexedPlaceholders[opts.placeholder] = {}
        }
        const styles = this._indexedPlaceholders[opts.placeholder][opts.uniqueKey] || {};
        let mappedStyles = mapIndexToStyle(
            styles, 
            this._rawStyles[opts.uniqueKey] as IFlatStyles
        );
        return replacePlaceholders(mappedStyles, opts.placeholder, opts.newValue);
    }

    private _formatElemString(uniqueKey: string, placeholder: string): string {
        return `${uniqueKey}-${placeholder}`;
    }
    
    //#endregion
    //..........................................
}


export const PlaceholderLibrary = new _PlaceholderLibrary();