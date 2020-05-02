import { StandardElement } from "../shared";
import { _Drawable } from "../drawable/_drawable";
import { BoundEvalFunction } from "../binding/_interfaces";
import { TypedClassDefinition } from "../styleHelpers/_interfaces";
import { IKeyValPair, IDictionary, IConstructor } from "../objectHelpers/_interfaces";

//..........................................
//#region INTERFACES AND TYPES




export interface ISelectable {
    select(): void;
}

export type IOffsetable = { offsetWidth: number, offsetHeight: number } & HTMLElement