import { IBoundElemDefinition, _BoundView } from ".";

/**----------------------------------------------------------------------------
 * @class	BoundView
 * ----------------------------------------------------------------------------
 * composable view that also ties into the model binding
 * @author	Kip Price
 * @version	1.0.0
 * ----------------------------------------------------------------------------
 */
export class BoundView<VM, P extends string = ""> extends _BoundView<VM, P> {

    //.....................
    //#region PROPERTIES 
    
    /** when we're composing, we're going to want access 
     *  to the elements we composed after the fact */
    public get elems() { return this._elems; }
    
    //#endregion
    //.....................

    /**
     * BoundView
     * ----------------------------------------------------------------------------
     * creates a bound view with the specified 
     */
    constructor (def: IBoundElemDefinition<VM>) {
        super();
        this._createElements(def);
    }

    /**
     * _createElements
     * ----------------------------------------------------------------------------
     * generate the elements contained within this 
     */
    protected _createElements(def: IBoundElemDefinition<VM>) {
        if (!def) { return; }
        this._createBase(def);
    }
}