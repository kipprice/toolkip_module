import { IBindableElement } from "./_interfaces";
import { UpdateableView } from "./updateableView";

export function isUpdateableView<T = any>(elem: IBindableElement<T>): elem is UpdateableView<T> {
    if ((elem as any).update) { return true; }
    return false;
}