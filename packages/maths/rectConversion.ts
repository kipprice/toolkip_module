import { IPoint } from '../shared';
import { 
	IBasicRect, 
	isIBasicRect, 
	isClientRect, 
	isSVGRect 
} from '.';

/**
 * clientRectToShape
 * --------------------------------------------------------------------------
 * Converts a Client Rect to a basic shape
 * 
 * @param 	rect 	The rectangle to convert
 * 
 * @returns The array of points that make up this shape
 */
export function clientRectToShape(rect: ClientRect): IPoint[] {
	let out: IPoint[];
	out = new Array<IPoint>();

	// Top-left corner
	out[0] = {
		x: rect.left,
		y: rect.top
	};

	// Top-right corner
	out[1] = {
		x: rect.left + rect.width,
		y: rect.top
	};

	// Bottom-right corner
	out[2] = {
		x: rect.left + rect.width,
		y: rect.top + rect.height
	};

	// Bottom-left corner
	out[3] = {
		x: rect.left,
		y: rect.top + rect.height
	};

	return out;
}

/**
 * svgRectToShape
 * --------------------------------------------------------------------------
 * Converts a SVG Rect to a basic shape
 * 
 * @param 	rect 	The rectangle to convert
 * 
 * @returns The array of points that make up this shape
 */
export function svgRectToShape(rect: SVGRect): IPoint[] {
	let out: IPoint[];
	out = new Array<IPoint>();

	// Top-left corner
	out[0] = {
		x: rect.x,
		y: rect.y
	};

	// Top-right corner
	out[1] = {
		x: rect.x + rect.width,
		y: rect.y
	};

	// Bottom-right corner
	out[2] = {
		x: rect.x + rect.width,
		y: rect.y + rect.height
	};

	// Bottom-left corner
	out[3] = {
		x: rect.x,
		y: rect.y + rect.height
	};

	return out;
}

/**
 * svgRectToBasicRect
 * --------------------------------------------------------------------------
 * Convert a SVG rectangle to a basic rectangle
 * 
 * @param 	rect 	The rectangle to convert
 * 
 * @returns The resulting IBasicRect representation of the passed in rect
 */
export function svgRectToBasicRect(rect: SVGRect): IBasicRect {
	let out: IBasicRect;

	out = {
		x: rect.x,
		y: rect.y,
		w: rect.width,
		h: rect.height
	};

	return out;
};

/**
 * clientRectToBasicRect
 * --------------------------------------------------------------------------
 * Convert a client rectangle to a basic rectangle
 * 
 * @param 	rect 	The rectangle to convert
 * 
 * @returns The resulting IBasicRect representation of the passed in rect
 */
export function clientRectToBasicRect(rect: ClientRect): IBasicRect {
	let out: IBasicRect;

	out = {
		x: rect.left + window.scrollX,
		y: rect.top + window.scrollY,
		w: rect.width,
		h: rect.height
	};

	return out;
}

/**
 * toBasicRect
 * --------------------------------------------------------------------------
 * Converts any supported rectangle to a basic rectangle
 * 
 * @param 	rect 	The rectangle to convert
 * 
 * @returns The basic rect version of this client / svg rect
 */
export function toBasicRect(rect: IBasicRect | ClientRect | SVGRect): IBasicRect {
	let r: IBasicRect;
	if (isIBasicRect(rect)) {
		r = rect;
	} else if (isClientRect(rect)) {
		r = clientRectToBasicRect(rect);
	} else if (isSVGRect(rect)) {
		r = svgRectToBasicRect(rect);
	}

	return r;
};