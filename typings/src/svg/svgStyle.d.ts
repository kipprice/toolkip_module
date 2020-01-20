import { ISVGStyle } from "./_interfaces";
/**----------------------------------------------------------------------------
 * @class	SVGStyle
 * ----------------------------------------------------------------------------
 * Keep track of style changes for SVG elements
 * @version 1.0
 * @author	Kip Price
 * ----------------------------------------------------------------------------
 */
export declare class SVGStyle implements ISVGStyle {
    /** keep track of the last generated string */
    protected _generatedStyleString: string;
    /** inner tracking for our particular style selements */
    protected _innerStyle: ISVGStyle;
    /** keep track of whether we need to regenerate the string to use for the SVG style */
    protected _needsNewString: boolean;
    /**
     * _setStyle
     *
     * Update a particular style
     * @param 	key 	The key
     * @param 	value 	The value
     *
     */
    protected _setStyle(key: keyof ISVGStyle, value: string | number): void;
    /** fill color or "None" */
    set fill(fill: string);
    get fill(): string;
    /** fill opacity */
    set fillOpacity(opacity: number);
    get fillOpacity(): number;
    /** font size */
    set fontSize(size: number);
    get fontSize(): number;
    /** font weight */
    set fontWeight(weight: string);
    get fontWeight(): string;
    /** font family */
    set fontFamily(family: string);
    get fontFamily(): string;
    /** stroke color */
    set stroke(stroke: string);
    get stroke(): string;
    /** stroke width */
    set strokeWidth(width: number);
    get strokeWidth(): number;
    /** stroke opacity */
    set strokeOpacity(opacity: number);
    get strokeOpacity(): number;
    /** stroke linecap */
    set strokeLinecap(linecap: string);
    get strokeLinecap(): string;
    /** stroke linejoin */
    set strokeLinejoin(linejoin: string);
    get strokeLinejoin(): string;
    /** filter */
    set filter(filter: string);
    get filter(): string;
    protected _transform: string;
    set transform(transform: string);
    get transform(): string;
    set transition(transition: string);
    get transition(): string;
    /** keep track of how the line should be dashed */
    protected _strokeDashArray: string;
    set strokeDashArray(dashArray: string);
    get strokeDashArray(): string;
    /**
     * Create a SVGStyle object
     *
     */
    constructor(styles?: ISVGStyle);
    /**
     * merge
     *
     * Merge another style object into this
     * @param 	style 	The style to merge in
     *
     */
    merge<K extends keyof ISVGStyle>(style: ISVGStyle): void;
    /**
     * clear
     *
     * Clear out our inner styles to defaults
     *
     */
    clear(): void;
    /**
     * assignStyle
     *
     * @param 	element 	The element to set styles on
     *
     */
    assignStyle(element: SVGElement): void;
    /**
     * _generateStyleString
     *
     * Generate the appropriate string for the current style
     *
     */
    protected _generateStyleString(): void;
}
