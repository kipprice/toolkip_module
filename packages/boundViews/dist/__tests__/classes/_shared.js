"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../..");
class SampleBV extends __1._BoundView {
    constructor(doVizCheck) {
        super();
        this._checkVisibility = doVizCheck;
    }
    _shouldSkipBindUpdate(elem) {
        if (this._checkVisibility) {
            return super._shouldSkipBindUpdate(elem);
        }
        return false;
    }
}
exports.SampleBV = SampleBV;
