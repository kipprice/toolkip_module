import IPartial from '../structs/partial';
import { Identifiable } from './_interfaces';
import { Serializable } from '../structs/serializable/serializableModel';

/**----------------------------------------------------------------------------
 * @class   Identifiable<T>
 * ----------------------------------------------------------------------------
 * Creates a model that has an associated ID
 * @author  Kip Price
 * @version 1.0.0
 * ----------------------------------------------------------------------------
 */
export default class IdentifiableModel<T extends Identifiable = Identifiable> extends Serializable<T> implements Identifiable {

    //.....................
    //#region PROPERTIES

    /** unique ID for the model */
    protected _id: string;
    public get id(): string { return this._id; }
    public set id(data: string) { this._id = data; }
    
    /** track the last ID used in a model */
    protected static _lastId: number = 0;

    /** allow classes to specify a prefix to their ID easily */
    protected static get _prefix(): string { return ""; }

    //#endregion
    //.....................

    /**
     * _generateNewId
     * ---------------------------------------------------------------------------
     * spin up a new ID for a new model
     * 
     * @returns A new ID 
     */
    protected static _generateNewId(): string {
        this._lastId += 1;
        return this._prefix + this._lastId.toString();
    }

    /**
     * _updateLastId
     * ---------------------------------------------------------------------------
     * When incorporating an existing model, update the last ID used
     * @param   lastId  Most recent iD used in a model  
     */
    protected static _updateLastId(lastId: string): void {

        // make sure we aren't including the prefix
        let prefixReg = new RegExp(this._prefix, "g");
        lastId = lastId.replace(prefixReg, "");

        let lastNumericId = parseInt(lastId);

        // don't fail on NaN conditions; just increment
        if (isNaN(lastNumericId)) {
            this._lastId += 1;      

        // update the last id if this is greater
        } else if (lastNumericId > this._lastId) {
            this._lastId = lastNumericId;
        }
        
    }

    /**
     * IdentifiableModel
     * ---------------------------------------------------------------------------
     * Create a new model with a unique ID
     * @param   dataToCopy  If available, the interface to copy into this model 
     */
    constructor(dataToCopy?: IPartial<T>) {
        super(dataToCopy);

        // make sure we have an appropriate id stored statically
        if (dataToCopy && dataToCopy.id) {
            (this.constructor as any)._updateLastId(dataToCopy.id)
        } else {
            this._id = (this.constructor as any)._generateNewId();
        }
    }
}