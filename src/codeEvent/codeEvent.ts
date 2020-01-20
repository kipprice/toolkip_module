import {
    ICodeEventStandardContent,
    ICodeEventCallback
} from './_interfaces';
/**----------------------------------------------------------------------------
 * @class	_CodeEvent
 * ----------------------------------------------------------------------------
 * event handler designed to be used as a singleton for single events; allows 
 * for type safety and for passing context along with the event, including what
 * element triggered the event (without having to rely on the element being
 * identifiable)
 * 
 * @author	Kip Price
 * @version	1.0.0
 * ----------------------------------------------------------------------------
 */
export abstract class _CodeEvent<D = any, T = any> {

    //.....................
    //#region PROPERTIES

    protected _listeners: Map<T, ICodeEventCallback<D>[]>;
    
    /** keep track of the name of this handler */
    protected abstract get _name(): string;
    
    //#endregion
    //.....................

    constructor() {
        this._listeners = new Map();
    }

    /**
     * dispatch
     * ----------------------------------------------------------------------------
     * handle sending details to the 
     */
    dispatch(target: T, data: D) {

        // make sure we include the standard data as well with the event
        let dispatchData: D & ICodeEventStandardContent<T> = data as any;
        dispatchData.target = target;
        dispatchData.name = this._name;

        // get all listeners for this specific element, or for any element
        let listeners = [];
        listeners = listeners.concat(this._listeners.get(target))
        listeners = listeners.concat(this._listeners.get(null));

        // let all listeners know what's happening
        for (let cb of listeners) {
            if (!cb) { continue; }
            cb(dispatchData);
        }
    }

    /**
     * addEventListener
     * ----------------------------------------------------------------------------
     * allow any object to listen to this event
     * 
     * @param   cb      the callback to use when this event is raised
     * @param   target  if provided, limits callbacks to events raised by the specified target
     */
    addEventListener(cb: ICodeEventCallback<D>, target?: T) {
        if (!target) { target = null; }

        // get the current set of listeners
        let listeners = this._listeners.get(target);
        if (!listeners) { listeners = []; }
        listeners.push(cb);

        this._listeners.set(target, listeners);
    }
}
