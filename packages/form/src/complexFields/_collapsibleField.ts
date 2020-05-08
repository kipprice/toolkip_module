import { IFormCollapsibleTemplate, ICollapsibleHTMLElements } from "./_interfaces";
import { _Field } from "../_field";
import { createElement, createSimpleElement } from "@toolkip/create-elements";
import { addClass, removeClass, transition, IStandardStyles } from "@toolkip/style-helpers";
import { map } from "@toolkip/object-helpers";
import { FormColor } from "../_interfaces";


/**----------------------------------------------------------------------------
 * @class _CollapsibleField
 * ----------------------------------------------------------------------------
 * Create a collapsible element of the form
 * @author  Kip Price
 * @version 1.0.1
 * ----------------------------------------------------------------------------
 */
export abstract class _CollapsibleField<M, T extends IFormCollapsibleTemplate<M> = IFormCollapsibleTemplate<M>> extends _Field<M, T> {

    //.....................
    //#region PROPERTIES

    /** keep track of whether we are currently collapsed */
    protected _isCollapsed: boolean;

    /** track if we are already collapsing or expanding */
    protected _isTransitioning: boolean;

    /** keep track of shared elements for collapsible sections */
    protected _elems: ICollapsibleHTMLElements;

    /** style collapsible sections */
    protected static _uncoloredStyles: IStandardStyles = {

        ".kipFormElem.collapsible .formChildren": {

        },

        ".kipFormElem.collapsible.collapsed .formChildren": {
            height: "0",
            overflow: "hidden"
        },

        ".kipFormElem.collapsible .sectionHeaderContainer": {
            display: "flex",
            justifyContent: "space-between",
            boxSizing: "border-box",
            cursor: "pointer",
            padding: "10px 10px",
            alignItems: "center",
            width: "calc(100% + 20px)",
            marginLeft: "-10px",
            borderRadius: "30px",

            nested: {
                "&.hidden": {
                    display: "none"
                }
            }
        },

        ".kipFormElem.collapsible .caret": {
            transformOrigin: "50% 50%",
            width: ".8em",
            fontSize: "1em",
            transition: "all ease-in-out .1s",
            cursor: "pointer",
            color: "<formSubTheme>"
        },

        ".kipFormElem.collapsible.collapsed .caret": {
            transform: "rotate(180deg)"
        },

        ".kipFormElem.collapsible .sectionHeaderContainer:hover": {
            backgroundColor: "rgba(0,0,0,.05)"
        }

    }
    //#endregion
    //...............

    //........................
    //#region CREATE ELEMENTS

    protected _parseFieldTemplate(template: T): void {
        super._parseFieldTemplate(template);
        this._isCollapsed = (!template.isExpanded && !template.hideTitle && !template.uncollapsible);
    }

    /**
     * _createCollapsibleTitle
     * ----------------------------------------------------------------------------
     * Create the title for a collapsible section & associated icons
     */
    protected _createCollapsibleTitle(): void {
        let titleCls: string = "sectionHeaderContainer";
        if (this._config.hideTitle) { titleCls += " hidden"; }

        this._elems.titleContainer = createElement({
            cls: titleCls,
            parent: this._elems.base,
            eventListeners: {
                click: () => { this._onCaretClicked(); }
            }
        });

        this._elems.title = createSimpleElement("", "sectionHeader", this._config.label, null, null, this._elems.titleContainer);

        if (!this._config.uncollapsible) { this._createCollapsibility(); }
    }

    protected _createCollapsibility() {
        
        this._elems.collapseElem = createElement({
            cls: "caret",
            content: "\u25B5",
            parent: this._elems.titleContainer
        });
        addClass(this._elems.base, "collapsible");

        // start collapsed
        if (this._isCollapsed) {
            addClass(this._elems.base, "collapsed");
            this._isCollapsed = true;
        }
    }
    //#endregion

    //.................................
    //#region HANDLE EXPAND + COLLAPSE

    /**
     * _onCaretClicked
     * ----------------------------------------------------------------------------
     * Handle the expand/collapse icon being clicked
     */
    protected _onCaretClicked(): void {
        if (this._config.uncollapsible) { return; }
        if (this._isCollapsed) {
            this.expand();
        } else {
            this.collapse();
        }
    }

    /**
     * collapse
     * ----------------------------------------------------------------------------
     * Handle collapsing the section
     */
    public collapse(): void {
        if (this._isTransitioning) { return; }
        this._isTransitioning = true;
        this._isCollapsed = true;

        transition(
            this._elems.childrenContainer,
            { height: "<height>", overflow: "hidden" },
            { height: "0", overflow: "hidden" },
            500
        ).then(() => {
            addClass(this._elems.base, "collapsed");
            this._isTransitioning = false;
        })
    }

    /**
     * expand
     * ----------------------------------------------------------------------------
     * Handle expanding the section
     */
    public expand(): void {
        if (this._isTransitioning) { return; }
        this._isTransitioning = true;
        this._isCollapsed = false;

        removeClass(this._elems.base, "collapsed");
        transition(
            this._elems.childrenContainer,
            { height: "0", overflow: "hidden" },
            { height: "<height>" },
            500
        ).then(() => {

            this._isTransitioning = false;
        });


    }

    //#endregion
    //.................................

    //..........................................
    //#region THEME HELPERS
    
    protected _applyThemes(child: _Field<any>) {
        map(this._placeholderValues, (pVal: any, pName: FormColor) => {
            child.replacePlaceholder(pName, pVal);
        })
    }
    
    //#endregion
    //..........................................

}

