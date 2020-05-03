import { IIdentifiable, Identifier } from '@kipprice/toolkip-identifiable';
import { _BoundView } from "./_boundView";
import { IDrawableElements } from '@kipprice/toolkip-drawable';

export abstract class _BoundIdentifiableView<
    VM extends IIdentifiable, 
    P extends string = string, 
    E extends IDrawableElements = IDrawableElements
> extends _BoundView<VM, P, E> {
    public set modelId (id: Identifier) {
        const model = this._lookup(id);
        this.model = model;
    }

    protected abstract _lookup(id: Identifier): VM;
}