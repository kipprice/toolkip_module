"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _boundView_1 = require("./_boundView");
function isUpdatableView(elem) {
    if (elem.update) {
        return true;
    }
    return false;
}
exports.isUpdatableView = isUpdatableView;
function isBoundView(elem) {
    console.log("checking for bound view: " + (elem instanceof _boundView_1._BoundView));
    if (elem instanceof _boundView_1._BoundView) {
        return true;
    }
    return false;
}
exports.isBoundView = isBoundView;
