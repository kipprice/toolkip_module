import { _PathExtensionElement } from "./pathExtension";
import { IPathSVGAttributes, IPathPoint } from '../_interfaces';
import { calculatePolygonInternalAngle } from "../../../maths";
import { IPoint } from "../../../shared";

/**----------------------------------------------------------------------------
 * @class	PolygonElement
 * ----------------------------------------------------------------------------
 * @author	Kip Price
 * @version	1.0
 * ----------------------------------------------------------------------------
 */
export class PolygonElement extends _PathExtensionElement {

	constructor(centerPt: IPoint, sides: number, radius: number, attr: IPathSVGAttributes, innerRadius?: number) {
		super(null, attr, centerPt, sides, radius, innerRadius);
	}

	protected _generatePoints(centerPt: IPoint, sides: number, radius: number, innerRadius?: number): IPathPoint[] {

		// Generate the point list for the polygon
		let points: IPathPoint[] = [];
		let curAngle: number = 0;
		let intAngle: number = calculatePolygonInternalAngle(sides);

		for (let i = 0; i < sides; i += 1) {
			let pt: IPoint = this._calculatePolygonPoint(centerPt, curAngle, radius);
			curAngle += intAngle;
			points.push(pt);
		}

		return points;
	}

	

}