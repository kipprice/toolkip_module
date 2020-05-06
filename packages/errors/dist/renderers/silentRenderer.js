"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _stringRenderer_1 = require("./_stringRenderer");
class SilentRenderer extends _stringRenderer_1._StringRenderer {
    get history() { return this._history; }
    _innerError(msg) {
        return this._addToHistory(msg);
    }
    _innerWarn(msg) {
        return this._addToHistory(msg);
    }
    _innerLog(msg) {
        return this._addToHistory(msg);
    }
    _addToHistory(msg) {
        this._history.push(msg);
        return true;
    }
}
exports.SilentRenderer = SilentRenderer;
