import { View } from "../views/view";
import { INavTransitionType, IHistoryEntry, INavigationData } from "./_interfaces";
import { ICollectionElement } from "../dataStructures/collection/_interfaces";
import { HistoryChain } from "../history/history";
import { IConstructor } from "../objectHelpers/_interfaces";
/**----------------------------------------------------------------------------
 * @class	Navigator
 * ----------------------------------------------------------------------------
 * Handles moving between different pages for a single-page application,
 * including adding navigator history points and updating views / models
 *
 * @author	Kip Price
 * @version 1.2.0
 * ----------------------------------------------------------------------------
 */
export declare abstract class Navigator<T extends string> {
    /** keep track of the views */
    private _views;
    /** keep track of the parent element */
    protected abstract get _parent(): HTMLElement;
    /** allow the implementer to determine what type of transition is used */
    protected abstract get _transitionType(): INavTransitionType;
    /** keep track of what view is currently showing */
    protected _currentView: ICollectionElement<View>;
    get currentView(): ICollectionElement<View>;
    /** keep track of the historical changes to the navigation */
    protected _history: HistoryChain<IHistoryEntry<T>>;
    get history(): HistoryChain<IHistoryEntry<T>>;
    /**
     * Navigator
     * ----------------------------------------------------------------------------
     * Create this specific instance of a navigator
     */
    constructor();
    protected abstract _createHeader(): void;
    /**
     * navigateTo
     * ----------------------------------------------------------------------------
     * Move to a particular view in this navigator
     *
     * @param	navigationPath	How to get to the specified view
     * @param	constructor		How to create this view (if not already created)
     * @param	addlData		Anything else that needs to be passed along (e.g. models)
     */
    navigateTo<D extends View, M>(navigationPath: T, constructor?: IConstructor<D>, addlData?: INavigationData<M>, fromHistoryNavigation?: boolean): Promise<boolean>;
    /**
     * _canNavigateAway
     * ----------------------------------------------------------------------------
     * Verify that we can move away from the current page
     * @param isCancel
     */
    protected _canNavigateAway(isCancel?: boolean): boolean;
    /**
     * _handleCurrentViewOnNavigate
     * ----------------------------------------------------------------------------
     * Update the current view in the history as needed on navigate away
     * @param 	isCancel 	True if we are moving because of a cancel event
     * @returns	True if we could navigate away, false otherwise
     */
    protected _handleCurrentViewOnNavigate<M>(isCancel?: boolean): Promise<boolean>;
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
    protected _createView<D extends View, M>(constructor: IConstructor<D>, addlData?: INavigationData<M>): D;
    /**
     * _updateView
     * ----------------------------------------------------------------------------
     * Update the created view with new data. Overridable if different data ought
     * to be passed in
     * @param 	view 		The view to update
     * @param 	addlData 	Additional data to pass into the view
     *
     */
    protected _updateView<D extends View, M>(view: D, addlData?: INavigationData<M>): void;
    /**
     * _updateHistory
     * ----------------------------------------------------------------------------
     * Add this navigate event to the history of the page
     * @param 	navigationPath 	The path to navigate to
     * @param 	addlArgs 		Any additional data for this
     */
    private _updateHistory;
    /**
     * _handleTransition
     * ----------------------------------------------------------------------------
     * Switches between two separate views in this navigation world
     */
    protected _handleTransition(view: View): void;
    /**
     * _noTransition
     * ----------------------------------------------------------------------------
     * Swap out the parent contents for the child contents
     */
    protected _noTransition(view: View): void;
    /**
     * _opacityTransition
     * ----------------------------------------------------------------------------
     * Fade out the parent, swap out content, then fade back in
     */
    protected _opacityTransition(view: View): void;
    /**
     * pushHistoryState
     * ----------------------------------------------------------------------------
     * make sure we can return to the right page
     *
     * @param   history     The page to return to when hitting the back button
     */
    protected _pushHistoryState(history: IHistoryEntry<T>): void;
    /**
     * _handleState
     * ----------------------------------------------------------------------------
     * Override the back button to go to the right page
     */
    protected _handleState(): void;
}
