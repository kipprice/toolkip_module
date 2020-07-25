import { arrayToMap, map, isMappable, filter } from '@toolkip/object-helpers';
import { equals } from '@toolkip/comparable';
import {
    ISelector, 
    SelectorFilterMaps, 
    SelectorFunc, 
    SelectorApplyFunc, 
    SelectorMapFunc, 
    SelectorFilters, 
    SelectorFilterFunc, 
    Selectable,
    ModelEventFullPayload,
    SelectorMapSelectFunc,
    SelectorFilterSelectFunc
} from '../_shared';
import { Model } from '../primitiveModels';
import { isSelector } from '../_typeguards';


/**----------------------------------------------------------------------------
 * @class	Selector
 * ----------------------------------------------------------------------------
 * wrapper around event listeners on models that can be chained or used 
 * effectively within bound contexts
 * 
 * @author	Kip Price
 * @version	1.0.0
 * ----------------------------------------------------------------------------
 */
export class Selector<I, O = I, X = any, K = any> implements ISelector<I, O, X, K> {

    //.....................
    //#region PROPERTIES
    
    protected _lastModel: O;
    protected _model: Selectable<I>;
    protected _filterMap: SelectorFilterMaps<I>;
    protected _processor: SelectorFunc<I, O>;

    protected _applyFuncs: SelectorApplyFunc<O>[] = [];
    protected _mapFuncs: SelectorMapFunc<X, K>[] = [];

    public getData(): O { return this._lastModel; }
    
    //#endregion
    //.....................

   //..........................................
   //#region CREATE AND SETUP THE SELECTOR
   
    public constructor(model: Selectable<I>, processor?: SelectorFunc<I, O>, filters?: SelectorFilters<I>) {
        this._model = model;
        this._processor = processor || ((data: I) => { return data as any as O; });
        this._setupFilters(filters || {});
        this._lastModel = this._process(model, { target: model } as any, true);
        this._addEventListener(model);
    }

    protected _process(model: Selectable<I>, payload, initial?: boolean): O {
        const result = this._processor(model.getData(), payload);
        if (isSelector(result)) {
            if (initial) { 
                result.addEventListener((payload) => {
                    this._updateFromModel({
                        ...payload,
                        target: model
                    } as ModelEventFullPayload<any, any>);
                })
            }
            return result.getData()
        } else {
            return result;
        }
    }

    protected _setupFilters({ keys = [], eventTypes = []}: SelectorFilters<I>) {
        this._filterMap = {
            keys: arrayToMap(keys),
            eventTypes: arrayToMap(eventTypes),
            customFilters: []
        }
    }

    public filter(filterFunc: SelectorFilterFunc<I>) {
        this._filterMap.customFilters.push(filterFunc);
        return this;
    }

    // allow for forcing an update
    public reselect(callbacks?: { apply?: SelectorApplyFunc<O>[], map?: SelectorMapFunc<X, K>[]}) {
        const event = this._createReselectEvent();

        if (!callbacks) { 
            this._notifyCallbacks(event) 
        } else {
            const { apply, map } = callbacks;
            if (apply) { this._notifyApplySelectors(event, apply) }
            if (map) { this._notifyMapSelectors(event, map) }
        }
    }

    protected _createReselectEvent(): ModelEventFullPayload<any, O> {
        return {
            name: 'modelchange',
            target: this,
            oldValue: this._lastModel,
            value: this._lastModel,
            eventType: 'none'
        }
    }
   
   //#endregion
   //..........................................


   //..........................................
   //#region HANDLE THE UPDATE EVENTS
   
   protected _addEventListener(model: Selectable<I>) {
        model.addEventListener((payload) => {
            return this._updateFromModel(payload);
        })
    }

    protected _updateFromModel(payload: ModelEventFullPayload<any, I>) {
        if (this._isFiltered(payload)) { return; }

        const processedData = this._process(payload.target, payload);
        if (equals(processedData, this._lastModel)) { return; }

        // update the model before calling callbacks
        const oldValue = this._lastModel;
        this._lastModel = processedData;

        this._notifyCallbacks({
            ...payload,
            target: this,
            oldValue,
            value: processedData,
            eventChain: payload
        });
    }

