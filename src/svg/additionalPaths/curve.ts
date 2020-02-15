import { _PathExtensionElement } from "./pathExtension";
import { IPathPoint } from "../_interfaces";

/**----------------------------------------------------------------------------
 * @class	CurveElement
 * ----------------------------------------------------------------------------
 * Render a curve as an SVG element
 * @author	Kip Price
 * @version 1.0.0
 * ----------------------------------------------------------------------------
 */
export class CurveElement extends _PathExtensionElement {

	protected _generatePoints(): IPathPoint[] {
		return [];
	}
}