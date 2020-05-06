"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class _StringRenderer {
    error(details) {
        const msg = this._generateMessage('error', details);
        return this._innerWarn(msg);
    }
    warn(details) {
        const msg = this._generateMessage('warning', details);
        return this._innerWarn(msg);
    }
    log(details) {
        const msg = this._generateMessage('info', details);
        return this._innerWarn(msg);
    }
    _generateMessage(type, details) {
        return `${type.toUpperCase()}: ${JSON.stringify(details)}`;
    }
}
exports._StringRenderer = _StringRenderer;
