import { PathExtensionElement } from "./pathExtension";
import { IPathSVGAttributes, IPathPoint } from "../_interfaces";
import { IPoint } from "../../maths";
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
