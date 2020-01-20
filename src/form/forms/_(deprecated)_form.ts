import { FullScreenForm } from './fullScreenForm';
import { PopupForm } from './popupForm';
import { InlineForm } from './inlineForm';
import { EmbeddedForm } from './embeddedForm';
import { _Form } from './_form';
import { IFields, FormStyleOptions, IFormOptions } from '../_interfaces';

/**----------------------------------------------------------------------------
 * @class	Form (Deprecated)
 * ----------------------------------------------------------------------------
 * old version of shared form; use one of the more specific forms instead.
 * @author	Kip Price
 * @version	1.0.0
 * ----------------------------------------------------------------------------
 */
export class Form<T> extends EmbeddedForm<T> {

    /**
     * Form
     * ----------------------------------------------------------------------------
     * pass through to the appropriate new type of form
     */
    constructor(id: string, opts: IFormOptions, elems?: IFields<T>) {
        opts.id = id;
        super(opts, elems);

        if (opts.popupForm) { opts.style = FormStyleOptions.POPUP; }

        let out: _Form<T>;
        switch (opts.style) {
            case FormStyleOptions.INLINE:
                out = new InlineForm(opts, elems);
                break;

            case FormStyleOptions.POPUP:
                out = new PopupForm(opts, elems);
                break;

            case FormStyleOptions.FULLSCREEN:
                out = new FullScreenForm(opts, elems);
                break;
        }

        return out;
    }
}
