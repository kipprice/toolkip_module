import { isNamedClass } from "./namedClassGuard";
import Drawable from "../drawable/drawable";
import { DrawableElement } from '../drawable/_interfaces';
import Editable from '../editable/editable';

/** check if the element implements the Editable class */
export function isEditable<T> (test: any) : test is Editable<T> {
    return isNamedClass<Editable<T>>(test, "Editable");
  }
  
  /** check if the element implements the drawable class */
  export function isDrawable (test: any) : test is Drawable {
    return !!(test as Drawable).draw;
  }
  
  /** check if the element is one that can be used as a drawable base */
  export function isDrawableElement (test: any) : test is DrawableElement {
    return (!!(test.appendChild));
  }