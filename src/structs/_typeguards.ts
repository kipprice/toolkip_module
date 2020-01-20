import { IUpdatable } from "./updatable";

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