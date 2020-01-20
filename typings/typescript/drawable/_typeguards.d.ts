import { Drawable } from "./drawable";
import { DrawableElement } from './_interfaces';
/** check if the element implements the drawable class */
export declare function isDrawable(test: any): test is Drawable;
/** check if the element is one that can be used as a drawable base */
export declare function isDrawableElement(test: any): test is DrawableElement;
