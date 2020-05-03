"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toolkip_shared_types_1 = require("@kipprice/toolkip-shared-types");
/**
 * isElemDefinition
 * ----------------------------------------------------------------------------
 * check if the element is an element definition implementation
 */
function isIElemDefinition(test) {
    let out;
    let comp = {
        after_content: "",
        attr: null,
        before_content: "",
        children: null,
        cls: "",
        content: "",
        id: "",
        parent: null,
        type: ""
    };
    if (toolkip_shared_types_1.isInterface(test, comp)) {
        return true;
    }
    return false;
}
exports.isIElemDefinition = isIElemDefinition;
function isClassDefinition(test) {
    if (toolkip_shared_types_1.isString(test)) {
        return false;
    }
    if (toolkip_shared_types_1.isArray(test)) {
        return false;
    }
    return true;
}
exports.isClassDefinition = isClassDefinition;
