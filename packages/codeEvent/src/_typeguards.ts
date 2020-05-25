import { IListenable } from './_interfaces';

export const isListenable = <T>(test: any): test is IListenable<T> => {
    if ((test as any).addEventListener) { return true; }
    return false;
}