import { IMappedType, IDictionary } from '../objectHelpers/_interfaces';

/**
 * Keep track of a style definition with SCSS nesting capabilities
 */
export interface IStandardStyles {
    [selector: string]: TypedClassDefinition;
}

/**
 * track a flattened version of styles
 */
export interface IFlatStyles {
    [selector: string]: FlatClassDefinition;
}

/**
 * IPlaceholderMatchFunction
 * ----------------------------------------------------------------------------
 * Check if a particular placeholder matches the expected placeholder
 */
export interface IPlaceholderMatchFunction {
    (valuePiece: string): number | string;
}

/**
 * TypeClassDefinition
 * ----------------------------------------------------------------------------
 * Allow TS users to create a new class
 */
export interface TypedClassDefinition extends FlatClassDefinition {
    nested?: IStandardStyles;
}

export interface FlatClassDefinition extends IMappedType<CSSStyleDeclaration> {
    WebkitAppearance?: string;
    WebkitUserSelect?: string;
    MozUserSelect?: string;
    WebkitFilter?: string;
    webkitLineClamp?: string;
    khtmlUserSelect?: string;
    oUserSelect?: string;
    appearance?: string;
    objectFit?: string;
    src?: string;
    from?: TypedClassDefinition;
    to?: TypedClassDefinition;
}

/**
 * IThemeColors
 * ----------------------------------------------------------------------------
 * Keeps track of the appropriate theme colors
 */
export interface IThemeColors {
    [id: string]: string;
}

/**
 * IFontFaceDefinition
 * ----------------------------------------------------------------------------
 * Declare particulars of custom fonts
 */
export interface IFontFaceDefinition {
    url: string;
    format: string;
}

/**
 * ICustomFonts
 * ----------------------------------------------------------------------------
 * Define the custom fonts that should be part of this app
 */
export interface ICustomFonts {
    [fontName: string]: IFontFaceDefinition[];
}

/**
 * IMediaQueries
 * ----------------------------------------------------------------------------
 * 
 */
export interface IMediaQueries {
    [screenSize: string]: IStandardStyles;
}

//..........................................
//#region TRANSITIONS

export interface ITransitionStyle extends TypedClassDefinition {
    shouldRemove?: boolean;
}

export interface ITransitionDetails {
    elem: HTMLElement;
    start: ITransitionStyle;
    end: ITransitionStyle;
    time: number;
    delay: number;
}

//#endregion
//..........................................

export type Styles = IStandardStyles | ICustomFonts;

export interface ICombineOptions {
    styles: Styles[]
    placeholderToReplace?: string;
}

export interface SplitStyles {
    standard: IFlatStyles;
    withPlaceholders: IFlatStyles;
}

export type PlaceholderIndex = IDictionary<IDictionary<IDictionary<IDictionary<boolean>>>>