"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _library_1 = require("./_library");
/**----------------------------------------------------------------------------
 * @class	StyleLibrary
 * ----------------------------------------------------------------------------
 * keep track of all styules registered in this application
 * @author	Kip Price
 * @version	1.0.0
 * ----------------------------------------------------------------------------
 */
class _StyleLibrary extends _library_1._Library {
    //.....................
    //#region PROPERTIES
    get _idSuffix() { return "styles"; }
}
exports.StyleLibrary = new _StyleLibrary();
