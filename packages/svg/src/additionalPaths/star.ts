import { PolygonElement } from "./polygon";
import { calculatePolygonInternalAngle } from "@kipprice/toolkip-maths";
import { IPoint } from "@kipprice/toolkip-shared-types";
import { IPathSVGAttributes, IPathPoint } from '../_interfaces';

/**----------------------------------------------------------------------------
 * @class	StarElement
 * ----------------------------------------------------------------------------
 * @version 1.0
 * @author	Kip Price
 * ----------------------------------------------------------------------------
 */
export class StarElement extends PolygonElement {

	constructor(centerPt: IPoint, numberOfPoints: number, radius: number, innerRadius: number, attr: IPathSVGAttributes) {
		super(centerPt, numberOfPoints, radius, attr, innerRadius);
	}

	protected _generatePoints(centerPt: IPoint, numberOfPoints: number, radius: number, innerRadius: number): IPathPoint[] {
		let curAngle: number = 0;
		let intAngle: number = (calculatePolygonInternalAngle(numberOfPoints) / 2);

		let points: IPathPoint[] = [];

		for (let i = 0; i < numberOfPoints; i += 1) {
			let pt: IPoint;

			// Outer point
			pt = this._calculatePolygonPoint(centerPt, curAngle, radius);
			curAngle += intAngle;
			points.push(pt);

			// Inner point
			pt = this._calculatePolygonPoint(centerPt, curAngle, innerRadius);
			curAngle += intAngle;
			points.push(pt);
		}

		return points;
	}
}