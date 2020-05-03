"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const binder_1 = require("./binder");
/**
 * bind
 * ---------------------------------------------------------------------------
 * Ties a particular piece of data to an update function, so that if the
 * value changes, the update function can be executed
 *
 * @param 	evalFunc 	Function to grab current state of the value
 * @param 	updateFunc 	Function to call upon the value changing
 *
 * @returns	The current state of the value
 */
function bind(evalFunc, updateFunc, deleteFunc, equalsFunc) {
    let id = binder_1.Binder.bind(evalFunc, updateFunc, deleteFunc, equalsFunc);
    return id;
}
exports.bind = bind;
function unbind(key) {
    return binder_1.Binder.unbind(key);
}
exports.unbind = unbind;
