import NamedClass from "../namedClass/namedClass";


/** generic function to check if an element has a particular class name in its inheritance tree */
export function isNamedClass<T extends NamedClass> (test: any, name: string) : test is T {
    if (!name) { return false; }
    let test_name: string;
    test_name = (test as T).paddedClassName;
    if (!test_name) { return false; }
    return (test_name.indexOf(name) !== -1);
  }