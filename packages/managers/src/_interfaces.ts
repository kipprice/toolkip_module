import { IIdentifiable, Identifier } from '@kipprice/toolkip-identifiable/_interfaces";
import {IdentifiableModel} from '@kipprice/toolkip-identifiable/identifiableModel";

export interface Creatable<I extends IIdentifiable> {
    create: ICreateFunction<I>;
}

export interface ICreateFunction<I extends IIdentifiable> {
    (d: Partial<I>): I;
}

export interface Loadable<I extends IIdentifiable> {
    load: ILoadFunction<I>
}

export interface ILoadFunction<I extends IIdentifiable> {
    (id: Identifier): Promise<I>;
}