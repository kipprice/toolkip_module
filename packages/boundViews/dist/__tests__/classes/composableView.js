"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../..");
class ComposableView extends __1.BoundView {
    get elems() { return this._elems; }
    _shouldSkipBindUpdate() {
        return false;
    }
}
exports.ComposableView = ComposableView;
