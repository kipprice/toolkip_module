"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isIdentifiableModel(model) {
    if (!model) {
        return false;
    }
    if (!model.id) {
        return false;
    }
    return true;
}
exports.isIdentifiableModel = isIdentifiableModel;
