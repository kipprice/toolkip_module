import { Identifiable } from "../identifiable/_interfaces";
import { ManagedId } from "./_interfaces";
import { IDictionary } from "../objectHelpers/_interfaces";
/**----------------------------------------------------------------------------
 * @class	DataMaanager
 * ----------------------------------------------------------------------------
 * generic manager for any element that has an ID
 * @author	Kip Price
 * @version	1.0.0
 * ----------------------------------------------------------------------------
 */
export declare abstract class DataManager<I extends Identifiable> {
    /** data backing this manager */
    protected _data: IDictionary<I>;
    /**
     * DataManager
     * ----------------------------------------------------------------------------
     * generate a new data manager
     */
    constructor();
    /**
     * _populateWithDefaultData
     * ----------------------------------------------------------------------------
     * overridable function that can assign default data to this manager
     */
    protected _populateWithDefaultData(): void;
    /**
     * _createAndAddDefault
     * ----------------------------------------------------------------------------
     * add a generic default to this manager
     */
    protected _createAndAddDefault(data: I): void;
    /**
     * add
     * ----------------------------------------------------------------------------
     * add a new element to this manager
     */
    add(datum: I): boolean;
    /**
     * remove
     * ----------------------------------------------------------------------------
     * remove an element from this manager
     */
    remove(id: ManagedId): I;
    /**
     * contains
     * ----------------------------------------------------------------------------
     * test if a particular element is present in the manager
     */
    contains(id: ManagedId): boolean;
    /**
     * clear
     * ----------------------------------------------------------------------------
     * clear out all elements in the manager
     */
    clear(): void;
    /**
     * get
     * ----------------------------------------------------------------------------
     * get the element with the specified ID
     */
    get(id: ManagedId): I;
    /**
     * toArray
     * ----------------------------------------------------------------------------
     * get the data contained within this manager as an array
     */
    toArray(): I[];
    /**
     * toDictionary
     * ----------------------------------------------------------------------------
     * get the data contained wuthin this manager as an dictionary
     */
    toDictionary(): IDictionary<I>;
}
