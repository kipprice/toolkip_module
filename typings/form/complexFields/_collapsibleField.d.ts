import { IFormCollapsibleTemplate, ICollapsibleHTMLElements } from "./_interfaces";
import { Field } from "../_field";
import { IStandardStyles } from "../../styleHelpers/_interfaces";
/**----------------------------------------------------------------------------
 * @class CollapsibleField
 * ----------------------------------------------------------------------------
 * Create a collapsible element of the form
 * @author  Kip Price
 * @version 1.0.1
 * ----------------------------------------------------------------------------
 */
export declare abstract class CollapsibleField<M, T extends IFormCollapsibleTemplate<M> = IFormCollapsibleTemplate<M>> extends Field<M, T> {
    /** keep track of whether we are currently collapsed */
    protected _isCollapsed: boolean;
    /** track if we are already collapsing or expanding */
    protected _isTransitioning: boolean;
    /** keep track of shared elements for collapsible sections */
    protected _elems: ICollapsibleHTMLElements;
    /** style collapsible sections */
    protected static _uncoloredStyles: IStandardStyles;
    protected _parseFieldTemplate(template: T): void;
    /**
     * _createCollapsibleTitle
     * ----------------------------------------------------------------------------
     * Create the title for a collapsible section & associated icons
     */
    protected _createCollapsibleTitle(): void;
    /**
     * _onCaretClicked
     * ----------------------------------------------------------------------------
     * Handle the expand/collapse icon being clicked
     */
    protected _onCaretClicked(): void;
    /**
     * collapse
     * ----------------------------------------------------------------------------
     * Handle collapsing the section
     */
    collapse(): void;
    /**
     * expand
     * ----------------------------------------------------------------------------
     * Handle expanding the section
     */
    expand(): void;
}
