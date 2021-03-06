import { Collection, ICollectionElement } from '@toolkip/data-structures';
import { INavTransitionType, IHistoryEntry, INavigationData, INavigable } from "./_interfaces";
import { HistoryChain } from '@toolkip/history';
import { IConstructor } from '@toolkip/object-helpers';
import { transition } from '@toolkip/style-helpers';
import { isUpdatable } from '@toolkip/structs';


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
export abstract class _Navigator<T extends string> {

	//.....................
	//#region PROPERTIES

	/** keep track of the views */
	private _views: Collection<INavigable> = new Collection<INavigable>();

	/** keep track of the parent element */
	protected abstract get _parent(): HTMLElement;

	/** allow the implementer to determine what type of transition is used */
	protected abstract get _transitionType(): INavTransitionType;

	/** keep track of what view is currently showing */
	protected _currentView: ICollectionElement<INavigable>;
	public get currentView(): ICollectionElement<INavigable> { return this._currentView; }

	/** keep track of the historical changes to the navigation */
	protected _history: HistoryChain<IHistoryEntry<T>>;
	public get history(): HistoryChain<IHistoryEntry<T>> { return this._history; }

	//#endregion
	//.....................

	/**
	 * Navigator
	 * ----------------------------------------------------------------------------
	 * Create this specific instance of a navigator
	 */
	public constructor() {

		// keep track of our internal history
		this._history = new HistoryChain();

		// register the listener when the user presses the back button
		window.addEventListener("popstate", () => {
			this._handleState();
		});

		this._createHeader();
	}

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

	public async navigateTo<D extends INavigable, M>(navigationPath: T, constructor?: IConstructor<D>, addlData?: INavigationData<M>, fromHistoryNavigation?: boolean): Promise<boolean> {

		// initialize the additional data array if unpassed
		if (!addlData) { addlData = {}; }

		// check that we can navigate away from the current screen
		if (!this._canNavigateAway(addlData.isCancel)) { return false; }
		let currentViewHandled = await this._handleCurrentViewOnNavigate(addlData.isCancel);
		if (!currentViewHandled) { return false; }

		// try to grab the view from our collection (quit if it doesn't exist and we can't create it)
		let view: INavigable = this._views.getValue(navigationPath);
		if (!view && !constructor) { return false; }

		// if we couldn't find it, create it
		if (!view) {
			view = this._createView(constructor, addlData);
			this._views.add(navigationPath, view);

			// otherwise, check if this can receive an update
		} else {
			if (isUpdatable(view)) {
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
	}

	/**
	 * _canNavigateAway
	 * ----------------------------------------------------------------------------
	 * Verify that we can move away from the current page
	 * @param isCancel 
	 */
	protected _canNavigateAway(isCancel?: boolean): boolean {
		if (!this._currentView) { return true; }
		if (!this._currentView.value) { return true; }
		if (!this._currentView.value.canNavigateAway(isCancel)) { return false; }
		return true;
	}

	/**
	 * _handleCurrentViewOnNavigate
	 * ----------------------------------------------------------------------------
	 * Update the current view in the history as needed on navigate away
	 * @param 	isCancel 	True if we are moving because of a cancel event
	 * @returns	True if we could navigate away, false otherwise
	 */
	protected async _handleCurrentViewOnNavigate<M>(isCancel?: boolean): Promise<boolean> {

		// make sure that we have a current view
		if (!this._currentView) { return true; }

		// determine if there is any information this view wants to add to the addlData array
		let navAwayData: INavigationData<M> = await this._currentView.value.onNavigateAway(isCancel);
		if (!navAwayData) { return true; }

		// if so, update the history state for this view
		let historyState: IHistoryEntry<T> = {
			navigationPath: null,
			data: navAwayData
		}

		this._history.updateCurrentState(historyState);
		return true;
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
	protected _createView<D extends INavigable, M>(constructor: IConstructor<D>, addlData?: INavigationData<M>): D {
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
	protected _updateView<D extends INavigable, M>(view: D, addlData?: INavigationData<M>): void {
		view.update(addlData.model, addlData);
	}

	/**
	 * _updateHistory
	 * ----------------------------------------------------------------------------
	 * Add this navigate event to the history of the page
	 * @param 	navigationPath 	The path to navigate to
	 * @param 	addlArgs 		Any additional data for this 
	 */
	private _updateHistory(navigationPath: T, addlArgs: INavigationData<any>): void {
		let history: IHistoryEntry<T> = {
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
	protected _handleTransition(view: INavigable): void {
		// verify we have enough data to handle this
		if (!view || !this._parent) { return; }

		switch (this._transitionType) {
			case INavTransitionType.OPACITY:
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
	protected _noTransition(view: INavigable): void {
		this._parent.innerHTML = "";
		view.draw(this._parent);
	}

	/**
	 * _opacityTransition
	 * ----------------------------------------------------------------------------
	 * Fade out the parent, swap out content, then fade back in
	 */
	protected _opacityTransition(view: INavigable): void {
		transition(
			this._parent,
			{ opacity: "1" },
			{ opacity: "0" },
			200
		).then(() => {
			this._parent.innerHTML = "";
			view.draw(this._parent);

			transition(
				this._parent,
				{ opacity: "0" },
				{ opacity: "1" },
				200
			);
		});
	}

	/**
	 * pushHistoryState
	 * ----------------------------------------------------------------------------
	 * make sure we can return to the right page
	 * 
	 * @param   history     The page to return to when hitting the back button
	 */
	protected _pushHistoryState(history: IHistoryEntry<T>): void {
		try {
			window.history.pushState(
				history,
				history.title,
				history.url
			);
		} catch (err) {
			console.warn("Couldn't save history state: " + err);
		}
	}

	/**
	 * _handleState
	 * ----------------------------------------------------------------------------
	 * Override the back button to go to the right page
	 */
	protected _handleState(): void {
		let state: IHistoryEntry<T> = window.history.state;
		if (!state) { return; }
		this.navigateTo(state.navigationPath, null, state.data);
	}

}

	//#endregion
