import { _Shield } from './shield';
import { IComposableShieldOptions } from './_interfaces';
import { createElement } from '@toolkip/create-elements';
import { isDrawable, isDrawableElement } from '@toolkip/drawable';
import { isStandardElement } from '@toolkip/shared-types';

/**----------------------------------------------------------------------------
 * @class	Shield
 * ----------------------------------------------------------------------------
 * Create a shield with specified content within the center of the shield.
 * The shield visibliity is controlled by the caller
 * @author	Kip Price
 * @version	1.0.0
 * ----------------------------------------------------------------------------
 */
export class Shield extends _Shield<IComposableShieldOptions> {
    
    protected _createShieldDetails(opts: IComposableShieldOptions) {
        if (!opts.contents) { return }

        if (isDrawable(opts.contents)) {
            opts.contents.draw(this._elems.shieldContent);

        } else if (isStandardElement(opts.contents)) {
            this._elems.shieldContent.appendChild(opts.contents);

        } else {
            createElement({
                ...opts.contents,
                parent: this._elems.shieldContent
            })
        }
        
    }
}