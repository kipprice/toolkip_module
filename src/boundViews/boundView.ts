import { IBoundElemDefinition, _BoundView } from ".";
import { IDrawableElements } from "../drawable";

/**----------------------------------------------------------------------------
 * @class	BoundView
 * ----------------------------------------------------------------------------
 * composable view that also ties into the model binding
 * @author	Kip Price
 * @version	1.0.0
 * ----------------------------------------------------------------------------
 */
export class BoundView<VM, E extends IDrawableElements = IDrawableElements, P extends string = ""> extends _BoundView<VM, P> {

    //.....................
    //#region PROPERTIES
    
    protected _elems: E;
    
    //#endregion
    //.....................
    
    /**
     * BoundView
     * ----------------------------------------------------------------------------
     * creates a bound view with the specified 
     */
    constructor (def: IBoundElemDefinition<VM>, elems?: E) {
        super();
        this._createElements(def, elems);
    }

    /**
     * _createElements
     * ----------------------------------------------------------------------------
     * generate the elements contained within this 
     */
    protected _createElements(def: IBoundElemDefinition<VM>, elems?: E) {
        if (elems) { this._elems = elems; }
        if (!def) { return; }
        this._createBase(def);
    }
}