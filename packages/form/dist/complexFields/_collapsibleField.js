"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _field_1 = require("../_field");
const toolkip_create_elements_1 = require("@kipprice/toolkip-create-elements");
const toolkip_style_helpers_1 = require("@kipprice/toolkip-style-helpers");
const toolkip_object_helpers_1 = require("@kipprice/toolkip-object-helpers");
/**----------------------------------------------------------------------------
 * @class _CollapsibleField
 * ----------------------------------------------------------------------------
 * Create a collapsible element of the form
 * @author  Kip Price
 * @version 1.0.1
 * ----------------------------------------------------------------------------
 */
class _CollapsibleField extends _field_1._Field {
    //#endregion
    //...............
    //........................
    //#region CREATE ELEMENTS
    _parseFieldTemplate(template) {
        super._parseFieldTemplate(template);
        this._isCollapsed = (!template.isExpanded && !template.hideTitle && !template.uncollapsible);
    }
    /**
     * _createCollapsibleTitle
     * ----------------------------------------------------------------------------
     * Create the title for a collapsible section & associated icons
     */
    _createCollapsibleTitle() {
        let titleCls = "sectionHeaderContainer";
        if (this._config.hideTitle) {
            titleCls += " hidden";
        }
        this._elems.titleContainer = toolkip_create_elements_1.createElement({
            cls: titleCls,
            parent: this._elems.base,
            eventListeners: {
                click: () => { this._onCaretClicked(); }
            }
        });
        this._elems.title = toolkip_create_elements_1.createSimpleElement("", "sectionHeader", this._config.label, null, null, this._elems.titleContainer);
        if (!this._config.uncollapsible) {
            this._createCollapsibility();
        }
    }
    _createCollapsibility() {
        this._elems.collapseElem = toolkip_create_elements_1.createElement({
            cls: "caret",
            content: "\u25B5",
            parent: this._elems.titleContainer
        });
        toolkip_style_helpers_1.addClass(this._elems.base, "collapsible");
        // start collapsed
        if (this._isCollapsed) {
            toolkip_style_helpers_1.addClass(this._elems.base, "collapsed");
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
    _onCaretClicked() {
        if (this._config.uncollapsible) {
            return;
        }
        if (this._isCollapsed) {
            this.expand();
        }
        else {
            this.collapse();
        }
    }
    /**
     * collapse
     * ----------------------------------------------------------------------------
     * Handle collapsing the section
     */
    collapse() {
        if (this._isTransitioning) {
            return;
        }
        this._isTransitioning = true;
        this._isCollapsed = true;
        toolkip_style_helpers_1.transition(this._elems.childrenContainer, { height: "<height>", overflow: "hidden" }, { height: "0", overflow: "hidden" }, 500).then(() => {
            toolkip_style_helpers_1.addClass(this._elems.base, "collapsed");
            this._isTransitioning = false;
        });
    }
    /**
     * expand
     * ----------------------------------------------------------------------------
     * Handle expanding the section
     */
    expand() {
        if (this._isTransitioning) {
            return;
        }
        this._isTransitioning = true;
        this._isCollapsed = false;
        toolkip_style_helpers_1.removeClass(this._elems.base, "collapsed");
        toolkip_style_helpers_1.transition(this._elems.childrenContainer, { height: "0", overflow: "hidden" }, { height: "<height>" }, 500).then(() => {
            this._isTransitioning = false;
        });
    }
    //#endregion
    //.................................
    //..........................................
    //#region THEME HELPERS
    _applyThemes(child) {
        toolkip_object_helpers_1.map(this._placeholderValues, (pVal, pName) => {
            child.replacePlaceholder(pName, pVal);
        });
    }
}
exports._CollapsibleField = _CollapsibleField;
/** style collapsible sections */
_CollapsibleField._uncoloredStyles = {
    ".kipFormElem.collapsible .formChildren": {},
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
};
