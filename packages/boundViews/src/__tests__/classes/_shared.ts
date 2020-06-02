import { IDrawableElements } from "@toolkip/drawable";
import { _BoundView } from "../..";

export abstract class SampleBV<M, E extends IDrawableElements = IDrawableElements> extends _BoundView<M> {
    protected _checkVisibility: boolean;

    constructor(doVizCheck?: boolean) {
        super();
        this._checkVisibility = doVizCheck;
    }

    protected _shouldSkipBindUpdate(elem) { 
        return this._checkVisibility;
    }
}