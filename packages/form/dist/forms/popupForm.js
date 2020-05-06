"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const _form_1 = require("./_form");
const toolkip_style_helpers_1 = require("@kipprice/toolkip-style-helpers");
const toolkip_create_elements_1 = require("@kipprice/toolkip-create-elements");
const toolkip_async_1 = require("@kipprice/toolkip-async");
/**----------------------------------------------------------------------------
 * @class	PopupForm
 * ----------------------------------------------------------------------------
 * form that renders as a popup display automatically
 * @author	Kip Price
 * @version	1.0.0
 * ----------------------------------------------------------------------------
 */
class PopupForm extends _form_1._Form {
    //#endregion
    //.....................
    _createBase() {
        let out = super._createBase();
        toolkip_style_helpers_1.addClass(out, "popup");
        toolkip_style_helpers_1.addClass(out, "hidden");
        this._isHidden = true;
        return out;
    }
    _createPreForm() {
        this._elems.overlay = toolkip_create_elements_1.createElement({
            cls: "formOverlay",
            parent: this._elems.base,
        });
        super._createPreForm();
        this._elems.closeButton = toolkip_create_elements_1.createElement({
            cls: "close kipBtn",
            content: "&#x2715;",
            eventListeners: {
                click: () => __awaiter(this, void 0, void 0, function* () {
                    yield toolkip_async_1.wait(10);
                    this.tryCancel();
                })
            }
        });
        this._createTitle();
        return this._elems.overlay;
    }
    _createTitle() {
        toolkip_create_elements_1.createElement({
            cls: "titleBar",
            children: [
                { cls: "formTitle", content: this._config.hideTitle ? "" : this._config.label },
                this._elems.closeButton
            ],
            parent: this._elems.background
        });
        // ensure that the child doesn't render the title
        this._config.hideTitle = true;
    }
    //..........................................
    //#region SAVING AND CANCELING
    trySave() {
        const _super = Object.create(null, {
            trySave: { get: () => super.trySave }
        });
        return __awaiter(this, void 0, void 0, function* () {
            let out = _super.trySave.call(this);
            this.hide();
            return out;
        });
    }
    tryCancel(ignoreUnsavedChanges) {
        let out = super.tryCancel();
        this.hide();
        return out;
    }
    //#endregion
    //..........................................
    //..........................................
    //#region HOW OR HIDE FORM
    /**
    * show
    * ----------------------------------------------------------------------------
    * show the form on the appropriate parent if it styled a as a popup
    */
    show() {
        if (!this._isHidden) {
            return;
        }
        toolkip_style_helpers_1.removeClass(this._elems.base, "hidden");
        this._isHidden = false;
    }
    /**
     * hide
     * ----------------------------------------------------------------------------
     * hide the form if it is styled as a popup
     */
    hide() {
        if (this._isHidden) {
            return;
        }
        toolkip_style_helpers_1.addClass(this._elems.base, "hidden");
        this._isHidden = true;
    }
}
exports.PopupForm = PopupForm;
//..................
//#region STYLES
PopupForm._uncoloredStyles = {
    ".kipForm.popup": {
        position: "fixed",
        left: "0",
        top: "0",
        margin: "0",
        padding: "0",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        nested: {
            "&.hidden": {
                display: "none"
            },
            ".formOverlay": {
                position: "absolute",
                width: "100%",
                height: "100%",
                top: "0",
                left: "0",
                backgroundColor: "rgba(0,0,0,.6)",
            },
            ".background": {
                boxShadow: "1px 1px 8px 3px rgba(0,0,0,.2)",
                overflow: "hidden",
                borderRadius: "3px",
                backgroundColor: "#FFF",
                minWidth: "40%",
                maxWidth: "90%",
                maxHeight: "90%",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                nested: {
                    ".titleBar, .kipBtns": {
                        display: "flex",
                        backgroundColor: "<formSubTheme>",
                        color: "#FFF",
                        padding: "3px 20px",
                        alignItems: "center"
                    },
                    ".close.kipBtn": {
                        fontSize: "1.5em"
                    },
                    ".formTitle": {
                        flexGrow: "1",
                        fontSize: "1.5em"
                    },
                    ".formContent": {
                        overflowY: "auto",
                        padding: "15px",
                        maxWidth: "1000px"
                    },
                    ".kipBtns .kipBtn": {
                        backgroundColor: "transparent",
                        border: "1px solid #FFF",
                        fontSize: "1em",
                        color: "#FFF",
                        nested: {
                            "&.primary": {
                                fontSize: "1.2em"
                            }
                        }
                    }
                }
            },
        }
    }
};
PopupForm._styleDependencies = [_form_1._Form];
