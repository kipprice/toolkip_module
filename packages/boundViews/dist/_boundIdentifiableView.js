"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _boundView_1 = require("./_boundView");
class _BoundIdentifiableView extends _boundView_1._BoundView {
    set modelId(id) {
        const model = this._lookup(id);
        this.model = model;
    }
}
exports._BoundIdentifiableView = _BoundIdentifiableView;
