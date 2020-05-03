import { Editable } from './editable';
import { isNamedClass } from '@kipprice/toolkip-named-class';

/** check if the element implements the Editable class */
export function isEditable<T> (test: any) : test is Editable<T> {
    return isNamedClass<Editable<T>>(test, "Editable");
}