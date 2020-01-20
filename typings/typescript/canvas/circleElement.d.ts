import { CanvasElement } from "./canvasElement";
import { IPoint, IBasicRect } from "../maths/interface";
import { ElementType } from "./_interfaces";
export declare class CircleElement extends CanvasElement {
    private _center;
    private _radius;
    private _displayRadius;
    get type(): ElementType;
    constructor(id: string, center: IPoint, radius: IPoint);
    constructor(id: string, center: IPoint, radius: number);
    protected _onDraw(context: CanvasRenderingContext2D): void;
    /** change the dimensions based on a pan / zoom change on the canvas */
    updateDimensions(canvasDimensions: IBasicRect): void;
    /** override default dimensions for circle specific dimensions */
    protected _debugDimensions(): void;
    /** create a clone to be used in effect calculations */
    protected _cloneForEffect(id: string): CircleElement;
    /** allow effect elements to be resized */
    protected _scale(scaleAmt: number): void;
}
