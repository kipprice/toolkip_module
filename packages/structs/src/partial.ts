export type IPartial<T> = {
    [K in keyof T]?: T[K];
}