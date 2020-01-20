import { PathExtensionElement } from "./pathExtension";
import { IPoint } from "../../maths/_interfaces";
import { IPathPoint } from "../_interfaces";
/**
 * @class	ExElement
 *
 */
export declare class ExElement extends PathExtensionElement {
    protected _generatePoints(centerPt: IPoint): IPathPoint[];
}
