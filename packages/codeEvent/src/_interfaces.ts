export interface ICodeEventCallback<D> {
    (data: D & ICodeEventStandardContent<any>): void;
}

export interface ICodeEventStandardContent<T> {
    target: T;
    name: string;
}

export interface IListenable<T> {
    addEventListener(cb: (event: T) => void): void
}