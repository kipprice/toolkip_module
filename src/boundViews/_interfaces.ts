import { StandardElement } from '../shared';
import { IElemDefinition } from '../htmlHelpers/_interfaces';
import { _BoundView, _UpdateableView } from '.';
import { _Drawable } from '../drawable/_drawable';
import { IConstructor } from '../objectHelpers';


/** the types of properties that can be bound */
export type BoundProperty<VM = any> = keyof VM |  "_";

/** the corresponding values within the object */
export type BoundValue<VM = any, K extends keyof VM = keyof VM> = VM | VM[K];

/** the types of elements that can be included as a child within a bound view */
export type IBoundChild<VM> = 
    StandardElement | 
    IBoundElemDefinition<VM> | 
    _Drawable;

export interface BoundPair<VM = any> {
    elem: IBindableElement<VM>;
    key: BoundProperty<VM>
}

/** override the default elem definition */
export interface IBoundElemDefinition<VM = any> extends IElemDefinition {
    bindTo?: BoundProperty<VM> | IViewBindingDetails<VM>;
    children?: IBoundChild<VM>[];
}

/** allow for overriding the default binding behavior */
export interface IViewBindingDetails<VM = any> {
    key: BoundProperty<VM>;
    func?: IViewUpdateFunc<VM>
    mapToDrawable?: IConstructor<_Drawable>;
}

/** handle updating a particular piece of the view */
export interface IViewUpdateFunc<T> {
    (newValue: BoundValue<T>, elem: IBindableElement<T>): void
}

/** handle setting specific update functions */
export type IUpdateFunctions<VM> = {
    [K in BoundProperty<VM>]: IViewUpdateFunc<VM>
}

export type IBoundChildren<VM> = {
    [K in BoundProperty<VM>]: _Drawable[];
}

/** the elements that can be bound */
export type IBindableElement<T> = 
    StandardElement | 
    _Drawable |
    _BoundView<BoundValue<T>> | 
    _UpdateableView<BoundValue<T>>;
