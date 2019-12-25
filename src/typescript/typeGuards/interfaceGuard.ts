import { IElemDefinition } from '../htmlHelpers/_interfaces';
import { IExtrema } from '../maths/interface';
import { IUpdatable } from '../structs/updatable';

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

/** 
 * isExtrema
 * ----------------------------------------------------------------------------
 * check if the element is an IExtrema implementation 
 */
export function isIExtrema(test?: any): test is IExtrema {
    let extrema: IExtrema = {
        min: { x: 0, y: 0 },
        max: { x: 0, y: 0 }
    }

    return isInterface<IExtrema>(test, extrema);
}

/** 
 * isInterface
 * ----------------------------------------------------------------------------
 * generic function to check if a given object implements a particular interface 
 */
export function isInterface<T extends Object>(test: any, full_imp: T): test is T {

    // Loop through all of the properties of the full interface implementation & make sure at least one required elem is populated in the test
    let prop: string;
    let req_match: boolean = true;
    let val: string;

    for (prop in full_imp) {
        if (full_imp.hasOwnProperty(prop)) {
            val = full_imp[prop];

            if (val && ((test as T)[prop] === undefined)) {
                req_match = false;
                break;
            }
        }
    }

    if (!req_match) { return false; }

    // Now loop through all properties on the test to make sure there aren't extra props
    let has_extra: boolean = false;
    for (prop in test) {
        if (test.hasOwnProperty(prop)) {
            if (full_imp[prop] === undefined) {
                has_extra = true;
                break;
            }
        }
    }

    return (!has_extra);
}

/**
  * isUpdatable
  * ----------------------------------------------------------------------------
  * Determine if this object has an update method
  * @param test 
  */
 export function isUpdatable (test: any): test is IUpdatable {
    if (!test) { return; }
    return !!((test as any).update);
  }