import { ICodeEventCallback } from "@toolkip/code-event";

export interface IModel {
    [key: string]: any;
}

export interface IPropertyChangeListener<T, K extends keyof T> {
    (newValue: T[K], oldValue?: T[K]): void;
}

export interface IModelChangeListener<T> {
    (key: keyof T, newValue: T[keyof T], oldValue?: T[keyof T]): void;
}

export type IPropertyChangeListeners<T> = {
    [K in keyof T]?: IPropertyChangeListener<T, K>[];
}

export type IModelTransforms<T> = {
    [K in keyof T]?: {
        incoming?: IModelTransform<T, K>;
        outgoing?: IModelTransform<T, K>;
    }
}

export type IModelTransform<T, K extends keyof T> = (value: T[K]) => T[K];

export type ModelEventKey<M extends IModel> = keyof M | "_";
export type ModelEventData<M extends IModel> = M[keyof M] | M;

export type ModelEventPayload<M extends IModel> = {
    key: ModelEventKey<M>;
    value: ModelEventData<M>;
    oldValue?: ModelEventData<M>;
}

export type ModelEventCallback<M> = ICodeEventCallback<ModelEventPayload<M>>;

