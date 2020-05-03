"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _constants_1 = require("./_constants");
const toolkip_style_helpers_1 = require("@kipprice/toolkip-style-helpers");
/**----------------------------------------------------------------------------
 * @class	MediaQueryListener
 * ----------------------------------------------------------------------------
 * registers standard and non-standard media listeners
 * @author	Kip Price
 * @version	1.0.0
 * ----------------------------------------------------------------------------
 */
class _MediaQueryListener {
    //#endregion
    //.....................
    /**
     * registerStandardMediaListeners
     * ----------------------------------------------------------------------------
     * Auto-apply various styles for easier mobile-optimizing
     */
    registerStandardMediaListeners(elem) {
        this._elem = elem;
        this._registerPrintQuery();
        this._registerGeneralMobileQuery();
        this._registerLargeMobileQuery();
        this._registerMediumMobileQuery();
        this._registerSmallMobileQuery();
        this._registerTinyMobileQuery();
        this._elem = undefined;
    }
    /**
     * _registerMediaListener
     * ----------------------------------------------------------------------------
     * Register a listener to detect if a particular media query passes
     *
     * @param   matchQuery      The media query to test for matching
     * @param   classToApply    What class to apply if the query matches
     * @param   elem            If included, the element that should have the class
     *                          auto-applied
     */
    registerMediaListener(matchQuery, classToApply, elem) {
        if (!elem) {
            elem = this._elem;
        }
        let mediaQueryFunc = window.matchMedia(matchQuery);
        mediaQueryFunc.addListener((media) => {
            if (media.matches) {
                toolkip_style_helpers_1.addClass(elem || document.body, classToApply);
            }
            else {
                toolkip_style_helpers_1.removeClass(elem || document.body, classToApply);
            }
        });
        // make sure we also handle the case where we already match
        if (mediaQueryFunc.matches) {
            toolkip_style_helpers_1.addClass(elem || document.body, classToApply);
        }
    }
    _registerPrintQuery() {
        this.registerMediaListener("print", "print");
    }
    _registerGeneralMobileQuery() {
        this.registerMediaListener(this._formatMediaQuery(_constants_1.MOBILE_MAX_DIM.large), "mobile");
    }
    _registerLargeMobileQuery() {
        this.registerMediaListener(this._formatMediaQuery(_constants_1.MOBILE_MAX_DIM.large, _constants_1.MOBILE_MAX_DIM.medium), "large");
    }
    _registerMediumMobileQuery() {
        this.registerMediaListener(this._formatMediaQuery(_constants_1.MOBILE_MAX_DIM.medium, _constants_1.MOBILE_MAX_DIM.small), "medium");
    }
    _registerSmallMobileQuery() {
        this.registerMediaListener(this._formatMediaQuery(_constants_1.MOBILE_MAX_DIM.small, _constants_1.MOBILE_MAX_DIM.tiny), "small");
    }
    _registerTinyMobileQuery() {
        this.registerMediaListener(this._formatMediaQuery(_constants_1.MOBILE_MAX_DIM.tiny), "tiny");
    }
    _formatMediaQuery(max, min) {
        if (min) {
            return `(max-width:${max}px) and (min-width:${min + 1}px)`;
        }
        else {
            return `(max-width:${max}px)`;
        }
    }
}
const MediaQueryListener = new _MediaQueryListener();
//..........................................
//#region PUBLIC FUNCTIONS
function registerStandardMediaQueries(elem) {
    MediaQueryListener.registerStandardMediaListeners(elem);
}
exports.registerStandardMediaQueries = registerStandardMediaQueries;
function registerMediaQuery(matchQuery, classToApply, elem) {
    MediaQueryListener.registerMediaListener(matchQuery, classToApply, elem);
}
exports.registerMediaQuery = registerMediaQuery;
//#endregion
//..........................................
