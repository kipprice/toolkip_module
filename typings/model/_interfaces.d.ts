export interface IModel {
    [key: string]: any;
}
export interface IPropertyChangeListener<T, K extends keyof T> {
    (newValue: T[K], oldValue?: T[K]): void;
}
export interface IModelChangeListener<T> {
    (key: keyof T, newValue: T[keyof T], oldValue?: T[keyof T]): void;
}
export declare type IPropertyChangeListeners<T> = {
    [K in keyof T]?: IPropertyChangeListener<T, K>[];
};
