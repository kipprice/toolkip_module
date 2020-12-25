import { _BoundViewBridge } from '../../_boundViewBridge';

export class BasicBoundViewBridge extends _BoundViewBridge<string[]> {
    protected _onPotentialModelChange(newValue?: string[]) {
        if (!newValue) { return; }
        this._elems.base.innerHTML = newValue.join(":");
    }

    protected _createElements() {
        this._createBase({ key: 'base', innerHTML: '' })
    }
}