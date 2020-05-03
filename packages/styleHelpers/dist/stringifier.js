"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toolkip_object_helpers_1 = require("@kipprice/toolkip-object-helpers");
const placeholders_1 = require("./placeholders");
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
    stringify(styles) {
        if (!styles) {
            return [];
        }
        return this._stringify(styles);
    }
    /**
     * _stringify
     * ----------------------------------------------------------------------------
     * turn a set fo CSS styles into the string version of those classes. Assumes
     * that the styles have already been flattened into a single layer
     */
    _stringify(styles) {
        let out = [];
        let curStr = "";
        // create all of the individual styles
        toolkip_object_helpers_1.map(styles, (cssDeclaration, selector) => {
            let clsStr = this.generateContentForStyle(selector, cssDeclaration);
            if (!clsStr) {
                return;
            }
            // make sure none of our strings are getting too long
            if ((curStr.length + clsStr.length) >= MAX_LENGTH) {
                out.push(curStr);
                curStr = clsStr;
            }
            else {
                curStr += clsStr;
            }
        });
        if (curStr) {
            out.push(curStr);
        }
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
    generateContentForStyle(selector, attr) {
        if (attr instanceof Array) {
            return this._generateContentForFontDefinition(selector, attr);
        }
        else {
            return this._generateContentForCssClass(selector, attr);
        }
    }
    _generateContentForCssClass(selector, attr) {
        // generate the style string from our attributes
        let styleString = this._buildCssClassContentString(selector, attr);
        // as long as we have some value, format it appropriately as a class
        if (styleString) {
            styleString = this._formatClass(selector, styleString);
            // allow for irregular formations, like media queries
            if (selector.indexOf("{") !== -1) {
                styleString += "\n}";
            }
        }
        return styleString;
    }
    _generateContentForFontDefinition(fontName, srcFiles) {
        let src = [];
        for (let srcFile of srcFiles) {
            src.push(this._formatFontface(srcFile.url, srcFile.format));
        }
        let attr = {
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
    _buildCssClassContentString(selector, attr) {
        let isGeneratingAnimation = (selector.indexOf("@keyframes") !== -1);
        let styleString = [];
        // loop through all of the properties and generate appropriate value strings
        toolkip_object_helpers_1.map(attr, (propertyValue, propertyName) => {
            // generate the appropriate value string
            if (isGeneratingAnimation) {
                styleString.push(this._buildAnimationValueString(propertyName, propertyValue));
            }
            else {
                styleString.push(this._formatProperty(propertyName, propertyValue));
            }
        });
        return styleString.join("");
    }
    /**
     * _buildAnimationClassString
     * ----------------------------------------------------------------------------
     * Create the content needed to handle a CSS animation
     */
    _buildAnimationValueString(propertyName, propertyValue) {
        let styleString = "";
        // loop through the nested values of the animation
        toolkip_object_helpers_1.map(propertyValue, (pValue, pName) => {
            if (!pValue) {
                return;
            }
            styleString += this._formatProperty(pName, pValue);
        });
        // return the animation value (or nothing, if there's nothing to animate)
        if (!styleString) {
            return "";
        }
        return this._formatClass(propertyName, styleString);
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
    getPropertyName(jsPropName) {
        let prop = jsPropName;
        // if there's no difference in casing, 
        if (prop.toLowerCase() === prop) {
            return prop;
        }
        // match / split on capital letters (while also capturing them)
        const regex = /([A-Z])/g;
        // loop over each segment, determining where (if anywhere) dashes
        // are required
        let segments = prop.split(regex);
        for (let idx = 0; idx < segments.length; idx++) {
            segments[idx] = this._getUpdatedSegment(segments[idx], idx === 0);
        }
        return segments.join("");
    }
    _getUpdatedSegment(segment, isFirst) {
        // handle prefixes
        if (isFirst && this._isCssPrefix(segment)) {
            segment = "-" + segment;
        }
        // handle capital letters
        if (segment.toLowerCase() !== segment) {
            segment = "-" + segment.toLowerCase();
        }
        return segment;
    }
    _isCssPrefix(test) {
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
    _formatClass(selector, value) {
        return `${selector} {\n${value}}\n`;
    }
    _formatProperty(key, value) {
        // some special handling for placeholders
        let placeholder = placeholders_1.findContainedPlaceholder(value);
        if (placeholder) {
            value = value.replace(`<${placeholder.name}:${placeholder.defaultValue}>`, placeholder.defaultValue);
        }
        return `\t${this.getPropertyName(key)} : ${value};\n`;
    }
    _formatFontface(url, format) {
        return `url(${url}) format(${format})`;
    }
}
const StyleStringifier = new _StyleStringifier();
//..........................................
//#region EXPORTED FUNCTIONS
function stringifyStyles(styles) {
    return StyleStringifier.stringify(styles);
}
exports.stringifyStyles = stringifyStyles;
function stringifyStyle(selector, definition) {
    return StyleStringifier.generateContentForStyle(selector, definition);
}
exports.stringifyStyle = stringifyStyle;
function getCssPropertyName(jsPropName) {
    return StyleStringifier.getPropertyName(jsPropName);
}
exports.getCssPropertyName = getCssPropertyName;
getCssPropertyName("webkitAlignContent");
//#endregion
//..........................................
