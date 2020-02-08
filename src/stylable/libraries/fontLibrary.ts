import { _Library } from "./_library";
import { map, IDictionary } from "../../objectHelpers";
import { IFontFaceDefinition } from "../../styleHelpers";

/**----------------------------------------------------------------------------
 * @class	FontLibrary
 * ----------------------------------------------------------------------------
 * keep track of the fonts used within this application
 * @author	Kip Price
 * @version	1.0.0
 * ----------------------------------------------------------------------------
 */
class _FontLibrary extends _Library {
    

    //.....................
    //#region PROPERTIES
    
    protected get _idSuffix() { return "fonts" }
    
    //#endregion
    //.....................

    

    // TODO: add any custom logic we need for fonts

    // /**
    //  * _mergeIntoFonts
    //  * ----------------------------------------------------------------------------
    //  * @param fonts 
    //  * 
    //  */
    // protected _mergeFonts(fonts: IFontFaceDefinition[]): IFontFaceDefinition {
    //     let out: IDictionary<IFontFaceDefinition> = {};
        
    //     for (let f of fonts) {
    //         map(f, (fontDef: IFontFaceDefinition[], fontName: string) => {
    //             out[fontName] = fontDef;
    //         });
    //     }
        
    // }

    //     /**
    //  * _createFontStyles
    //  * ----------------------------------------------------------------------------
    //  * @param forceOverride 
    //  */
    // protected static _createFontStyles(forceOverride?: boolean): void {
    //     // add the font-family pieces
    //     let fonts: ICustomFonts = Stylable._customPageFonts;
    //     if (!this._customFontElem) { 
    //         this._customFontElem = createStyleElement(false); 
    //         document.head.appendChild(this._customFontElem);
    //     }
    //     this._customFontElem.innerHTML = "";

    //     map(fonts, (fontDef: IFontFaceDefinition[], fontName: string) => {
    //         let tmpElem: HTMLStyleElement = createFontDefinition(fontName, fontDef, true);
    //         this._customFontElem.innerHTML += tmpElem.innerHTML;
    //     });
    // }
}

export const FontLibrary = new _FontLibrary();