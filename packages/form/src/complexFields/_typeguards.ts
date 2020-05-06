import { IFieldConfig, FieldTypeEnum } from '../_interfaces';
import { _Field } from '../_field';
import { ArrayChildField } from "./arrayChildField";
import { isField } from '../helpers';


export function isArrayChildElement<T>(elem: IFieldConfig<T> | _Field<T>): elem is ArrayChildField<T> {
    if (!elem) { return false; }
    if (isField(elem)) {
        return (elem.type === FieldTypeEnum.ARRAY_CHILD);
    }
    return false;
}