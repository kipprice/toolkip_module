"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _library_1 = require("./_library");
/**----------------------------------------------------------------------------
 * @class	FontLibrary
 * ----------------------------------------------------------------------------
 * keep track of the fonts used within this application
 * @author	Kip Price
 * @version	1.0.0
 * ----------------------------------------------------------------------------
 */
class _FontLibrary extends _library_1._Library {
    //.....................
    //#region PROPERTIES
    get _idSuffix() { return "fonts"; }
}
exports.FontLibrary = new _FontLibrary();
