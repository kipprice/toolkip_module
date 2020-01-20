import { PathExtensionElement } from "./pathExtension";
import { IPathPoint } from "../_interfaces";
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
