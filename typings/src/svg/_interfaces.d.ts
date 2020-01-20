import { IDrawableElements } from '../drawable/_interfaces';
import { IAttributes } from '../htmlHelpers/_interfaces';
import { IPoint } from '../maths/interface';
export interface ISVGElems extends IDrawableElements {
    base: SVGElement;
    definitions: SVGElement;
    coreGroup: SVGElement;
}
/**
     * ISVGElementElems
     *
     * Keep track of elements on an SGVElem
     *
     */
export interface ISVGElementElems extends IDrawableElements {
    base: SVGElement;
}
/**
 * @class ISVGAttributes
 *
 * Additional attributes that can be applied
 *
 */
export interface ISVGAttributes extends IAttributes {
    id?: string;
    unscalable?: boolean;
    svgStyle?: ISVGStyle;
    parent?: SVGElement;
    type?: string;
    [key: string]: any;
}
/**...........................................................................
 * @class ISVGOptions
 * ...........................................................................
 * Interface for all options that apply to SVG Drawables
 * ...........................................................................
 */
export interface ISVGOptions {
    /** how big the svg element should be padded */
    gutter?: number;
    /** whether we should resize the SVG canvas to the viewport */
    auto_resize?: boolean;
    /** how much we should zoom horizontally */
    zoom_x?: number;
    /** how much we should zoom vertically */
    zoom_y?: number;
    /** how much we should move horizontally */
    pan_x?: boolean;
    /** how much we should move vertically */
    pan_y?: boolean;
    /** true if we should ignore events like pan/zoom on the canvas */
    prevent_events?: boolean;
}
export interface SVGUpdateListener {
    (): void;
}
export interface ICircleSVGAttributes extends ISVGAttributes {
    cx: number;
    cy: number;
    r: number;
}
export interface ISVGStyle {
    fill?: string;
    fillOpacity?: number;
    fontSize?: number;
    fontWeight?: string;
    fontFamily?: string;
    stroke?: string;
    strokeWidth?: number;
    strokeOpacity?: number;
    strokeLinecap?: string;
    strokeLinejoin?: string;
    strokeDashArray?: string;
    filter?: string;
    transform?: string;
    transition?: string;
}
export interface ICurvePoint extends IPoint {
    controls: IPoint[];
}
export interface IArcPoint extends IPoint {
    radius: IPoint;
    xRotation: number;
    largeArc: number;
    sweepFlag: number;
}
export declare type IPathPoint = IPoint | ICurvePoint | IArcPoint;
export declare enum SVGShapeEnum {
    CHECKMARK = 1,
    X = 2,
    PLUS = 3
}
export interface IPathSVGAttributes extends ISVGAttributes {
    noFinish?: boolean;
}
export interface IPathElems extends ISVGElementElems {
    base: SVGPathElement;
}
/**
     * @class IRectSVGAttributes
     *
     * Rectangle attributes
     *
     */
export interface IRectSVGAttributes extends ISVGAttributes {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
}
