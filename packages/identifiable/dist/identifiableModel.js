"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toolkip_serializable_1 = require("@kipprice/toolkip-serializable");
const _1 = require(".");
/**----------------------------------------------------------------------------
 * @class   Identifiable<T>
 * ----------------------------------------------------------------------------
 * Creates a model that has an associated ID
 * @author  Kip Price
 * @version 1.0.0
 * ----------------------------------------------------------------------------
 */
class IdentifiableModel extends toolkip_serializable_1._Serializable {
    /**
     * IdentifiableModel
     * ---------------------------------------------------------------------------
     * Create a new model with a unique ID
     * @param   dataToCopy  If available, the interface to copy into this model
     */
    constructor(dataToCopy) {
        super(dataToCopy);
        // make sure we have an appropriate id stored statically
        if (dataToCopy && dataToCopy.id) {
            this.constructor._updateLastId(dataToCopy.id);
        }
        else {
            this._id = this.constructor._generateNewId();
        }
    }
    get id() { return this._id; }
    set id(data) { this._id = data; }
    /** allow classes to specify a prefix to their ID easily */
    static get _prefix() { return this.name; }
    //#endregion
    //.....................
    /**
     * _generateNewId
     * ---------------------------------------------------------------------------
     * spin up a new ID for a new model
     *
     * @returns A new ID
     */
    static _generateNewId() {
        return _1.generateUniqueId(this._prefix);
    }
    /**
     * _updateLastId
     * ---------------------------------------------------------------------------
     * When incorporating an existing model, update the last ID used
     * @param   lastId  Most recent iD used in a model
     */
    static _updateLastId(lastId) {
        _1.registerUniqueId(lastId);
    }
}
exports.IdentifiableModel = IdentifiableModel;
