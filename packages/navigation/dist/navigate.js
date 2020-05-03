"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const toolkip_data_structures_1 = require("@kipprice/toolkip-data-structures");
const _interfaces_1 = require("./_interfaces");
const toolkip_history_1 = require("@kipprice/toolkip-history");
const toolkip_style_helpers_1 = require("@kipprice/toolkip-style-helpers");
const toolkip_structs_1 = require("@kipprice/toolkip-structs");
//#region STANDARD NAVIGATION
/**----------------------------------------------------------------------------
 * @class	_Navigator
 * ----------------------------------------------------------------------------
 * Handles moving between different pages for a single-page application,
 * including adding navigator history points and updating views / models
 *
 * @author	Kip Price
 * @version 1.2.0
 * ----------------------------------------------------------------------------
 */
class _Navigator {
    //#endregion
    //.....................
    /**
     * Navigator
     * ----------------------------------------------------------------------------
     * Create this specific instance of a navigator
     */
    constructor() {
        //.....................
        //#region PROPERTIES
        /** keep track of the views */
        this._views = new toolkip_data_structures_1.Collection();
        // keep track of our internal history
        this._history = new toolkip_history_1.HistoryChain();
        // register the listener when the user presses the back button
        window.addEventListener("popstate", () => {
            this._handleState();
        });
        this._createHeader();
    }
    get currentView() { return this._currentView; }
    get history() { return this._history; }
    /**
     * navigateTo
     * ----------------------------------------------------------------------------
     * Move to a particular view in this navigator
     *
     * @param	navigationPath	How to get to the specified view
     * @param	constructor		How to create this view (if not already created)
     * @param	addlData		Anything else that needs to be passed along (e.g. models)
     */
    navigateTo(navigationPath, constructor, addlData, fromHistoryNavigation) {
        return __awaiter(this, void 0, void 0, function* () {
            // initialize the additional data array if unpassed
            if (!addlData) {
                addlData = {};
            }
            // check that we can navigate away from the current screen
            if (!this._canNavigateAway(addlData.isCancel)) {
                return false;
            }
            let currentViewHandled = yield this._handleCurrentViewOnNavigate(addlData.isCancel);
            if (!currentViewHandled) {
                return false;
            }
            // try to grab the view from our collection (quit if it doesn't exist and we can't create it)
            let view = this._views.getValue(navigationPath);
            if (!view && !constructor) {
                return false;
            }
            // if we couldn't find it, create it
            if (!view) {
                view = this._createView(constructor, addlData);
                this._views.add(navigationPath, view);
                // otherwise, check if this can receive an update
            }
            else {
                if (toolkip_structs_1.isUpdatable(view)) {
                    this._updateView(view, addlData);
                }
            }
            // draw the view on the appropriate parent
            this._handleTransition(view);
            // update our internal view tracking
            this._currentView = this._views.getElement(navigationPath);
            // update the browser history
            if (!fromHistoryNavigation) {
                this._updateHistory(navigationPath, addlData);
            }
            return true;
        });
    }
    /**
     * _canNavigateAway
     * ----------------------------------------------------------------------------
     * Verify that we can move away from the current page
     * @param isCancel
     */
    _canNavigateAway(isCancel) {
        if (!this._currentView) {
            return true;
        }
        if (!this._currentView.value) {
            return true;
        }
        if (!this._currentView.value.canNavigateAway(isCancel)) {
            return false;
        }
        return true;
    }
    /**
     * _handleCurrentViewOnNavigate
     * ----------------------------------------------------------------------------
     * Update the current view in the history as needed on navigate away
     * @param 	isCancel 	True if we are moving because of a cancel event
     * @returns	True if we could navigate away, false otherwise
     */
    _handleCurrentViewOnNavigate(isCancel) {
        return __awaiter(this, void 0, void 0, function* () {
            // make sure that we have a current view
            if (!this._currentView) {
                return true;
            }
            // determine if there is any information this view wants to add to the addlData array
            let navAwayData = yield this._currentView.value.onNavigateAway(isCancel);
            if (!navAwayData) {
                return true;
            }
            // if so, update the history state for this view
            let historyState = {
                navigationPath: null,
                data: navAwayData
            };
            this._history.updateCurrentState(historyState);
            return true;
        });
    }
    /**
     * _createView
     * ----------------------------------------------------------------------------
     * Overridable constructor method for views; override to pass info into the
     * constructor method.
     *
     * @param 	constructor 	Method to create the view
     * @param 	addlData 		Additional data that could be passed to the constructor
     *
     * @returns	The created drawable
     */
    _createView(constructor, addlData) {
        let view = new constructor();
        return view;
    }
    /**
     * _updateView
     * ----------------------------------------------------------------------------
     * Update the created view with new data. Overridable if different data ought
     * to be passed in
     * @param 	view 		The view to update
     * @param 	addlData 	Additional data to pass into the view
     *
     */
    _updateView(view, addlData) {
        view.update(addlData.model, addlData);
    }
    /**
     * _updateHistory
     * ----------------------------------------------------------------------------
     * Add this navigate event to the history of the page
     * @param 	navigationPath 	The path to navigate to
     * @param 	addlArgs 		Any additional data for this
     */
    _updateHistory(navigationPath, addlArgs) {
        let history = {
            navigationPath: navigationPath,
            url: addlArgs.url || "",
            title: addlArgs.title || navigationPath,
            data: addlArgs
        };
        this._pushHistoryState(history);
        // also push to our internal history
        this._history.push(history);
    }
    /**
     * _handleTransition
     * ----------------------------------------------------------------------------
     * Switches between two separate views in this navigation world
     */
    _handleTransition(view) {
        // verify we have enough data to handle this
        if (!view || !this._parent) {
            return;
        }
        switch (this._transitionType) {
            case _interfaces_1.INavTransitionType.OPACITY:
                this._opacityTransition(view);
                break;
            //TODO: Handle all the other cases
            default:
                this._noTransition(view);
                break;
        }
    }
    /**
     * _noTransition
     * ----------------------------------------------------------------------------
     * Swap out the parent contents for the child contents
     */
    _noTransition(view) {
        this._parent.innerHTML = "";
        view.draw(this._parent);
    }
    /**
     * _opacityTransition
     * ----------------------------------------------------------------------------
     * Fade out the parent, swap out content, then fade back in
     */
    _opacityTransition(view) {
        toolkip_style_helpers_1.transition(this._parent, { opacity: "1" }, { opacity: "0" }, 200).then(() => {
            this._parent.innerHTML = "";
            view.draw(this._parent);
            toolkip_style_helpers_1.transition(this._parent, { opacity: "0" }, { opacity: "1" }, 200);
        });
    }
    /**
     * pushHistoryState
     * ----------------------------------------------------------------------------
     * make sure we can return to the right page
     *
     * @param   history     The page to return to when hitting the back button
     */
    _pushHistoryState(history) {
        try {
            window.history.pushState(history, history.title, history.url);
        }
        catch (err) {
            console.warn("Couldn't save history state: " + err);
        }
    }
    /**
     * _handleState
     * ----------------------------------------------------------------------------
     * Override the back button to go to the right page
     */
    _handleState() {
        let state = window.history.state;
        if (!state) {
            return;
        }
        this.navigateTo(state.navigationPath, null, state.data);
    }
}
exports._Navigator = _Navigator;
//#endregion
