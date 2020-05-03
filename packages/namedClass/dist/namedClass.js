"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toolkip_primitive_helpers_1 = require("@kipprice/toolkip-primitive-helpers");
/**----------------------------------------------------------------------------
 * _NamedClass
 * ----------------------------------------------------------------------------
 * A class that contains a set of names that apply to this class. Used for
 * easier typing.
 * @author	Kip Price
 * @version 1.0
 * ----------------------------------------------------------------------------
 */
class _NamedClass {
    /**
     * Creates a named class
     * ---------------------------------------------------------------------------
     * @param	classNames		The initial class name to assign
     *
     */
    constructor(...classNames) {
        this._class_names = classNames;
    }
    get className() {
        let tmpNames = this._class_names.slice();
        return tmpNames.reverse().join("::");
    }
    get paddedClassName() {
        return this._class_names.join(" <-- ");
    }
    ;
    /**
     * _addClassName
     * ---------------------------------------------------------------------------
     * Adds a new layer to our class name
     *
     * @param	class_name		The new class name to add
     *
     * @returns	True if we added the class name
     */
    _addClassName(class_name) {
        if (toolkip_primitive_helpers_1.contains(this._class_names, class_name)) {
            return false;
        }
        this._class_names.push(class_name);
        return true;
    }
}
exports._NamedClass = _NamedClass;
