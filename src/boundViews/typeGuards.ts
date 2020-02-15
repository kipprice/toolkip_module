import { IBindableElement } from "./_interfaces";
import { _UpdateableView } from "./updateableView";

export function isUpdateableView<T = any>(elem: IBindableElement<T>): elem is _UpdateableView<T> {
    if ((elem as any).update) { return true; }
    return false;
}