import Model from '../models/_model';


/**----------------------------------------------------------------------------
 * @class   Serializable
 * ----------------------------------------------------------------------------
 * Creates a model that can be turned into a string
 * @author  Kip Price
 * @version 1.0.0
 * ----------------------------------------------------------------------------
 */
export abstract class Serializable<T> extends Model<T> {

    /**
     * serialize
     * ----------------------------------------------------------------------------
     * Turn this model into a savable JSON string
     * @returns The string version of this data   
     */
    public serialize(): string {
        let data: T = this.saveData();
        return JSON.stringify(data);
    }

    /**
     * toString
     * ----------------------------------------------------------------------------
     * Override to allow for native javascript stringification
     * @returns String version of this data
     */
    public toString(): string {
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
    public deserialize(data: string) : boolean {
        try {
            let parsedData: T = JSON.parse(data);
            this._copyData(parsedData);
            return true;
        } catch (err) {
            console.log("non JSON: " + data);
            return false;
        } 
    }
}