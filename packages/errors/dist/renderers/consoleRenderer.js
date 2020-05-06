"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _stringRenderer_1 = require("./_stringRenderer");
class ConsoleRenderer extends _stringRenderer_1._StringRenderer {
    _innerError(msg) {
        console.error(msg);
        return true;
    }
    _innerWarn(msg) {
        console.warn(msg);
        return true;
    }
    _innerLog(msg) {
        console.log(msg);
        return true;
    }
}
exports.ConsoleRenderer = ConsoleRenderer;
