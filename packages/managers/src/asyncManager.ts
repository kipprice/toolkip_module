import { IIdentifiable, Identifier, IdentifiableModel } from '@kipprice/toolkip-identifiable';
import { DataManager } from "./dataManager";
import { Loadable, Creatable, ILoadFunction, ICreateFunction } from "./_interfaces";
import { IDictionary } from '@kipprice/toolkip-object-helpers';


/**----------------------------------------------------------------------------
 * @class	_AsyncManager
 * ----------------------------------------------------------------------------
 * Manages a set of models that can be loaded from the server
 * @author	Kip Price
 * @version	1.1.0
 * ----------------------------------------------------------------------------
 */
export class AsyncManager<I extends IIdentifiable>
    extends DataManager<I>
    implements Loadable<I>, Creatable<I>
{

    //.....................
    //#region PROPERTIES

    /** track any requests that are currently being loaded */
    protected _inFlight: IDictionary<Promise<I>>;

    protected _innerLoad: ILoadFunction<I>;
    protected _innerCreate: ICreateFunction<I>

    //#endregion
    //.....................

    //..........................................
    //#region CREATE THE MANAGER

    public constructor(load: ILoadFunction<I>, create?: ICreateFunction<I>) {
        super();
        this._innerLoad = load;
        this._innerCreate = create;
        this._inFlight = {};
    }

    /**
     * _createAndAddDefault
     * ----------------------------------------------------------------------------
     * add a default value
     */
    protected _createAndAddDefault(d: Partial<I>): void {
        let model = this.create(d);
        this.add(model as any as I);
    }

    //#endregion
    //..........................................

    //..........................................
    //#region RETRIEVE DATA

    /**
     * getOrCreate
     * ----------------------------------------------------------------------------
     * get the data associated with a particular ID
     */
    public async getOrCreate(id: Identifier): Promise<I> {

        // validate input
        if (!id) { throw new Error("no ID provided"); }

        // check if we already have info on this element; if so, return it
        let datum = this.get(id);
        if (datum) { return datum; }

        // check if we are already running a request for this element
        // if so, return the current request
        if (this._inFlight[id]) { return this._inFlight[id]; }

        // otherwise, run the appropriate loading code for this element
        this._inFlight[id] = this._loadAndCreate(id);
        return this._inFlight[id];
    }

    /**
     * _loadAndCreate
     * ---------------------------------------------------------------------------
     * create a new element via the appropriate loading call
     */
    protected async _loadAndCreate(id: Identifier): Promise<I> {
        let d = await this.load(id);
        if (!d) { throw new Error("no data found for id '" + id + "'") };

        // create the appropriate model
        let model = this.create(d);
        let datum = model as any as I;
        this.add(datum);
        return datum;
    }

    //#endregion
    //..........................................

    //..........................................
    //#region GENERATE NEW DATA

    /**
     * create
     * ----------------------------------------------------------------------------
     * create a new element
     */
    public create(d: Partial<I>): I {
        if (this._innerCreate) { return this._innerCreate(d); }
        else return d as I;
    }

    /**
     * load
     * ----------------------------------------------------------------------------
     * load details about the element tied to the specified ID
     */
    public async load(id: Identifier): Promise<I> {
        if (!this._innerLoad) { Promise.reject('innerLoad not defined')}
        return this._innerLoad(id);
    }

    //#endregion
    //..........................................
}
