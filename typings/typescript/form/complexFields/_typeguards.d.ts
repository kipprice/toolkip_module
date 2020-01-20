import { IFieldConfig } from "../_interfaces";
import { Field } from "../_field";
import { ArrayChildField } from "./arrayChildField";
export declare function isArrayChildElement<T>(elem: IFieldConfig<T> | Field<T>): elem is ArrayChildField<T>;
