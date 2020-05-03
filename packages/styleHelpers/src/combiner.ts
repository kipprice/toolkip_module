import { TypedClassDefinition, Styles, IFontFaceDefinition } from ".";
import { map, isEmptyObject } from '@kipprice/toolkip-object-helpers';

/**----------------------------------------------------------------------------
 * @class	StyleCombiner
 * ----------------------------------------------------------------------------
 * generates merged version of style classes, making sure to update nested
 * properties that are shared within a single selector
 * @author	Kip Price
 * @version	1.0.0
 * ----------------------------------------------------------------------------
 */
class _StyleCombiner {

    public combine(...styles: Styles[]) {
        return this._combineStyles(...styles)
    }

    /**
     * _combineThemes
     * ----------------------------------------------------------------------------
     * @param   styles  The themes to combine
     * @returns The merged themes
     */
    private _combineStyles(...styles: Styles[]): Styles {
        let outStyles: Styles = {};

        // Go through each of the themes & each of their selectors
        for (let style of styles) {
            map(style, (curCls: TypedClassDefinition | IFontFaceDefinition[], selector: string) => {

                // font face styles
                if (curCls instanceof Array) {
                    outStyles[selector] = this._combineFontStyle(
                        outStyles[selector] as IFontFaceDefinition[] || [],
                        curCls
                    )
                
                // standard styles
                } else {
                    outStyles[selector] = this._combineStandardStyle(
                        outStyles[selector] as TypedClassDefinition || {},
                        curCls
                    );
                }

            });
        };

        return outStyles;
    }

    private _combineStandardStyle(existingStyles: TypedClassDefinition ,curCls: TypedClassDefinition) {
        // merge in the styles for this particular class into any existing 
        // styles for this selector
        let mergedDef = this._combineStyle(
            existingStyles,
            curCls
        );
        if (!mergedDef) { return; }

        return mergedDef;
    }

    private _combineFontStyle(existingFonts: IFontFaceDefinition[], curFonts: IFontFaceDefinition[]): IFontFaceDefinition[] {
        return existingFonts.concat(curFonts);
    }

    /**
     * _combineStyle
     * ----------------------------------------------------------------------------
     * merge in a particualr class into an existing set of styles
     */
    private _combineStyle(startingStyles: TypedClassDefinition, curCls: TypedClassDefinition)  {
        
        let mergedDef = this._mergeClassDefinition( 
            startingStyles,
            curCls
        )
        if (isEmptyObject(mergedDef)) { return null; }

        return mergedDef;
    }

    /**
     * _mergeDefinitions
     * ----------------------------------------------------------------------------
     * merge a particular set of definitions
     * @param   definitions     The definitions to merge
     * @returns The merged set of definitions
     */
    private _mergeClassDefinition(...definitions: TypedClassDefinition[]): TypedClassDefinition {
        let mergedDef: TypedClassDefinition = {}
        
        // loop through all of the definitions & their properties
        for (let def of definitions) {
            map(def, (val: string, property: string) => {
                mergedDef[property] = val;
            });
        }

        return mergedDef;
    }

}

const StyleCombiner = new _StyleCombiner();

//..........................................
//#region PUBLIC FUNCTIONS

export function combineStyles(...styles: Styles[]) {
    return StyleCombiner.combine(...styles);
}

//#endregion
//..........................................
