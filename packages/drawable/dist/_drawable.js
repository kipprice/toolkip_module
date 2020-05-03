"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toolkip_stylable_1 = require("@kipprice/toolkip-stylable");
const toolkip_create_elements_1 = require("@kipprice/toolkip-create-elements");
const toolkip_media_queries_1 = require("@kipprice/toolkip-media-queries");
/**----------------------------------------------------------------------------
 * @class Drawable
 * ----------------------------------------------------------------------------
 * Creates a client-side representation of a particular DOM element
 * @author	Kip Price
 * @version	2.0.0
 * ----------------------------------------------------------------------------
 */
class _Drawable extends toolkip_stylable_1._Stylable {
    //#endregion
    //..................
    /**
     * Drawable
     * ----------------------------------------------------------------------------
     * Create a Drawable element
     * @param	baseElemTemplate	If provided, the template upon which to create the base element
     */
    constructor() {
        // Initialize both the stylable parts of this and the 
        super();
        this._addClassName("Drawable");
        this._registerMediaListeners();
        // initialize our elements
        this._elems = {};
        // check that we have enough data to create elements
        if (this._shouldSkipCreateElements()) {
            return;
        }
        // actually create the elements associated with this class
        this._createElements();
        this._registerMediaListeners(true);
    }
    /** expose the base element externally for anyone who needs it */
    get base() { return this._elems.base; }
    /**
     * _registerMediaListener
     * ----------------------------------------------------------------------------
     * Replace the stylable default registerMediaListener to try to apply first to
     * our base element, then the document as a whole
     */
    _registerMediaListeners(baseOnly) {
        var _a;
        if ((_a = this._elems) === null || _a === void 0 ? void 0 : _a.base) {
            toolkip_media_queries_1.registerStandardMediaQueries(this._elems.base);
        }
        if (baseOnly) {
            return;
        }
        toolkip_media_queries_1.registerStandardMediaQueries();
    }
    _createBase(elemDefinition) {
        // ensure that we always have our base element
        if (!elemDefinition.key) {
            elemDefinition.key = "base";
        }
        ;
        return toolkip_create_elements_1.createElement(elemDefinition, this._elems);
    }
    /**
     * draw
     * ----------------------------------------------------------------------------
     * Draws the element of this Drawable & all children + siblings
     * @param 	parent  	The element this Drawable should be added to
     * @param 	force 		True if we need to remove & redraw this element
     */
    draw(parent, force) {
        // Quit if we don't have anything to draw
        if (!this._elems || !this._elems.base) {
            return;
        }
        // Refresh our contents
        this._refresh();
        // Save off this parent & quit if there is no parent
        this._parent = parent || this._parent;
        if (!this._parent) {
            return;
        }
        // Draw the base element
        this._drawBase(force);
        // Make sure we have a touchpoint for refreshing after the draw step
        this._afterDraw();
    }
    ;
    /**
     * _drawBase
     * ----------------------------------------------------------------------------
     * Draws a Drawable or HTML Element
     * @param	force	If true, erases and redraws the base element
     */
    _drawBase(force) {
        // grab the base helper
        let base = this._elems.base;
        // If we are redrawing or have never drawn the element, do so
        if (force || (!base.parentNode)) {
            // Remove first from the parent if we need to
            if (force && base.parentNode) {
                base.parentNode.removeChild(base);
            }
            // If there's no parent, quit
            if (!this._parent) {
                return;
            }
            // Add back to the parent
            this._parent.appendChild(base);
        }
    }
    /**
     * erase
     * ----------------------------------------------------------------------------
     * Remove this drawable from the canvas
     */
    erase() {
        let base = this._elems.base;
        if (!base || !base.parentNode) {
            return;
        }
        base.parentNode.removeChild(base);
    }
    ;
    //..........................................
    //#region METHODS DESIGNED FOR OVERRIDING
    /**
     * _shouldSkipCreateElements
     * ----------------------------------------------------------------------------
     * Function to determine whether we should skip the createElements. Useful in
     * cases where data needs to be present in the class before elements can be
     * created.
     *
     * @returns	True if we shouldn't create elements
     */
    _shouldSkipCreateElements() { return false; }
    /**
     * _refresh
     * ----------------------------------------------------------------------------
     * Overridable function that refreshes the UI of this Drawable. Does not
     * guarantee that the element has been drawn.
     */
    _refresh() { }
    ;
    /**
     * _afterDraw
     * ----------------------------------------------------------------------------
     * @override
     * Overridable function to make sure we can adjust sizes should we need to
     */
    _afterDraw() { }
    ;
    /**
     * _onResize
     * ----------------------------------------------------------------------------
     * Overridable function to adjust when the screen resizes
     */
    _onResize() { }
    ;
    //#endregion
    //..........................................
    /**
     * addEventListener
     * ----------------------------------------------------------------------------
     * Helper to add event listeners to the base element
     * @param	type		Type of event to listen to
     * @param	listener	The listener to apply upon this event
     */
    addEventListener(type, listener) {
        this._elems.base.addEventListener(type, listener);
    }
    /**
     * overridePlaceholder
     * ----------------------------------------------------------------------------
     * replace all instancaes of the specified placeholder with the provided value
     * only for this particular instance
     */
    overridePlaceholder(placeholderName, placeholderValue) {
        super.overridePlaceholder(placeholderName, placeholderValue, this._elems.base);
    }
}
exports._Drawable = _Drawable;
