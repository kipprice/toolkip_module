"use strict";
//..........................................
//#region IMPORTS
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
const toolkip_drawable_1 = require("@kipprice/toolkip-drawable");
const toolkip_binding_1 = require("@kipprice/toolkip-binding");
const toolkip_html_helpers_1 = require("@kipprice/toolkip-html-helpers");
const toolkip_create_elements_1 = require("@kipprice/toolkip-create-elements");
const toolkip_shared_types_1 = require("@kipprice/toolkip-shared-types");
const toolkip_object_helpers_1 = require("@kipprice/toolkip-object-helpers");
const _typeGuards_1 = require("./_typeGuards");
//#endregion
//..........................................
/**----------------------------------------------------------------------------
 * @class	_BoundView
 * ----------------------------------------------------------------------------
 * create a view that binds to a view model
 * TODO: allow for elems to specify different binding types (e.g. cls)
 * @author	Kip Price
 * @version	1.0.1
 * ----------------------------------------------------------------------------
 */
class _BoundView extends toolkip_drawable_1._Drawable {
    //#endregion
    //.....................
    //..........................................
    //#region CREATE THE VIEW
    constructor() {
        super();
        this._updateFunctions = {};
        this._model = {};
        this._bindings = [];
        this._boundChildren = {};
        this._createElements();
    }
    get model() { return this._getModel(); }
    set model(data) { this._setModel(data); }
    get updateFunctions() { return this._updateFunctions; }
    set updateFunctions(data) { this._updateFunctions = data; }
    _shouldSkipCreateElements() { return true; }
    //#endregion
    //..........................................
    //..........................................
    //#region CREATE ELEMENTS
    /**
     * _createBase
     * ----------------------------------------------------------------------------
     * wrapper around the standard function for creating elements that handles
     * binding a little more nuanced
     */
    _createBase(obj) {
        if (!obj.key) {
            obj.key = "base";
        }
        return this._createElem(obj);
    }
    /**
     * _createElem
     * ----------------------------------------------------------------------------
     * handle creating any individual element that's a part of this view
     */
    _createElem(obj) {
        // use the standard function, but recurse with this one
        let recurseFunc = (obj) => { return this._createElem(obj); };
        let elem = toolkip_create_elements_1.createCustomElement(obj, this._elems, recurseFunc);
        // if a binding is specified, set it up
        if (obj.bindTo) {
            this._bindElement(elem, obj);
        }
        return elem;
    }
    /**
     * _bindElement
     * ----------------------------------------------------------------------------
     * handle binding the element
     */
    _bindElement(elem, obj) {
        return __awaiter(this, void 0, void 0, function* () {
            let boundElem = elem;
            // TODO: don't require that key be specified to get at a drawable
            if (obj.key && obj.drawable) {
                boundElem = this._elems[obj.key];
            }
            let bindingInfo = {};
            // ==> simple case: just the property name
            if (toolkip_shared_types_1.isKeyof(obj.bindTo)) {
                bindingInfo = {
                    key: obj.bindTo,
                    func: this._createUpdateFunc(boundElem, obj.bindTo)
                };
                // ==> complex case: binding model
            }
            else {
                const bindToObj = obj.bindTo;
                bindingInfo = Object.assign({}, bindToObj);
                if (!bindingInfo.func && bindingInfo.mapToDrawable) {
                    bindingInfo.func = this._createMapFunc(boundElem, bindToObj);
                }
            }
            this._bind(boundElem, bindingInfo);
        });
    }
    //#endregion
    //..........................................
    //..........................................
    //#region MODEL HANDLING
    _getModel() {
        let oldModel = JSON.parse(JSON.stringify(this._model));
        window.setTimeout(() => this._onPotentialModelChange(oldModel), 0);
        return this._model;
    }
    _setModel(data) {
        let oldModel = this._model;
        this._model = data;
        window.setTimeout(() => this._onPotentialModelChange(oldModel), 0);
    }
    //#endregion
    //..........................................
    //..........................................
    //#region EVENT HANDLERS
    /**
     * _onPotentialModelChange
     * ----------------------------------------------------------------------------
     * overridable function to allow for any array-based child views
     */
    _onPotentialModelChange(oldModel) { }
    //#endregion
    //..........................................
    //..........................................
    //#region BINDING
    /**
     * _bind
     * ----------------------------------------------------------------------------
     * bind a particular element of the view model to the specified element
     */
    _bind(elem, bindingInfo) {
        if (!bindingInfo.func) {
            return;
        }
        const bindKey = toolkip_binding_1.bind(() => {
            // handle the null case
            if (!this._model) {
                return "";
            }
            // handle the case where the user defined a custom value getter
            if (bindingInfo.value) {
                return bindingInfo.value(this._model);
            }
            // handle if the user specified a specific key in the model
            if (bindingInfo.key) {
                return this._model[bindingInfo.key];
            }
            // otherwise, just return the model
            return this._model;
        }, (value) => {
            bindingInfo.func(value, elem);
        }, () => this._shouldSkipBindUpdate(elem), (a, b) => {
            return (JSON.stringify(a) === JSON.stringify(b));
        });
        // keep track of all of the bindings we've created
        this._bindings.push(bindKey);
    }
    /**
     * _unbindAll
     * ----------------------------------------------------------------------------
     * unregister all of the bindings associated with this view
     */
    _unbindAll() {
        for (let b of this._bindings) {
            toolkip_binding_1.unbind(b);
        }
    }
    /**
     * _createUpdateFunc
     * ----------------------------------------------------------------------------
     * helper that will generate an update function for binding
     */
    _createUpdateFunc(elem, key) {
        return (value) => {
            // always prefer a user-specified function over the default behavior
            if (this._updateFunctions[key]) {
                this._updateFunctions[key](value, elem);
                return;
            }
            // otherwise, fall back on a default appropriate to the element type
            this._updateElem(value, elem);
        };
    }
    _createMapFunc(elem, mapDetails) {
        const key = mapDetails.key;
        this._boundChildren[key] = this._boundChildren[key] || [];
        return ((value) => {
            // erase all of the old children, which also unbinds them
            for (let c of this._boundChildren[key]) {
                c.erase();
            }
            // create the new children
            toolkip_object_helpers_1.map(value, (v, k) => {
                const child = this._createChild(v, mapDetails.mapToDrawable);
                this._updateElem(v, child);
                child.draw(toolkip_shared_types_1.isDrawable(elem) ? elem.base : elem);
                this._boundChildren[key].push(child);
            });
        });
    }
    _createChild(value, mapToDrawable) {
        let child;
        // first, treat this as not a constructor
        try {
            child = mapToDrawable(value);
            // if it fails, fall back to using it as a constructor
        }
        catch (e) {
            child = new mapToDrawable();
        }
        return child;
    }
    /**
     * _updateElem
     * ----------------------------------------------------------------------------
     * handle updating the specified element
     */
    _updateElem(value, elem) {
        // ==> Regular HTML element
        if (toolkip_shared_types_1.isStandardElement(elem)) {
            elem.innerHTML = value ? value.toString() : "";
            // ==> Updatable
        }
        else if (_typeGuards_1.isUpdatableView(elem)) {
            elem.update(value);
            // ==> Bound View
        }
        else if (_typeGuards_1.isBoundView(elem)) {
            elem.model = value;
            // ==> Drawable
        }
        else {
            elem.base.innerHTML = value ? value.toString() : "";
        }
    }
    /**
     * setUpdateFunction
     * ----------------------------------------------------------------------------
     * specify how a particular element should be updated when the model updates
     */
    setUpdateFunction(key, updateFunc) {
        if (!updateFunc) {
            return;
        }
        this._updateFunctions[key] = updateFunc;
    }
    /**
     * _shouldSkipBindUpdate
     * ----------------------------------------------------------------------------
     * determines whether this view is currently visible; if not, skips updates
     * related to bound model
     */
    _shouldSkipBindUpdate(elem) {
        if (toolkip_shared_types_1.isDrawable(elem)) {
            return !(toolkip_html_helpers_1.isVisible(elem.base));
        }
        else {
            return !(toolkip_html_helpers_1.isVisible(elem));
        }
    }
    //#endregion
    //..........................................    
    //..........................................
    //#region OVERRIDES
    erase() {
        this._unbindAll();
        super.erase();
    }
}
exports._BoundView = _BoundView;
