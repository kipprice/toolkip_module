import { _Model } from "../abstractClasses/_model";
import { DefaultDateTransform } from '../transforms/dateTransforms';

/**----------------------------------------------------------------------------
 * @class	MDate
 * ----------------------------------------------------------------------------
 * Date wrapped in a model; has built in functions for converting strings to 
 * dates or vice versa
 * @author	Kip Price
 * @version	1.0.0
 * ----------------------------------------------------------------------------
 */
export class MDate extends _Model<Date | string> {

    protected _innerModel: Date;

    protected _getApplicableTransforms() {
        const tx = super._getApplicableTransforms();
        if (!tx) { return DefaultDateTransform; }
        return tx;
    }

    protected _getDefaultValues() {
        return null;
    }

    public getData(): Date {
        return super.getData() as Date;
    }
}