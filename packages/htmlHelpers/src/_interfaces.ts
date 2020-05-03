import { StandardElement } from '@kipprice/toolkip-shared";
import { _Drawable } from '@kipprice/toolkip-drawable/_drawable";
import { BoundEvalFunction } from '@kipprice/toolkip-binding/_interfaces";
import { TypedClassDefinition } from '@kipprice/toolkip-styleHelpers/_interfaces";
import { IKeyValPair, IDictionary, IConstructor } from '@kipprice/toolkip-objectHelpers/_interfaces";

//..........................................
//#region INTERFACES AND TYPES




export interface ISelectable {
    select(): void;
}

export type IOffsetable = { offsetWidth: number, offsetHeight: number } & HTMLElement