import { IBasicRect, IPoint } from './interface';
/** check if the element is a client rectangle */
export declare function isClientRect(test: any): test is ClientRect;
/** check if the element is a SVG rectangle */
export declare function isSVGRect(test: any): test is SVGRect;
/** check if the element is a basic rectangle */
export declare function isIBasicRect(test: any): test is IBasicRect;
export declare function isIPoint(test: any): test is IPoint;
