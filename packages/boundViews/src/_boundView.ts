//..........................................
//#region IMPORTS
import { nextRender } from '@toolkip/async';
import { _Drawable, IDrawableElements } from '@toolkip/drawable';
import { BoundUpdateFunction } from '@toolkip/binding';
import { isVisible } from '@toolkip/html-helpers';
import { ICreateElementFunc, createCustomElement } from '@toolkip/create-elements';
import { StandardElement, isStandardElement, isKeyof, isDrawable, isNullOrUndefined } from '@toolkip/shared-types';
import { IConstructor, map } from '@toolkip/object-helpers';
import { IUpdateFunctions, IBoundChildren, IBoundElemDefinition, BindableElement, IViewBindingDetails, BoundValue, BoundProperty, IDrawableFactory, IViewUpdateFunc } from './_interfaces';
import { isUpdatableView, isBoundView } from './_typeGuards';
import { Model, select, Selector } from '@toolkip/model';

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
    protected _model: Model<VM>;
    public get model(): VM { return this._model.getData() }
    public set model(data: VM) { 
        this._model.import(data) 
    }

    /** keep track of each of the update functions */
    protected _updateFunctions: IUpdateFunctions<VM>
    public get updateFunctions(): IUpdateFunctions<VM> { return this._updateFunctions; }
    public set updateFunctions(data: IUpdateFunctions<VM>) { this._updateFunctions = data; }

    protected _bindings: Selector<any>[];
    protected _boundChildren: IBoundChildren<VM>;

    //#endregion
    //.....................

    //..........................................
    //#region CREATE THE VIEW

    public constructor() {
        super();

        this._updateFunctions = {} as any;
        this._model = new Model<VM>();
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
        let recurseFunc: ICreateElementFunc<E> = (obj: IBoundElemDefinition<VM, E>) => { 
            return this._createElem(obj); 
        }
        
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

        // grab the element that will be uodated
        let boundElem: BindableElement<any> = elem;
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
    //#region BINDING

    /**
     * _bind
     * ----------------------------------------------------------------------------
     * bind a particular element of the view model to the specified element
     */
    protected _bind<O = BoundValue<VM>>(elem: BindableElement<VM>, bindingInfo: IViewBindingDetails<VM>): void {
        const model = this._getModelForKey(bindingInfo.key);
        const selector = select<BoundValue<VM>, O>(model, 
            bindingInfo.value ? 
            bindingInfo.value : 
            (m) => m
        );
        
        selector.apply(({ value }) => {
            if (this._shouldSkipBindUpdate(elem)) { return }
            if (isNullOrUndefined(value)) { return; }
            bindingInfo.func(value, elem);
        }, true);

        this._bindings.push(selector);
    }

    protected _reselect() {
        for (let b of this._bindings) {
            b.reselect();
        }
    }

    protected _getModelForKey(key: BoundProperty<VM>) {
        if (!key) { return this._model; }
        if (key === "_") { return this._model; }
        return select(this._model, (m) => {
            return m ? m[key] : undefined;
        });
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
     * overridable method that determines whether the view should be updating; this
     * may be changed for listener intensive applications to check if the element is 
     * visible before running the selector
     */
    protected _shouldSkipBindUpdate(elem: BindableElement<VM>) { return false; }
    
    //#endregion
    //..........................................    

    //..........................................
    //#region OVERRIDES
    
    public draw(parent?: StandardElement, force?: boolean) {
        super.draw(parent, force);

        // in the cases that do stop updates when the object isn't
        // visible, we want to auto restart them on drawing
        nextRender()
            .then(() => this._reselect());
    }
    
    //#endregion
    //..........................................
}