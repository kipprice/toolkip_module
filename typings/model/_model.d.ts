import { IDictionary, IConstructor } from '../objectHelpers/_interfaces';
import { IPartial } from '../structs/partial';
import { IPropertyChangeListener, IModel, IModelChangeListener } from './_interfaces';
/**----------------------------------------------------------------------------
 * @class   Model
 * ----------------------------------------------------------------------------
 * Generic class to be able to easily create models that can save down to JSON.
 *
 * By default, can copy over simple data (primitives, arrays, objects) for both
 * loading and saving.
 * If more complex logic is needed, supports functions of the format
 *      _copy[CamelCasePropertyName] : get data out of JSON onto the class
 *      _save[CamelCasePropertyName] : save data into JSON from this class
 *
 * @author  Kip Price
 * @version 1.0.5
 * ----------------------------------------------------------------------------
 */
export declare abstract class _Model<T extends IModel = IModel> {
    /** track listeners for specific properties registered by callers */
    private __propertyListeners;
    /** track listeners for specific properties registered by callers */
    private __modelListeners;
    /**
     * Model
     * ----------------------------------------------------------------------------
     * Create a new model from specific data
     * @param   dataToCopy  If provided, the JSON of this data to copy over
     */
    constructor(dataToCopy?: IPartial<T>);
    /**
     * _setDefaultValues
     * ----------------------------------------------------------------------------
     * Overridable function to initialize any default data that is needed
     */
    protected _setDefaultValues(): void;
    /**
     * _copyData
     * ----------------------------------------------------------------------------
     * Copies data from a JSON version of this model
     * @param   data    The data to save into our model
     */
    protected _copyData<K extends keyof T>(data: IPartial<T>): void;
    /**
     * _copyPiece
     * ----------------------------------------------------------------------------
     * Copy a particular piece of data into this class
     * @param   key     The key to copy over
     * @param   value   The value to copy over
     */
    protected _copyPiece<K extends keyof T>(key: K, value: T[K]): void;
    /**
     * _copyModelArray
     * ----------------------------------------------------------------------------
     *
     * @param arr
     * @param constructor
     */
    protected _copyModelArray<I, M extends I>(arr: I[], constructor: IConstructor<M>): M[];
    /**
     * _copyModelDictionary
     * ----------------------------------------------------------------------------
     * @param dict
     * @param constructor
     */
    protected _copyModelDictionary<I, M extends I>(dict: IDictionary<I>, constructor: IConstructor<M>): IDictionary<M>;
    /**
     * update
     * ----------------------------------------------------------------------------
     * update various elements of the model to match the passed in data
     */
    update(model: IPartial<T>): void;
    /**
     * saveData
     * ----------------------------------------------------------------------------
     * Gets data out of this model in JSON format
     */
    saveData<K extends keyof T>(): T;
    /**
     * _savePiece
     * ----------------------------------------------------------------------------
     * Save a piece of data to our out array. If the data is a model itself, calls
     * SaveData to retrieve the data from that model.
     * @param   key     The key to save data for
     * @param   value   The value of that key
     *
     * @returns The value
     */
    protected _savePiece<K extends keyof T>(key: K, val: T[K]): T[K];
    protected _innerSavePiece<K extends keyof T>(data: T[K]): T[K];
    protected _saveArray<K extends keyof T, A extends Array<T[K]>>(data: A): T[K];
    protected _saveModel<K extends keyof T, M extends _Model<T[K]>>(data: M): T[K];
    protected _saveObject<K extends keyof T>(data: T[K]): T[K];
    protected _saveSimple<K extends keyof T>(data: T[K]): T[K];
    /**
     * _setValue
     * ---------------------------------------------------------------------------
     * Helper to update a value in this model & notify listeners about the change
     */
    protected _setValue<K extends keyof T>(key: K, value: T[K]): void;
    /**
     * _notifyListeners
     * ---------------------------------------------------------------------------
     * Let any subscribers to this model know that some changes have occurred
     * @param   key     The key that changed in the model
     * @param   oldVal  The previous version of this key's value
     * @param   newVal  The new version of this key's value
     */
    protected _notifyListeners<K extends keyof T>(key: K, oldVal: T[K], newVal: T[K]): void;
    /**
     * _notifyModelListeners
     * ----------------------------------------------------------------------------
     * Let any listeners that care about any change to the model know that this
     * particular key has changed to this particular value
     */
    protected _notifyModelListeners<K extends keyof T>(key: K, oldVal: T[K], newVal: T[K]): void;
    /**
     * _notifyPropertyListerners
     * ----------------------------------------------------------------------------
     * Let any listeners that care about this particular property know that it has
     * changed
     */
    protected _notifyPropertyListeners<K extends keyof T>(key: K, oldVal: T[K], newVal: T[K]): void;
    /**
     * registerListener
     * ---------------------------------------------------------------------------
     * @param key
     * @param listener
     * @param uniqueKey
     */
    registerPropertyListener<K extends keyof T>(key: K, listener: IPropertyChangeListener<T, K>): void;
    /**
     * registerModelListener
     * ----------------------------------------------------------------------------
     * register a listener for any change that occurs in this model
     */
    registerModelListener(listener: IModelChangeListener<T>): void;
    /**
     * unregisterListeners
     * ----------------------------------------------------------------------------
     * delete any listeners attached to this model (allows for GC)
     */
    unregisterListeners(): void;
}
