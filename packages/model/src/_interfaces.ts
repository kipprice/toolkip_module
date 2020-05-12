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
    [K in keyof T]?: {
        incoming?: IModelTransform<T, K>;
        outgoing?: IModelTransform<T, K>;
    }
}

export type IModelTransform<T, K extends keyof T> = (value: T[K]) => T[K];

export type ModelKey<M extends IModel> = keyof M | "_";
export type ModelValue<M extends IModel> = M[keyof M] | M;

export type ModelEventPayload<M extends IModel> = {
    key: ModelKey<M>;
    value: ModelValue<M>;
    oldValue?: ModelValue<M>;
    originatingEvent?: ModelEventPayload<any>;
}

export type ModelEventCallback<M> = ICodeEventCallback<ModelEventPayload<M>>;

