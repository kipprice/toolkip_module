import { IDrawableElements } from "@toolkip/drawable";
import { _BoundView } from "../..";

export abstract class SampleBV<M, E extends IDrawableElements = IDrawableElements> extends _BoundView<M> {
    protected _checkVisibility: boolean;

    constructor(doVizCheck?: boolean) {
        super();
        this._checkVisibility = doVizCheck;
    }

    protected _shouldSkipBindUpdate(elem) { 
        if (this._checkVisibility) {
            return super._shouldSkipBindUpdate(elem)
        }
        return false;
    }
}