import { _PathExtensionElement } from "./pathExtension";
import { IPoint } from "../../../shared";
import { IPathPoint } from '../_interfaces';

/**
 * @class	ExElement
 * 
 */
export class ExElement extends _PathExtensionElement {
	protected _generatePoints(centerPt: IPoint): IPathPoint[] {
		let pts: IPathPoint[] = [
			{x: 0.25, y: 0.6},
			{x: 1, y: 0},
			{x: 2, y: 1.1},
			{x: 3, y: 0},
			{x: 3.75, y: 0.6},

			{x: 2.66, y: 1.75},

			{x: 3.75, y: 2.9},
			{x: 3, y: 3.5},
			{x: 2, y: 2.5},
			{x: 1, y: 3.5},
			{x: 0.25, y: 2.9},

			{x: 1.33, y: 1.75}
		];

		for (let pt of pts) {
			pt.x += centerPt.x;
			pt.y += centerPt.y;
		}

		return pts;
	}
}