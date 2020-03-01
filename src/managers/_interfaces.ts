import { IIdentifiable } from "../identifiable/_interfaces";
import {IdentifiableModel} from "../identifiable/identifiableModel";

export type ManagedId = string | number;

export interface Creatable<I extends IIdentifiable> {
    create(d: Partial<I>): IdentifiableModel<I>;
}

export interface Loadable<I extends IIdentifiable> {
    load(id: ManagedId): Promise<I>;
}