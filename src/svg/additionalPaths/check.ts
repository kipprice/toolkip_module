import { PathExtensionElement } from "./pathExtension";
import { IPoint } from "../../maths/_interfaces";
import { IPathPoint } from "../_interfaces";

/**
 * @class	CheckElement
 * 
 */
export class CheckElement extends PathExtensionElement {
	protected _generatePoints(centerPt: IPoint): IPathPoint[] {
		let pts: IPathPoint[] = [
			{x: -0.15, y: 2.95},
			{x: 1, y: 4},
			{x: 1.25, y: 4},

			{x: 3, y: 0.25},
			{x: 2.4, y: 0},

			{x: 1, y: 3},
			{x: 0.3, y: 2.3}
		];

		for (let pt of pts) {
			pt.x += centerPt.x;
			pt.y += centerPt.y;
		}

		return pts;
	}
}