import { getCssPropertyName, FlatClassDefinition } from '@toolkip/style-helpers';
import { ISVGStyle } from "./_interfaces";
import { map } from '@toolkip/object-helpers';
import { format } from '@toolkip/primitive-helpers';


/**----------------------------------------------------------------------------
 * @class	SVGStyle
 * ----------------------------------------------------------------------------
 * Keep track of style changes for SVG elements
 * @version 1.0
 * @author	Kip Price
 * ----------------------------------------------------------------------------
 */
export class SVGStyle implements ISVGStyle {

	/** keep track of the last generated string */
	protected _generatedStyleString: string;

	/** inner tracking for our particular style selements */
	protected _innerStyle: ISVGStyle;

	/** keep track of whether we need to regenerate the string to use for the SVG style */
	protected _needsNewString: boolean

	/**
	 * _setStyle
	 * 
	 * Update a particular style
	 * @param 	key 	The key 
	 * @param 	value 	The value
	 * 
	 */
	protected _setStyle(key: keyof ISVGStyle, value: string | number) {
		this._innerStyle[key] = (value as string & number);
		this._needsNewString = true;
	}

	/** fill color or "None" */
	public set fill(fill: string) { this._setStyle("fill", fill); }
	public get fill(): string { return this._innerStyle["fill"]; }

	/** fill opacity */
	public set fillOpacity(opacity: number) { this._setStyle("fillOpacity", opacity); }
	public get fillOpacity(): number { return this._innerStyle["fillOpacity"]; }

	/** font size */
	public set fontSize(size: number) { this._setStyle("fontSize", size); }
	public get fontSize(): number { return this._innerStyle["fontSize"]; }

	/** font weight */
	public set fontWeight(weight: string) { this._setStyle("fontWeight", weight); }
	public get fontWeight(): string { return this._innerStyle["fontWeight"]; }

	/** font family */
	public set fontFamily(family: string) { this._setStyle("fontFamily", family); }
	public get fontFamily(): string { return this._innerStyle["fontFamily"]; }

	/** stroke color */
	public set stroke(stroke: string) { this._setStyle("stroke", stroke); }
	public get stroke(): string { return this._innerStyle["stroke"]; }

	/** stroke width */
	public set strokeWidth(width: number) { this._setStyle("strokeWidth", width); }
	public get strokeWidth(): number { return this._innerStyle["strokeWidth"]; }

	/** stroke opacity */
	public set strokeOpacity(opacity: number) { this._setStyle("strokeOpacity", opacity); }
	public get strokeOpacity(): number { return this._innerStyle["strokeOpacity"]; }

	/** stroke linecap */
	public set strokeLinecap(linecap: string) { this._setStyle("strokeLinecap", linecap); }
	public get strokeLinecap(): string { return this._innerStyle["strokeLinecap"]; }

	/** stroke linejoin */
	public set strokeLinejoin(linejoin: string) { this._setStyle("strokeLinejoin", linejoin); }
	public get strokeLinejoin(): string { return this._innerStyle["strokeLinejoin"]; }

	/** filter */
	public set filter(filter: string) {
		if (filter.substr(0, 4) !== "url(") {
			filter = "url(" + filter + ")";
		}
		this._setStyle("filter", filter);
	}
	public get filter(): string { return this._innerStyle["filter"]; }

	protected _transform: string;
	public set transform(transform: string) { this._transform = transform; }
	public get transform(): string { return this._transform; }

	public set transition(transition: string) { this._setStyle("transition", transition); }
	public get transition(): string { return this._innerStyle["transition"]; }

	/** keep track of how the line should be dashed */
	protected _strokeDashArray: string;
	public set strokeDashArray(dashArray: string) { this._strokeDashArray = dashArray; }
	public get strokeDashArray(): string { return this._strokeDashArray; }

	/**
	 * Create a SVGStyle object
	 * 
	 */
	constructor(styles?: ISVGStyle) {
		this.clear();
		if (styles) { this.merge(styles); }
		this._needsNewString = true;
	}

	/**
	 * merge
	 * 
	 * Merge another style object into this 
	 * @param 	style 	The style to merge in
	 * 
	 */
	public merge<K extends keyof ISVGStyle>(style: ISVGStyle): void {
		let mappable: ISVGStyle = ((style as SVGStyle)._innerStyle) || style;

		map(mappable as any, (value: ISVGStyle[K], key: K) => {
			if (!this._innerStyle[key] || (this._innerStyle[key] === "None")) {
				this._innerStyle[key] = value;
			}
		});

		if (!this._strokeDashArray) {
			this._strokeDashArray = mappable.strokeDashArray;
		}

		if (!this._transform) {
			this._transform = mappable.transform;
		}
	}

	/**
	 * clear
	 * 
	 * Clear out our inner styles to defaults
	 * 
	 */
	public clear(): void {
		this._innerStyle = {
			fill: "None",
			stroke: "None"
		};
	}

	/**
	 * assignStyle
	 * 
	 * @param 	element 	The element to set styles on
	 * 
	 */
	public assignStyle(element: SVGElement): void {
		if (this._needsNewString) { this._generateStyleString(); }

		element.setAttribute("style", this._generatedStyleString);

		if (this._strokeDashArray) {
			element.setAttribute("stroke-dasharray", this._strokeDashArray);
		}

		if (this._transform) {
			element.setAttribute("transform", this._transform);
		}
	}

	/**
	 * _generateStyleString
	 * 
	 * Generate the appropriate string for the current style
	 * 
	 */
	protected _generateStyleString(): void {
		this._generatedStyleString = "";

		map(this._innerStyle, (propValue: any, propName: keyof FlatClassDefinition) => {
			let formattedPropName: string = getCssPropertyName(propName);
			this._generatedStyleString += format("{0}: {1};", formattedPropName, propValue.toString());
		});
	}

}
