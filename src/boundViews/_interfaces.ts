import { StandardElement } from '../drawable/_interfaces';
import { IElemDefinition } from '../htmlHelpers/_interfaces';
import { _BoundView } from './boundView';
import { _UpdateableView } from './updateableView';
import { _Drawable } from '../drawable/_drawable';


export type IBoundChild<VM> = 
    StandardElement | 
    IBoundElemDefinition<VM> | 
    _Drawable;

export interface IBoundElemDefinition<VM = any> extends IElemDefinition {
    boundTo?: keyof VM;
    children?: IBoundChild<VM>[];
}

export interface IViewUpdateFunc<T> {
    (newValue: T, elem: IBindableElement<T>): void
}

export type IUpdateFunctions<VM> = {
    [K in keyof VM]: IViewUpdateFunc<VM[K]>
}

export type IBindableElement<T> = StandardElement | _BoundView<T> | _UpdateableView<T>;