import { BoundView } from "../..";

export class ComposableView<T> extends BoundView<T> {
    public get elems() { return this._elems; }

    protected _shouldSkipBindUpdate() { 
        return false;
    }
}