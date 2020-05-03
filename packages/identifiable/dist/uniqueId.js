"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**----------------------------------------------------------------------------
 * @class	IdentifierAssigner
 * ----------------------------------------------------------------------------
 * keep track of unique IDs across the application
 * @author	Kip Price
 * @version	1.0.0
 * ----------------------------------------------------------------------------
 */
class _IdentifierAssigner {
    constructor() {
        //.....................
        //#region PROPERTIES
        this._lastIds = { "id": 0 };
    }
    getLastId(prefix) { return this._lastIds[prefix]; }
    //#endregion
    //.....................
    _cleanPrefix(prefix) {
        if (!prefix) {
            return "id";
        }
        return prefix.replace(/-/g, "_");
    }
    _splitId(lastId) {
        const [strId, prefix] = lastId.split("-");
        const numericId = parseInt(strId);
        return {
            prefix: this._cleanPrefix(prefix),
            id: numericId
        };
    }
    /**
     * generateUniqueId
     * ----------------------------------------------------------------------------
     * updates the set of recognized keys
     */
    generateUniqueId(prefix) {
        // set a default prefix if needed
        prefix = this._cleanPrefix(prefix);
        // generate the next ID to use
        const nextId = (this._lastIds[prefix] || 0) + 1;
        this._lastIds[prefix] = nextId;
        // return the string version of this ID
        return `${nextId}-${prefix}`;
    }
    /**
     * updateLastId
     * ----------------------------------------------------------------------------
     * ensure that we can load in identifiers from outside sources
     */
    registerId(lastId) {
        const { prefix, id } = this._splitId(lastId);
        // quit if we weren't able to parse out the 
        // id associated with this 
        if (isNaN(id)) {
            return false;
        }
        // verify that we need to update this ID
        if (id <= this._lastIds[prefix]) {
            return false;
        }
        // 
        this._lastIds[prefix] = id;
        return true;
    }
    reset(prefix) {
        prefix = this._cleanPrefix(prefix);
        this._lastIds[prefix] = 0;
    }
}
exports.IdentifierAssigner = new _IdentifierAssigner();
function generateUniqueId(prefix) {
    return exports.IdentifierAssigner.generateUniqueId(prefix);
}
exports.generateUniqueId = generateUniqueId;
function registerUniqueId(lastId) {
    return this.IdentifierAssigner.registerId(lastId);
}
exports.registerUniqueId = registerUniqueId;
