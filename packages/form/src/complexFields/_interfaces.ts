import { IFieldConfig, IFieldElems } from "../_interfaces";

export interface IFormCollapsibleTemplate<T> extends IFieldConfig<T> {
    isExpanded?: boolean;
    hideTitle?: boolean;
    uncollapsible?: boolean;
}

export interface ICollapsibleHTMLElements extends IFieldElems {
    title: HTMLElement;
    collapseElem?: HTMLElement;
    titleContainer?: HTMLElement;
}

export interface IArrayChild<M> {
    addOrderingListener(orderListener: IArrayField<M>): void
}

export interface IArrayField<M> {
    onChangeOrder(arrayChild: IArrayChild<M>, direction: DirectionType);
}

export interface IArrayChildHTMLElements extends ICollapsibleHTMLElements {
    title: HTMLElement;
    closeBtn: HTMLElement;
    nextBtn: HTMLElement;
    prevBtn: HTMLElement;
}

export interface IArrayChildTemplate<T> extends IFormCollapsibleTemplate<T> {
    allowReordering?: boolean;
}

export interface IFormArrayTemplate<T> extends IFormCollapsibleTemplate<T[]> {
    newLabel?: string;
    allowReordering?: boolean;
}

export enum DirectionType {
    FORWARD = 1,
    BACKWARD = -1,
    MOVE = 0
}