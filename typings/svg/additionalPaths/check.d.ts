import { PathExtensionElement } from "./pathExtension";
import { IPoint } from "../../maths/_interfaces";
import { IPathPoint } from "../_interfaces";
/**
 * @class	CheckElement
 *
 */
export declare class CheckElement extends PathExtensionElement {
    protected _generatePoints(centerPt: IPoint): IPathPoint[];
}
