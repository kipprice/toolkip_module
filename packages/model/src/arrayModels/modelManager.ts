import { DataManager, isDataManager } from '@toolkip/managers';
import { IIdentifiable, Identifier } from '@toolkip/identifiable';
import { _Model, _KeyedModel } from '../abstractClasses';
import { IArrayModel, IKeyedModelTransforms } from '../_shared/_interfaces';
import { MIdentifiable } from '../objectModels/identifiableModel';
import { IDictionary, map } from '@toolkip/object-helpers';

type ModelManagerInputs<T extends IIdentifiable> = DataManager<T> | T[] | IDictionary<T>;

/**----------------------------------------------------------------------------
 * @class	ModelManager
 * ----------------------------------------------------------------------------
 * wrapper around data manager that encloses the manager in a model in general
 * @author	Kip Price
 * @version	1.0.0
 * ----------------------------------------------------------------------------
 */
export class MManager<T extends IIdentifiable> 
    extends _KeyedModel<ModelManagerInputs<T>, Identifier, T>
    implements IArrayModel<T, Identifier> 
{

    // keep track of everything in a data manager
    protected _innerModel: DataManager<T>;

    protected _getDefaultValues() { 
        return new DataManager<T>(); 
    }
    protected _getValue(output: any, key: Identifier): MIdentifiable<T> {
        return output.get(key);
    }

    protected _innerGetData() {
        const outManager = super._innerGetData() as DataManager<T>;
        return outManager.toArray();
    }

    protected _setValue(output: any, key: Identifier, value: MIdentifiable<T>): void {
        output.add(value);
    }

    public clone(tx: IKeyedModelTransforms<any>) {
        return super.clone(tx)
    }


    protected _innerSetData(payload) {
        super._innerSetData(payload)
    }

    /**
     * _map
     * ----------------------------------------------------------------------------
     * handle inputs from a variety of sources when mapping imports or exports
     */
    protected _map(data: ModelManagerInputs<T>, mapFunc: (val: T, key: Identifier) => void) {
        if (isDataManager(data)) { 
            const arr = data.toArray();
            map(arr, mapFunc);
         }
        else { map(data, mapFunc); }
    }

    //..........................................
    //#region WRAPPERS AROUND DATA MANAGER
    
    public add(item: T) {
        return this._innerSet({ key: item.id, value: item, eventType: 'add' });
    }

    public remove(id: Identifier) {
        const removed = this._innerModel.remove(id);
        this._innerSet({ key: removed.id, value: undefined, oldValue: removed, eventType: 'remove' })
        return removed;
    }

    public clear() {
        // TODO: finish
        return this._innerModel.clear();
    }
    
    //#endregion
    //..........................................
}