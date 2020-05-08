export interface ICommand<R = void, P = any> {
    execute: (params?: P) => R;
    unexecute: (params?: P) => R;
}

export interface ICommandFunction<R, P> {
    (params?: P): R;
}

export enum CommandState {
    ERR = 0,
    EXECUTED = 1,
    REVERSED = 2
}