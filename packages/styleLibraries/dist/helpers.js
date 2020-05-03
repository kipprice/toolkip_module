"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styleLibrary_1 = require("./styleLibrary");
/**
 * createCssClass
 * ----------------------------------------------------------------------------
 * generate an appropriate class, using the new style library system
 */
function createCssClass(selector, def) {
    let key = styleLibrary_1.StyleLibrary.getNextId();
    styleLibrary_1.StyleLibrary.add(key, { [selector]: def });
    return styleLibrary_1.StyleLibrary.getElemForKey(key);
}
exports.createCssClass = createCssClass;
/** adds a generic hidden class to the document */
function addHiddenClass() {
    const cls = {
        display: "none"
    };
    createCssClass(".hidden", cls);
}
exports.addHiddenClass = addHiddenClass;
/** Adds the "unselectable" class definition to the document */
function addUnselectableClass() {
    const cls = {
        userSelect: "none",
        mozUserSelect: "none",
        webkitUserSelect: "none",
        khtmlUserSelect: "none",
        oUserSelect: "none"
    };
    return createCssClass(".unselectable", cls);
}
exports.addUnselectableClass = addUnselectableClass;
