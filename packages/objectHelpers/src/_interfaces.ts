export interface IKeyValPair<T> {
    key?: string;
    val?: T;
}

export type IMappedType<T> = {
    [K in keyof T]?: T[K];
}

//..........................................
//#region SELECT OPTIONS

export type ISelectOptions = INumericSelectOptions | IStringSelectOptions;

export interface INumericSelectOptions {
    [value: number]: string;
}

export interface IStringSelectOptions {
    [value: string]: string;
}

//#endregion
//..........................................

/**
 * IConstructor
 * ----------------------------------------------------------------------------
 * Generic tracker of a constructor function
 */
export interface IConstructor<T> {
    new(...addlArgs: any[]): T;
}

/**
 * IToggleBtnOptions
 * ----------------------------------------------------------------------------
 * Keep track of options for toggle buttons
 */
export interface IToggleBtnOption<T> {
    label: string;
    value: T;
    imageURL?: string;
}

/**
 * IDictionary
 * ----------------------------------------------------------------------------
 * generic interface for key value pairs
 */
export type IDictionary<T, K extends string | number = string | number> = Record<K, T>;

/** 
 * INumericDictionary 
 * ----------------------------------------------------------------------------
 * @deprecated
*/
export type INumericDictionary<T, K extends number = number> = {
    [key in K]: T;
}


/**
 * IMapFunction
 * ----------------------------------------------------------------------------
 * allow for map function, similar to Array.map 
 */
export interface IMapFunction<T, R> {
    (elem: T, key: string | number | keyof any, src: Mappable<T>): R;
}

export type Mappable<T = any> = T[] | Record<string | number | symbol, T>;

export interface IShouldInclude<T = any> {
    (value: T, key: string | number | keyof any, src: Mappable<T>): boolean;
}

/**
 * IQuitConditionFunction
 * ----------------------------------------------------------------------------
 * Determine whether we should stop looping over code
 */
export interface IQuitConditionFunction {
    (): boolean;
}

export type Key = string | number | symbol;

export interface ICustomCloner<T> {
    typeGuard: <T>(data: T, key?: Key) => boolean;
    cloner: <T>(data: T, key?: Key) => T;
}

export interface ICloneable<T> {
    clone(...addlParams: any[]): T;
}