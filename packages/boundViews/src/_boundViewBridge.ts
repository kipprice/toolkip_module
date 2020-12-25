import { _BoundView } from './_boundView';
import { select } from '@toolkip/model';
import { IBoundBridgeElemDefinition } from './_interfaces';
import { IDrawableElements } from '@toolkip/drawable';

export abstract class _BoundViewBridge<
    VM = any, 
    P extends string = string, 
    E extends IDrawableElements = IDrawableElements
> extends _BoundView<VM, P, E> {
    
    protected _onPotentialModelChange(newModel?: VM, oldModel?: VM) {
        // overridable by children
    }

    constructor () {
        super();

        // call the old version of the listener
        select(this._model, (m) => m)
            .apply((payload) => {
                if (!payload) { return; }
                const { value, oldValue } = payload;
                return this._onPotentialModelChange(value, oldValue)
            });
        
    }

    protected _createBase(def: IBoundBridgeElemDefinition<VM, E>) {
        if (def.boundTo && !def.bindTo) { def.bindTo = def.boundTo; }
        return super._createBase(def as any);
    }

    protected _createElement(def: IBoundBridgeElemDefinition<VM, E>) {
        if (def.boundTo && !def.bindTo) { def.bindTo = def.boundTo; }
        return super._createElement(def as any)
    }

}

