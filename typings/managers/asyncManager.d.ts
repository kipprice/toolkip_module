import { Identifiable } from "../identifiable/_interfaces";
import { DataManager } from "./dataManager";
import { Loadable, Creatable, ManagedId } from "./_interfaces";
import { IdentifiableModel } from "../identifiable/identifiableModel";
import { IDictionary } from "../objectHelpers/_interfaces";
/**----------------------------------------------------------------------------
 * @class	AsyncManager
 * ----------------------------------------------------------------------------
 * Manages a set of models that can be loaded from the server
 * @author	Kip Price
 * @version	1.1.0
 * ----------------------------------------------------------------------------
 */
export declare abstract class AsyncManager<I extends Identifiable> extends DataManager<I> implements Loadable<I>, Creatable<I> {
    /** track any requests that are currently being loaded */
    protected _inFlight: IDictionary<Promise<I>>;
    constructor();
    /**
     * _createAndAddDefault
     * ----------------------------------------------------------------------------
     * add a default value
     */
    protected _createAndAddDefault(d: Partial<I>): void;
    /**
     * getOrCreate
     * ----------------------------------------------------------------------------
     * get the data associated with a particular ID
     */
    getOrCreate(id: ManagedId): Promise<I>;
    /**
     * _loadAndCreate
     * ---------------------------------------------------------------------------
     * create a new element via the appropriate loading call
     */
    protected _loadAndCreate(id: ManagedId): Promise<I>;
    /**
     * create
     * ----------------------------------------------------------------------------
     * create a new element
     */
    abstract create(d: Partial<I>): IdentifiableModel<I>;
    /**
     * load
     * ----------------------------------------------------------------------------
     * load details about the element tied to the specified ID
     */
    abstract load(id: ManagedId): Promise<I>;
}
