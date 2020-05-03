import { StyleLibrary } from './styleLibrary';
import { FlatClassDefinition, TypedClassDefinition } from '@kipprice/toolkip-style-helpers';

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
    const cls: TypedClassDefinition = {
      display: "none"
    };
    createCssClass(".hidden", cls);
  }
  
  /** Adds the "unselectable" class definition to the document */
  export function addUnselectableClass(): HTMLStyleElement {
    const cls: TypedClassDefinition = {
      userSelect: "none",
      mozUserSelect: "none",
      webkitUserSelect: "none",
      khtmlUserSelect: "none",
      oUserSelect: "none"
    };
    return createCssClass(".unselectable", cls) as HTMLStyleElement;
  
  }