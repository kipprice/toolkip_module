import { MOBILE_MAX_DIM } from "./_constants";
import { StandardElement } from "../shared";
import { addClass, removeClass } from "../styleHelpers";

/**----------------------------------------------------------------------------
 * @class	MediaQueryListener
 * ----------------------------------------------------------------------------
 * registers standard and non-standard media listeners
 * @author	Kip Price
 * @version	1.0.0
 * ----------------------------------------------------------------------------
 */
class _MediaQueryListener {

    //.....................
    //#region PROPERTIES
    
    /* swap variable for the element provided */
    private _elem: StandardElement;
    
    //#endregion
    //.....................
    /**
     * registerStandardMediaListeners
     * ----------------------------------------------------------------------------
     * Auto-apply various styles for easier mobile-optimizing
     */
    public registerStandardMediaListeners(elem?: StandardElement): void {
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
    public registerMediaListener(matchQuery: string, classToApply: string, elem?: StandardElement): void {
        if (!elem) { elem = this._elem; }

        let mediaQueryFunc = window.matchMedia(matchQuery);

        mediaQueryFunc.addListener((media: MediaQueryListEvent) => {
            if (media.matches) {
                addClass(elem || document.body, classToApply);
            } else {
                removeClass(elem || document.body, classToApply);
            }
        });

        // make sure we also handle the case where we already match
        if (mediaQueryFunc.matches) { addClass(elem || document.body, classToApply); }
    }

    private _registerPrintQuery() {
        this.registerMediaListener("print", "print");
    }

    private _registerGeneralMobileQuery() {
        this.registerMediaListener(
            this._formatMediaQuery(MOBILE_MAX_DIM.large), 
            "mobile"
        );
    }

    private _registerLargeMobileQuery() {
        this.registerMediaListener(
            this._formatMediaQuery(
                MOBILE_MAX_DIM.large, 
                MOBILE_MAX_DIM.medium
            ),
            "large"
        );
    }

    private _registerMediumMobileQuery() {
        this.registerMediaListener(
            this._formatMediaQuery(
                MOBILE_MAX_DIM.medium,
                MOBILE_MAX_DIM.small
            ),
            "medium"
        );
    }

    private _registerSmallMobileQuery() {
        this.registerMediaListener(
            this._formatMediaQuery(
                MOBILE_MAX_DIM.small,
                MOBILE_MAX_DIM.tiny
            ), 
            "small"
        );
    }

    private _registerTinyMobileQuery() {
        this.registerMediaListener(
            this._formatMediaQuery(MOBILE_MAX_DIM.tiny), 
            "tiny"
        );
    }

    private _formatMediaQuery(max: number, min?: number) {
        if (min) {
            return `(max-width:${max}px) and (min-width:${min + 1}px)`
        } else {
            return `(max-width:${max}px)`
        }
    }

    
}

const MediaQueryListener = new _MediaQueryListener();

//..........................................
//#region PUBLIC FUNCTIONS

export function registerStandardMediaQueries(elem?: StandardElement) {
    MediaQueryListener.registerStandardMediaListeners(elem);
}

export function registerMediaQuery(matchQuery: string, classToApply: string, elem?: StandardElement) {
    MediaQueryListener.registerMediaListener(matchQuery, classToApply, elem);
}

//#endregion
//..........................................