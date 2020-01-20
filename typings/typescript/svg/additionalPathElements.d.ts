import { PathElement } from "./pathElement";
import { IPathSVGAttributes, IPathPoint } from "./_interfaces";
import { IPoint } from "../maths/interface";
import { IAttributes } from "../htmlHelpers/_interfaces";
/**----------------------------------------------------------------------------
 * @class	PathExtensionElement
 * ----------------------------------------------------------------------------
 * @author	Kip Price
 * @version 1.0.0
 * ----------------------------------------------------------------------------
 */
export declare abstract class PathExtensionElement extends PathElement {
    /**
     * _setAttributes
     * ----------------------------------------------------------------------------
     * Add a hook to allow child elements to generate their own set of points
     * @param 	attr 		Attributes for the SVG element
     * @param 	addlArgs 	Anything else this particular path cares about
     */
    protected _setAttributes(attr: IPathSVGAttributes, ...addlArgs: any[]): IPathSVGAttributes;
    /**
     * _generatePoints [ABSTRACT]
     * ----------------------------------------------------------------------------
     * Overridable function for implementations to create the appropriate set of
     * points for its particular needs
     *
     * @param	addlArgs	Any additional elements needed by this class
     *
     * @returns	The points to render for this path
     */
    protected abstract _generatePoints(...addlArgs: any[]): IPathPoint[];
}
/**----------------------------------------------------------------------------
 * @class	ArcElement
 * ----------------------------------------------------------------------------
 * Create an arc to render on an SVG canvas
 * @author	Kip Price
 * @version	2.0.0
 * ----------------------------------------------------------------------------
 */
export declare class ArcElement extends PathExtensionElement {
    /**
     * ArcElement
     * ----------------------------------------------------------------------------
     * @param centerPt
     * @param radius
     * @param startDegree
     * @param endDegree
     * @param direction
     * @param attr
     */
    constructor(centerPt: IPoint, radius: number, startDegree: number, endDegree: number, direction: number, attr?: IAttributes);
    /**
     * _generatePoints
     * ----------------------------------------------------------------------------
     * Generate points for this particular arc
     * @param 	centerPt
     * @param 	radius
     * @param 	startDegree
     * @param 	endDegree
     * @param 	direction
     * @param 	noRadii
     *
     * @returns	The created set of points for the arc
     */
    protected _generatePoints(centerPt: IPoint, radius: number, startDegree: number, endDegree: number, direction: number): IPathPoint[];
    /**
     * _getAdjustedPoint
     * ----------------------------------------------------------------------------
     * Adjust the center point by a stroke offset so we render correctly
     * @param 	centerPt 	The central point of the arc
     *
     * @returns	The adjusted point
     */
    protected _getAdjustedPoint(centerPt: IPoint): IPoint;
    /**
     * _shouldShowRadii
     * ----------------------------------------------------------------------------
     * True if this should be rendered as a pie wedge, false otherwise
     * @returns	False
     */
    protected _shouldShowRadii(): boolean;
}
/**----------------------------------------------------------------------------
 * @class	PieSliceElement
 * ----------------------------------------------------------------------------
 * Create a slice of a pie
 * @author	Kip Price
 * @version 1.0.0
 * ----------------------------------------------------------------------------
 */
export declare class PieSliceElement extends ArcElement {
    /**
     * _shouldShowRadii
     * ----------------------------------------------------------------------------
     * True if this should be rendered as a pie wedge, false otherwise
     * @returns	True
     */
    protected _shouldShowRadii(): boolean;
}
/**----------------------------------------------------------------------------
 * @class	CurveElement
 * ----------------------------------------------------------------------------
 * Render a curve as an SVG element
 * @author	Kip Price
 * @version 1.0.0
 * ----------------------------------------------------------------------------
 */
export declare class CurveElement extends PathExtensionElement {
    protected _generatePoints(): IPathPoint[];
}
/**----------------------------------------------------------------------------
 * @class	PolygonElement
 * ----------------------------------------------------------------------------
 * @author	Kip Price
 * @version	1.0
 * ----------------------------------------------------------------------------
 */
export declare class PolygonElement extends PathExtensionElement {
    constructor(centerPt: IPoint, sides: number, radius: number, attr: IPathSVGAttributes, innerRadius?: number);
    protected _generatePoints(centerPt: IPoint, sides: number, radius: number, innerRadius?: number): IPathPoint[];
}
/**
 * @class	StarElement
 *
 * @version 1.0
 * @author	Kip Price
 *
 */
export declare class StarElement extends PolygonElement {
    constructor(centerPt: IPoint, numberOfPoints: number, radius: number, innerRadius: number, attr: IPathSVGAttributes);
    protected _generatePoints(centerPt: IPoint, numberOfPoints: number, radius: number, innerRadius: number): IPathPoint[];
}
/**
 * @class	CheckElement
 *
 */
export declare class CheckElement extends PathExtensionElement {
    protected _generatePoints(centerPt: IPoint): IPathPoint[];
}
/**
 * @class	ExElement
 *
 */
export declare class ExElement extends PathExtensionElement {
    protected _generatePoints(centerPt: IPoint): IPathPoint[];
}
/**
 * @class	PlusElement
 *
 */
export declare class PlusElement extends PathExtensionElement {
    protected _generatePoints(centerPt: IPoint): IPathPoint[];
}
