import { DataManager, isDataManager } from '@toolkip/managers';
import { IIdentifiable, Identifier } from '@toolkip/identifiable';
import { _Model, _KeyedModels } from '../abstractClasses';
import { IArrayModel } from '../_shared/_interfaces';
import { MIdentifiable } from '../objectModels/identifiableModel';
import { IDictionary, map } from '@toolkip/object-helpers';
import { isUndefined, isArray } from '@toolkip/shared-types';

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
    extends _KeyedModels<ModelManagerInputs<T>, Identifier, T>
    implements IArrayModel<T, Identifier> 
{

    // keep track of everything in a data manager
    protected _innerModel: DataManager<T>;

    protected _getDefaultValues() {  return new DataManager<T>(); }
    protected _getValue(output: any, key: Identifier): MIdentifiable<T> {
        return output.get(key);
    }

    public getModel(key: Identifier) {
        return super.getModel(key) as MIdentifiable<T>;
    }

    protected _innerGetData() {
        const out = super._innerGetData() as DataManager<T>;
        return out.toArray();
    }

    public toDataManager() {
        return super._innerGetData() as DataManager<T>;
    }

    public toArray() {
        return this._innerGetData();
    }

    public toDictionary() {
        const manager = this.toDataManager();
        return manager.toDictionary();
    }

    protected _setValue(output: any, key: Identifier, value: MIdentifiable<T>): void {
        if (this._isRemoval(output, key, value)) {
            output.remove(key);
        } else if (this._isReplacement(output, key)) {
            output.remove(key);
            output.add(value);
        } else {
            output.add(value);
        }
        
    }

    protected _isRemoval(output: any, key: Identifier, value: MIdentifiable<T>): boolean {
        if (!isDataManager(output)) { return false; }
        if (!output.contains(key)) { return false; }

        if (isUndefined(value)) { return true; }
        if (isUndefined(value.getData())) { return true; }
        return false;
    }

    protected _isReplacement(output: any, key: Identifier): boolean {
        if (!isDataManager(output)) { return false; }
        if (!output.contains(key)) { return false; }
        return true;
    }

    /**
     * _map
     * ----------------------------------------------------------------------------
     * handle inputs from a variety of sources when mapping imports or exports
     */
    protected _map(data: ModelManagerInputs<T>, mapFunc: (val: T, key: Identifier) => void) {
        if (isDataManager(data)) { data.map(mapFunc); }
        else if (isArray(data)) { 
            map(data, (val: T, idx: number) => mapFunc(val, val.id) )
        } else { map(data, mapFunc); }
    }

    //..........................................
    //#region HANDLERS EXPECTED FOR COLLECTIONS
    
    public add(item: T) {
        if (this.contains(item)) { return false; }

        this._innerSet({ 
            key: item.id, 
            value: item, 
            eventType: 'add' 
        });

        return true;
    }

    public getIndex(item: T): Identifier {
        if (this._innerModel.contains(item.id)) {
            return item.id; 
        }
        return undefined;
    }
    
    //#endregion
    //..........................................
}