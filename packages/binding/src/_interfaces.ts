import { IEqualityFunction } from '@toolkip/comparable';

export interface BoundEvalFunction<T> {
    (): T
}

export interface BoundUpdateFunction<T> {
    (newVal: T): void;
}

export interface BoundDeleteFunction {
    (): boolean;
}

export interface IBindingDetails<T> {
    id: string;
    eval: BoundEvalFunction<T>;
    update: BoundUpdateFunction<T>;
    skip: BoundDeleteFunction;
    lastValue: T;
    equals: IEqualityFunction<T>;
}