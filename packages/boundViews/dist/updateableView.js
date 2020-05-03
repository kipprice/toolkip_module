"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toolkip_drawable_1 = require("@kipprice/toolkip-drawable");
/**----------------------------------------------------------------------------
 * @class   _UpdateableView
 * ----------------------------------------------------------------------------
 * Create a view that will be used in a MVC world
 * @author  Kip Price
 * @version 1.0.0
 * ----------------------------------------------------------------------------
 */
class _UpdateableView extends toolkip_drawable_1._Drawable {
    //#endregion
    //.....................
    /**
     * MVCView
     * ----------------------------------------------------------------------------
     * Create a view that will be used for MVC-structured projects
     * @param   addlParams  ANything additional needed to render this view
     */
    constructor(...addlParams) {
        super();
        this._createElements(...addlParams);
    }
    /**
     * _shouldSkipCreateElements
     * ----------------------------------------------------------------------------
     * Skip creating elements until we are ready
     */
    _shouldSkipCreateElements() { return true; }
}
exports._UpdateableView = _UpdateableView;
