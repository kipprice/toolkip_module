import { _PathExtensionElement } from "./pathExtension";
import { IPoint } from "../../maths/_interfaces";
import { IPathPoint } from "../_interfaces";

/**
 * @class	PlusElement
 * 
 */
export class PlusElement extends _PathExtensionElement {
	protected _generatePoints(centerPt: IPoint): IPathPoint[] {
		let pts: IPathPoint[] = [
			{x: 2, y: 2},
			{x: 2, y: 0},
			{x: 3, y: 0},

			{x: 3, y: 2},
			{x: 5, y: 2},
			{x: 5, y: 3},

			{x: 3, y: 3},
			{x: 3, y: 5},
			{x: 2, y: 5},

			{x: 2, y: 3},
			{x: 0, y: 3},
			{x: 0, y: 2}
		];

		for (let pt of pts) {
			pt.x += centerPt.x;
			pt.y += centerPt.y;
		}

		return pts;
	}
}