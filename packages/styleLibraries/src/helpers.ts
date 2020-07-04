import { StyleLibrary } from './styleLibrary';
import { FlatClassDefinition, TypedClassDefinition } from '@toolkip/style-helpers';

/**
 * createCssClass
 * ----------------------------------------------------------------------------
 * generate an appropriate class, using the new style library system
 * @param   selector  the css selector to assign to this class
 * @param   def       the definition of styles related to this selector
 * @param   [key]     if provided, the key to store these styles under
 */
export function createCssClass(selector: string, def: FlatClassDefinition, key?: string): HTMLStyleElement {
    key = key || StyleLibrary.getNextId();
    StyleLibrary.add(key, { [selector] : def } );
    return StyleLibrary.getElemForKey(key);
}

/** 
 * addHiddenClass
 * ----------------------------------------------------------------------------
 * adds a generic hidden class to the document 
 * @param   clsName   what name to use for this class; defaults to 'hidden'
 * @returns the created class
 */
export function addHiddenClass(clsName: string = 'hidden'): HTMLStyleElement {
    const cls: TypedClassDefinition = {
      display: "none"
    };
    return createCssClass(`.${clsName}`, cls);
  }
  
  /** 
   * addUnselectableClass
   * ----------------------------------------------------------------------------
   * Adds the "unselectable" class definition to the document 
   * 
   * @param   clsName   what name to use for this class; defaults to 
   *                    'unselectable'
   * 
   * @returns the created class 
   */
  export function addUnselectableClass(clsName: string = 'unselectable'): HTMLStyleElement {
    const cls: TypedClassDefinition = {
      userSelect: "none",
      mozUserSelect: "none",
      webkitUserSelect: "none",
      khtmlUserSelect: "none",
      oUserSelect: "none"
    };
    return createCssClass(`.${clsName}`, cls) as HTMLStyleElement;
  
  }