import { _Model }  from '../model/_model';
/**----------------------------------------------------------------------------
 * @class   Serializable
 * ----------------------------------------------------------------------------
 * Creates a model that can be turned into a string
 * @author  Kip Price
 * @version 1.0.0
 * ----------------------------------------------------------------------------
 */
export declare abstract class Serializable<T> extends Model<T> {
    /**
     * serialize
     * ----------------------------------------------------------------------------
     * Turn this model into a savable JSON string
     * @returns The string version of this data
     */
    serialize(): string;
    /**
     * toString
     * ----------------------------------------------------------------------------
     * Override to allow for native javascript stringification
     * @returns String version of this data
     */
    toString(): string;
    /**
     * deserialize
     * ----------------------------------------------------------------------------
     * Turns a string into a version of this model
     * @param   data  The string to deserialize
     *
     * @returns True if we could deserialize
     */
    deserialize(data: string): boolean;
}
