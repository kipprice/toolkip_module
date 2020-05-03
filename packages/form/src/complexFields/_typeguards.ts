import { IFieldConfig, FieldTypeEnum } from '@kipprice/toolkip-_interfaces";
import { _Field } from '@kipprice/toolkip-_field";
import { ArrayChildField } from "./arrayChildField";
import { isField } from '@kipprice/toolkip-helpers";


export function isArrayChildElement<T>(elem: IFieldConfig<T> | _Field<T>): elem is ArrayChildField<T> {
    if (!elem) { return false; }
    if (isField(elem)) {
        return (elem.type === FieldTypeEnum.ARRAY_CHILD);
    }
    return false;
}