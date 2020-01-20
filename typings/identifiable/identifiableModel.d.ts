import { IPartial } from '../structs/partial';
import { Identifiable } from './_interfaces';
import { Serializable } from '../serializable/serializableModel';
/**----------------------------------------------------------------------------
 * @class   Identifiable<T>
 * ----------------------------------------------------------------------------
 * Creates a model that has an associated ID
 * @author  Kip Price
 * @version 1.0.0
 * ----------------------------------------------------------------------------
 */
export declare class IdentifiableModel<T extends Identifiable = Identifiable> extends Serializable<T> implements Identifiable {
    /** unique ID for the model */
    protected _id: string;
    get id(): string;
    set id(data: string);
    /** track the last ID used in a model */
    protected static _lastId: number;
    /** allow classes to specify a prefix to their ID easily */
    protected static get _prefix(): string;
    /**
     * _generateNewId
     * ---------------------------------------------------------------------------
     * spin up a new ID for a new model
     *
     * @returns A new ID
     */
    protected static _generateNewId(): string;
    /**
     * _updateLastId
     * ---------------------------------------------------------------------------
     * When incorporating an existing model, update the last ID used
     * @param   lastId  Most recent iD used in a model
     */
    protected static _updateLastId(lastId: string): void;
    /**
     * IdentifiableModel
     * ---------------------------------------------------------------------------
     * Create a new model with a unique ID
     * @param   dataToCopy  If available, the interface to copy into this model
     */
    constructor(dataToCopy?: IPartial<T>);
}
