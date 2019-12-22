import { Identifiable } from "../identifiable/_interfaces";
import IdentifiableModel from "../identifiable/identifiableModel";

export type ManagedId = string | number;

export interface Creatable<I extends Identifiable> {
    create(d: Partial<I>): IdentifiableModel<I>;
}

export interface Loadable<I extends Identifiable> {
    load(id: ManagedId): Promise<I>;
}