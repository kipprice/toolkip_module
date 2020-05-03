"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _boundView_1 = require("./_boundView");
/**----------------------------------------------------------------------------
 * @class	BoundView
 * ----------------------------------------------------------------------------
 * composable view that also ties into the model binding
 * @author	Kip Price
 * @version	1.0.0
 * ----------------------------------------------------------------------------
 */
class BoundView extends _boundView_1._BoundView {
    /**
     * BoundView
     * ----------------------------------------------------------------------------
     * creates a bound view with the specified
     */
    constructor(def, elems) {
        super();
        this._createElements(def, elems);
    }
    /**
     * _createElements
     * ----------------------------------------------------------------------------
     * generate the elements contained within this
     */
    _createElements(def, elems) {
        if (elems) {
            this._elems = elems;
        }
        if (!def) {
            return;
        }
        this._createBase(def);
    }
}
exports.BoundView = BoundView;
