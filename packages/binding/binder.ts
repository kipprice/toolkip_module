import { IDictionary, map } from '../objectHelpers';
import { nextRender } from '../async';
import { IEqualityFunction } from '../comparable/comparable';
import { 
		IBindingDetails, 
		BoundDeleteFunction as BoundSkipFunction, 
		BoundUpdateFunction, 
		BoundEvalFunction 
	} from './_interfaces';

	
/**----------------------------------------------------------------------------
 * @class	Binder
 * ----------------------------------------------------------------------------
 * keeps track of all bound elements and consolidates into a single animation 
 * frame event; prevents poor performance with lots of bound views
 * @author	Kip Price
 * @version	1.0.0
 * ----------------------------------------------------------------------------
 */
class _Binder {
	//.....................
	//#region PROPERTIES
	
	/** keep track of all of the bound functions globally */
	protected _boundDetails: IDictionary<IBindingDetails<any>>;

	/** assign a unique ID to each bound function */
	protected _id: number = 0;

	/** check whether we have started binding already */
	protected _started: boolean = false;
	
	//#endregion
	//.....................

	//..........................................
	//#region HANDLE IDENTIFIERS
	
	/**
	 * _getNextId
	 * ----------------------------------------------------------------------------
	 * find the next unique ID
	 */
	protected _getNextId(): string {
		this._id += 1;
		return this._id.toString();
	}
	
	//#endregion
	//..........................................

	//..........................................
	//#region CONSTRUCTORS
	
	/**
	 * Binder
	 * ----------------------------------------------------------------------------
	 * generate a single instance of the binder
	 */
	public constructor() {
		this._boundDetails = {};
		this._startAnimationLoop();
	}
	
	//#endregion
	//..........................................

	//...............................................................
	//#region PUBLIC FUNCS FOR REGISTERING / UNREGISTERING BINDINGS
	
	/**
	 * bind
	 * ----------------------------------------------------------------------------
	 * tie a particular model to an update function
	 */
	public bind<T = any>(
			evalFunc: BoundEvalFunction<T>, 
			updateFunc: BoundUpdateFunction<T>, 
			skipFunc?: BoundSkipFunction, 
			equalsFunc?: IEqualityFunction<T>
		): string {

		if (!evalFunc || !updateFunc) { 
			return "";
		}

		// initialize appropriately if the value is already set
		let lastValue = evalFunc();
		if (lastValue) {
			nextRender().then(() => updateFunc(lastValue));
		}
		

		let details: IBindingDetails<T> = {
			id: this._getNextId(),
			eval: evalFunc,
			update: (val: T) => {
				updateFunc(val);
			},
			skip: skipFunc || (() => false),
			lastValue: lastValue,
			equals: equalsFunc || ((a, b) => { return a === b} )
		}

		// add to our dictionary
		this._boundDetails[details.id] = details;
		
		// return the identifier of the bound function
		return details.id;
	}

	/**
	 * unbind
	 * ----------------------------------------------------------------------------
	 * unregister a binding if appropriate
	 */
	public unbind(key: string): boolean {
		if (!this._boundDetails[key]) { return false; }

		delete this._boundDetails[key];
		return true;
	}
	
	//#endregion
	//...............................................................

	//..........................................
	//#region SHARED ANIMATION FRAME HANDLING

	/**
	 * _startAnimationLoop
	 * ----------------------------------------------------------------------------
	 * generate the appropriate loop
	 */
	protected _startAnimationLoop(): void {
		if (this._started) { return; }
		this._onFrame();
	}
	
	/**
	 * _onFrame
	 * ----------------------------------------------------------------------------
	 * update all bound functions 
	 */
	protected async _onFrame(): Promise<void> {
		map(this._boundDetails, (details: IBindingDetails<any>) => {
			this._handlingBinding(details);
		})

		// queue up the next render
		return nextRender().then(() => this._onFrame());
	}

	/**
	 * _handlingBinding
	 * ----------------------------------------------------------------------------
	 * evaluate whether a particular binding has been updated
	 */
	protected async _handlingBinding<T>(details: IBindingDetails<T>): Promise<void> {

		// check first if this element should be skipped
		if (details.skip()) { 
			return;
		}

		// next check if the value has changed
		let newVal = details.eval();
		if (details.equals(newVal, details.lastValue)) { return; }

		// last, perform the update function
		details.lastValue = newVal;
		details.update(newVal);
	}
	
	//#endregion
	//..........................................

}

export const Binder = new _Binder();