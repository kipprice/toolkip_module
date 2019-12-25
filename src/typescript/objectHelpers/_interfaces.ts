export enum SortOrderEnum {
    INCORRECT_ORDER = 1,
    SAME = 0,
    CORRECT_ORDER = -1
}

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
export type IDictionary<T, K extends string = string> = {
    [key in K]: T;
}

export type INumericDictionary<T, K extends number = number> = {
    [key in K]: T;
}


/**
 * IMapFunction
 * ----------------------------------------------------------------------------
 * allow for map function, similar to Array.map 
 */
export interface IMapFunction<T, R> {
    (elem: T, key: string | number | keyof any, idx: number): R;
}

/**
 * IQuitConditionFunction
 * ----------------------------------------------------------------------------
 * Determine whether we should stop looping over code
 */
export interface IQuitConditionFunction {
    (): boolean;
}
