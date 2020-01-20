import { NamedClass } from "./namedClass";
/** generic function to check if an element has a particular class name in its inheritance tree */
export declare function isNamedClass<T extends NamedClass>(test: any, name: string): test is T;
