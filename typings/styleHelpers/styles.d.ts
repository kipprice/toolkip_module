import { TypedClassDefinition, IFontFaceDefinition } from './_interfaces';
/**
 * createClass
 * ----------------------------------------------------------------------------
 * Create a CSS class from a selector & set of attributes
 *
 * @param   selector        The CSS selector we should use for this class
 * @param   attr            Attributes that should be
 * @param   noAppend        If true, doesn't add the style class to the document
 * @param   forceOverride   If true, replaces the class even if it already exists
 *
 * @returns The created style element
 */
export declare function createClass(selector: string, attr: TypedClassDefinition, noAppend?: boolean, forceOverride?: boolean, skipExistingSelector?: boolean): HTMLStyleElement;
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
export declare function generateContentForCSSClass(selector: string, attr: TypedClassDefinition, skipExistingSelector?: boolean): string;
/**
 * _createStyleElement
 * ----------------------------------------------------------------------------
 * Create the element that will then be added to the document
 * @param   findExisting    If true, returns the first existing style tag in the document
 * @returns The created style element
 */
export declare function createStyleElement(findExisting?: boolean): HTMLStyleElement;
/**
 * getPropertyName
 * ----------------------------------------------------------------------------
 * grab the appropriate property name for the CSS class
 * @param   jsFriendlyName      The JS version of a CSS property name, usually in camel-case
 * @returns The CSS version of the property name
 */
export declare function getPropertyName(jsFriendlyName: string): string;
/**
 * buildClassString
 * ----------------------------------------------------------------------------
 * Builds the string version of a classname, out of multiple classes
 *
 * @param   classes     List of all classes that should be combined into a
 *                      single class name
 *
 * @returns The full class name
 */
export declare function buildClassString(...classes: string[]): string;
/**
 * createFontDefinition
 * ----------------------------------------------------------------------------
 * Adds a font to the CSS styles
 *
 * @param   fontName    The referencable name for the font
 * @param   srcFiles    The source files for this font
 *
 * @returns The updated style element
 */
export declare function createFontDefinition(fontName: string, srcFiles: IFontFaceDefinition[], noAppend?: boolean, forceOverride?: boolean): HTMLStyleElement;
