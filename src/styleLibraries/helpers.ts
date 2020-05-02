import { StyleLibrary } from './styleLibrary';
import { FlatClassDefinition } from '../styleHelpers';
import { IClassDefinition } from '../htmlHelpers';

/**
 * createCssClass
 * ----------------------------------------------------------------------------
 * generate an appropriate class, using the new style library system
 */
export function createCssClass(selector: string, def: FlatClassDefinition): HTMLStyleElement {
    let key = StyleLibrary.getNextId();
    StyleLibrary.add(key, { [selector] : def } );
    return StyleLibrary.getElemForKey(key);
}

/** adds a generic hidden class to the document */
export function addHiddenClass(): void {
    let cls: IClassDefinition;
    cls = {
      "display": "none"
    };
    createCssClass(".hidden", cls);
  }
  
  /** Adds the "unselectable" class definition to the document */
  export function addUnselectableClass(): HTMLStyleElement {
    let cls: IClassDefinition;
    cls = {
      "user-select": "none",
      "-moz-user-select": "none",
      "-webkit-user-select": "none",
      "khtml-user-select": "none",
      "o-user-select": "none"
    };
    return createCssClass(".unselectable", cls) as HTMLStyleElement;
  
  }