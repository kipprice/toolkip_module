import { IDrawableElements } from '@toolkip/drawable';
import { _BoundView } from './_boundView';
import { IBoundElemDefinition } from './_interfaces';

/**----------------------------------------------------------------------------
 * @class	BoundView
 * ----------------------------------------------------------------------------
 * composable view that also ties into the model binding
 * @author	Kip Price
 * @version	1.0.0
 * ----------------------------------------------------------------------------
 */
export class BoundView<
    VM = any, 
    E extends IDrawableElements = IDrawableElements, 
    P extends string = ""
> extends _BoundView<VM, P, E> {
    
    /**
     * BoundView
     * ----------------------------------------------------------------------------
     * creates a bound view with the specified 
     */
    constructor (def: IBoundElemDefinition<VM, E>, elems?: E) {
        super();
        this._createElements(def, elems);
    }

    /**
     * _createElements
     * ----------------------------------------------------------------------------
     * generate the elements contained within this 
     */
    protected _createElements(def: IBoundElemDefinition<VM, E>, elems?: E) {
        if (elems) { this._elems = elems; }
        if (!def) { return; }
        this._createBase(def);
    }
}