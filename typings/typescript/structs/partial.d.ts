export declare type IPartial<T> = {
    [K in keyof T]?: T[K];
};
export default IPartial;
