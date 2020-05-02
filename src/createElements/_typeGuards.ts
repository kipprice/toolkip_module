import { IElemDefinition, IDrawable, DrawableElement, IClassDefinition, ClassName } from "./_interfaces";
import { isInterface, isString, isArray } from "../shared";

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

/** check if the element implements the drawable class */
export function isDrawable(test: any): test is IDrawable {
    return !!(test as IDrawable).draw;
}

/** check if the element is one that can be used as a drawable base */
export function isDrawableElement(test: any): test is DrawableElement {
    return (!!(test.appendChild));
}

export function isClassDefinition(test: IClassDefinition | ClassName): test is IClassDefinition {
    if (isString(test)) { return false; }
    if (isArray(test)) { return false; }
    return true;
}