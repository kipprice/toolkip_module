import { 
    IBindableElement, 
    _UpdateableView, 
    _BoundView 
} from ".";

export function isUpdatableView<T = any>(elem: IBindableElement<T>): elem is _UpdateableView<T> {
    if ((elem as any).update) { return true; }
    return false;
}

export function isBoundView<T = any>(elem: IBindableElement<T>): elem is _BoundView<T> {
    console.log("checking for bound view: " + (elem instanceof _BoundView));
    if (elem instanceof _BoundView) { return true; }
    return false;
}