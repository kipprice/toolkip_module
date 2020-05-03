"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toolkip_model_1 = require("@kipprice/toolkip-model");
/**----------------------------------------------------------------------------
 * @class   Serializable
 * ----------------------------------------------------------------------------
 * Creates a model that can be turned into a string
 * @author  Kip Price
 * @version 1.0.0
 * ----------------------------------------------------------------------------
 */
class _Serializable extends toolkip_model_1._Model {
    /**
     * serialize
     * ----------------------------------------------------------------------------
     * Turn this model into a savable JSON string
     * @returns The string version of this data
     */
    serialize() {
        let data = this.saveData();
        return JSON.stringify(data);
    }
    /**
     * toString
     * ----------------------------------------------------------------------------
     * Override to allow for native javascript stringification
     * @returns String version of this data
     */
    toString() {
        return this.serialize();
    }
    /**
     * deserialize
     * ----------------------------------------------------------------------------
     * Turns a string into a version of this model
     * @param   data  The string to deserialize
     *
     * @returns True if we could deserialize
     */
    deserialize(data) {
        try {
            let parsedData = JSON.parse(data);
            this._copyData(parsedData);
            return true;
        }
        catch (err) {
            console.log("non JSON: " + data);
            return false;
        }
    }
}
exports._Serializable = _Serializable;