    protected _isFiltered(payload: ModelEventFullPayload<any, I>) {
        const { key, eventType } = payload;
        const { keys, eventTypes, customFilters } = this._filterMap;

        // standard filters
        if (keys.size > 0 && !keys.has(key)) { return true; }
        if (eventTypes.size > 0 && !eventTypes.has(eventType)) { return true; }

        // custom filters
        for (let cf of customFilters) {
            if (cf(payload)) { return true; }
        }

        return false;
    }

    protected _notifyCallbacks(payload: ModelEventFullPayload<any, O>): void {
        this._notifyApplySelectors(payload, this._applyFuncs);
        this._notifyMapSelectors(payload, this._mapFuncs);
    }

    protected _notifyApplySelectors(payload: ModelEventFullPayload<any, O>, cbs: SelectorApplyFunc<O>[]) {
        for (let cb of cbs) {
            cb(payload);
        }
    }

    protected _notifyMapSelectors(payload: ModelEventFullPayload<any, O>, cbs: SelectorMapFunc<X, K>[]) {

        const { value } = payload;
        if (!isMappable(value)) { return }
        for (let cb of cbs) {
            map(value, (v: any, k: any) => {
                cb(v, k, payload);
            })
        }
    }
   
   //#endregion
   //..........................................

   //..........................................
   //#region REGISTER ADDITIONAL LISTENERS
   
    public apply(cb: SelectorApplyFunc<O>, skipInitialNotify?: boolean) {
        this._applyFuncs.push(cb);
        if (!skipInitialNotify) { this.reselect({ apply: [ cb ] }); }
        return this;
    }

    public addEventListener(cb: SelectorApplyFunc<O>, skipInitialNotify?: boolean) {
        return this.apply(cb, skipInitialNotify);
    }

    public map(cb: SelectorMapFunc<X, K>, skipInitialNotify?: boolean) {
        this._mapFuncs.push(cb);
        if (!skipInitialNotify) { this.reselect({ map: [ cb ] }); }
        return this;
    }

    //#endregion
    //..........................................
    
    //..........................................
    //#region ADDITIONAL SELECTORS
    
    public mapSelect<OO>(cb: SelectorMapSelectFunc<X, K, OO>, filters?: SelectorFilters<O>): Selector<O, OO[], any, any> {
        return new Selector<O, OO[], any, any>(
            this,
            (data, payload) => {

                const out = [];
                if (isMappable(data)) {
                    map(data as any, (e: X, k: any) => {
                        out.push(cb(e, k as any, payload))
                    })
                }
                return out;

            },
            filters
        )
    }

    public filterSelect<OO>(cb: SelectorFilterSelectFunc<X, K>, filters?: SelectorFilters<O>): Selector<O, OO[], any, any> {
        return new Selector<O, OO[], any, any>(
            this,
            (data, payload) => {
                if (!isMappable(data)) { return data as any; }
                return filter(data as any, (e: X, k: any) => {
                    return cb(e, k, payload)
                })
            },
            filters
        )
    }

    public select<OO>(processor: SelectorFunc<O, OO>, filters?: SelectorFilters<O>): Selector<O, OO, any, any> {
        return new Selector<O, OO, any, any>(
            this,
            processor,
            filters
        );
    }

   //#endregion
   //..........................................
}

/**
 * select
 * ----------------------------------------------------------------------------
 * add a listener to a model that allows for chaining and various other ways
 * to get at data meaningfully
 * 
 * @param   listenable  The data we are listening for model changes on
 * @param   processor   How to manipulate the data for our purposes
 * @param   filters     What events should be filtered out
 * 
 * @returns The created selector 
 */
export const select = <I = any, O = any, X = any, K = any>(
    listenable: Selectable<I>, 
    processor?: SelectorFunc<I, O>, 
    filters?: SelectorFilters<I>
): Selector<I, O, X, K> => {
    return new Selector(listenable, processor, filters);
}

/**
 * rawSelect
 * ----------------------------------------------------------------------------
 * add a listener to data this is not yet in model form. This will not allow
 * for updates effectively, but it will make simplifying data more feasible
 * 
 * @param   rawData     The data to turn into a model
 * @param   processor   What function to run to select on the data
 * @param   filters     Any filters that should be applied to changes on the model
 */
export const rawSelect = <I = any, O = any, X = any, K = any>(
    rawData: I,
    processor?: SelectorFunc<I, O>,
    filters?: SelectorFilters<I>
): Selector<I, O, X, K>  =>{
    const model = new Model(rawData);
    return new Selector(model, processor, filters);
}