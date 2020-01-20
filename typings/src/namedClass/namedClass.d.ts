import { INamedClass } from './_interfaces';
/**----------------------------------------------------------------------------
 * NamedClass
 * ----------------------------------------------------------------------------
 * A class that contains a set of names that apply to this class. Used for
 * easier typing.
 * @author	Kip Price
 * @version 1.0
 * ----------------------------------------------------------------------------
 */
export default abstract class NamedClass implements INamedClass {
    /** keep track of all layers of the class name */
    private _class_names;
    get className(): string;
    get paddedClassName(): string;
    /**
     * Creates a named class
     * ---------------------------------------------------------------------------
     * @param	classNames		The initial class name to assign
     *
     */
    constructor(...classNames: string[]);
    /**
     * _addClassName
     * ---------------------------------------------------------------------------
     * Adds a new layer to our class name
     *
     * @param	class_name		The new class name to add
     *
     * @returns	True if we added the class name
     */
    protected _addClassName(class_name: string): boolean;
}
