"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** generic function to check if an element has a particular class name in its inheritance tree */
function isNamedClass(test, name) {
    if (!name) {
        return false;
    }
    let test_name;
    test_name = test.paddedClassName;
    if (!test_name) {
        return false;
    }
    return (test_name.indexOf(name) !== -1);
}
exports.isNamedClass = isNamedClass;
