import { StandardElement } from "../shared";
import { _Drawable } from "../drawable/_drawable";
import { BoundEvalFunction } from "../binding/_interfaces";
import { TypedClassDefinition } from "../styleHelpers/_interfaces";
import { IKeyValPair, IDictionary, IConstructor } from "../objectHelpers/_interfaces";

//..........................................
//#region INTERFACES AND TYPES

export type IAttribute = IKeyValPair<string> | string | number;
export interface IAttributes {
    [key: string]: IAttribute;
}

export type IChild<T extends IKeyedElems = IKeyedElems> = 
    StandardElement | 
    IElemDefinition<T> | 
    _Drawable;

export interface IClasses {
    [key: string]: IClassDefinition | IKeyValPair<string>[];
}

export interface IClassDefinition {
    [key: string]: string;
}

export type IKeyedElems = IDictionary<StandardElement | _Drawable>;

/**
 * IElemDefinition
 * ----------------------------------------------------------------------------
 * Interface for how elements are created
 * @version 1.3.0
 */
export interface IElemDefinition<T extends IKeyedElems = IKeyedElems> {

    /** unique key for this element; used to return an element */
    key?: keyof T;

    /** Id to use for the element */
    id?: string;

    /** CSS class to use for the element */
    cls?: string | IClasses;

    /** the type of HTML element we are creating */
    type?: keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap;

    /** content that should be added to the element */
    content?: string;

    /** content that should specifically be added before the children of this element */
    before_content?: string;

    /** content that should specifically be added after the children of this element */
    after_content?: string;

    /** any additional attributes that should be applied to this element */
    attr?: IAttributes;

    /** any specific styles to apply to this element */
    style?: TypedClassDefinition;

    /** any children that should be added for this element */
    children?: IChild<T>[];

    /** the parent element that this should be added to */
    parent?: StandardElement;

    /** allow callers to add event listeners while creating elements */
    eventListeners?: IEventListeners;

    /** if we're creating a namespaced element, allow for specifying it */
    namespace?: string;

    /** determine whether this element should be able to receive focus */
    focusable?: boolean;

    /** allow HTML contents to be bound dynamically */
    boundContent?: BoundEvalFunction<string>;

    /** builds a custom tooltip in lieu of the standard title */
    tooltip?: string;

    /** allow the function to spin up a drawable instead of an element (will still apply classes & the like) */
    drawable?: IConstructor<_Drawable> | (() => _Drawable);
}

/**
 * keep track of event listeners of a particular type
 */
export type IEventListeners = {
    [key in keyof WindowEventMap]?: EventListener;
}

export interface ICreateElementFunc<T extends IKeyedElems = IKeyedElems, I extends IElemDefinition<T> = IElemDefinition<T>> {
    (obj: I, keyedElems?: T): StandardElement;
}

export interface ISelectable {
    select(): void;
}

export type IOffsetable = { offsetWidth: number, offsetHeight: number } & HTMLElement