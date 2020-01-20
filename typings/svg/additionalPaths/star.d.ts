import { PolygonElement } from "./polygon";
import { IPoint } from "../../maths";
import { IPathSVGAttributes, IPathPoint } from "../_interfaces";
/**----------------------------------------------------------------------------
 * @class	StarElement
 * ----------------------------------------------------------------------------
 * @version 1.0
 * @author	Kip Price
 * ----------------------------------------------------------------------------
 */
export declare class StarElement extends PolygonElement {
    constructor(centerPt: IPoint, numberOfPoints: number, radius: number, innerRadius: number, attr: IPathSVGAttributes);
    protected _generatePoints(centerPt: IPoint, numberOfPoints: number, radius: number, innerRadius: number): IPathPoint[];
}
