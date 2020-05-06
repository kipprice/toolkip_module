import { IStandardStyles } from '@kipprice/toolkip-style-helpers';
import { _Field } from "../_field";
import { FieldTypeEnum } from '../_interfaces';


/**----------------------------------------------------------------------------
 * @class HiddenField
 * ----------------------------------------------------------------------------
 * handle a data element that will be set, but not displayed to the user 
 * @author  Kip Price
 * @version 1.0.1
 * ----------------------------------------------------------------------------
 */
export class HiddenField<T> extends _Field<T> {
    protected static _uncoloredStyles: IStandardStyles = {
        "kipFormElem.hidden": {
            display: "none"
        }
    }
    protected get _type(): FieldTypeEnum { return FieldTypeEnum.HIDDEN; }
    protected get _defaultCls(): string { return "hidden"; }
    protected get _defaultValue(): T { return null; }

    protected _onCreateElements(): void { }
    protected _getValueFromField(): T {
        return this._data;
    }

    protected _createClonedElement(appendToID: string): HiddenField<T> {
        return new HiddenField<T>(this.id + appendToID, this);
    }

    public async save(): Promise<T> {
        return this._data;
    }

}
