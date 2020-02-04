import { _Library } from "./_library";

/**----------------------------------------------------------------------------
 * @class	StyleLibrary
 * ----------------------------------------------------------------------------
 * keep track of all styules registered in this application
 * @author	Kip Price
 * @version	1.0.0
 * ----------------------------------------------------------------------------
 */
class _StyleLibrary extends _Library {

    //.....................
    //#region PROPERTIES
    
    protected get _idSuffix() { return "styles"; }
    
    //#endregion
    //.....................
}

export const StyleLibrary = new _StyleLibrary();