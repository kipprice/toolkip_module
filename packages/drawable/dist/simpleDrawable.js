"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _drawable_1 = require("./_drawable");
/**----------------------------------------------------------------------------
 * @class	SimpleDrawable
 * ----------------------------------------------------------------------------
 * Very basic implementation of the Drawable class that contains just a
 * single element.
 * @version 1.0.0
 * ----------------------------------------------------------------------------
 */
class Drawable extends _drawable_1._Drawable {
    //.....................
    //#region PROPERTIES
    //#endregion
    //.....................
    /**
     * Drawable
     * ----------------------------------------------------------------------------
     * create a simple Drawable element that renders whatever is passed into its
     * constructor
     * @param	baseElem		The details about the element we should draw
     */
    constructor(baseElem) {
        super();
        if (baseElem) {
            this._createBase(baseElem);
        }
    }
    /**
     * _createElements
     * ----------------------------------------------------------------------------
     * Do nothing, since we will create the base element in the construtor
     */
    _createElements() { }
}
exports.Drawable = Drawable;
