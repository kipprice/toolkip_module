import { HistoryNode } from "./historyNode";
import { combineObjects } from '@toolkip/object-helpers';


/**----------------------------------------------------------------------------
 * @class	HistoryChain
 * ----------------------------------------------------------------------------
 * Keep track of internal history & allow moving forward and backward
 * @author	Kip Price
 * @version 1.0.0
 * ----------------------------------------------------------------------------
 */
export class HistoryChain<T> {

	//.....................
	//#region PROPERTIES
	/** the first history event tracked */
	protected _start: HistoryNode<T>;

	/** the last history event tracked */
	protected _end: HistoryNode<T>;

	/** the current history node we are sitting on */
	protected _curNode: HistoryNode<T>;
	public get currentState(): T { return this._curNode.data; }

	protected _preventAdditions?: boolean;
	
	//#endregion
	//.....................

	/**
	 * push
	 * ----------------------------------------------------------------------------
	 * Push a new value into our history chain
	 * @param   data    The data to add
	 */
	public push(data: T): void {
		let node: HistoryNode<T> = new HistoryNode<T>(data);

		// case 1: first node we're adding
		if (!this._start) {
			this._start = node;
			this._end = node;
			this._curNode = node;
			return;
		}

		// clear the forward history if we're adding new data
		if (this._curNode !== this._end) {
			this._clearToCurIdx();
		}

		// everything else will just add to the end
		this._end.next = node;
		node.previous = this._end;
		this._end = node;
		this._curNode = this._end;

	}

	/**
	 * _clearToCurIdx
	 * ----------------------------------------------------------------------------
	 * Clear out all history events that happened after the current index
	 */
	protected _clearToCurIdx(): void {
		this._end = this._curNode;
		this._curNode.next = null;
	}

	/**
	 * navigateBack
	 * ----------------------------------------------------------------------------
	 * Move bakcwards in the history chain
	 * @returns The state we're moving to
	 */
	public navigateBack(cb?: (lastState: T) => void): T {
		if (!this._curNode.previous) { return null; }

		const out = this._curNode.previous.data;
		this._curNode = this._curNode.previous;

		// allow for a callback to occur during the navigation to
		// prevent cases where a navigation could accidentally add
		// back the current state
		if (cb) { this._handleNavigateCallback(out, cb) }

		return out;

	}

	/**
	 * navigateForward
	 * ----------------------------------------------------------------------------
	 * Move forwards in the history chain
	 * @returns The atate we're moving to
	 */
	public navigateForward(cb?: (nextState: T) => void): T {
		if (!this._curNode.next) { return null; }

		const out = this._curNode.next.data;
		this._curNode = this._curNode.next;

		// process callback if provided
		if (cb) { this._handleNavigateCallback(out, cb); }

		return out;
	}

	/**
	 * _handleNavigateCallback
	 * ----------------------------------------------------------------------------
	 * allow for a callback to occur during the navigation to prevent cases where 
	 * a navigation could accidentally add back the current state during the 
	 * restore process
	 */
	protected _handleNavigateCallback(state: T, cb: (state: T) => void) {
		this._preventAdditions = true;
		cb(state);
		this._preventAdditions = false;
	}

	/**
	 * updateCurrentState
	 * ----------------------------------------------------------------------------
	 * Update our current history node to include a new aspect of state
	 * @param 	newState 	The state to update to
	 * @returns	True if the state was updated, false otherwise
	 */
	public updateCurrentState(newState: T): boolean {
		if (!this._curNode) { return false; }
		let curState: T = this._curNode.data;
		let combinedState: T = combineObjects(curState, newState, true);
		this._curNode.data = combinedState;
		return true;
	}
}


