import { Drawable } from "../drawable/drawable";
import { ITooltipElements, TooltipPositionType } from "./_interfaces";
import { IBasicRect, IPoint } from "../maths/_interfaces";
import { IElemDefinition } from "../htmlHelpers/_interfaces";
import { IStandardStyles } from "../styleHelpers/_interfaces";
/**----------------------------------------------------------------------------
 * @class   Tooltip
 * ----------------------------------------------------------------------------
 * Render a dynamic HTML version of a tooltip for an element
 * @author  Kip Price
 * @version 1.0.0
 * ----------------------------------------------------------------------------
 */
export declare class Tooltip extends Drawable {
    /** the source element associated with this tooltip */
    protected _sourceElement: HTMLElement;
    set sourceElement(elem: HTMLElement);
    /** internal tracker for the timeout event that will hide the tooltip */
    protected _hideTimeout: number;
    /** associated elements with this tooltip */
    protected _elems: ITooltipElements;
    /** positioning of the tooltip */
    protected _tooltipRect: IBasicRect;
    /** positioning of source element */
    protected _sourceRect: IBasicRect;
    /** optional offset for the tooltip */
    protected _offset: IPoint;
    protected static _uncoloredStyles: IStandardStyles;
    /**
     * Tooltip
     * ----------------------------------------------------------------------------
     * Creates an HTML tooltip to show for a particular source element
     * @param   template        The template to use to create the tooltip
     * @param   sourceElem      The element to attach this tooltip to
     * @param   offset          Any offset that should be applied to this tooltip
     */
    constructor(template?: IElemDefinition, sourceElem?: HTMLElement, offset?: IPoint);
    /**
     * _addEventListeners
     * ----------------------------------------------------------------------------
     * Listen to mouse events about the source element in order to show the
     * tooltip associated with it
     */
    protected _addEventListeners(): void;
    /**
     * _createElements
     * ----------------------------------------------------------------------------
     * (Does nothing by default)
     */
    protected _createElements(): void;
    /**
     * _positionAppropriately
     * ----------------------------------------------------------------------------
     * Move the tooltip to the appropriate position for its source element
     */
    protected _positionAppropriately(): void;
    /**
     * _assignPosition
     * ----------------------------------------------------------------------------
     * Try to assign a position for the tooltip
     * @param   position    The position to try
     *
     * @returns True if the tooltip fits at the current position
     */
    protected _assignPosition(position: TooltipPositionType): boolean;
    /**
     * _setYPosition
     * ----------------------------------------------------------------------------
     * Finds the appropriate Y position for an element given the current placement
     * @param   position    The current placement of the tooltip
     *
     * @returns The y position associated with this placement
     */
    protected _setYPosition(position: TooltipPositionType): number;
    /**
     * _setXPosition
     * ----------------------------------------------------------------------------
     * Finds the appropriate X position for an element given the current placement
     * @param   position    The current placement of the tooltip
     *
     * @returns The x position associated with this placement
     */
    protected _setXPosition(position: TooltipPositionType): number;
    protected _normalizeX(x: number, width: number): number;
    protected _normalizeY(y: number, height: number): number;
    /**
     * _normalize
     * ----------------------------------------------------------------------------
     * Normalize the partiuclar position to be within the screen
     * @param   pos     The position to normalize
     * @param   dim     The dimension to compare against
     * @param   min     The minimum value that is still on screen
     * @param   max     The maximum value that is still on screen
     *
     * @returns The normalized value
     */
    protected _normalize(pos: number, dim: number, min: number, max: number): number;
    draw(parent: HTMLElement): void;
    erase(): void;
}
