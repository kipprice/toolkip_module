"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toolkip_named_class_1 = require("@kipprice/toolkip-named-class");
/** check if the element implements the Editable class */
function isEditable(test) {
    return toolkip_named_class_1.isNamedClass(test, "Editable");
}
exports.isEditable = isEditable;
