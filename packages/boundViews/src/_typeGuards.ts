import { _BoundView } from "./_boundView";
import { _UpdateableView } from './updateableView';
import { BindableElement } from './_interfaces'

export function isUpdatableView<T = any>(elem: BindableElement<T>): elem is _UpdateableView<T> {
    if ((elem as any).update) { return true; }
    return false;
}

export function isBoundView<T = any>(elem: BindableElement<T>): elem is _BoundView<T> {
    console.log("checking for bound view: " + (elem instanceof _BoundView));
    if (elem instanceof _BoundView) { return true; }
    return false;
}