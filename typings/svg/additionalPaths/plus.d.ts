import { PathExtensionElement } from "./pathExtension";
import { IPoint } from "../../maths/_interfaces";
import { IPathPoint } from "../_interfaces";
/**
 * @class	PlusElement
 *
 */
export declare class PlusElement extends PathExtensionElement {
    protected _generatePoints(centerPt: IPoint): IPathPoint[];
}
