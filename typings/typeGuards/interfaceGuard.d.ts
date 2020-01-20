/**
 * isInterface
 * ----------------------------------------------------------------------------
 * generic function to check if a given object implements a particular interface
 */
export declare function isInterface<T extends Object>(test: any, full_imp: T): test is T;
