import { StandardElement } from '../drawable/_interfaces';
import { IElemDefinition } from '../htmlHelpers/_interfaces';
import { BoundView } from './boundView';
import { UpdateableView } from './updateableView';
import { Drawable } from '../drawable/drawable';
export declare type IBoundChild<VM> = StandardElement | IBoundElemDefinition<VM> | Drawable;
export interface IBoundElemDefinition<VM = any> extends IElemDefinition {
    boundTo?: keyof VM;
    children?: IBoundChild<VM>[];
}
export interface IViewUpdateFunc<T> {
    (newValue: T, elem: IBindableElement<T>): void;
}
export declare type IUpdateFunctions<VM> = {
    [K in keyof VM]: IViewUpdateFunc<VM[K]>;
};
export declare type IBindableElement<T> = StandardElement | BoundView<T> | UpdateableView<T>;
