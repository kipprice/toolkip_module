import { IDictionary } from '../objectHelpers/_interfaces';
import { map } from '../objectHelpers/navigate';
import { nextRender } from '../async';
import { IEqualityFunction } from '../comparable/comparable';
import { 
		IBindingDetails, 
		BoundDeleteFunction, 
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
	
	protected _boundDetails: IDictionary<IBindingDetails<any>>;

	protected _id: number = 0;

	protected _started: boolean = false;
	
	//#endregion
	//.....................

	//..........................................
	//#region HANDLE IDENTIFIERS
	
	protected _getNextId(): string {
		this._id += 1;
		return this._id.toString();
	}
	
	//#endregion
	//..........................................

	//..........................................
	//#region CONSTRUCTORS
	
	public constructor() {
		this._boundDetails = {};
		this._startAnimationLoop();
	}
	
	//#endregion
	//..........................................

	//...............................................................
	//#region PUBLIC FUNCS FOR REGISTERING / UNREGISTERING BINDINGS
	
	public bind<T = any>(
			evalFunc: BoundEvalFunction<T>, 
			updateFunc: BoundUpdateFunction<T>, 
			deleteFunc?: BoundDeleteFunction, 
			equalsFunc?: IEqualityFunction<T>
		): string {

		if (!evalFunc || !updateFunc) { 
			return "";
		}

		// initialize appropriately if the value is already set
		let lastValue = evalFunc();
		nextRender().then(() => updateFunc(lastValue));

		let details: IBindingDetails<T> = {
			id: this._getNextId(),
			eval: evalFunc,
			update: updateFunc,
			delete: deleteFunc || (() => false),
			lastValue: lastValue,
			equals: equalsFunc || ((a, b) => { return a === b} )
		}

		// add to our dictionary
		this._boundDetails[details.id] = details;
		
		// return the identifier of the
		return details.id;
	}

	public unbind(key: string): boolean {
		if (!this._boundDetails[key]) { return false; }

		delete this._boundDetails[key];
		return true;
	}
	
	//#endregion
	//...............................................................

	//..........................................
	//#region SHARED ANIMATION FRAME HANDLING

	protected _startAnimationLoop(): void {
		if (this._started) { return; }
		this._onFrame();
	}
	
	protected async _onFrame(): Promise<void> {
		map(this._boundDetails, (details: IBindingDetails<any>) => {
			this._handlingBinding(details);
		})

		// queue up the next render
		return nextRender().then(() => this._onFrame());
	}

	protected async _handlingBinding<T>(details: IBindingDetails<T>): Promise<void> {

		// check first if this element should be deleted
		if (details.delete()) { 
			this.unbind(details.id);
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