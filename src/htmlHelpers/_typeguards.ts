import { isInterface } from "../typeGuards/interfaceGuard";
import { IElemDefinition } from "./_interfaces";

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
        type: ""
    }

    if (isInterface<IElemDefinition>(test, comp)) { return true; }
    return false;

}