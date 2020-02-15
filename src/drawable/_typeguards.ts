import { _Drawable } from "./_drawable";
import { DrawableElement } from './_interfaces';
  
  /** check if the element implements the drawable class */
  export function isDrawable (test: any) : test is _Drawable {
    return !!(test as _Drawable).draw;
  }
  
  /** check if the element is one that can be used as a drawable base */
  export function isDrawableElement (test: any) : test is DrawableElement {
    return (!!(test.appendChild));
  }