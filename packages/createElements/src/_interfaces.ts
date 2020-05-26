import { TypedClassDefinition, IStandardStyles } from '@toolkip/style-helpers';
import { IKeyValPair, IDictionary, IConstructor } from '@toolkip/object-helpers';
import { StandardElement, IDrawable, DrawableElement } from '@toolkip/shared-types';
import { Selector, ModelEventFullPayload } from '@toolkip/model';

export type SelectableValue<T> = T | Selector<any, T, any, any>;

export interface ElemSelector<I = any, O = any> { 
    selector: Selector<I, O, any, any>, 
    applyCb: (payload: ModelEventFullPayload<any, O>, elem: StandardElement) => void 
}

export type IAttribute = IKeyValPair<string> | string | number;
export interface IAttributes {
    [key: string]: SelectableValue<IAttribute>;
}

export type IChild<T extends IKeyedElems = IKeyedElems> = 
    StandardElement | 
    IElemDefinition<T> | 
    IDrawable;

export interface IClassDefinition { name: ClassName, styles: IStandardStyles }

export type ClassName = string | string[];

export type IKeyedElems = IDictionary<DrawableElement>;

export interface IButtonDefinition<T extends IKeyedElems> 
    extends Omit<IElemDefinition<T>, "type"> 
{
    label: string;
    onClick: EventListener;
}

export interface IInputDefinition<T extends IKeyedElems, V>
    extends Omit<IElemDefinition<T>, "type">
{
    value: V;
    onChange: EventListener;
    type: string
}

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
    id?: SelectableValue<string>;

    /** CSS class to use for the element */
    cls?: SelectableValue<ClassName | IClassDefinition>;

    /** the type of HTML element we are creating */
    type?: keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap;

    /** content that should be added to the element */
    content?: SelectableValue<string>;
    innerText?: SelectableValue<string>;
    innerHTML?: SelectableValue<string>;

    /** content that should specifically be added before the children of this element */
    before_content?: SelectableValue<string>;

    /** content that should specifically be added after the children of this element */
    after_content?: SelectableValue<string>;

    /** any additional attributes that should be applied to this element */
    attr?: IAttributes;

    /** any specific styles to apply to this element */
    style?: SelectableValue<TypedClassDefinition>;

    /** any children that should be added for this element */
    children?: IChild<T>[];

    /** the parent element that this should be added to */
    parent?: StandardElement;

    /** allow callers to add event listeners while creating elements */
    eventListeners?: IEventListeners;

    /** if we're creating a namespaced element, allow for specifying it */
    namespace?: string;

    /** allow the function to spin up a drawable instead of an element (will still apply classes & the like) */
    drawable?: IConstructor<IDrawable> | (() => IDrawable);

    /** determine whether this element should be able to receive focus */
    focusable?: boolean;

    /** allow for a selector to apply generally to this element */
    selector?: ElemSelector;
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

export interface ILabeledElement {
    data: HTMLElement;
    lbl: HTMLElement;
    wrapper: HTMLElement;
}