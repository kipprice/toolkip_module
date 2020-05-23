import { IPartial } from '@toolkip/structs';
import { IIdentifiable, generateUniqueId, registerUniqueId } from '@toolkip/identifiable';
import { _KeyedModel } from '../abstractClasses/_keyedModel';
import { IKeyedModelTransforms } from '../_shared/_interfaces';
import { MObject } from './modelObject';

// TODO: evaluate identifier assignment and whether it can be suffix-less

/**----------------------------------------------------------------------------
 * @class   Identifiable<T>
 * ----------------------------------------------------------------------------
 * Creates a model that has an associated ID
 * @author  Kip Price
 * @version 1.0.0
 * ----------------------------------------------------------------------------
 */
export class MIdentifiable<T extends IIdentifiable = IIdentifiable> extends MObject<T> implements IIdentifiable {

    //.....................
    //#region PROPERTIES

    /** unique ID for the model */
    public get id(): string { return this.get('id') as any as string }
    public set id(data: string) { this.set('id', data); }

    /** allow classes to specify a prefix to their ID easily */
    protected static get _suffix(): string { return this.name; }

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
        return generateUniqueId(this._suffix);
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
    constructor(dataToCopy?: IPartial<T>, transforms?: IKeyedModelTransforms<T>) {
        super(dataToCopy);

        // make sure we have an appropriate id stored statically
        if (dataToCopy?.id) {
            (this.constructor as any)._updateLastId(dataToCopy.id)
        } else {
            const newId = (this.constructor as any)._generateNewId();
            this.set('id', newId);
        }
    }
}