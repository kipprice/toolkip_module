import { IStandardStyles, TypedClassDefinition } from ".";
import { map } from '@kipprice/toolkip-objectHelpers";
import { combineStyles } from "./combiner";

/**----------------------------------------------------------------------------
 * @class	StyleCleaner
 * ----------------------------------------------------------------------------
 * handle cleaning up style definitions
 * @author	Kip Price
 * @version	2.0.0
 * ----------------------------------------------------------------------------
 */
class _StyleFlattener {

    public flatten(styles: IStandardStyles): IStandardStyles {
        return this._flattenStyles(styles, "");
    }

    /**
     * _flattenStyles
     * ----------------------------------------------------------------------------
     * Clean the nested styles data so that we can parse it properly
     * 
     * @param   styles          The styles to clean
     * @param   lastSelector    If included, the selector to preface the cleaned 
     *                          version of this styles with
     * 
     * @returns The cleaned styles
     */
    protected _flattenStyles(styles: IStandardStyles, lastSelector?: string): IStandardStyles {
        let outStyles: IStandardStyles = {} as any;

        // go through each key of the provided styles and flatten them
        // to be a single layer deep
        map(styles, (value: TypedClassDefinition, selector: string) => {

            // split all selectors at commas so we can appropriately nest
            let newSelectors = this._buildNewSelectors(selector, lastSelector)

            // loop through all of the relevant selectors for this set of styles
            for (let selector of newSelectors) {
                let calculatedStyles = this._flattenClassDefinition(selector, value);
                outStyles = combineStyles(outStyles, calculatedStyles) as IStandardStyles;
            }

        });

        return outStyles;
    }



    /**
     * _flattenClassDefinition
     * ----------------------------------------------------------------------------
     * Clean a particular class definition recursively
     * 
     * @param   selector    The CSS selector for this class
     * @param   classDef    The definition for this CSS class
     * 
     * @returns The merged styles
     */
    protected _flattenClassDefinition(selector: string, classDef: TypedClassDefinition): IStandardStyles {

        let topStyles: IStandardStyles = {
            [selector]: {},
        } as IStandardStyles;

        // go through each { property : value } pair
        map(classDef, (propertyValue: any, propertyName: string) => {

            // if this is our nested classes, continue recursing down the chain
            if (propertyName === "nested") {
                let subnestedStyles = this._flattenStyles(propertyValue, selector);
                topStyles = combineStyles(topStyles, subnestedStyles) as IStandardStyles;

            // otherwise, just set the value into our top-level styles
            } else {
                topStyles[selector][propertyName] = propertyValue;
            }
        });

        return topStyles;
    }

    

    //..........................................
    //#region BUILD SELECTOR NAMES
    
    /**
     * buildNewSelectors
     * ----------------------------------------------------------------------------
     * generate the full selector names for nested classes
     */
    private _buildNewSelectors(curSelector, lastSelector): string[] {
        let newSelectors: string[] = curSelector.split(",");
        if (!lastSelector) { return newSelectors; }

        // insert the last selector at the right spot for each of 
        // the new selectors
        for (let i = 0; i < newSelectors.length; i += 1) {
            newSelectors[i] = this._buildNewSelector(newSelectors[i], lastSelector)            
        }

        // return the updated array
        return newSelectors;   
    }

    /**
     * _nuildNewSelector
     * ----------------------------------------------------------------------------
     * generate the full selector name for a nested class
     */
    private _buildNewSelector(newSelector: string, lastSelector: string): string {
        let out = "";

        // handle selectors that specify where the last selector should sit
        if (newSelector.indexOf("&") !== -1) {
            out = newSelector.replace(/&/g, lastSelector);
        
        // handle all other subclass cases
        } else {
            out = lastSelector + " " + newSelector;
        }

        return out;
    }
    
    //#endregion
    //..........................................
}

const StyleFlattener = new _StyleFlattener();

//..........................................
//#region PUBLIC FUNCTIONS

export function flattenStyles(styles: IStandardStyles): IStandardStyles {
    return StyleFlattener.flatten(styles);
}

//#endregion
//..........................................