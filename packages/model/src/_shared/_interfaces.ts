import { ICodeEventCallback } from "@toolkip/code-event";
import { ICloneable } from '@toolkip/object-helpers';
import { IEquatable } from '@toolkip/comparable';

export interface IModel<T> extends ICloneable<IModel<T>>, IEquatable {
    setData(data: T): void;
    getData(): T;
    addEventListener(cb: ModelEventCallback<"_" | any, T | any>): void;
    import(data: Partial<T>): void;
    export(): T;
}

export interface IKeyedModel<T, K, X> extends IModel<T>, IEquatable {
    set(key: K, value: X): void;
    get(key: K): X;
    clone(tx?: IKeyedModelTransforms<T, X>): IKeyedModel<T, K, X>;
    addEventListener(cb: ModelEventCallback<"_" | K, T | X>): void;
}

export interface IModelData {
    [key: string]: any;
}


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
export type ModelEventPayload<K, X> = {
    value: X;
    oldValue?: X;
    key?: K;
    eventType?: ModelEventType;
    eventChain?: ModelEventPayload<any, any>;
}

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