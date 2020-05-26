import { IIdentifiable, Identifier } from '@toolkip/identifiable';
import { map, IDictionary } from '@toolkip/object-helpers';


/**----------------------------------------------------------------------------
 * @class	DataMaanager
 * ----------------------------------------------------------------------------
 * generic manager for any element that has an ID
 * @author	Kip Price
 * @version	1.0.0
 * ----------------------------------------------------------------------------
 */
export class DataManager<I extends IIdentifiable> {

    //.....................
    //#region PROPERTIES

    /** data backing this manager */
    protected _data: IDictionary<I>;

    //#endregion
    //.....................

    //..........................................
    //#region CREATE THE MANAGER

    /**
     * DataManager
     * ----------------------------------------------------------------------------
     * generate a new data manager
     */
    public constructor() {
        this._data = {};
        this._populateWithDefaultData();
    }

    /**
     * _populateWithDefaultData
     * ----------------------------------------------------------------------------
     * overridable function that can assign default data to this manager
     */
    protected _populateWithDefaultData(): void { }

    /**
     * _createAndAddDefault
     * ----------------------------------------------------------------------------
     * add a generic default to this manager
     */
    protected _createAndAddDefault(data: I): void {
        this.add(data);
    }

    //#endregion
    //..........................................

    //..........................................
    //#region ADD AND REMOVE DATA

    /**
     * add
     * ----------------------------------------------------------------------------
     * add a new element to this manager
     */
    public add(datum: I): boolean {
        if (this.contains(datum.id)) { return false; }
        this._data[datum.id] = datum;
        return true;
    }

    /**
     * remove
     * ----------------------------------------------------------------------------
     * remove an element from this manager
     */
    public remove(id: Identifier): I {
        if (!this.contains(id)) { return null; }
        let out = this.get(id);
        delete this._data[id];
        return out;
    }

    /**
     * contains
     * ----------------------------------------------------------------------------
     * test if a particular element is present in the manager
     */
    public contains(id: Identifier): boolean {
        return !!this._data[id];
    }

    /**
     * clear
     * ----------------------------------------------------------------------------
     * clear out all elements in the manager
     */
    public clear(): void {
        this._data = {};
    }

    //#endregion
    //..........................................

    //..........................................
    //#region RETRIEVE DATA     

    /**
     * get
     * ----------------------------------------------------------------------------
     * get the element with the specified ID
     */
    public get(id: Identifier): I {
        if (!this.contains(id)) { return null; }
        return this._data[id];
    }

    //#endregion
    //.........................................

    //..........................................
    //#region STANDARD COLLECTION FORM

    public map(mapFunc: (elem: I, id: Identifier) => void) {
        map(this._data, mapFunc)
    }
    
    /**
     * toArray
     * ----------------------------------------------------------------------------
     * get the data contained within this manager as an array
     */
    public toArray(): I[] {
        let out: I[] = [];
        this.map((elem: I) => {
            out.push(elem);
        })
        return out;
    }

    /**
     * toDictionary
     * ----------------------------------------------------------------------------
     * get the data contained wuthin this manager as an dictionary
     */
    public toDictionary(): IDictionary<I> {
        let out: IDictionary<I> = {};
        this.map((elem: I, id: Identifier) => {
            out[id] = elem;
        });
        return out;
    }

    //#endregion
    //...........................................

    public clone(): DataManager<I> {
        const out = new DataManager<I>();
        const dataAsArray = this.toArray();
        for (let datum of dataAsArray) {
            out.add(datum);
        }
        return out;
    }

}
