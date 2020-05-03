import { _Library } from "./_library";
import { map, IDictionary } from '@kipprice/toolkip-objectHelpers";
import { IFontFaceDefinition } from '@kipprice/toolkip-styleHelpers";

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

}

export const FontLibrary = new _FontLibrary();