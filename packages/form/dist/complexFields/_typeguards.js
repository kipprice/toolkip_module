"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _interfaces_1 = require("../_interfaces");
const helpers_1 = require("../helpers");
function isArrayChildElement(elem) {
    if (!elem) {
        return false;
    }
    if (helpers_1.isField(elem)) {
        return (elem.type === _interfaces_1.FieldTypeEnum.ARRAY_CHILD);
    }
    return false;
}
exports.isArrayChildElement = isArrayChildElement;
