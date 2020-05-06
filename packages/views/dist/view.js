"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toolkip_drawable_1 = require("@kipprice/toolkip-drawable");
/**----------------------------------------------------------------------------
 * @class   View
 * ----------------------------------------------------------------------------
 * View based on MVC paradigm that can also be used in navigation
 * @author  Kip Price
 * @version 1.1.0
 * ----------------------------------------------------------------------------
 */
class _View extends toolkip_drawable_1._Drawable {
    /**
     * update
     * ----------------------------------------------------------------------------
     * change the view based on details in the model
     */
    update(...params) {
        // base implementation does nothing
    }
    /**
     * canNavigateAway
     * ----------------------------------------------------------------------------
     * True if we can leave this view in it's current state, false otherwise
     * @param   isCancel    True if the user chose to cancel
     */
    canNavigateAway(isCancel) {
        // Assume we can move away
        return true;
    }
    /**
     * onNavigateAway
     * ----------------------------------------------------------------------------
     * What to do if the user is leaving this view
     * @param   isCancel    True if the user chose to cancel
     */
    onNavigateAway(isCancel) {
        // base implementation doesn't do anything on nav away
        return null;
    }
}
exports._View = _View;
