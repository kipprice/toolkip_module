"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
  * isUpdatable
  * ----------------------------------------------------------------------------
  * Determine if this object has an update method
  * @param test
  */
function isUpdatable(test) {
    if (!test) {
        return;
    }
    return !!(test.update);
}
exports.isUpdatable = isUpdatable;
