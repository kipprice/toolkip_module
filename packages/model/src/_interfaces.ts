import { ICodeEventCallback } from "@toolkip/code-event";

/** generic models are built on top of objects */
export interface IModel {
    [key: string]: any;
}

/** 
 * defines the way that data should be transformed to and from
 * this model. allows for easy definition of server-side and 
 * client-side models
 */
export type IModelTransforms<T> = {
    [K in keyof T]?: IModelTransform<T[K]>
}

export type IModelTransform<X> = {
    incoming?: IModelTransformFunc<X>;
    outgoing?: IModelTransformFunc<X>;
}

export type IModelTransformFunc<X> = (value: X) => X;

export type ModelKey<M extends IModel> = keyof M | "_";
export type ModelValue<M extends IModel> = M[keyof M] | M;
export type ModelEventType = 'add' | 'remove' | 'modify';

export type ModelEventPayload<M extends IModel> = {
    key: ModelKey<M>;
    value: ModelValue<M>;
    eventType: ModelEventType;
    oldValue?: ModelValue<M>;
    originatingEvent?: ModelEventPayload<any>;
}

export type ModelEventCallback<M> = ICodeEventCallback<ModelEventPayload<M>>;

