//..........................................
//#region IMPORTS

import { _Drawable } from '@kipprice/toolkip-drawable/_drawable";
import { bind, BoundUpdateFunction, unbind } from '@kipprice/toolkip-binding";
import { isVisible } from '@kipprice/toolkip-htmlHelpers";
import { ICreateElementFunc, createCustomElement } from '@kipprice/toolkip-createElements";
import { StandardElement, isStandardElement, isKeyof, isDrawable } from '@kipprice/toolkip-shared";
import { IUpdateFunctions, 
    BindableElement, 
    IViewUpdateFunc, 
    IBoundElemDefinition,
    _UpdateableView,
    IViewBindingDetails,
    BoundValue,
    BoundProperty,
    isBoundView,
    isUpdatableView,
    IBoundChildren,
    IDrawableFactory
} from ".";
import { IConstructor, map } from '@kipprice/toolkip-objectHelpers";
import { IDrawableElements } from '@kipprice/toolkip-drawable";

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
export abstract class _BoundView<
    VM = any, 
    P extends string = string, 
    E extends IDrawableElements = IDrawableElements
> extends _Drawable<P, E> {

    //.....................
    //#region PROPERTIES

    /** keep track of the model associated with this view */
    protected _model: VM;
    public get model(): VM { return this._getModel(); }
    public set model(data: VM) { this._setModel(data); }

    /** keep track of each of the update functions */
    protected _updateFunctions: IUpdateFunctions<VM>
    public get updateFunctions(): IUpdateFunctions<VM> { return this._updateFunctions; }
    public set updateFunctions(data: IUpdateFunctions<VM>) { this._updateFunctions = data; }

    protected _bindings: string[];
    protected _boundChildren: IBoundChildren<VM>;

    //#endregion
    //.....................

    //..........................................
    //#region CREATE THE VIEW

    public constructor() {
        super();

        this._updateFunctions = {} as any;
        this._model = {} as any;
        this._bindings = [];
        this._boundChildren = {} as any;

        this._createElements();
    }

    protected _shouldSkipCreateElements(): boolean { return true; }

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
    protected _createBase(obj: IBoundElemDefinition<VM, E>): StandardElement {
        if (!obj.key) { obj.key = "base"; }
        return this._createElem(obj);
    }

    /**
     * _createElem
     * ----------------------------------------------------------------------------
     * handle creating any individual element that's a part of this view
     */
    protected _createElem(obj: IBoundElemDefinition<VM, E>): StandardElement {
        
        // use the standard function, but recurse with this one
        let recurseFunc: ICreateElementFunc<E> = (obj: IBoundElemDefinition<VM, E>) => { return this._createElem(obj); }
        let elem = createCustomElement<E, IBoundElemDefinition<VM, E>>(obj, this._elems, recurseFunc);

        // if a binding is specified, set it up
        if (obj.bindTo) { this._bindElement(elem, obj); }

        return elem;
    }

    /**
     * _bindElement
     * ----------------------------------------------------------------------------
     * handle binding the element
     */
    protected async _bindElement(elem: BindableElement<any>, obj: IBoundElemDefinition<VM, E>): Promise<void> {
        let boundElem: BindableElement<any> = elem;

        // TODO: don't require that key be specified to get at a drawable
        if (obj.key && obj.drawable) { 
            boundElem = this._elems[obj.key as string] as BindableElement<any>; 
        }

        let bindingInfo = {} as IViewBindingDetails<VM>

        // ==> simple case: just the property name
        if (isKeyof<VM>(obj.bindTo)) {
            bindingInfo = {
                key: obj.bindTo,
                func: this._createUpdateFunc(boundElem, obj.bindTo)
            }; 

        // ==> complex case: binding model
        } else {
            const bindToObj = obj.bindTo as IViewBindingDetails<VM>;
            bindingInfo = {...bindToObj};
            if (!bindingInfo.func && bindingInfo.mapToDrawable) {
                bindingInfo.func = this._createMapFunc(boundElem, bindToObj);
            }
        }

        this._bind( boundElem, bindingInfo )
    }

    //#endregion
    //..........................................

    //..........................................
    //#region MODEL HANDLING

    protected _getModel(): VM {
        let oldModel: VM = JSON.parse(JSON.stringify(this._model));
        window.setTimeout(
            () => this._onPotentialModelChange(oldModel),
            0
        );
        return this._model;
    }

    protected _setModel(data: VM): void {
        let oldModel: VM = this._model;
        this._model = data;
        window.setTimeout(
            () => this._onPotentialModelChange(oldModel),
            0
        );
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
    protected _onPotentialModelChange(oldModel: VM): void { }

    //#endregion
    //..........................................

    //..........................................
    //#region BINDING

    /**
     * _bind
     * ----------------------------------------------------------------------------
     * bind a particular element of the view model to the specified element
     */
    protected _bind(elem: BindableElement<VM>, bindingInfo: IViewBindingDetails<VM>): void {
        if (!bindingInfo.func) { return; }

        const bindKey = bind(
            () => {
                // handle the null case
                if (!this._model) { return ""; }

                // handle the case where the user defined a custom value getter
                if (bindingInfo.value) { 
                    return bindingInfo.value(this._model);
                }

                // handle if the user specified a specific key in the model
                if (bindingInfo.key) { 
                    return this._model[bindingInfo.key as keyof VM]; 
                }

                // otherwise, just return the model
                return this._model;
            },
            (value: BoundValue<VM>) => { 
                bindingInfo.func(value, elem) 
            },
            () => this._shouldSkipBindUpdate(elem),
            (a: BoundValue<VM>, b: BoundValue<VM>) => {
                return (JSON.stringify(a) === JSON.stringify(b));
            }
        );

        // keep track of all of the bindings we've created
        this._bindings.push(bindKey);
    }

    /**
     * _unbindAll
     * ----------------------------------------------------------------------------
     * unregister all of the bindings associated with this view
     */
    protected _unbindAll(): void {
        for (let b of this._bindings) {
            unbind(b);
        }
    }

    /**
     * _createUpdateFunc
     * ----------------------------------------------------------------------------
     * helper that will generate an update function for binding
     */
    protected _createUpdateFunc(elem: BindableElement<VM>, key: BoundProperty<VM>): BoundUpdateFunction<any> {
        return (value: BoundValue<VM>) => {

            // always prefer a user-specified function over the default behavior
            if (this._updateFunctions[key as string]) {
                this._updateFunctions[key as string](value, elem);
                return;
            }

            // otherwise, fall back on a default appropriate to the element type
            this._updateElem(value, elem);
        }
    }

    protected _createMapFunc(elem: BindableElement<VM>, mapDetails: IViewBindingDetails<VM>): BoundUpdateFunction<any> {
        const key = mapDetails.key;
        this._boundChildren[key] = this._boundChildren[key] || [];

        return ((value: BoundValue<VM>) => {

            // erase all of the old children, which also unbinds them
            for (let c of this._boundChildren[key]) {
                c.erase();
            }
            
            // create the new children
            map(value, (v: any, k: string | number) => {
                const child = this._createChild(v, mapDetails.mapToDrawable);
                this._updateElem(v, child);
                child.draw(isDrawable(elem) ? elem.base : elem);
                this._boundChildren[key].push(child);
            })
        })
    }

    protected _createChild(value: BoundValue<VM>, mapToDrawable: IDrawableFactory<VM> | IConstructor<_Drawable>): _Drawable {
        let child: _Drawable;

        // first, treat this as not a constructor
        try {
            child = (mapToDrawable as IDrawableFactory<VM>)(value);
        
        // if it fails, fall back to using it as a constructor
        } catch(e) {
            child = new (mapToDrawable as IConstructor<_Drawable>)();
        }

        return child
    }

    /**
     * _updateElem
     * ----------------------------------------------------------------------------
     * handle updating the specified element
     */
    protected _updateElem(value: BoundValue<VM>, elem: BindableElement<VM>) {
       
        // ==> Regular HTML element
        if (isStandardElement(elem)) {
            elem.innerHTML = value ? value.toString() : "";

        // ==> Updatable
        } else if (isUpdatableView(elem)) {
            elem.update(value);

        // ==> Bound View
        } else if (isBoundView<BoundValue<VM>>(elem)) {
            elem.model = value;

        // ==> Drawable
        } else {
            elem.base.innerHTML = value ? value.toString() : "";
        }
    }

    /**
     * setUpdateFunction
     * ----------------------------------------------------------------------------
     * specify how a particular element should be updated when the model updates
     */
    public setUpdateFunction(key: keyof VM, updateFunc: IViewUpdateFunc<VM>): void {
        if (!updateFunc) { return; }
        this._updateFunctions[key as string] = updateFunc;
    }

    /**
     * _shouldSkipBindUpdate
     * ----------------------------------------------------------------------------
     * determines whether this view is currently visible; if not, skips updates 
     * related to bound model
     */
    protected _shouldSkipBindUpdate(elem: BindableElement<VM>) {
        if (isDrawable(elem)) {
            return !(isVisible(elem.base))
        } else {
            return !(isVisible(elem));
        }
    }

    //#endregion
    //..........................................    

    //..........................................
    //#region OVERRIDES
    
    public erase() {
        this._unbindAll();
        super.erase();
    }
    
    //#endregion
    //..........................................
}