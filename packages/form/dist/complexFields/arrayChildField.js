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
const _interfaces_1 = require("../_interfaces");
const _collapsibleField_1 = require("./_collapsibleField");
const _field_1 = require("../_field");
const toolkip_create_elements_1 = require("@kipprice/toolkip-create-elements");
const sectionField_1 = require("./sectionField");
const _interfaces_2 = require("./_interfaces");
/**----------------------------------------------------------------------------
 * @class   ArrayChildField
 * ----------------------------------------------------------------------------
 * Keep track of a child of an array in the form
 * @author  Kip Price
 * @version 1.0.1
 * ----------------------------------------------------------------------------
 */
class ArrayChildField extends sectionField_1.SectionField {
    //#endregion
    //..................
    //..........................................
    //#region CONSTRUCT AN ARRAY CHILD ELEMENT
    /** create an element of an array */
    constructor(id, children, template) {
        super(id ? id.toString() : "", template || {}, children);
    }
    //.....................
    //#region PROPERTIES
    get _type() { return _interfaces_1.FieldTypeEnum.ARRAY_CHILD; }
    get _defaultValue() { return {}; }
    get _defaultCls() { return "arrayChild"; }
    _onCreateElements() {
        if (this._config.allowReordering) {
            this._elems.nextBtn = toolkip_create_elements_1.createElement({
                cls: "next kipBtn",
                content: "&#x276F;",
                parent: this._elems.base,
                eventListeners: {
                    click: () => { this._changeOrder(_interfaces_2.DirectionType.FORWARD); }
                }
            });
            this._elems.prevBtn = toolkip_create_elements_1.createElement({
                cls: "prev kipBtn",
                content: "&#x276E;",
                parent: this._elems.base,
                eventListeners: {
                    click: () => { this._changeOrder(_interfaces_2.DirectionType.BACKWARD); }
                }
            });
        }
        this._elems.closeBtn = toolkip_create_elements_1.createElement({
            cls: "close kipBtn",
            content: "&#x2715;",
            parent: this._elems.base,
            eventListeners: {
                click: () => { this._delete(); }
            }
        });
        this._elems.childrenContainer = toolkip_create_elements_1.createSimpleElement("", "formChildren", "", null, null, this._elems.base);
    }
    _createClonedElement(appendToID) {
        return new ArrayChildField(this._id + appendToID, this._children);
    }
    _cloneFormElement(child) {
        return super._cloneFormElement(child, "|" + this._id);
    }
    //#endregion
    //..........................................
    //...........................
    //#region HANDLE DELETION
    _delete() {
        this._elems.base.parentNode.removeChild(this._elems.base);
        this._data = null;
        this._dispatchChangeEvent();
    }
    /**
     * _updateInternalData
     * ----------------------------------------------------------------------------
     * handle updating parent elements with the details of this child
     */
    _updateInternalData(internalOnly) {
        const _super = Object.create(null, {
            _updateInternalData: { get: () => super._updateInternalData }
        });
        return __awaiter(this, void 0, void 0, function* () {
            // if we purposefully set the data to null, don't go further
            if (this._data === null) {
                return null;
            }
            // otherwise run the standard update function
            return _super._updateInternalData.call(this, internalOnly);
        });
    }
    //#endregion
    //...........................
    //.................................
    //#region HANDLE ORDER CHANGING
    addOrderingListener(orderListener) {
        this._orderlistener = orderListener;
    }
    _changeOrder(direction) {
        if (!this._orderlistener) {
            return;
        }
        this._orderlistener.onChangeOrder(this, direction);
    }
}
exports.ArrayChildField = ArrayChildField;
//#endregion
//.....................
//..................
//#region STYLES
ArrayChildField._uncoloredStyles = {
    ".kipFormElem.array .formChildren .kipFormElem.arrayChild": {
        backgroundColor: "#FFF",
        borderRadius: "5px",
        boxShadow: "1px 1px 5px 2px rgba(0,0,0,.1)",
        padding: "15px",
        margin: "0",
        nested: {
            ".mobile.large &": {
                maxWidth: "calc(50% - 20px)"
            },
            ".mobile &": {
                maxWidth: "calc(100% - 20px)"
            },
            ".arrayChild": {
                maxWidth: "100%"
            },
            ".formChildren": {
                margin: "10px",
                marginTop: "0"
            },
            ".kipBtn:not(.new)": {
                position: "absolute",
                cursor: "pointer",
                transition: "all ease-in-out .2",
                padding: "2px",
                boxShadow: "none",
                backgroundColor: "none",
                color: "#555",
                opacity: "0.5",
                nested: {
                    "&.close": {
                        top: "2px",
                        left: "calc(100% - 25px)"
                    },
                    "&.next, &.prev": {
                        color: "<formTheme>",
                        padding: "0",
                        width: "20px",
                        height: "20px",
                        borderRadius: "0",
                        boxShadow: "none",
                        top: "calc(50% - 8px)",
                    },
                    "&.next": {
                        left: "calc(100% - 20px)",
                    },
                    "&.prev": {
                        left: "0",
                    },
                    "&:hover": {
                        transform: "scale(1.1)",
                        opacity: "0.8"
                    }
                }
            }
        }
    },
    ".formChildren > div.arrayChild:first-child .prev.kipBtn": {
        display: "none"
    },
    ".formChildren > div.arrayChild:last-child .next.kipBtn": {
        display: "none"
    }
};
ArrayChildField._styleDependencies = [_field_1._Field, _collapsibleField_1._CollapsibleField];
