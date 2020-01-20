import { SVGElem } from "./svgElement";
import { IPathElems, IPathPoint, IPathSVGAttributes, ISVGAttributes, ICurvePoint, IArcPoint } from "../_interfaces";
import { IPoint } from "../../maths/_interfaces";
/**----------------------------------------------------------------------------
 * @class   PathElement
 * ----------------------------------------------------------------------------
 * @version 1.0
 * @author  Kip Price
 * ----------------------------------------------------------------------------
 */
export declare class PathElement extends SVGElem {
    /** keep track of elements in this path */
    protected _elems: IPathElems;
    /** keep track of points in this path */
    protected _points: IPathPoint[];
    constructor(points: IPathPoint[], attr: IPathSVGAttributes, ...addlArgs: any[]);
    /**
     * _setAttributes
     *
     * Make sure the attributes are updated for a path
     * @param 	attributes 	The attriutes to update
     * @param 	points 		Points for the path
     *
     */
    protected _setAttributes(attributes: ISVGAttributes, points: IPathPoint[]): ISVGAttributes;
    /**
     * _createElements
     *
     * Create elements for this path
     *
     */
    protected _createElements(): void;
    /**
     * _updateExtrema
     *
     * Make sure we know the extrema of this path
     *
     */
    protected _updateExtrema(): void;
    /**
     * _updateExtremaFromPoint
     *
     * Make sure our extrema are up to date
     * @param 	pt	The point that may potentially update our extrema
     *
     */
    private _updateExtremaFromPoint;
    /**
     * _checkForCurrentPath
     *
     * Verify that we have a current path
     *
     */
    private _checkForCurrentPath;
    /**
     * _constructPathAttribute
     *
     * Create the atribute to set the path
     * @param 	prefix 	The type of action being created
     * @param 	point 	The point to add
     * @returns	The appropriate path string
     *
     */
    private _constructPathAttribute;
    /**
     * _pointToAttribute
     *
     * Turn a point into a string recgnizable as a point in the path attribute
     * @param 	point 	The point to convert
     * @returns	The created string
     *
     */
    private _pointToAttributeString;
    /**
     * _addToPathAttribute
     *
     * @param 	suffix 	What to add to the atribute string
     * @returns	True if we were able to add the string
     *
     */
    private _addToPathAttribute;
    /**
     * _startPath
     *
     * @param attr
     *
     */
    protected _startPath(attr?: ISVGAttributes): SVGPathElement;
    /**
     * lineTo
     * ----------------------------------------------------------------------------
     * @param	point	The point to draw a line to
     */
    lineTo(point: IPoint): void;
    /**
     * moveTo
     * ----------------------------------------------------------------------------
     * @param 	point
     */
    moveTo(point: IPoint): void;
    /**
     * curveTo
     * ----------------------------------------------------------------------------
     * Create a curve from the current position to the specified curve point
     * @param	point 	Point to end the curve at
     */
    curveTo(point: ICurvePoint): void;
    /**
     * arcTo
     * ----------------------------------------------------------------------------
     * Create an arc from the current position to the specified arc point
     * @param 	point 	Point to end the arc at
     */
    arcTo(point: IArcPoint): void;
    /**
     * closePath
     * ----------------------------------------------------------------------------
     * closes the path so it creates an enclosed space
     */
    closePath(): void;
    /**
     * finishPathWithoutClosing
     * ----------------------------------------------------------------------------
     * indicates the path is finished without closing the path
     */
    finishPathWithoutClosing(): void;
    /**
     * _calculatePolygonPoint
     *
     * helper function to calculate a polygon's point at a certain angle
     *
     */
    protected _calculatePolygonPoint(centerPt: IPoint, currentAngle: number, radius: number): IPoint;
}
