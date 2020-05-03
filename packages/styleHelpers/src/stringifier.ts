import { TypedClassDefinition, IFontFaceDefinition, FlatStyles, FlatClassDefinition } from "./_interfaces";
import { map } from '@kipprice/toolkip-objectHelpers";
import { findContainedPlaceholder } from "./placeholders";

const MAX_LENGTH = 10000;

/**----------------------------------------------------------------------------
 * @class	StyleStringifier
 * ----------------------------------------------------------------------------
 * turns the object version of css classes into strings, to be used within 
 * style elements
 * @author	Kip Price
 * @version	1.0.0
 * ----------------------------------------------------------------------------
 */
class _StyleStringifier {

    /**
     * stringify
     * ----------------------------------------------------------------------------
     * turn a set of styles into the string version, such that they can be added
     * to the content of a HTMLStyleElement
     */
    public stringify(styles: FlatStyles): string[] {
        if (!styles) { return []; }
        return this._stringify(styles);
    }

    /**
     * _stringify
     * ----------------------------------------------------------------------------
     * turn a set fo CSS styles into the string version of those classes. Assumes 
     * that the styles have already been flattened into a single layer
     */
    private _stringify(styles: FlatStyles): string[] {
        let out: string[] = [];
        let curStr: string = "";

        // create all of the individual styles
        map(styles, (cssDeclaration: TypedClassDefinition | IFontFaceDefinition[], selector: string) => {
            let clsStr = this.generateContentForStyle(selector, cssDeclaration);
            if (!clsStr) { return; }

            // make sure none of our strings are getting too long
            if ((curStr.length + clsStr.length) >= MAX_LENGTH) {
                out.push(curStr);
                curStr = clsStr;
            } else {
                curStr += clsStr;
            }
        });

        if (curStr) { out.push(curStr) }

        // return the new style element
        return out;
    }

    /**
     * generateContentForCSSClass
     * ----------------------------------------------------------------------------
     * Create the inner HTML for the CSS class that will be used for this styleset
     * @param   selector                CSS selector
     * @param   attr                    Properties + values to use for class
     * @param   skipExistingSelector    True if we should not add to an existing selector
     * 
     * @returns Appropriate content for the CSS class specified by the definition
     */
    public generateContentForStyle(selector: string, attr: TypedClassDefinition | IFontFaceDefinition[]): string {
        if (attr instanceof Array) {
            return this._generateContentForFontDefinition(selector, attr);
        } else {
            return this._generateContentForCssClass(selector, attr);
        }
        
    }

    private _generateContentForCssClass(selector: string, attr: TypedClassDefinition): string {
        // generate the style string from our attributes
        let styleString = this._buildCssClassContentString(selector, attr);

        // as long as we have some value, format it appropriately as a class
        if (styleString) {
            styleString = this._formatClass(selector, styleString)

            // allow for irregular formations, like media queries
            if (selector.indexOf("{") !== -1) { styleString += "\n}"; }
        }

        return styleString;
    }

    private _generateContentForFontDefinition(fontName: string, srcFiles: IFontFaceDefinition[]) {
        let src: string[] = [];
        for (let srcFile of srcFiles) {
            src.push( this._formatFontface(srcFile.url, srcFile.format) );
        }

        let attr: TypedClassDefinition = {
            fontFamily: fontName,
            src: src.join(",")
        };

        return this._generateContentForCssClass("@font-face", attr);
    }
    

    /**
     * _generateCSSStringContent
     * ----------------------------------------------------------------------------
     * Create the string that will actually fill the CSS class
     */
    private _buildCssClassContentString(selector: string, attr: TypedClassDefinition): string {

        let isGeneratingAnimation: boolean = (selector.indexOf("@keyframes") !== -1);
        let styleString: string[] = [];

        // loop through all of the properties and generate appropriate value strings
        map(attr, (propertyValue: any, propertyName: keyof FlatClassDefinition) => {

            // generate the appropriate value string
            if (isGeneratingAnimation) { 
                styleString.push(
                    this._buildAnimationValueString(propertyName, propertyValue)
                ); 
            } else { 
                styleString.push(
                    this._formatProperty(propertyName, propertyValue)
                );
            }

        });

        return styleString.join("");
    }

    /**
     * _buildAnimationClassString
     * ----------------------------------------------------------------------------
     * Create the content needed to handle a CSS animation
     */
    private _buildAnimationValueString(propertyName: keyof FlatClassDefinition, propertyValue: any): string {
        let styleString: string = "";
        
        // loop through the nested values of the animation
        map(propertyValue, (pValue: any, pName: keyof FlatClassDefinition) => {
            if (!pValue) { return; }
            styleString += this._formatProperty(pName, pValue);
        });

        // return the animation value (or nothing, if there's nothing to animate)
        if (!styleString) { return ""; }
        return this._formatClass(propertyName as string, styleString);
    }

    //..........................................
    //#region HELPERS
    
    /**
     * getPropertyName
     * ----------------------------------------------------------------------------
     * grab the appropriate property name for the CSS class 
     * @param   jsPropName      The JS version of a CSS property name, usually in camel-case
     * @returns The CSS version of the property name
     */
    public getPropertyName(jsPropName: keyof FlatClassDefinition): string {
        let prop: string = jsPropName as string;

        // if there's no difference in casing, 
        if (prop.toLowerCase() === prop) { return prop; }

        // match / split on capital letters (while also capturing them)
        const regex = /([A-Z])/g;

        // loop over each segment, determining where (if anywhere) dashes
        // are required
        let segments: string[] = prop.split(regex);
        for (let idx = 0; idx < segments.length; idx++) {
            segments[idx] = this._getUpdatedSegment(
                segments[idx],
                idx === 0
            );
        }

        return segments.join("");
    }

    private _getUpdatedSegment(segment: string, isFirst: boolean): string {

        // handle prefixes
        if (isFirst && this._isCssPrefix(segment)) {
            segment = "-" + segment
        }

        // handle capital letters
        if (segment.toLowerCase() !== segment) {
            segment = "-" + segment.toLowerCase();
        }

        return segment;
    }

    private _isCssPrefix(test: string): boolean {
        switch (test) {
            case "webkit":
            case "moz":
            case "ms":
            case "o":
                return true;
        }

        return false;
    }

    //#endregion
    //..........................................

    //..........................................
    //#region FORMATTING
    
    private _formatClass(selector: string, value: string): string {
        return `${selector} {\n${value}}\n`;
    }

    private _formatProperty(key: keyof FlatClassDefinition, value: any): string {
        
        // some special handling for placeholders
        let placeholder = findContainedPlaceholder(value);
        if (placeholder) {
            value = value.replace(
                `<${placeholder.name}:${placeholder.defaultValue}>`, 
                placeholder.defaultValue
            )
        }

        return `\t${this.getPropertyName(key)} : ${value};\n`
    }

    private _formatFontface(url: string, format: string): string {
        return `url(${url}) format(${format})`
    }
    
    //#endregion
    //..........................................

}

const StyleStringifier = new _StyleStringifier();

//..........................................
//#region EXPORTED FUNCTIONS

export function stringifyStyles(styles: FlatStyles): string[] {
    return StyleStringifier.stringify(styles);
}

export function stringifyStyle(selector: string, definition: FlatClassDefinition | IFontFaceDefinition[]): string {
    return StyleStringifier.generateContentForStyle(selector, definition);
}

export function getCssPropertyName (jsPropName: keyof FlatClassDefinition): string {
    return StyleStringifier.getPropertyName(jsPropName);
}

getCssPropertyName("webkitAlignContent")
//#endregion
//..........................................