import { StandardElement } from '@kipprice/toolkip-shared-types";

//..........................................
//#region INTERFACES AND TYPES


export interface ISelectable {
    select(): void;
}

export type IOffsetable = { offsetWidth: number, offsetHeight: number } & HTMLElement