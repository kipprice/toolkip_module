import { CanvasElement } from "./canvasElement";
import { IPoint, IBasicRect } from "../maths/_interfaces";
import { ElementType } from "./_interfaces";
export declare class PathElement extends CanvasElement {
    protected _points: IPoint[];
    protected _displayPoints: IPoint[];
    get type(): ElementType;
    private _needsInitialDimensions;
    constructor(id: string, points?: IPoint[]);
    /** create an empty dimensions rect */
    protected _initializeRects(): void;
    /** add a new point to this path */
    addPoint(point: IPoint): void;
    /** loop through and update extremas based on all points */
    private _updateExtremaFromPoints;
    /** check if extrema need to be updated for a single point */
    private _updateExtremaFromPoint;
    /** actually create the path on the canvas */
    protected _onDraw(context: CanvasRenderingContext2D): void;
    /**  */
    updateDimensions(canvasDimensions: IBasicRect): void;
    adjustDimensions(adjustPt: IPoint): void;
    /** clone in order to be able to apply various effects */
    protected _cloneForEffect(id: string): PathElement;
    protected _scale(scaleAmt: number): void;
    private _scalePoint;
}
