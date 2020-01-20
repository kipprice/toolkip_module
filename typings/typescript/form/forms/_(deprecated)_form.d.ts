import { EmbeddedForm } from './embeddedForm';
import { IFields, IFormOptions } from '../_interfaces';
/**----------------------------------------------------------------------------
 * @class	Form (Deprecated)
 * ----------------------------------------------------------------------------
 * old version of shared form; use one of the more specific forms instead.
 * @author	Kip Price
 * @version	1.0.0
 * ----------------------------------------------------------------------------
 */
export declare class Form<T> extends EmbeddedForm<T> {
    /**
     * Form
     * ----------------------------------------------------------------------------
     * pass through to the appropriate new type of form
     */
    constructor(id: string, opts: IFormOptions, elems?: IFields<T>);
}
