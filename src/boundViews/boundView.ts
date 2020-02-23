import { _Drawable } from "../drawable/_drawable";
import { bind, BoundUpdateFunction, unbind } from "../binding";
import { 
    isHTMLElement, 
    isVisible,
    ICreateElementFunc,
    createCustomElement
} from "../htmlHelpers";
import { isDrawable } from "../drawable/_typeguards";
import { StandardElement, isStandardElement, isString, isKeyof } from "../shared";
import { isUpdatable } from "../structs/_typeguards";
import { IUpdateFunctions, 
    BindableElement, 
    IViewUpdateFunc, 
    IBoundElemDefinition,
    _UpdateableView,
    IViewBindingDetails, 
    BoundPair,
    BoundValue,
    BoundProperty,
    isBoundView,
    isUpdatableView,
    IBoundChildren,
    IDrawableFactory
} from ".";
import { IConstructor, map, IDictionary, setDictValue } from "../objectHelpers";

/**----------------------------------------------------------------------------
 * @class	_BoundView
 * ----------------------------------------------------------------------------
 * create a view that binds to a view model
 * TODO: allow for elems to specify different binding types (e.g. cls)
 * @author	Kip Price
 * @version	1.0.1
 * ----------------------------------------------------------------------------
 */
export abstract class _BoundView<VM = any, P extends string = string> extends _Drawable<P> {

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
            this._updateElem(elem, value);
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
                this._updateElem(child, v);
                child.draw(isDrawable(elem) ? elem.base : elem);
                this._boundChildren[key].push(child);
            })
        })
    }

    protected _createChild(value: BoundValue<VM>, mapToDrawable: IDrawableFactory<VM> | IConstructor<_Drawable>): _Drawable {
        let child: _Drawable;

        try {
            child = (mapToDrawable as IDrawableFactory<VM>)(value);
        } catch(e) {
            child = new (mapToDrawable as IConstructor<_Drawable>)();
        }

        return child
    }

    protected _updateElem(elem: BindableElement<VM>, value: BoundValue<VM>): void {
        if (isStandardElement(elem)) {
            this._updateStandardElement(elem, value);
        } else if (isUpdatableView(elem)) {
            this._updateUpdateable(elem, value);
        } else if (isBoundView(elem)) {
            this._updateBoundView(elem as _BoundView<BoundValue<VM>>, value);
        } else {
            this._updateStandardElement(elem.base, value);
        }
    }

    protected _updateStandardElement<K extends keyof VM>(elem: StandardElement, value: VM[K] | VM): void {
        if (!value) { value = "" as any; }
        elem.innerHTML = value.toString();
    }

    protected _updateUpdateable<K extends keyof VM>(elem: _UpdateableView<VM[K] | VM>, value: VM[K] | VM): void {
        elem.update(value);
    }

    protected _updateBoundView<K extends keyof VM>(elem: _BoundView<VM[K] | VM>, value: VM[K] | VM): void {
        elem.model = value;
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

    protected _shouldSkipBindUpdate<K extends keyof VM>(elem: BindableElement<VM>): boolean {

        // if this element is no longer rendered, we should ignore new bindings
        if (isDrawable(elem)) {
            return !(isVisible(elem.base))
        } else {
            return !(isVisible(elem));
        }
    }

    //#endregion
    //..........................................

    //..........................................
    //#region HELPERS

    /**
     * _createBase
     * ----------------------------------------------------------------------------
     * wrapper around the standard function for creating elements that handles 
     * binding a little more nuanced
     */
    protected _createBase(obj: IBoundElemDefinition<VM>): StandardElement {

        // use the standard function, but recurse with this one
        let recurseFunc: ICreateElementFunc = (obj: IBoundElemDefinition) => { return this._createBase(obj); }
        let elem = createCustomElement(obj, this._elems as any, recurseFunc);

        // if a binding is specified, set it up
        if (obj.bindTo) { this._bindElement(elem, obj); }

        return elem;
    }

    /**
     * _bindElement
     * ----------------------------------------------------------------------------
     * handle binding the element
     */
    protected async _bindElement(elem: BindableElement<any>, obj: IBoundElemDefinition<VM>): Promise<void> {
        let boundElem: BindableElement<any> = elem;

        // TODO: don't require that key be specified to get at a drawable
        if (obj.key && obj.drawable) { 
            boundElem = this._elems[obj.key as string] as BindableElement<any>; 
        }

        let bindingInfo = {} as IViewBindingDetails<VM>

        // handle the simple case
        if (isKeyof<VM>(obj.bindTo)) {
            bindingInfo = {
                key: obj.bindTo,
                func: this._createUpdateFunc(boundElem, obj.bindTo)
            }; 

        // pass along the binding details
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
    //#region OVERRIDE SUPER METHODS
    
    public erase() {
        this._unbindAll();
        super.erase();
    }
    
    //#endregion
    //..........................................
}