import { arrayToMap, map, isMappable } from '@toolkip/object-helpers';
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
    ModelEventFullPayload
} from '../_shared';


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
export class Selector<I, O, X, K> implements ISelector<I, O, X, K> {

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
        this._processor = processor || ((data: I) => { return data as any as O; });
        this._lastModel = this._processor(model.getData(), {} as any);
        this._setupFilters(filters || {});
        this._addEventListener(model);
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
   
   //#endregion
   //..........................................


   //..........................................
   //#region HANDLE THE UPDATE EVENTS
   
   protected _addEventListener(model: Selectable<I>) {
        model.addEventListener((payload) => {
            if (this._isFiltered(payload)) { return; }

            const processedData = this._processor(payload.target.getData(), payload);
            if (equals(processedData, this._lastModel)) { return; }

            this._notifyCallbacks({
                ...payload,
                target: this,
                oldValue: this._lastModel,
                value: processedData,
                eventChain: payload
            });

            this._lastModel = processedData;
        })
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
        for (let af of this._applyFuncs) {
            af(payload);
        }
    
        const { value } = payload;
        if (isMappable(value)) {
            for (let mf of this._mapFuncs) {
                map(payload.value, (val: any, key: any) => {
                    mf(val, key);
                });
            }
        }
    }
   
   //#endregion
   //..........................................

   //..........................................
   //#region REGISTER ADDITIONAL LISTENERS
   
    public apply(cb: SelectorApplyFunc<O>) {
        this._applyFuncs.push(cb);
        return this;
    }

    public addEventListener(cb: SelectorApplyFunc<O>) {
        return this.apply(cb);
    }

    public map(cb: SelectorMapFunc<X, K>) {
        this._mapFuncs.push(cb);
        return this;
    }

    public select<OO>(processor: SelectorFunc<O, OO>, filters?: SelectorFilters<O>) {
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
export const select = <I, O, X, K>(
    listenable: Selectable<I>, 
    processor?: SelectorFunc<I, O>, 
    filters?: SelectorFilters<I>
): Selector<I, O, X, K> => {
    return new Selector(listenable, processor, filters);
}
