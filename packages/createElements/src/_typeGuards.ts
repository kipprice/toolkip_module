import { IElemDefinition, IClassDefinition, ClassName } from "./_interfaces";
import { isInterface, isString, isArray } from '@kipprice/toolkip-shared-types';

/** 
 * isElemDefinition
 * ----------------------------------------------------------------------------
 * check if the element is an element definition implementation 
 */
export function isIElemDefinition(test: any): test is IElemDefinition {
    let out: boolean;
    let comp: IElemDefinition = {
        after_content: "",
        attr: null,
        before_content: "",
        children: null,
        cls: "",
        content: "",
        id: "",
        parent: null,
        type: "" as any
    }

    if (isInterface<IElemDefinition>(test, comp)) { return true; }
    return false;

}

export function isClassDefinition(test: IClassDefinition | ClassName): test is IClassDefinition {
    if (isString(test)) { return false; }
    if (isArray(test)) { return false; }
    return true;
}