import { ICodeEventCallback, ICodeEventStandardContent } from "@toolkip/code-event";
import { ICloneable } from '@toolkip/object-helpers';
import { IEquatable } from '@toolkip/comparable';

export interface IModelData {
    [key: string]: any;
}

export interface IBasicModel<T> extends ICloneable<IModel<T>>, IEquatable {
    setData(data: T): void;
    getData(): T;
    addEventListener(cb: ModelEventCallback<"_" | any, T | any>): void;
    import(data: T): void;
    export(): T;
}

export interface IKeyedModel<T, K, X> extends IBasicModel<T>, IEquatable {
    import(data: Partial<T>): void;
    set(key: K, value: X): void;
    update(key: K, value: Partial<X>): void;
    get(key: K): X;
    getModel(key: K): IModel<X>;
    clone(tx?: IKeyedModelTransforms<T, X>): IKeyedModel<T, K, X>;
    addEventListener(cb: ModelEventCallback<"_" | K, T | X>): void;
}

export type IModel<T, K = any, X = any> = IBasicModel<T> | IKeyedModel<T, K, X>;


//..........................................
//#region TRANSFORMS

/** 
 * defines the way that data should be transformed to and from
 * this model. allows for easy definition of server-side and 
 * client-side models
 */

export type IModelTransformFunc<X> = (value: X) => X;

export type IModelTransform<X> = {
    incoming?: IModelTransformFunc<X>;
    outgoing?: IModelTransformFunc<X>;
}

export interface IModelTransforms<T> {
    "_"?: IModelTransform<T>;
}

export type IObjectKeyedModelTransforms<T> = 
    IModelTransforms<T> & 
    { [K in keyof T]?: IModelTransform<T[K]> }

export type IStringKeyedModelTransforms<T, X> = 
    IModelTransforms<T> &
    { [k: string]: IModelTransform<X> }

export type INumericKeyedModelTransforms<T, X> = 
    IModelTransforms<T> &
    { [k: number]: IModelTransform<X> }

export type IKeyedModelTransforms<T, X = any> = 
    IObjectKeyedModelTransforms<T> |
    IStringKeyedModelTransforms<T, X> |
    INumericKeyedModelTransforms<T, X>;

export type IArrayedModelTransforms<X> = 
    INumericKeyedModelTransforms<X[], X> &
    { "*": IModelTransform<X> }

//#endregion
//..........................................

//..........................................
//#region EVENT TYPES

export type ModelEventType = 'add' | 'remove' | 'modify' | 'none';
export type ModelEventPayload<K, X> = 
    {
        value: X;
        oldValue?: X;
        key?: K;
        eventType?: ModelEventType;
        eventChain?: ModelEventFullPayload<any, any>;
    }

export type ModelEventFullPayload<K, X, T = any> = 
    ICodeEventStandardContent<Selectable<T>> &
    ModelEventPayload<K, X>

export type ModelEventCallback<K, X> = 
    ICodeEventCallback<ModelEventPayload<K, X>>;

//#endregion
//..........................................

//..........................................
//#region ARRAY BASED MODELS

export interface IArrayModel<T, K> {
    add(value: T): void;
    remove(key: K): T;
    clear(): void;
}

//#endregion
//..........................................

//..........................................
//#region SELECTORS

// structured here
export interface ISelector<I, O, X = any, K = any> {
    apply: (applyFunc: SelectorApplyFunc<O>) => void;
    map: (mapFunc: SelectorMapFunc<X, K>) => void;
    select: (selectFunc: SelectorFunc<O, any>, filters?: SelectorFilters<O>) => ISelector<O, any, any, AsyncGenerator>;
    addEventListener: (cb: SelectorApplyFunc<O>) => void;
    getData: () => O;
}

// user defined
export type SelectorFilters<I> = {
    keys?: SelectKey<I>[];
    eventTypes?: ModelEventType[];
}

export type SelectorFilterMaps<I> = {
    keys: Map<SelectKey<I>, boolean>;
    eventTypes: Map<ModelEventType, boolean>;
    customFilters: SelectorFilterFunc<I>[]; 
}

export type SelectKey<I> = string | number | keyof I

export type SelectorFunc<I, O> = (model: I, payload?: ModelEventFullPayload<any, any>) => O;
export type SelectorApplyFunc<O> = (payload: ModelEventFullPayload<any, O>) => void;
export type SelectorMapFunc<X, K> = (elem: X, key?: K) => void;
export type SelectorFilterFunc<X> = (payload: ModelEventFullPayload<any, X>) => boolean;

export type Selectable<I> = IModel<I> | ISelector<any, I>;

//#endregion
//..........................................