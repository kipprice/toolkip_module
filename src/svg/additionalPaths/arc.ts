import { _PathExtensionElement } from "./pathExtension";
import { degreesToRadians } from "../../maths";
import { IAttributes } from "../../htmlHelpers";
import { IPathPoint, IArcPoint } from "../_interfaces";
import { IPoint } from "../../shared";

/**----------------------------------------------------------------------------
 * @class	ArcElement
 * ----------------------------------------------------------------------------
 * Create an arc to render on an SVG canvas
 * @author	Kip Price
 * @version	2.0.0
 * ----------------------------------------------------------------------------
 */
export class ArcElement extends _PathExtensionElement {

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
	constructor(centerPt: IPoint, radius: number, startDegree: number, endDegree: number, direction: number, attr?: IAttributes) {
		super(null, attr, centerPt, radius, startDegree, endDegree, direction);
	}

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
	protected _generatePoints(centerPt: IPoint, radius: number, startDegree: number, endDegree: number, direction: number): IPathPoint[] {

		// generate some values that we'll need later
		let adjustedPoint = this._getAdjustedPoint(centerPt);
		let angleDiff: number = (endDegree - startDegree);

		// start point is nice and simple: grab the point on the circle where we should be rendering
		let start: IPoint = this._calculatePolygonPoint(adjustedPoint, degreesToRadians(startDegree), radius);

		// end point is trickier; this needs to account for the arc attributes
		let end: IPoint = this._calculatePolygonPoint(adjustedPoint, degreesToRadians(endDegree), radius);
		let endArc: IArcPoint = {
			x: end.x,
			y: end.y, 
			largeArc: (angleDiff > 180)? 1 : 0,
			radius: {x: radius, y: radius},
			sweepFlag: direction,
			xRotation: 0
		};

		// return the points on the arc
		let out: IPathPoint[] = [
			start, 
			endArc
		];

		// add the center point if we are a slice of a pie
		if (this._shouldShowRadii()) { out.push(centerPt); }

		return out;
	}

	/**
	 * _getAdjustedPoint
	 * ----------------------------------------------------------------------------
	 * Adjust the center point by a stroke offset so we render correctly
	 * @param 	centerPt 	The central point of the arc
	 * 
	 * @returns	The adjusted point
	 */
	protected _getAdjustedPoint(centerPt: IPoint): IPoint {

		// adjust by the width of the stroke
		let adjust: number = this._style.strokeWidth * Math.sqrt(2) || 0;
		let adjustedPoint: IPoint = {
			x: centerPt.x + adjust,
			y: centerPt.y + adjust
		};
		return adjustedPoint
	}

	/**
	 * _shouldShowRadii
	 * ----------------------------------------------------------------------------
	 * True if this should be rendered as a pie wedge, false otherwise
	 * @returns	False
	 */
	protected _shouldShowRadii(): boolean { return false; }

}