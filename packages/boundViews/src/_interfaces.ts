import { StandardElement } from '@toolkip/shared-types';
import { IElemDefinition } from '@toolkip/create-elements';
import { _BoundView } from './_boundView';
import { _UpdateableView } from './updateableView';
import { _Drawable, IDrawableElements } from '@toolkip/drawable';
import { IConstructor } from '@toolkip/object-helpers';


/** the types of properties that can be bound */
export type BoundProperty<VM = any> = keyof VM |  "_";

/** the corresponding values within the object */
export type BoundValue<VM = any, K extends keyof VM = keyof VM> = VM | VM[K];

/** the types of elements that can be included as a child within a bound view */
export type BoundChild<
    VM, 
    E extends IDrawableElements
> = 
    StandardElement | 
    IBoundElemDefinition<VM, E> | 
    _Drawable;

export interface BoundPair<VM = any> {
    elem: BindableElement<VM>;
    key: BoundProperty<VM>
}

/** override the default elem definition */
export interface IBoundElemDefinition<
    VM = any, 
    E extends IDrawableElements = IDrawableElements
> extends IElemDefinition<E> {
    bindTo?: BoundProperty<VM> | IViewBindingDetails<VM>;
    children?: BoundChild<VM, E>[];
}

/** allow for overriding the default binding behavior */
export interface IViewBindingDetails<VM = any, AV = any> {
    key?: BoundProperty<VM>;
    value?: IViewValueFunc<VM>;
    func?: IViewUpdateFunc<VM>
    mapToDrawable?: IConstructor<_Drawable> | IDrawableFactory<VM>;
}

/** handle updating a particular piece of the view */
export interface IViewUpdateFunc<T, A = any> {
    (newValue: BoundValue<T> | A, elem: BindableElement<T>): void
}

/** shortcut for setting innerHTML to anything but the standard keys */
export interface IViewValueFunc<T> {
    (model: T): any;
}

/** handle setting specific update functions */
export type IUpdateFunctions<VM> = {
    [K in BoundProperty<VM>]: IViewUpdateFunc<VM>
}

export type IBoundChildren<VM> = {
    [K in BoundProperty<VM>]: _Drawable[];
}

export interface IDrawableFactory<VM> {
    (v: BoundValue<VM>): _Drawable;
}

/** the elements that can be bound */
export type BindableElement<T> = 
    StandardElement | 
    _Drawable |
    _BoundView<BoundValue<T>> | 
    _UpdateableView<BoundValue<T>>;
