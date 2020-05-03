import { IPartial } from '@kipprice/toolkip-structs/partial';
import { IIdentifiable } from './_interfaces';
import { _Serializable } from '@kipprice/toolkip-serializable/serializableModel';
import { generateUniqueId, registerUniqueId } from '.';


/**----------------------------------------------------------------------------
 * @class   Identifiable<T>
 * ----------------------------------------------------------------------------
 * Creates a model that has an associated ID
 * @author  Kip Price
 * @version 1.0.0
 * ----------------------------------------------------------------------------
 */
export class IdentifiableModel<T extends IIdentifiable = IIdentifiable> extends _Serializable<T> implements IIdentifiable {

    //.....................
    //#region PROPERTIES

    /** unique ID for the model */
    protected _id: string;
    public get id(): string { return this._id; }
    public set id(data: string) { this._id = data; }

    /** allow classes to specify a prefix to their ID easily */
    protected static get _prefix(): string { return this.name; }

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
        return generateUniqueId(this._prefix);
    }

    /**
     * _updateLastId
     * ---------------------------------------------------------------------------
     * When incorporating an existing model, update the last ID used
     * @param   lastId  Most recent iD used in a model  
     */
    protected static _updateLastId(lastId: string): void {
        registerUniqueId(lastId);
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