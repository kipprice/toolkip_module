import { _Model } from "../abstractClasses/_model";
import { IModel } from '../_shared/_interfaces';

export class MDate extends _Model<Date> {
    protected _getDefaultValues() {
        return null;
    }
}