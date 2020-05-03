import { IFlatStyles, TypedClassDefinition, SplitStyles, FlatClassDefinition, PlaceholderIndex, IPlaceholder } from "./_interfaces";
import { IDictionary, map, setDictValue, cloneObject } from '@kipprice/toolkip-objectHelpers";

/**----------------------------------------------------------------------------
 * @class	StylePlaceholders
 * ----------------------------------------------------------------------------
 * keep track of the placeholders used within styles to be able to update at 
 * a later point
 * @author	Kip Price
 * @version	1.0.0
 * ----------------------------------------------------------------------------
 */
class _StylePlaceholders {

    /**
     * splitOutParameters
     * ----------------------------------------------------------------------------
     * ensure that we have separate lists for styles with & without placeholders
     */
    public splitOutPlaceholders(flattenedStyles: IFlatStyles): SplitStyles {
        let out = { standard: {}, withPlaceholders: {} }
        
        map(flattenedStyles, (def: FlatClassDefinition, selector: string) => {
            map(def, (pVal: any, pName: string) => {
                if (this._containsPlaceholder(pVal)) {
                    setDictValue(out.withPlaceholders, pVal, [selector, pName]);
                } else {
                    setDictValue(out.standard, pVal, [selector, pName]);
                }
            })
        })

        return out;
    }

    /**
     * findContainedPlaceholder
     * ----------------------------------------------------------------------------
     * check if a particular value string has a placeholder within it
     * @param   value   The value to check
     * @returns True if a placeholder is found
     */
    public findContainedPlaceholder(value: string): IPlaceholder {
        let placeholderRegex: RegExp = /<(.+?)>/;
        let result: RegExpExecArray = placeholderRegex.exec(value);
        if (!result || !result[1]) { return null; }

        // handle default values
        let splitPlaceholder = result[1].split(":");
        return {
            name: splitPlaceholder[0],
            defaultValue: splitPlaceholder[1]
        };
    }

    /**
     * _containsPlaceholder
     * ----------------------------------------------------------------------------
     * check if a given propert contains a piece of text that will be replaced
     * at a later point in time
     */
    private _containsPlaceholder(value: string): boolean {
        let placeholder = this.findContainedPlaceholder(value);
        return !!placeholder;
    }

    /**
     * indexStyleDictByPlaceholder
     * ----------------------------------------------------------------------------
     * index by placeholder all of the style elements that would be affected by
     * changing a particular placeholder value
     */
    public indexStyleDictByPlaceholder(
        styleDict: IDictionary<IFlatStyles>
    ): PlaceholderIndex {
        let idx: PlaceholderIndex = {};

        map(styleDict, (styles: IFlatStyles, uniqueKey: string) => {
            map(styles, (def: TypedClassDefinition, selector: string) => {
                map(def, (pVal: any, pName: string) => {

                    // grab the appropriate placeholder
                    let placeholder = this.findContainedPlaceholder(pVal);
                    if (!placeholder) { return; }

                    // set the property name into the index in the position
                    // placeholder -> uniqueKey -> selector
                    setDictValue(idx, true, [placeholder.name, uniqueKey, selector, pName])
                })
            })
        })

        return idx;
    }

    /**
     * mapIndexToStyle
     * ----------------------------------------------------------------------------
     * turn an index into the set of styles it corresponds to
     * @param   index       The index we are mapping
     * @param   styles      The styles we are applying
     * @returns the styles that correspond to the index
     * TODO: evaluate whether this is necessary
     */
    public mapIndexToStyle(
        index: IDictionary<IDictionary<boolean>>, 
        styles: IFlatStyles
    ): IFlatStyles {

        let out = {};
        map(index, (d, selector: string) => {
            map(d, (unused, pName: string) => {
                if (!styles[selector]) { return; }
                setDictValue(
                    out, 
                    styles[selector][pName], 
                    [selector, pName]
                )
            })
        })
        return out;
    }

    /**
     * replacePlaceholder
     * ----------------------------------------------------------------------------
     * replace all insteances of the specified placeholder in the provided styles
     * @param   styles      the styles to start from; these will not be modified
     * @param   placeholder the placeholder we are replacing
     * @param   replaceWith the value that should be swapped in for the placeholder
     * @returns a copy of the original styles, with all of the placeholders replaced
     */
    public replacePlaceholders(
        styles: IFlatStyles,
        placeholder: string,
        replaceWith: any
    ): IFlatStyles {

        let matchRegex = new RegExp("<" + placeholder + ".*?>", "g");

        let out = cloneObject(styles);

        map(out, (def: FlatClassDefinition, selector: string) => {
            map(def, (pVal: any, pName: string) => {
                out[selector][pName] = pVal.replace(matchRegex, replaceWith);
            })
        })

        return out;
    }
}

export const StylePlaceholders = new _StylePlaceholders();

//..........................................
//#region PUBLIC FUNCTIONS

export function findContainedPlaceholder(value: string): IPlaceholder {
    return StylePlaceholders.findContainedPlaceholder(value);
}

export function splitStyles(flattenedStyles: IFlatStyles): SplitStyles {
    return StylePlaceholders.splitOutPlaceholders(flattenedStyles);
}

export function indexByPlaceholder(styleDict: IDictionary<IFlatStyles>) {
    return StylePlaceholders.indexStyleDictByPlaceholder(styleDict);
}

export function replacePlaceholders(styles: IFlatStyles, placeholder: string, replaceWith: any) {
    return StylePlaceholders.replacePlaceholders(styles, placeholder, replaceWith);
}

export function mapIndexToStyle(index: IDictionary<IDictionary<boolean>>, styles: IFlatStyles) {
    return StylePlaceholders.mapIndexToStyle(index, styles);
}

//#endregion
//..........................................