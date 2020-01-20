import { IPoint } from "../maths/_interfaces";
import { IDrawableElements } from "../drawable/_interfaces";

/**
 * IDimensions
 * ----------------------------------------------------------------------------
 * Dimensions for a rectangle
 * 
 */
export interface IDimensions {
	width: number;
	height: number;
};

/**
 * ZoomDeltaFunction
 * 
 * How to handle a zoom event
 * 
 */
export interface ZoomDeltaFunction {
	(): IPoint;
}

/**
 * IHTML5CanvasOptions
 * 
 * Options for the canvas
 *  
 */
export interface IHTML5CanvasOptions {
	RENDER_RATE?: number;
	ZOOM_DELTA?: ZoomDeltaFunction;
	BACKGROUND_COLOR?: string;
	SIZE?: IDimensions;
	MAX_ZOOM?: IPoint;
	MIN_ZOOM?: IPoint;
}

/**
 * IHTML5CanvasElems
 * 
 * Keep track of the elements that can be in a canvas
 * 
 */
export interface IHTML5CanvasElems extends IDrawableElements {
	base: HTMLCanvasElement;
	effectCanvas: HTMLCanvasElement;
}

/**
 * ElementType
 * 
 * The type of element we're drawing  
 * 
 */
export enum ElementType {
	Rectangle,
	Text,
	Circle,
	Path,
	Group
}

/**
 * EventTypeEnum
 * 
 * Handle all of the events we might need 
 * 
 */
export enum EventTypeEnum {
	CLICK = 0,
	HOVER = 1,
	LEAVE = 2,
	R_CLICK = 3,
	DBL_CLICK = 4,
	KEY_PRESS = 5,
	FOCUS = 6,
	BLUR = 7
};

/** declare the style options supported by cavas elements */


/**
 * CanvasEventHandler
 * 
 * interface for callbacks handling events 
 * 
 * @param	pt
 * @param	e
 * 
 */
export interface CanvasEventHandler {
	(pt: IPoint, e?: Event): void;
}

/**
 * CanvasMouseEventHandler
 * 
 * interface for callbacks handling mouse events 
 * @param	pt
 * @param	e
 *  
 */
export interface CanvasMouseEventHandler extends CanvasEventHandler {
	(pt: IPoint, e?: MouseEvent): void;
}

/**
 * CanvasKeyboardEventHandler
 * 
 * interface for callbacks handling keyboard events 
 * @param	pt
 * @param	e
 * 
 */
export interface CanvasKeyboardEventHandler extends CanvasEventHandler {
	(pt: IPoint, e?: KeyboardEvent): void;
}

/**
 * ICanvasElementTransform
 * 
 *  interface for handling transforms on click / hover 
 *  
 */
export interface ICanvasElementTransform {

	/** how we should scale the element */
	scale?: number;

	/** if set, scale x and y differently */
	unevenScale?: IPoint;

	/** the color this element should shift to */
	color?: string;
}

export type CanvasColor = string | CanvasGradient | CanvasPattern;

export enum StyleChangeEnum {
	FILL_COLOR = 0,
	STROKE_COLOR = 1,
	FONT_FAMILY = 2,
	FONT_VARIANT = 3,
	FONT_SIZE = 4,
	STROKE_SIZE = 5,
	TEXT_ALIGN = 6,
	FONT = 7
};

export interface StyleChangeHandler {
	(): void;
}